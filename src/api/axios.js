
// 配置axios
import axios from 'axios'
import JSONBig from 'json-bigint'

const instance = axios.create({
  // 配置对象  基准路径  头部信息
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  transformResponse: [(data) => {
    // 对 data 进行任意转换处理
    // data 应该是 null 使用JSONBig转换null会出现异常
    if (data) {
      return JSONBig.parse(data)
    }
    return data
  }]
  // headers: {
  //   // Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm74-toutiao')).token
  // }
})

// 请求拦截
instance.interceptors.request.use(config => {
  // 给头部加上认证信息
  const user = window.sessionStorage.getItem('hm74-toutiao')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截
instance.interceptors.response.use(response => response, error => {
  // 做一些事情
  if (error.response && error.response.status === 401) {
    // hash 哈希   是url后  #开始的字符串
    location.hash = '#/login'
  }
  return Promise.reject(error)
})

export default instance
