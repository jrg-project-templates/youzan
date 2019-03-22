<template>
  <div class="bottom-nav">
    <ul>
      <li v-for="(list,index) in navConfig" 
        :class="{active: index === activeIndex}" 
        @click="changeNav(list,index)"
        :key="list.id" >
        <a>
          <i :class="list.icon"></i>
          <div>{{list.name}}</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>

  import qs from 'qs'

  let navConfig = [{
      id: 'footer-01',
      name: '有赞',
      icon: 'icon-home',
      href: '/youzan'
    }, {
      id: 'footer-02',
      name: '分类',
      icon: 'icon-category',
      href: 'category.html'
    }, {
      id: 'footer-03',
      name: '购物车',
      icon: 'icon-cart',
      href: 'cart.html'
    }, {
      id: 'footer-04',
      name: '我',
      icon: 'icon-user',
      href: 'member.html'
    }]

  export default {
    data(){
      return {
        navConfig,
        activeIndex: parseInt(qs.parse(location.search.slice(1)).index) || 0
      }
    },
    methods: {
      changeNav(list,index){
        location.href = `${list.href}?index=${index}`;
      }
    }
  }
</script>

<style>

</style>

