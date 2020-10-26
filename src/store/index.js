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
    totalquantity: null,
    totalamount: null,
    sortedByDate: null,
  },
  getters: {
    sortDisplayData(state) {
      return (type) => {
        const percent = (data, statetype) => ((data / state[statetype]) * 100).toFixed(2)
        if (type == 'amount') {
          const displayData = Object.values(state.displayData).map(data => { return { ...data, percent: percent(data.amount, 'totalamount') } })
          return displayData.sort((a, b) => a[type] > b[type] ? -1 : 1)
        } else if (type == 'quantity') {
          const displayData = Object.values(state.displayData).map(data => { return { ...data, percent: percent(data.quantity, 'totalquantity') } })
          return displayData.sort((a, b) => a[type] > b[type] ? -1 : 1)
        } else {
          const displayData = Object.values(state.displayData).map(data => { return { ...data, percent: percent(data.quantity, 'totalquantity') } })
          return displayData
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
    setTotalQuantityandAmount(state, { totalquantity, totalamount }) {
      state.totalquantity = totalquantity
      state.totalamount = totalamount
    },
    setSortedByDate(state, dataBydate) {
      state.sortedByDate = dataBydate
    },
  },
  actions: {
    async useDurationSort({ state, dispatch }, { fromDate, toDate }) {
      await dispatch('filterTransactions', { fromDate, toDate })
      await setTimeout(()=>{
        dispatch('sumDisplayData', state.filteredTransactions)
        dispatch('sumTotalQuantityAmount', state.filteredTransactions)
        dispatch('sumTransactionsbyDatetoDate2',state.filteredTransactions)
      },1000)
    },
    filterTransactions({ state, commit }, { fromDate, toDate }) {
      const filteredTransactions = state.transactions.filter(transaction => {
        return checkInDuration(fromDate, toDate, transaction.date)
      })
      commit('setFilteredTransactions', filteredTransactions)
    },
    sumDisplayData({ commit }, data) {
      const displayData = data.reduce((acc, current) => {
        if (acc[current.sku.sku]== undefined) {
          const initform = { sku: current.sku.sku, name: current.sku.name, quantity: 0, amount: 0 }
          acc[current.sku.sku] = initform
        }
        const skuquantity = current.qty
        const skuprice = current.sku.price
        acc[current.sku.sku].quantity += skuquantity
        acc[current.sku.sku].amount += (skuquantity * skuprice)

        return acc
      }, {})
      commit('setDisplayData', displayData)
    },
    sumTotalQuantityAmount({ commit }, data) {
      const qauntityandAmount = data.reduce((acc, current) => {
        if(acc['totalquantity']==undefined){
          acc['totalquantity']=0
          acc['totalamount']=0
        }
        const skuquantity = current.qty
        const skuprice = current.sku.price
        acc.totalquantity += skuquantity
        acc.totalamount += (skuquantity * skuprice)
        return acc
      },{})
      commit('setTotalQuantityandAmount', qauntityandAmount)
    },
    // for date sku format
    // sumTransactionsbyDatetoDate({ commit }, data) {
    //   const dataBydate = data.reduce((acc, current) => {
    //     if(acc[current.date]==undefined){
    //       acc[current.date]= {}
    //     }
    //     if(acc[current.date][current.sku.sku]==undefined){
    //       const initform={sku:current.sku.sku, name: current.sku.name, quantity: 0, amount: 0 }
    //       acc[current.date][current.sku.sku]=initform
    //     }
    //     const skuquantity = current.qty
    //     const skuprice = current.sku.price
    //     acc[current.date][current.sku.sku].quantity += skuquantity
    //     acc[current.date][current.sku.sku].amount += skuquantity * skuprice
    //     return acc
    //   }, {})
    //   commit('setSortedByDate', dataBydate)
    // },
    sumTransactionsbyDatetoDate2({ commit }, data) {
      const dataBydate = data.reduce((acc, current) => {
        if(acc[current.sku.sku]==undefined){
          acc[current.sku.sku]= {amount:0,quantity:0}
        }
        if(acc[current.sku.sku][current.date]==undefined){
          const initform={date:current.date,quantity: 0, amount: 0 }
          acc[current.sku.sku][current.date]=initform
        }
        const skuquantity = current.qty
        const skuprice = current.sku.price
        acc[current.sku.sku].amount+=skuquantity * skuprice
        acc[current.sku.sku].quantity+=skuquantity
        acc[current.sku.sku][current.date].quantity += skuquantity
        acc[current.sku.sku][current.date].amount += skuquantity * skuprice
        return acc
      }, {})
      commit('setSortedByDate', dataBydate)
    },
  },
  modules: {
  }
})
