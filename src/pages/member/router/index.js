import Vue from 'vue'
import VueRouter from 'vue-router'

import member from '../components/member.vue'
import address from '../components/address.vue'
import address_list from '../components/address_list.vue'
import address_form from '../components/address_form.vue'

Vue.use(VueRouter);

var routes = [{
  path: '/',
  component: member
},{
  path: '/address',
  component: address,
  children: [{
    path: '',
    name: 'all',
    component: address_list
  },{
    path: '/address_form/:type',
    name: 'form',
    component: require('../components/address_form.vue').default
  }]
}]

var router = new VueRouter({
  base: '/youzan/',
  routes
})

export default router;