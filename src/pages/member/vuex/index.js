import Vue from 'vue'
import Vuex from 'vuex'

import Address from '../components/addressService.js'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    addressLists: null
  },
  multations: {
    init(state,lists){
      state.addressLists = lists
    }
  },
  actions: {
    getAddressList({commit}){
      Address.getList().then(res=>{
        commit(res.lists)
      })
    }
  }
})

export default store;