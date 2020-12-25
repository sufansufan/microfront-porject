import request from '../config/axios'
import { getProdTwoName } from '@core/utils'
const baseUrl = '/cooperativeunit/companyinfo'

// 合作企业添加企业
export const saveBusiness = (data) => (
  request({
    url: baseUrl + '/save',
    method: 'post',
    data
  })
)
// 修改企业
export const updateBusiness = (data) => (
  request({
    url: baseUrl + '/update',
    method: 'put',
    data
  })
)
// 删除企业
export const deleteBusiness = (data) => (
  request({
    url: baseUrl + '/delete',
    method: 'delete',
    data
  })
)
// 获取企业列表
export const getBusinessList = (data) => (
  request({
    url: baseUrl + '/list',
    method: 'post',
    data
  })
)
// 恢复企业
export const returnBusiness = (data) => (
  request({
    url: baseUrl + '/recover',
    method: 'post',
    data
  })
)
// 停用企业
export const stopBusiness = (data) => (
  request({
    url: baseUrl + '/stopUse',
    method: 'post',
    data
  })
)
// 查看企业信息
export const seeBusiness = (id) => (
  request({
    url: baseUrl + '/getById/' + id,
    method: 'get'
  })
)
// 查询 一个企业 是否在 存在于 合作企业中
export const isExist = (informationCode, organizationId) => (
  request({
    url: baseUrl + '/isExist/' + informationCode + '/' + organizationId,
    method: 'get'
  })
)
// 导入确定
export const importExcel = (data) => (
  request({
    url: baseUrl + '/importExcel',
    method: 'post',
    data
  })
)

// 检查企业信息
export const checkExcel = getProdTwoName() + baseUrl + '/checkExcel'
