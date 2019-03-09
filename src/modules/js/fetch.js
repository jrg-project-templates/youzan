import axios from 'axios'

const fetch = {
  get(url,data){
    return new Promise((resolve,reject)=>{
      axios.get(url,data).then(res=>{
        if(res.status === 200) {
          resolve(res.data.data)
        }
        if(res.status === 401){
          location.href = '/login.html'
        }
        resolve(res.data.data)
      }).catch(res=>{
        console.log('获取数据失败')
        reject(res)
      })
    })
  },
  post(url,data){
    return new Promise((resolve,reject)=>{
      axios.post(url,data).then(res=>{
        if(res.status === 200) {
          resolve(res.data.data)
        }
        if(res.status === 401){
          location.href = '/login.html'
        }
        resolve(res.data.data)
      }).catch(res=>{
        console.log('获取数据失败')
        reject(res)
      })
    })
  }
}

export default fetch;