import Vue from 'vue'
import Vuex from 'vuex'
import { skuData } from '../mockData/sku'
import { transactionsData } from '../mockData/transactions'
import { checkInDuration } from '../helper'

Vue.use(Vuex)
const transactions=transactionsData.map(transaction=>{
  return {...transaction,sku:skuData.filter(data=>{return data.sku==transaction.sku})[0]}
})
export default new Vuex.Store({
  state: {
    transactions,
    displayData:null,
    sortedTransactions:null
  },
  getters: {
       sortDisplayData(state){
            return (type)=>{
              if(type){
                return Object.values(state.displayData).sort((a,b)=>a[type]>b[type]?-1:1)
              }else{
                return state.displayData
              }
            }
       }
  },
  mutations: {
    setSortedTransactions(state,sortedTransactions){
         state.sortedTransactions=sortedTransactions
    },
    setDisplayData(state,displayData){
        state.displayData=displayData
    }
  },
  actions: {
      async useDurationSort({state,dispatch},{fromDate, toDate}){
          await dispatch('sortTransactions',{ fromDate, toDate })
          await dispatch('sumDisplayData',state.sortedTransactions)
      },
      sortTransactions({state,commit},{ fromDate, toDate }){
        const sortedTransactions=state.transactions.filter(transaction => {
          return checkInDuration(fromDate, toDate, transaction.date)
        })
        commit('setSortedTransactions',sortedTransactions)
      },
      sumDisplayData({commit},data){
         const displayData=data.reduce((acc, current) => {  
          const skuItem=acc[current.sku.sku] || {sku:current.sku.sku,name:current.sku.name ,quantity: 0,amount:0}
          const skuquantity=parseInt(current.qty)
          const skuprice=parseInt(current.sku.price)
          skuItem.quantity+=skuquantity
          skuItem.amount += (skuquantity*skuprice)
          acc[current.sku.sku]=skuItem
          return acc
          },{})
        commit('setDisplayData',displayData)
      }
  },
  modules: {
  }
})
