import axios from 'axios'
import { Message, Loading } from 'element-ui'
import { getToken, removeToken } from '../../utils/auth'
import router from '../../router'

const timeout = 60 * 1000
const Loadings = (text, time = timeout) => {
  const loading = Loading.service({
    lock: true,
    text: text || '正在处理您的操作，请稍候...',
    spinner: 'el-icon-loading',
    color: '#fff',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  setTimeout(() => {
    if (loading.visible) {
      Message.error('请求超时')
      loading.close()
    }
  }, time)

  return loading
}
let loadingInstance = null

const baseUrl = ''
const axiosInstance = axios.create({
  url: '/',
  baseURL: baseUrl,
  timeout,
  withCredentials: false,
  validateStatus: (status) => {
    return status >= 200 && status <= 500 // 默认的
  }
})

// 改变post请求的fromDate状态
axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axiosInstance.interceptors.request.use(
  config => {
    config.headers['token'] = getToken()
    config.headers['companyId'] = ''
    if (config.data && config.data.Loading) {
      loadingInstance = Loadings()
      delete config.data.Loading
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response 拦截器  添加响应器拦截，在响应数据之前
axiosInstance.interceptors.response.use(response => {
  if (response) {
    loadingInstance && loadingInstance.close()
    if (response.status === 200) {
      switch (response.data.code) {
        case 1: // 与后台约定登录失效的返回码,根据实际情况处理
          Message({
            message: '请重新登陆',
            showClose: true,
            type: 'error'
          })
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break
        case 200:
          return response.data
        default:
          Message({
            message: response.data.message,
            showClose: true,
            type: 'error',
            duration: 500
          })
      }
    } else {
      const { status, data: { message }} = response
      let messages = message
      if (status === 401) {
        messages = '暂无权限，请联系管理员'
      }
      if (status === 403) {
        messages = '登陆失效，请重新登陆'
        removeToken()
        Message({ message: messages, type: 'error' })
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      }
      if (status !== 403) {
        Message({
          message: messages,
          type: 'error'
        })
        return false
      }
    }
  }
}
  // error => {
  //   let message = error.response.data.message ? error.response.data.message : error.message
  //   if (error.response.data.code === '401') {
  //     message = '暂无权限，请联系管理员'
  //   }
  //   if (error.response.data.code === '403') {
  //     message = '登陆失效，请重新登陆'
  //     removeToken()
  //     router.push({
  //       name: 'login'
  //     })
  //   }
  //   if (error.response.data.code !== '403') {
  //     Message({
  //       message: message,
  //       showClose: true,
  //       type: 'error',
  //       duration: 5 * 1000
  //     })
  //   } else {
  //     show403Message(message)
  //   }
  //   return Promise.reject(error)
  // }
)

var setTimeoutID = ''
function show403Message(message) {
  clearTimeout(setTimeoutID)
  setTimeoutID = setTimeout(() => {
    Message({
      message: message,
      showClose: true,
      type: 'error',
      duration: 5 * 1000
    })
  }, 100)
}

export default axiosInstance
