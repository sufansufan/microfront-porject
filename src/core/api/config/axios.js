import axios from 'axios'
import { Message, Loading } from 'element-ui'
import { getToken, removeToken } from '../../utils/auth'
import router from '../../router'

const timeout = 60 * 1000 * 3
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
var loadingInstance = null

const componyType = window.location.pathname.split('/')
const baseUrl = process.env.NODE_ENV === 'development' ? '' : componyType[1]
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
    if (getToken()) config.headers['token'] = getToken()
    config.headers['companyId'] = 'dev-hhzs' // dev-market dev-jdy  dev-fws  dev-hhzs
    if (config.data) {
      if (config.data.Loading) {
        loadingInstance = Loadings()
        delete config.data.Loading
      }
      if (config.data.componentBusinessCode) {
        config.headers['Component-Business-Code'] = config.data.componentBusinessCode
        delete config.data.componentBusinessCode
      }
    }
    // 处理get请求参数
    if (config.params) {
      if (config.params.Loading) {
        loadingInstance = Loadings()
        delete config.params.Loading
      }
      if (config.params.componentBusinessCode) {
        config.headers['Component-Business-Code'] = config.params.componentBusinessCode
        delete config.params.componentBusinessCode
      }
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)
// response 拦截器  添加响应器拦截，在响应数据之前
axiosInstance.interceptors.response.use(
  response => {
    if (response) {
      loadingInstance && loadingInstance.close()
      if (response.status === 200) {
        const isFile = Object.prototype.hasOwnProperty.call(response.headers, 'content-disposition')
        if (isFile) {
          return response
        }
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
              type: 'warning',
              duration: 1500,
              customClass: response.data.message === '用户名或密码错误！！！' ? 'login-message' : ''
            })
        }
      } else {
        const { status, data, request: { responseType }} = response
        const { message } = data
        if (responseType === 'arraybuffer') {
          const resBlob = new Blob([data])
          const reader = new FileReader()
          reader.readAsText(resBlob, 'utf-8')
          reader.onload = () => {
            Message({
              message: JSON.parse(reader.result).message,
              type: 'warning',
              duration: 1500
            })
          }
          return Promise.reject()
        }
        var messages = message
        if (status === 401) {
          removeToken()
          window.location.replace('#/login')
          // messages = '登陆失效，请重新登陆'
          // Message({ message: messages, type: 'error' })
        }
        // 修改提示信息，除错误码500外，其他错误码均为警告级别，见bug8130
        if (status === 500) {
          Message({
            message: messages,
            type: 'error',
            duration: 1500
          })
        } else {
          Message({
            message: messages,
            type: 'warning',
            duration: 1500
          })
        }
        return Promise.reject()
      }
    }
  }
  // error => {
  //   console.log(error)
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
