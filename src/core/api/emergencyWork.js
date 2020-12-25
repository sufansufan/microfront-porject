import request from './config/axios'

const baseUrl = '/platform'
// 紧急任务获取
export const getEmergencywork = (id) => (
  request({
    url: baseUrl + '/emergencywork/' + id,
    method: 'get'
  })
)
// 紧急任务删除
export const deleteTask = (data) => (
  request({
    url: baseUrl + '/emergencywork/delete',
    method: 'delete',
    data
  })
)
// 紧急任务集合
export const getList = (data) => (
  request({
    url: baseUrl + '/emergencywork/list',
    method: 'post',
    data
  })
)
// 紧急任务置顶
export const setTop = (id, operateType) => (
  request({
    url: baseUrl + '/emergencywork/setTop/' + id + '/' + operateType,
    method: 'put'
  })
)
// 标记---紧急任务的已处理/系统消息的已读
export const Handled = (data) => (
  request({
    url: baseUrl + '/emergencywork/dealById',
    method: 'put',
    data
  })
)

// 紧急任务标记为已读通过业务id
export const dealByServiceId = (serviceId, taskTypeId) => (
  request({
    url: baseUrl + '/emergencywork/dealByServiceId/' + serviceId + '/' + taskTypeId,
    method: 'put'
  })
)
// 紧急任务取消置顶
export const NotSetTop = (data) => (
  request({
    url: baseUrl + '/emergencywork/notSetTop',
    method: 'put',
    data
  })
)
