import request from '../config/axios'
const baseUrl = '/os-platform/platform/company'

// 经销商管理-查询经销商列表
export const getDistributorList = (data) => (
  request({
    url: baseUrl + '/getDealerPage',
    method: 'post',
    data
  })
)

// 经销商管理-修改经销商信息
export const upDateDistributor = (data, id) => (
  request({
    url: baseUrl + '/update/' + id,
    method: 'put',
    data
  })
)

// 新增经销商
export const addDistributor = (data) => (
  request({
    url: baseUrl + '/save',
    method: 'post',
    data
  })
)

// 删除经销商
export const deleteDistributor = (id) => (
  request({
    url: baseUrl + '/delete/' + id,
    method: 'delete'
  })
)

// 经销商-获取区域划分
export const getDistributorArea = (id) => (
  request({
    url: baseUrl + '/findCompanyDivideArea/' + id,
    method: 'get'
  })
)

// 注册服务管理-查询列表
export const getEnterpriseList = (data) => (
  request({
    url: baseUrl + '/getCustomerPage',
    method: 'post',
    data
  })
)

// 联系人管理-所属客户
export const getCustomerList = (data) => (
  request({
    url: baseUrl + '/getCustomerList',
    method: 'post',
    data
  })
)

// 运营平台-客户管理-jdy-查询列表
export const getCustomerTableList = (data) => (
  request({
    url: baseUrl + '/getCustomerPage',
    method: 'post',
    data
  })
)

export const getCompanyInfo = (id) => (
  request({
    url: baseUrl + '/getById/' + id,
    method: 'get'
  })
)

// 运营平台-客户管理-分配负责人
export const assignPersonJdy = (data) => (
  request({
    url: baseUrl + '/assignPerson',
    method: 'post',
    data
  })
)
