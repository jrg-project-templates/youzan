<template>
  <div class="container address" style="min-height: 597px;" v-cloak>
    <div class="block-list address-list section section-first js-no-webview-block" v-if="addressLists && addressLists.length">
      <a class="block-item js-address-item address-item "  
        v-for="list in addressLists"
        :key = "list.id"
        :class="{'address-item-default': list.isDefault}"
        @click="goToEdit(list)"
      >
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
      </a>
    </div>
    <div v-if="addressLists && !addressLists.length">
      暂无数据
    </div>
    <div class="block stick-bottom-row center">
      <a class="btn btn-blue js-no-webview-block js-add-address-btn" @click="goToAdd()">
            新增地址
        </a>
    </div>
  </div>
</template>
<style>
  [v-cloak]{
    display: none;
  }
</style>

<script>
import Address from './addressService.js'
import {mapState} from 'vuex'

export default {
  computed:{
    // addressLists(){
    //   return this.$store.state.addressLists;
    // },
    ...mapState(['addressLists'])
  },
  created(){
    this.$store.dispatch('getAddressList');
  },
  methods:{
    // getAddressList(){
    //   return Address.getList().then(res=>{
    //     this.addressList = res.lists;
    //   })
    // },
    goToEdit(list){
      this.$router.push({name: 'form',params: {type: 'edit'},query: {instance:list}});
    },
    goToAdd(){
      this.$router.push({name: 'form',params: {type: 'add'}});
    }
  }
}
</script>