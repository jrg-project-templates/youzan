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
    topIndex: 0,
    subData: null,
    rankData: null
  },
  created(){
    this.getTopList();
    this.getSubList(0);
  },
  methods: {
    getTopList(){
      axios.get(url.topList).then(res=>{
        this.topLists = res.data.data.lists;
      }).catch(res=>{
        console.log('获取一级目录失败！');
      })
    },
    getSubList(index,id){
      this.topIndex = index;
      if(index === 0 ){
        this.getRank();
      }else {
        axios.get(url.subList,{id}).then(res=>{
          this.subData = res.data.data;
          console.log(this.subData)
        }).catch(res=>{
          console.log('获取二级目录失败！');
        })
      }
    },
    getRank(){
      axios.get(url.rank).then(res=>{
        this.rankData = res.data.data;
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
