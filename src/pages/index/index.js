import 'css/common.css'
import './index.css'

import url from 'js/api.js'
import axios from 'axios'
import Vue from 'vue'

import Swiper from 'components/Swiper.vue'
import mixin from 'js/mixin.js'

import { InfiniteScroll } from 'mint-ui';

Vue.use(InfiniteScroll);

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    lists: null,
    pageNum: 1,
    pageSize: 6,
    loading: false,
    allLoaded: false,
    bannerLists: null,
    pageLoading: true
  },
  created(){
    Promise.all([this.getLists(),this.getBannerLists()]).then(res=>{
      this.pageLoading = false;
    })
  },
  methods: {
    getLists(){
        if(this.allLoaded) return;

        this.loading = true;
        return axios.get(url.hotList,{
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }).then(res => {
          let currentLists = res.data.lists;

          this.allLoaded =  currentLists.length < this.pageSize;

          if(this.pageNum === 1){
            this.lists = currentLists;
          }else {
            this.lists = this.lists.concat(currentLists);
          }
          this.pageNum++;
          this.loading = false;
        })
    },
    getBannerLists(){
      return axios.get(url.bannerList).then(res=>{
        this.bannerLists = res.data.lists;
      })
    }
  },
  components: {
    Swiper
  },
  mixins: [mixin]

})
