import Vue from 'vue'
import Vuex from 'vuex'

import Address from '../components/addressService.js'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    addressLists: null
  },
  mutations: {
    init(state,lists){
      state.addressLists = lists
    }
  },
  actions: {
    getAddressList({commit}){
      Address.getList().then(res=>{
        // console.log(res.lists);
        commit('init',res.lists)
      })
    }
  }
})

export default store;