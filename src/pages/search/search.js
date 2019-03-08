import 'css/common.css'
import './search.css'

import url from 'js/api.js'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import mixin from 'js/mixin.js'
import Velocity from 'velocity-animate'
import { InfiniteScroll } from 'mint-ui';

Vue.use(InfiniteScroll);
Vue.config.productionTip = false;

let {keyword,id} = qs.parse(location.search.slice(1));

new Vue({
  el: '#app',
  data: {
    keyword,
    searchList: null,
    show: false,
    loading: false,
    loadingAll: false,
    pageNum: 1,
    pageSize: 8,
    timeOutId: 0
  },
  created(){
    this.getSearchList();
  },
  methods: {
    getSearchList(){
      if(this.loadingAll) return ;

      this.loading = true;

      axios.get(url.searchList,{
          id,
          keyword,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }).then(res=>{
          let currentList = res.data.data.lists;
          this.loadingAll = currentList.length < this.pageSize;
          if(this.pageNum === 1){
            this.searchList = currentList;
          }else {
            this.searchList = this.searchList.concat(currentList);
          }
          
          this.pageNum++;
          this.loading = false;
      }).catch(res=>{
        // this.loading = false;
      })
    },
    moveHandle(){
      if(document.documentElement.scrollTop > 100) {
        this.show = true;
      }else {
        this.show = false;
      }
    },
    goToTop(){
      let _this = this;
      Velocity(document.body,"scroll",{
        duration: 1000,
        complete(){
          _this.show = false;
        }
      });
    }
  },
  mixins: [mixin]
})