import request from './config/axios'
const baseUrl = '/token'

// 获取token
export const getToken = (data) => (
  request({
    url: baseUrl + '/login',
    method: 'post',
    data
  })
)
