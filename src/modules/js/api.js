let url = {
  hotList: 'index/hotlists',
  bannerList: 'index/banner',
  topList: 'category/topList',
  subList: 'category/subList',
  rank: 'category/rank',
  searchList: 'search/list'
}

// let host = 'http://rap2api.taobao.org/app/mock/7058'
let host = 'https://easy-mock.com/mock/5bd7072a541c73692857acb7/youzan/'

for(let key in url){
  if(url.hasOwnProperty(key)){
    url[key] = host + url[key]
  }
}

export default url