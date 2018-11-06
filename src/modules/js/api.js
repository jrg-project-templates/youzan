let url = {
  hotList: 'index/hotlists',
  bannerList: 'index/banner'
}

// host = ''
let host = 'https://easy-mock.com/mock/5bd7072a541c73692857acb7/youzan/'

for(let key in url){
  if(url.hasOwnProperty(key)){
    url[key] = host + url[key]
  }
}

export default url