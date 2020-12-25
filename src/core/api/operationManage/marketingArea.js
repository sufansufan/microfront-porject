import request from '../config/axios'
const baseUrl = '/os-platform/marketingArea'

// 运营平台-jdy-营销区域-查询营销区域树形结构
export const getMarketList = (data) => (
  request({
    url: baseUrl + '/tree',
    method: 'post',
    data
  })
)

// 运营平台-jdy-营销区域-table
export const getTableList = (data) => (
  request({
    url: baseUrl + '/getPage',
    method: 'post',
    data
  })
)

// 运营平台-jdy-营销区域-新增
export const tableSave = (data) => (
  request({
    url: baseUrl + '/save',
    method: 'post',
    data
  })
)

// 运营平台-jdy-营销区域-修改
export const tableUpdate = (data, id) => (
  request({
    url: baseUrl + '/' + id,
    method: 'put',
    data
  })
)

// 运营平台-jdy-营销区域-删除
export const tableDelete = (id) => (
  request({
    url: baseUrl + '/' + id,
    method: 'delete'
  })
)
