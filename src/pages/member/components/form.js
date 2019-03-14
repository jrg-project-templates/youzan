import Address from './addressService.js'

export default {
  data(){
    return {
      id: '',
      name: '',
      tel: '',
      provinceValue: -1,
      cityValue: -1,
      districtValue: -1,
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
    }
  },
  methods:{
    save(){
      let {name,tel,provinceValue,cityValue,districtValue,address} = this;
      let data = {name,tel,provinceValue,cityValue,districtValue,address};
      //进行数据校验
      if(!this.dataCheck(data)){
        return ;
      }
      //判断提交类型
      if(this.type === 'add'){
        Address.add(data).then(res=>{
          this.$router.go(-1);
        })
      }else {
        Address.update({id:this.id, isDefault:this.isDefault, ...data}).then(res=>{
          this.$router.go(-1)
        })
      }
    },
    remove(){
      if(window.confirm('确认删除这个地址？')){
        Address.remove(this.id).then(res=>{
          this.$router.go(-1);
        })
      }
    },
    setDefault(){
      Address.setDefault(this.id).then(res=>{
        this.$router.go(-1)
      })
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
    provinceValue(val){
      if(val === -1){
        this.cityValue = -1;
        this.districtValue = -1;
        return;
      }
      let list = this.addressData.list;
      let provinceIndex = list.findIndex(item => item.value === val);
      this.cityList = list[provinceIndex].children;

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

      this.districtValue = -1;

      if(this.type === 'edit' && this.isInitValue){
        this.districtValue = parseInt(this.instance.districtValue);
        this.isInitValue = false;
      }
    }
  }
}