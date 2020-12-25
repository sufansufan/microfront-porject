import request from '../config/axios'
const baseUrl = '/os-market/market/company'

// 经销商管理-划分区域批量保存
export const getCustomerPage = (data) => (
  request({
    url: baseUrl + '/getCustomerPage',
    method: 'post',
    data
  })
)

// 分配负责人
export const assignPerson = (data) => (
  request({
    url: baseUrl + '/assignPerson',
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
