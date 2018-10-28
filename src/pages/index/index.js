import 'css/common.css'
import './index.css'
import url from 'js/api.js'
import axios from 'axios'
import Vue from 'vue'

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    lists: null
  },
  created(){
    axios.get(url.hotList,{
      pageNum: 1,
      pageSize: 4
    }).then(res => {
      this.lists = res.data.lists;
    })
  }
})
