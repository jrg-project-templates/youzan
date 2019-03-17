<template>
  <transition :name="transitionName">
    <router-view></router-view>
  </transition>
</template>

<style>
  @import './address_base.css';
  @import './address.css';
  /* 过渡 前进*/
  .slide-left-enter-active {
    transition: all .8s ease;
  }
  .slide-left-leave-active {
    transition: all .8s ease;
  }
  .slide-left-enter {
    transform: translateX(100%);
  }
  .slide-left-leave-to {
    transform: translateX(-100%);
  }
  /* 过渡 后退 */
  .slide-right-enter-active {
    transition: all .8s ease;
  }
  .slide-right-leave-active {
    transition: all .8s ease;
  }
  .slide-right-enter {
    transform: translateX(-100%);
  }
  .slide-right-leave-to {
    transform: translateX(100%);
  }
  .address.container {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
</style>

<script>
export default {
  data(){
    return {
      transitionName : ''
    }
  },
  watch:{
    '$route'(to,from){
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth > fromDepth ?  'slide-left' : 'slide-right';
    }
  }
}
</script>


