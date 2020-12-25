import request from '../config/axios'
const baseUrl = '/auditmanage/accessAuthorization'

// 审计管理-访问授权-查询列表
export const getTableList = (data) => (
  request({
    url: baseUrl + '/page',
    method: 'post',
    data
  })
)

// 审计管理-访问授权-查询日志
export const getLogs = (data) => (
  request({
    url: baseUrl + '/logs',
    method: 'post',
    data
  })
)

// 审计管理-访问授权-认领任务
export const taskClaim = (data) => (
  request({
    url: baseUrl + '/claim',
    method: 'post',
    data
  })
)

// 审计管理-访问授权-转交任务
export const taskHandover = (data) => (
  request({
    url: baseUrl + '/handover',
    method: 'post',
    data
  })
)

// 审计管理-访问授权-处理任务
export const taskHandle = (data) => (
  request({
    url: baseUrl + '/handle',
    method: 'post',
    data
  })
)

// 审计管理-访问授权-申请权限
export const applyForRights = (data) => (
  request({
    url: baseUrl + '/applyForRights',
    method: 'post',
    data
  })
)

// 审计管理-访问授权-授予权限
export const grantForRights = (data) => (
  request({
    url: baseUrl + '/grantForRights',
    method: 'post',
    data
  })
)

// 审计管理-访问授权-访问数据库
export const accessDB = (data) => (
  request({
    url: baseUrl + '/accessDB',
    method: 'post',
    data
  })
)

// 审计管理-访问授权-执行SQL
export const sqlExecute = (data) => (
  request({
    url: baseUrl + '/sqlExecute',
    method: 'post',
    data
  })
)
