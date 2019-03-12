import './components/member_base.css'
import './components/member.css'

import Vue from 'vue'
import VueRouter from 'vue-router'

import member from './components/member.vue'
import address from './components/address.vue'

Vue.use(VueRouter);

var routes = [{
  path: '/',
  component: member
},{
  path: '/address',
  component: address
}]

var router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router
})