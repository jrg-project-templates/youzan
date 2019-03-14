import url from 'js/api.js'
import fetch from 'js/fetch.js'

class Address {
  // 获取地址列表
  static getList(){
    return fetch.get(url.addressGetList,{});
  }
  // 新增地址
  static add(data){
    return fetch.post(url.addressAdd,data)
  }
  // 修改地址
  static update(data){
    return fetch.post(url.addressUpdate,data)
  }
  // 删除地址
  static remove(id){
    return fetch.post(url.addressRemove,{id})
  }
  // 设为默认地址
  static setDefault(id){
    return fetch.post(url.addressSetDefault,{id})
  }
}

export default Address;