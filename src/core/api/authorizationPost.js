import request from './config/axios'
const baseUrl = '/organization/authorizationpost'

// 应用授权 -- 岗位列表
export const getList = (data) => (
  request({
    url: baseUrl + '/list',
    method: 'post',
    data
  })
)
// 根据角色获取权限
export const getRoleId = (id) => (
  request({
    url: baseUrl + '/get/' + id,
    method: 'get'
  })
)

// 角色管理-删除角色
export const deleteRole = (id) => (
  request({
    url: baseUrl + '/deleteRole/' + id,
    method: 'delete'
  })
)

// 系统管理-应用授权-设置权限
export const savePower = (data) => (
  request({
    url: baseUrl + '/save',
    method: 'post',
    data
  })
)

// 系统管理-应用授权-获取单条数据
export const getSingData = (id, appId) => (
  request({
    url: baseUrl + '/get/' + id + '/' + appId,
    method: 'get'
  })
)

// 系统管理-应用授权-修改
export const updatePower = (data, id) => (
  request({
    url: baseUrl + '/put/' + id,
    method: 'put',
    data
  })
)

//  系统管理-应用授权-删除
export const deletePostPower = (id) => (
  request({
    url: baseUrl + '/delete/' + id,
    method: 'delete'
  })
)
