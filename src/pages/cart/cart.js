import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import Velocity from 'velocity-animate'

import Cart from './cartService.js'
import mixin from 'js/mixin.js'

var app = new Vue({
  el: "#app",
  data:{
    cartList: null,
    loading: true,
    editingStatus: false,
    editingIndex: -1,
    selectGoodsList: [],
    removeGoodsList: [],
    removePopup: false,
    removeData: null,
    removeAllStatus: false,
    removeMsg: ''
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
          shop.selectChecked = false;
          shop.removeChecked = false;
          shop.disabled = false;
          shop.editMsg = '编辑';
          shop.goodsList.forEach(goods=>{
            goods.selectChecked = false;
            goods.removeChecked = false;
          })
        })
        this.cartList = cartList;
      })
    },
    touchStart(e,goods){
      goods.start = e.changedTouches[0].clientX;
    },
    touchEnd(e,shopIndex,goods,goodsIndex){
      let end = e.changedTouches[0].clientX;
      if(goods.start - end > 100){
        Velocity(this.$refs[`goods-${shopIndex}-${goodsIndex}`],{left: -60})
      }
      if(goods.start - end < -100) {
        Velocity(this.$refs[`goods-${shopIndex}-${goodsIndex}`],{left: 0});
      }
    },
    checkNumber(goods,number){
      if(typeof number !== 'number'){
        goods.number = isNaN(parseInt(number)) ? 1 : (parseInt(number) > 0 ? parseInt(number) : 1);
      }
    },
    goodsIncrease(goods,count){
      if(goods.number === 1 && count < 0) return;
      Cart.reduce(goods.id).then(res => {
        goods.number += count;
      })
    },
    editShop(shop,shopIndex){
      if(!this.editingStatus){
        this.editingStatus = true;
        this.editingIndex = shopIndex;
        shop.editMsg = '完成';
        shop.disabled = false;
        this.cartList.forEach((item,index)=>{
          if(shopIndex != index){
            item.editMsg = '';
            item.disabled = true;
          }
        })
      }else {
        this.editingStatus = false;
        this.editingIndex = -1;
        this.cartList.forEach(item=>{
          item.editMsg = '编辑';
          item.disabled = false;
        })
      }
    },
    selectGoods(shop,goods,shopIndex,goodsIndex){
      if(shop.disabled) return ;
      goods[this.checkType] = !goods[this.checkType];
      shop[this.checkType] =  shop.goodsList.every(item=>{
        return item[this.checkType];
      })
      this.checkSelectList(goods);
    },
    selectShops(shop){
      if(shop.disabled) return ;
      shop[this.checkType] = !shop[this.checkType];
      shop.goodsList.forEach(item=>{
        item[this.checkType] = shop[this.checkType];
        this.checkSelectList(item);
      })
    },
    checkSelectList(goods){ 
      let checkListType = this.editingStatus ? 'removeGoodsList' : 'selectGoodsList';
      if(goods[this.checkType]){
        if(this[checkListType].indexOf(goods) === -1){
          this[checkListType].push(goods);
        }
      }else {
        for(let i = this[checkListType].length-1;i>=0;i--){
          let item = this[checkListType][i]; 
          if(item.id === goods.id){
            this[checkListType].splice(i,1);
          }
        }
      }
    },
    removeGoods(shop,shopIndex,goods,goodsIndex){ 
      this.removeAllStatus = false;
      this.removePopup = true;
      this.removeData = {shop,shopIndex,goods,goodsIndex};
      this.removeMsg = `确定要删除该商品？`;
    },
    removeMoreGoods(){
      this.removeAllStatus = true;
      this.removePopup = true;
      this.removeMsg = `确定要删除${this.removeGoodsList.length}件商品？`;
    },
    removeConfirm(){
      if(!this.removeAllStatus){
        let {shop,shopIndex,goods,goodsIndex} = this.removeData;
        Cart.remove(goods.id).then(res=>{
          this.removeGoodsSuccess({shop,shopIndex,goods,goodsIndex});
          this.removeData = null;
        })
      }else {
        Cart.moreRemove(this.removeGoodsList.map(goods => goods.id)).then(res=>{
          let shopIndex = this.editingIndex;
          let shop = this.cartList[this.editingIndex];
          this.removeGoodsList.forEach(goods=>{
            let goodsIndex = shop.goodsList.indexOf(goods);
            this.removeGoodsSuccess({shop,shopIndex,goods,goodsIndex})
          })
          this.removeGoodsList = [];
          this.removeAllStatus = false;
        });
      }
    },
    removeGoodsSuccess(data){
      let {shop,shopIndex,goods,goodsIndex} = data
      shop.goodsList.splice(goodsIndex,1);
      if(!shop.goodsList.length){
        this.removeShop(shopIndex);
      }
      this.removePopup = false;
      this.removeData = null;
    },
    removeShop(shopIndex){
      this.cartList.splice(shopIndex,1);
      this.cartList.forEach(item=>{
        item.disabled = false;
        item.editMsg = '编辑';
        this.editingStatus = false;
      })
    },
    allSelect(){
      this.allSelctStatus = !this.allSelctStatus;
    }
  },
  computed: {
    allPrice(){
      return this.selectGoodsList.reduce((sum,item)=>{
        return sum + item.price * item.number;
      },0)
    },
    allCount(){
      return this.selectGoodsList.length;
    },
    checkType(){
      return this.editingStatus ? 'removeChecked' : 'selectChecked';
    },
    allSelctStatus:{
      get(){
        if(this.editingStatus){
          return this.cartList[this.editingIndex].removeChecked;
        } else {
          return this.selectGoodsList.length === this.cartList.reduce((sum,shop)=>{
            return sum + shop.goodsList.length;
          },0)
        }
      },
      set(checked){
        if(this.editingStatus){
          let editShop =  this.cartList[this.editingIndex]
          editShop[this.checkType] = checked;
          editShop.goodsList.forEach(goods=>{
            goods[this.checkType] = checked;
            this.checkSelectList(goods);
          })
        }else{
          this.cartList.forEach(shop=>{
            shop[this.checkType] = checked;
            shop.goodsList.forEach((goods,index)=>{
              goods[this.checkType] = checked;
              this.checkSelectList(goods);
            })
          })
        }
      }
    }
  },
  mixins: [mixin]
})
 