import Address from './addressService.js'
import {mapState} from 'vuex'

export default {
  data(){
    return {
      id: '',
      name: '',
      tel: '',
      provinceValue: -1,
      provinceName: '',
      cityValue: -1,
      cityName: '',
      districtValue: -1,
      districtName: '',
      isDefault: false,
      address: '',
      type: '',
      instance: null,
      addressData: null,
      cityList: null,
      districtList: null,
      isInitValue: true
    }
  },
  computed:{
    ...mapState(['addressLists'])
  },
  created(){
    this.type = this.$route.params.type;
    this.instance = this.$route.query.instance;
    this.addressData = require('json/address.json');

    let instance = this.instance;
    if(this.type === 'edit'){
      this.provinceValue = parseInt(instance.provinceValue);
      this.name = instance.name;
      this.tel = instance.tel;
      this.address = instance.address;
      this.id = instance.id;
      this.isDefault = instance.isDefault;
    }
  },
  methods:{
    save(){
      let {name,tel,provinceValue,provinceName,cityValue,cityName,districtValue,districtName,address} = this;
      let data = {name,tel,provinceValue,provinceName,cityValue,cityName,districtValue,districtName,address};
      //进行数据校验
      if(!this.dataCheck(data)){
        return ;
      }
      //判断提交类型
      if(this.type === 'add'){
        this.$store.dispatch('addAction',{...data,isDefault:false});
      }else {
        this.$store.dispatch('updateAction',{...data, id: this.id, isDefault:this.isDefault})
      }
    },
    remove(){
      if(window.confirm('确认删除这个地址？')){
        this.$store.dispatch('removeAction',this.id);
      }
    },
    setDefault(){
      this.$store.dispatch('setDefaultAction',this.id);
    },
    dataCheck(data){
      if(!data.name){
        alert('名称不能为空');
        return false;
      }
      if(!data.tel){
        alert('手机号不能为空');
        return false;
      }
      return true;
    }
  },
  watch: {
    addressLists: {
      handler(){
        this.$router.go(-1);
      },
      deep: true
    },
    provinceValue(val){
      if(val === -1){
        this.cityValue = -1;
        this.districtValue = -1;
        return;
      }
      let list = this.addressData.list;
      let provinceIndex = list.findIndex(item => item.value === val);
      this.cityList = list[provinceIndex].children;
      this.provinceName = provinceIndex > -1 ? list[provinceIndex].label : '';

      this.cityValue = -1;

      if(this.type === 'edit' && this.isInitValue){
        this.cityValue = parseInt(this.instance.cityValue);
      }

    },
    cityValue(val){
      if(val === -1){
        this.districtValue = -1;
        return;
      }
      let list = this.cityList;
      let cityIndex = list.findIndex(item => item.value === val);
      this.districtList = list[cityIndex].children;
      this.cityName = cityIndex > -1 ? list[cityIndex].label : '';

      this.districtValue = -1;

      if(this.type === 'edit' && this.isInitValue){
        this.districtValue = parseInt(this.instance.districtValue);
        this.isInitValue = false;
      }
    },
    districtValue(val){
      let list = this.districtList;
      let districtIndex = list.findIndex(item => item.value === val);
      this.districtName = districtIndex > -1 ? list[districtIndex].label : '';
    }
  }
}