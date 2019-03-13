import url from 'js/api.js'
import fetch from 'js/fetch.js'

class Cart {

  static getList(userID){
    return fetch.get(url.cartList,{
      userID
    })
  }

  static increase(goodsID){
    return fetch.post(url.cartIncrease,{
      goodsID
    })
  }

  static reduce(goodsID){
    return fetch.post(url.cartReduce,{
      goodsID
    })
  }

  static remove(goodsID){
    return fetch.post(url.cartRemove,{
      goodsID
    })
  }

  static moreRemove(goodsArr){
    return fetch.post(url.cartMoreRemove,{
      goodsArr
    })
  }
}

export default Cart;