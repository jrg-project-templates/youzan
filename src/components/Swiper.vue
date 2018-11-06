<template>
  <div class="swiper-container" >
    <div class="swiper-wrapper">
      <div class="swp-page swiper-slide" v-for="list in lists" :key="list.id">
        <a class="js-no-follow" :href="list.clickUrl">
          <img class="goods-main-photo fadeIn" :src="list.img">
        </a>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>

import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

export default {
  props: {
    lists: {
      type: Array,
      required: true
    },
    name: String
  },
  created(){ },
  mounted(){
    this.init()
  },
  methods: {
    init(){
      let mySwiper = new Swiper('.swiper-container', { 
        pagination: {
          el: '.swiper-pagination',
        },
        autoplay: true,
        loop: true
      });
    }
  }
}
</script>

<style>
.swiper-slide img {
  width: 100%;
  height: 100%;
}
</style>