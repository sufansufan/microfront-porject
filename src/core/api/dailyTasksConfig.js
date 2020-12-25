import request from './config/axios'
const baseUrl = '/platform'

// 日常任务
export const getDailytasksDate = (data) => (
  request({
    url: baseUrl + '/dailytasksconfigs/withuser',
    method: 'get',
    params: data
  })
)

export const getDailytasksConfig = (data) => (
  request({
    url: baseUrl + '/dailytasksconfigs',
    method: 'get',
    params: data
  })
)

export const getDailytasksId = (data, id) => (
  request({
    url: baseUrl + '/dailytasksconfigs/' + id,
    method: 'put',
    data
  })
)

export const addDailytasks = (data) => (
  request({
    url: baseUrl + '/dailytasksconfigs',
    method: 'post',
    data
  })
)

export const deleteDailyTask = (data) => (
  request({
    url: baseUrl + '/dailytasksconfigs/' + data,
    method: 'delete'
  })
)

// 删除任务类型前的校验
export const deleteDailyVail = (id) => (
  request({
    url: baseUrl + '/dailytasksconfigs/' + id + '/deleteInfo',
    method: 'get'
  })
)

// 日常任务类型编号唯一性校验
export const checkCode = (data) => (
  request({
    url: baseUrl + '/dailytasksconfigs/checkCode',
    method: 'get',
    params: data
  })
)

