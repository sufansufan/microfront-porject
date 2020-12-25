import request from './config/axios'
const baseUrl = '/organization/personnelpost'

// 组织架构-员工管理-员工详情-任职详情接口
export const getEmployeePost = (data, id) => (
  request({
    url: baseUrl + '/get/' + id,
    method: 'get',
    data
  })
)

// 组织架构-员工管理-员工详情-添加员工任职
export const saveEmployeePost = (data) => (
  request({
    url: baseUrl + '/save',
    method: 'post',
    data
  })
)

// 组织架构-员工管理-员工详情-员工任职修改接口
export const updateEmployeePost = (data, id) => (
  request({
    url: baseUrl + '/put/' + id,
    method: 'put',
    data
  })
)

// 组织架构-员工管理-员工详情-员工任职管理集合
export const getPostList = (personnelId) => (
  request({
    url: baseUrl + '/list/' + personnelId,
    method: 'get'
  })
)

// 组织架构-员工管理-员工详情-设置主岗接口
export const updateMainPost = (id) => (
  request({
    url: baseUrl + '/updateMainPost/' + id,
    method: 'get'
  })
)

// 组织架构-员工管理-员工详情-员工任职删除接口
export const deletePersonnelpost = (id) => (
  request({
    url: baseUrl + '/delete/' + id,
    method: 'delete'
  })
)

// 组织架构-员工管理-任职信息-添加任职信息-任职岗位唯一校验
export const validationPostUnique = (personnelId, postId, orgId, id) => (
  request({
    url: baseUrl + '/validationPostUnique/' + personnelId + '/' + postId + '/' + orgId + '?id=' + id,
    method: 'get'
  })
)
