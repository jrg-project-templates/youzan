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
    },
    add(state,list){
      state.addressLists.push(list);
    },
    update(state,list){
      let lists = state.addressLists;
      let listIndex = lists.findIndex(item => item.id === parseInt(list.id));
      // watch 无法检测数组的某些更改,
      // 可以使用 深复制 
      // 或者 Vue.set(arr,indexOfItem,newValue)
      Vue.set(lists,listIndex,list);
    },
    remove(state,id){
      let lists = state.addressLists;
      let findIndex =  lists.findIndex(item=> item.id === parseInt(id))
      lists.splice(findIndex,1)
    },
    setDefault(state,id){
      let lists = state.addressLists;
      lists.forEach((item,index) => {
        item.isDefault = item.id === parseInt(id) ? true : false;
      });
    }
  },
  actions: {
    getAddressList({commit,state}){
      if(!state.addressLists){
        Address.getList().then(res=>{
          commit('init',res.lists)
        })
      }
    },
    addAction({commit},instance){
      Address.add(instance).then(res=>{
        instance.id = parseInt(Math.random()*100000);
        commit('add',instance);
      })
    },
    updateAction({commit},instance){
      Address.update(instance).then(res=>{
        commit('update',instance);
      })
    },
    removeAction({commit},id){
      Address.remove(id).then(res=>{
        commit('remove',id)
      })
    },
    setDefaultAction({commit},id){
      Address.setDefault().then(res=>{
        commit('setDefault',id);
      })
    }
  }
})

export default store;