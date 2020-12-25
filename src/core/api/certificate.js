import request from './config/axios'
const baseUrl = '/platform'

// 应用授权 -员工管理-持证信息- 通过用户id查询个人证书集合
export const getListByUserId = (userId) => (
  request({
    url: baseUrl + '/certificate/listByUserId/' + userId,
    method: 'get'
  })
)

// 应用授权 -员工管理-持证信息- 保存个人证书
export const saveCertificate = (data) => (
  request({
    url: baseUrl + '/certificate/save',
    method: 'post',
    data
  })
)

// 应用授权 -员工管理-持证信息- 修改个人证书
export const updateCertificate = (data) => (
  request({
    url: baseUrl + '/certificate/update',
    method: 'put',
    data
  })
)

// 应用授权 -员工管理-持证信息- 删除个人证书
export const deleteCertificate = (id) => (
  request({
    url: baseUrl + '/certificate/' + id,
    method: 'delete'
  })
)
