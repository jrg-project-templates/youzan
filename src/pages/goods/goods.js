import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import qs from 'qs'
import mixin from 'js/mixin.js'
import Swiper from 'components/Swiper.vue'

let {id} = qs.parse(window.location.search.substring(1));

new Vue({
  el: '#app',
  data: {
    id,
    details: null,
    tabIndex: 0,
    introExpand: false,
    listFinished: false
  },
  created(){
    this.getDetails();
  },
  methods: {
    getDetails(){
      axios.get(url.goodsDetails,{
        id
      }).then(res => {
        this.details = res.data.data;
      })
    },
    changeTabType(index){
      this.tabIndex = index;
    }
  },
  mixins: [mixin]
})
