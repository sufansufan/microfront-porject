import request from './config/axios'

const baseUrl = '/platform'
export const getDailytasks = (data) => (
  request({
    url: baseUrl + '/dailytaskss/page',
    method: 'post',
    data
  })
)

export const dailytasksDeploy = (data) => (
  request({
    url: baseUrl + '/dailytaskss/deploy',
    method: 'post',
    data
  })
)

export const dailytasksRedefault = (id) => (
  request({
    url: baseUrl + '/dailytaskss/redefault/' + id,
    method: 'post'
  })
)

export const dailytasksCustomize = (data) => (
  request({
    url: baseUrl + '/dailytaskss/customize',
    method: 'post',
    data
  })
)

// 获取日常任务
export const getDailyConfig = (id) => (
  request({
    url: baseUrl + '/dailytaskss/' + id,
    method: 'get'
  })
)
