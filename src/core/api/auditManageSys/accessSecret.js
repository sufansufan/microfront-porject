import request from '../config/axios'
const baseUrl = '/auditmanage/accessSecret'

// 审计管理-访问密钥-查询列表
export const getTableList = (data) => (
  request({
    url: baseUrl + '/page',
    method: 'post',
    data
  })
)
// 审计管理-访问密钥-创建密钥
export const addSecret = (data) => (
  request({
    url: baseUrl + '/',
    method: 'post',
    data
  })
)

// 审计管理-访问密钥-删除密钥
export const deleteSecret = (id) => (
  request({
    url: baseUrl + '/' + id,
    method: 'post'
  })
)
