import url from 'js/api.js'
import fetch from 'js/fetch.js'

class Cart {
  static add(id){
    return fetch(url.cartAdd,{
      id,
      number: 1
    })
  }

  static getList(userID){
    return fetch(url.cartList,{
      userID
    })
  }
}

export default Cart;