import 'css/common.css'
import './index.css'
import url from 'js/api.js'
import axios from 'axios'
import Vue from 'vue'
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
    allLoaded: false
  },
  created(){
    this.getLists();
  },
  methods: {
    getLists(){
        if(this.allLoaded) return;

        console.log(1);

        this.loading = true;
        axios.get(url.hotList,{
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }).then(res => {
          let currentLists = res.data.lists;

          console.log(currentLists.length < this.pageSize)
          this.allLoaded =  currentLists.length < this.pageSize;

          if(this.pageNum === 1){
            this.lists = currentLists;
          }else {
            this.lists = this.lists.concat(currentLists);
          }
          this.pageNum++;
          this.loading = false;
        })
    }
  }

})
