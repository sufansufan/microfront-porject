import request from './config/axios'

const baseUrl = '/jobadmin/xxl-job-admin/'
// 新增调度任务 任务/消息类型新增
export const addTypePlan = (data) => (
  request({
    url: baseUrl + 'jobinfoRemote/add',
    method: 'post',
    data
  })
)
// 获取所有方案
export const allFindAllJobScheme = (data) => (
  request({
    url: baseUrl + 'jobinfoRemote/findAllJobScheme',
    method: 'get',
    data
  })
)
// 新增调度方案
export const addPlan = (data) => (
  request({
    url: baseUrl + 'jobScheme/save',
    method: 'post',
    data
  })
)
export const deletePlan = (data) => (
  request({
    url: baseUrl + 'jobScheme/remove/' + data,
    method: 'delete'
  })
)
export const updatePlan = (data, id) => (
  request({
    url: baseUrl + 'jobScheme/update/' + id,
    method: 'put',
    data
  })
)
export const detailsPlan = (data) => (
  request({
    url: baseUrl + 'jobScheme/loadById/' + data,
    method: 'get'
  })
)
export const getPlanList = (data) => (
  request({
    url: baseUrl + 'jobScheme/list',
    method: 'post',
    data
  })
)
