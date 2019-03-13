
export default {
  data(){
    return {
      id: '',
      name: '',
      tel: '',
      provinceValue: -1,
      cityValue: -1,
      districtValue: -1,
      address: '',
      type: '',
      instance: null
    }
  },
  created(){
    this.type = this.$route.params.type;
    this.instance = this.$route.query.instance;
    
  },
  methods: {

  }
}