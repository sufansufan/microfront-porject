import request from '../config/axios'
const baseUrl = '/cooperativeunit/provideunitbank'
// 添加提供给其他单位的银行账户信息
export const provideunitbank = (data) => (
  request({
    url: baseUrl + '/save',
    method: 'post',
    data
  })
)
// 获取 提供给其他单位的银行账户信息
export const getProvide = (id) => (
  request({
    url: baseUrl + '/' + id,
    method: 'get'
  })
)
// 修改 提供给其他单位的银行账户信息
export const editProvide = (data) => (
  request({
    url: baseUrl + '/edit',
    method: 'put',
    data
  })
)
// 删除 提供给其他单位的银行账户信息
export const deleteProvide = (id) => (
  request({
    url: baseUrl + '/' + id,
    method: 'delete'
  })
)
// 提供给其他单位的银行账户信息集合--通过操作记录获取
export const listByOperateinfoId = (operateinfoId, word, flag) => (
  request({
    url: baseUrl + '/listByOperateinfoId/' + operateinfoId + '/' + word + '/' + flag,
    method: 'get'
  })
)

// 批量保存银行信息接口
export const saveList = (data) => (
  request({
    url: baseUrl + '/saveList',
    method: 'post',
    data
  })
)
