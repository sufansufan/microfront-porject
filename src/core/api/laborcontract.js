import request from './config/axios'
const baseUrl = '/organization/laborcontract'

// 组织架构-员工管理-员工详情-合同管理集合,不分页接口
export const contractList = (personnelId) => (
  request({
    url: baseUrl + '/list/' + personnelId,
    method: 'get'
  })
)

// 组织架构-员工管理-员工详情-员工合同添加接口
export const saveContract = (data) => (
  request({
    url: baseUrl + '/save',
    method: 'post',
    data
  })
)

// 组织架构-员工管理-员工详情-员工合同修改接口
export const updateContract = (data, id) => (
  request({
    url: baseUrl + '/put/' + id,
    method: 'put',
    data
  })
)

// 组织架构-员工管理-员工详情-员工合同修改接口
export const deleteContract = (id) => (
  request({
    url: baseUrl + '/delete/' + id,
    method: 'delete'
  })
)

// 组织架构-员工管理-合同模块的参数校验
export const verificationlaborcontract = (data) => (
  request({
    url: baseUrl + '/verificationlaborcontract',
    method: 'post',
    data
  })
)
