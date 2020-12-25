import request from '../config/axios'
const baseUrl = '/os-platform/bankAccount'

// 运营平台-银行信息-查询列表
export const getTableList = (data) => (
  request({
    url: baseUrl + '/getPage',
    method: 'post',
    data
  })
)

// 运营平台-银行信息-添加
export const bankSave = (data) => (
  request({
    url: baseUrl + '/save',
    method: 'post',
    data
  })
)

// 运营平台-银行信息-修改
export const bankUpdate = (data, id) => (
  request({
    url: baseUrl + '/' + id,
    method: 'put',
    data
  })
)

// 运营平台-银行信息-删除
export const tableDelete = (id) => (
  request({
    url: baseUrl + '/' + id,
    method: 'delete'
  })
)

// 运营平台-银行信息-改变状态

export const changeBankState = (data) => (
  request({
    url: baseUrl + '/updateState',
    method: 'post',
    data
  })
)
