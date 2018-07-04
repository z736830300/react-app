import axios from 'axios'
import Cookies from 'js-cookie';


// 创建axios实例
console.log(process.env);
const service = axios.create({
  baseURL: process.env.PUBLIC_URL, // api的base_url
 
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=utf-8'
  }
})

// request拦截器
service.interceptors.request.use(config => {
  const obj = Object.assign({},config.data)
  

  if(obj.hasOwnProperty('ContentType')){
   config.headers['Content-Type'] = config.data.ContentType
  }
  if (config.method === 'post') {
    config.data = JSON.stringify(config.data)
  }

  if (Cookies.get('access_token')) {
    config.headers.common['access_token'] = Cookies.get('access_token')
  }
  // if (store.getters.token) {
  //   config.headers.common['access_token'] = store.getters.token
  // }

  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    if (response.data.Command === 'ExpireIns') {
      console.log(response);
    } else if (response.data.Command === "AuthorizeDeny") {
      console.log(response);
    } else if (response.data.Command === 'UnAuthorize') {
      console.log(response);
    } else {
      // console.log(response);
    }
    return response
  }
  /**
   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
   */
  // const code = response.data.code
  // // 50014:Token 过期了 50012:其他客户端登录了 50008:非法的token
  // if (code === 50008 || code === 50014 || code === 50012) {
  //   Message({
  //     message: res.message,
  //     type: 'error',
  //     duration: 5 * 1000
  //   })
  //   // 登出
  //   store.dispatch('FedLogOut').then(() => {
  //     router.push({ path: '/login' })
  //   })
  // } else {
  //   return response
  // }
  ,
  error => {
    Promise.reject(error)
  }
)

export default service
