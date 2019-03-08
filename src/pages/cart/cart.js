import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'

import Cart from './cartServer.js'
import mixin from 'js/mixin.js'

var app = new Vue({
  el: "#app",
  data:{
    cartList: null,
    loading: true,
    editingStatus: false,
    editingIndex: -1,
    selectGoodsList: []
  },
  created(){
    this.getList().then(data=>{
      this.loading = false;
    })
  },
  methods:{
    getList(){
      return Cart.getList('99999').then(data=>{
        let cartList = data.cartList;
        cartList.forEach(shop=>{
          shop.checked = false;
          shop.goodsList.forEach(goods=>{
            goods.checked = false;
          })
        })
        this.cartList = cartList;
      })
    },
    checkGoods(shop,goods,shopIndex,goodsIndex){
      goods.checked = !goods.checked;
      shop.checked =  shop.goodsList.every(item=>{
        return item.checked;
      })
    },
    checkShops(shop){
      shop.checked = !shop.checked;
      shop.goodsList.forEach(item=>{
        item.checked = shop.checked;
      })
    }
  },
  computed: {
    allPrice(){
      return this.selectGoodsList.reduce((sum,item)=>{
        return sum + item.price;
      },0)
    },
    allCount(){
      return this.selectGoodsList.length;
    },
    allCheckStatus:{
      get(){

      },
      set(){

      }
    }
  },
  mixins: [mixin]
})
 