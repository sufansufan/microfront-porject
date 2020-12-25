import request from '../config/axios'
const baseUrl = '/os-platform/contactPerson'

// 运营平台-联系人管理-查询列表
export const getTableList = (data) => (
  request({
    url: baseUrl + '/getPage',
    method: 'post',
    data
  })
)

// 运营平台-联系人管理-删除
export const deleteData = (id) => (
  request({
    url: baseUrl + '/' + id,
    method: 'delete'
  })
)

// 运营平台-联系人管理-新增
export const contactAdd = (data) => (
  request({
    url: baseUrl + '/save',
    method: 'post',
    data
  })
)

// 运营平台-联系人管理-修改
export const contactUpDate = (data, id) => (
  request({
    url: baseUrl + '/' + id,
    method: 'put',
    data
  })
)

// 运营平台-联系人管理-单条数据查询
export const contactOneData = (id) => (
  request({
    url: baseUrl + '/' + id,
    method: 'get'
  })
)
