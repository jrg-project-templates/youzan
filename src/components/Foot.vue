<template>
  <div class="bottom-nav">
    <ul>
      <li v-for="(list,index) in footerLists" 
        :class="{active: index === activeIndex}" 
        :key="list.id" >
        <a :href="list.href">
          <i :class="list.icon"></i>
          <div>有赞</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        activeIndex: -1,
        footerLists: [
          {
            id: 'footer-01',
            name: '有赞',
            icon: 'icon-home',
            href: '/'
          },
          {
            id: 'footer-02',
            name: '分类',
            icon: 'icon-category',
            href: '/category.html'
          },
          {
            id: 'footer-03',
            name: '购物车',
            icon: 'icon-cart',
            href: ''
          },
          {
            id: 'footer-04',
            name: '我',
            icon: 'icon-user',
            href: ''
          }
        ]
      }
    },
    created(){
      this.getActiveListIndex();
    },
    methods: {
      getUrl(){
        let url = window.location.href;
        let urlNoHttp = url.split('//')[1];
        console.log(JSON.stringify(urlNoHttp));
        let subUrlArrs = urlNoHttp.split('/');
        subUrlArrs.shift();
        return '/' + subUrlArrs.join('/').split('?')[0];
      },
      getActiveListIndex(){
        let activeUrl = this.getUrl();
        
        this.footerLists.forEach((item,index)=>{
          if(this.activeIndex > -1){
            return
          }
          console.log(activeUrl);
          if(item.href === activeUrl){
            this.activeIndex = index;
          }
        })
      }
    }
  }
</script>

<style>

</style>

