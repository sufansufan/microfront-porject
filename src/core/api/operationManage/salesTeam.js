import request from '../config/axios'
const baseUrl = '/os-market/salesTeam'

// 运营平台-销售团队-查询销售团队域树形结构
export const getsalesTree = (data) => (
  request({
    url: baseUrl + '/getTree',
    method: 'post',
    data
  })
)

// 运营平台-销售团队-查询销售团队列表
export const tableList = (data) => (
  request({
    url: baseUrl + '/getPage',
    method: 'post',
    data
  })
)

// 运营平台-销售团队-新增销售团队
export const saveData = (data) => (
  request({
    url: baseUrl + '/save',
    method: 'post',
    data
  })
)

// 运营平台-销售团队-修改销售团队
export const updateData = (data, id) => (
  request({
    url: baseUrl + '/' + id,
    method: 'put',
    data
  })
)

// 运营平台-销售团队-删除销售团队
export const deleteData = (id) => (
  request({
    url: baseUrl + '/' + id,
    method: 'delete'
  })
)

// 运营平台-销售团队-查询区域划分
export const queryDivideArea = (id) => (
  request({
    url: baseUrl + '/findSalesTeamDivideArea/' + id,
    method: 'get'
  })
)

// 运营平台-销售团队-分配人员
export const assignPerson = (data) => (
  request({
    url: baseUrl + '/assignPerson',
    method: 'post',
    data
  })
)
