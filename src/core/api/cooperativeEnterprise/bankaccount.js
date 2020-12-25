import request from '../config/axios'
const baseUrl = '/cooperativeunit/bankaccount'
// 合作企业添加银行账户
export const saveBank = (data) => (
  request({
    url: baseUrl + '/save',
    method: 'post',
    data
  })
)
// 修改银行账户
export const updateBank = (data) => (
  request({
    url: baseUrl + '/update',
    method: 'post',
    data
  })
)
// 删除银行账户
export const deleteBank = (id) => (
  request({
    url: baseUrl + '/' + id,
    method: 'delete'
  })
)
// 获取银行账户集合
export const getBankList = (unitId, state, result) => (
  request({
    url: baseUrl + '/list/' + unitId + '/' + state + '/' + result,
    method: 'post'
  })
)
// 恢复银行账户
export const returnBank = (id) => (
  request({
    url: baseUrl + '/recover/' + id,
    method: 'put'
  })
)
// 停用银行账户
export const stopBank = (id) => (
  request({
    url: baseUrl + '/stopUse/' + id,
    method: 'put'

  })
)
// 查看银行账户信息
export const seeBank = (id) => (
  request({
    url: baseUrl + '/' + id,
    method: 'get'
  })
)
