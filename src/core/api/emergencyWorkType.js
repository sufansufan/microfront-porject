import request from './config/axios'

const baseUrl = '/platform'

// 紧急任务
export const addEmergencyworktype = (data) => (
  request({
    url: baseUrl + '/emergencyworktype/save',
    method: 'post',
    data
  })
)

export const updateEmergencyworktype = (data) => (
  request({
    url: baseUrl + '/emergencyworktype/update',
    method: 'put',
    data
  })
)

export const getEmergencyworktype = (data) => (
  request({
    url: baseUrl + '/emergencyworktype/list',
    method: 'post',
    data
  })
)

export const deleteEmergencyworktypeMessage = (id) => (
  request({
    url: baseUrl + '/emergencyworktype/' + id,
    method: 'delete'
  })
)
export const deleteeMessage = (id) => (
  request({
    url: baseUrl + '/emergencyworktype/message/' + id,
    method: 'delete'
  })
)

export const saveEmergencyworktype = (id, data) => (
  request({
    url: baseUrl + '/emergencyworktype/' + id,
    method: 'get',
    data
  })
)
export const detailsType = (id) => (
  request({
    url: baseUrl + '/emergencyworktype/' + id,
    method: 'get'
  })
)
