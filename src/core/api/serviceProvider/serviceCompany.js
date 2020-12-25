import request from '../config/axios'
const baseUrl = '/productpublish/servicecompany'
import { getProdTwoName } from '@core/utils'
// 服务商管理-添加服务商
export const saveService = (data) => (
  request({
    url: baseUrl + '/save',
    method: 'post',
    data
  })
)
// 服务商管理-修改服务商
export const editService = (data) => (
  request({
    url: baseUrl + '/edit',
    method: 'put',
    data
  })
)
// 服务商管理-服务商集合
export const serviceList = (data) => (
  request({
    url: baseUrl + '/list',
    method: 'post',
    data
  })
)
// 服务商管理-服务商获取
export const getServiceId = (id) => (
  request({
    url: baseUrl + '/get/' + id,
    method: 'get'
  })
)
// 服务商管理-服务商删除
export const deleteService = (id) => (
  request({
    url: baseUrl + '/' + id,
    method: 'delete'
  })
)
// 服务商管理-服务商导出
export const exportService = (data) => (
  request({
    url: baseUrl + '/export',
    method: 'post',
    data
  })
)
// 服务商管理 检查企业信息
export const checkExcel = getProdTwoName() + baseUrl + '/checkExcel'
// 服务商管理-插入excel的数据
export const importService = (data) => (
  request({
    url: baseUrl + '/insertExcelData',
    method: 'post',
    data
  })
)
// 服务商管理-服务商授权
export const changeStatus = (id, status) => (
  request({
    url: baseUrl + '/changeStatus/' + id + '/' + status,
    method: 'put'
  })
)
// 检验唯一性
export const validateUnique = (data) => (
  request({
    url: baseUrl + '/validateUnique',
    method: 'post',
    data
  })
)
