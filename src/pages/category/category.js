import 'css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
import mixin from 'js/mixin.js';

new Vue({
  el: '#app',
  data: {
    topLists: null,
    topIndex: null,
    subData: null,
    rankData: null,
    loading: true
  },
  created(){
    Promise.all([this.getTopList(),this.getSubList(0)]).then(res=>{
      // this.loading = false;
    });
    ;
  },
  methods: {
    getTopList(){
      return axios.get(url.topList).then(res=>{
        this.topLists = res.data.data.lists;
      }).catch(res=>{
        console.log('获取一级目录失败！');
      })
    },
    getSubList(index,id){
      if(index === 0 ){
        return this.getRank();
      }else {
        return axios.get(url.subList,{id}).then(res=>{
          this.topIndex = index;
          this.subData = res.data.data;
        }).catch(res=>{
          console.log('获取二级目录失败！');
        })
      }
    },
    getRank(){
      return axios.get(url.rank).then(res=>{
        this.rankData = res.data.data;
        this.topIndex = 0;
      }).catch(res=>{
        console.log('获取综合排行失败！');
      })
    },
    goToSearch(list){
      location.href = `search.html?keyword=${list.name}&id=${list.id}`;
    }
  },
  mixins: [mixin]
})
