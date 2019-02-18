import Foot from 'components/Foot.vue'

let mixin = {
  components: {
    Foot
  },
  filters: {
    currency(value){
      return (Math.round(value*100)/100).toFixed(2);
    }
  }
}

export default mixin;