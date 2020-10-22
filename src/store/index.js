import Vue from 'vue'
import Vuex from 'vuex'
import { skuData } from '../mockData/sku'
import { transactionsData } from '../mockData/transactions'
import { checkInDuration } from '../helper'

Vue.use(Vuex)
const transactions = transactionsData.map(transaction => {
  return { ...transaction, sku: skuData.filter(data => { return data.sku == transaction.sku })[0] }
})
export default new Vuex.Store({
  state: {
    transactions,
    displayData: null,
    filteredTransactions: null,
    totalquantity:null,
    totalamount:null,
  },
  getters: {
    sortDisplayData(state) {
      return (type) => {
        if (type){
          return Object.values(state.displayData).sort((a, b) => a[type] > b[type] ? -1 : 1)
        } else {
          return state.displayData
        }
      }
    }
  },
  mutations: {
    setFilteredTransactions(state, filteredTransactions) {
      state.filteredTransactions = filteredTransactions
    },
    setDisplayData(state, displayData) {
      state.displayData = displayData
    },
    setTotalQuantityandAmount(state,{totalquantity,totalamount}){
      state.totalquantity=totalquantity
      state.totalamount=totalamount
    }
  },
  actions: {
    async useDurationSort({ state, dispatch }, { fromDate, toDate }) {
      await dispatch('filterTransactions', { fromDate, toDate })
      await dispatch('sumDisplayData', state.filteredTransactions)
      await dispatch ('sumTotalQuantityAmount',state.filteredTransactions)
    },
    filterTransactions({ state, commit }, { fromDate, toDate }) {
      const filteredTransactions = state.transactions.filter(transaction => {
        return checkInDuration(fromDate, toDate, transaction.date)
      })
      commit('setFilteredTransactions', filteredTransactions)
    },
    sumDisplayData({ commit }, data) {
      const displayData = data.reduce((acc, current) => {
        const initskuitem = { sku: current.sku.sku, name: current.sku.name, quantity: 0, amount: 0 }
        const skuItem = acc[current.sku.sku] || initskuitem
        const skuquantity = parseInt(current.qty)
        const skuprice = parseInt(current.sku.price)
        skuItem.quantity += skuquantity
        skuItem.amount += (skuquantity * skuprice)
        acc[current.sku.sku] = skuItem
        return acc
      }, {})
      commit('setDisplayData', displayData)
    },
    sumTotalQuantityAmount({commit},data){
        const qauntityandAmount=data.reduce((acc,current)=>{
        const skuquantity=parseInt(current.qty)
        const skuprice= parseInt(current.sku.price)
        acc.totalquantity+=skuquantity
        acc.totalamount+=(skuquantity * skuprice)
        return acc
        },{totalquantity:0,totalamount:0})
        console.log(qauntityandAmount)
        commit('setTotalQuantityandAmount',qauntityandAmount)
    }
  },
  modules: {
  }
})
