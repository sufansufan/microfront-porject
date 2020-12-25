import request from './config/axios'

const baseUrl = 'platform'

// 紧急任务
export const getEmergencyworkconfig0 = (data) => (
  request({
    url: baseUrl + '/emergencyworkconfig/list0',
    method: 'post',
    data
  })
)

// 系统消息
export const getEmergencyworkconfig1 = (data) => (
  request({
    url: baseUrl + '/emergencyworkconfig/list1',
    method: 'post',
    data
  })
)

export const returnEmergencyworkconfig = (data) => (
  request({
    url: baseUrl + '/emergencyworkconfig/defaulConfig/' + data,
    method: 'put'
  })
)
export const saveEmergencyworkconfig = (data) => (
  request({
    url: baseUrl + '/emergencyworkconfig/save',
    method: 'post',
    data
  })
)
export const updateEmergencyworkconfig = (data) => (
  request({
    url: baseUrl + '/emergencyworkconfig/update',
    method: 'put',
    data
  })
)
export const customSaveEmergencyworkconfig = (data) => (
  request({
    url: baseUrl + '/emergencyworkconfig/customSave',
    method: 'post',
    data
  })
)
export const customUpdateEmergencyworkconfig = (data) => (
  request({
    url: baseUrl + '/emergencyworkconfig/customUpdate',
    method: 'put',
    data
  })
)

export const defaultConfig = (id) => (
  request({
    url: baseUrl + '/emergencyworkconfig/defaulConfig/' + id,
    method: 'get'
  })
)

export const detailsConfig = (data) => (
  request({
    url: baseUrl + '/emergencyworkconfig/' + data,
    method: 'get'
  })
)
