import request from './config/axios'
const baseUrl = '/organization/organization'
import { getProdTwoName } from '@core/utils'
// 岗位管理-全部组织
export const getAllUnit = (data) => (
  request({
    url: baseUrl + '/findAllOrganization',
    method: 'get'
  })
)

// 组织架构-组织管理
//  左侧树
export const getOrgTree = (data) => (
  request({
    url: baseUrl + '/getTree',
    method: 'post',
    data
  })
)

// 获取table-list
export const getOrgList = (data) => (
  request({
    url: baseUrl + '/list',
    method: 'post',
    data
  })
)

// 员工管理-组织树结构
export const getTree = (data) => (
  request({
    url: baseUrl + '/getTree',
    method: 'post',
    data
  })
)

// 获取上级组织
export const getAllOrganization = (data) => (
  request({
    url: baseUrl + '/getAllOrganization',
    method: 'get'
  })
)
// 添加组织
export const saveOrganization = (data) => (
  request({
    url: baseUrl + '/save',
    method: 'post',
    data
  })
)
// 修改组织
export const editOrganization = (data, id) => (
  request({
    url: baseUrl + '/put/' + id,
    method: 'put',
    data
  })
)
// 删除组织
export const delOrganization = (id) => (
  request({
    url: baseUrl + '/delete/' + id,
    method: 'delete'
  })
)
// 组织详情
export const detailsOrg = (id) => (
  request({
    url: baseUrl + '/get/' + id,
    method: 'get'
  })
)
// 组织停用
export const stopOrg = (id) => (
  request({
    url: baseUrl + '/updateUnavailable/' + id,
    method: 'get'
  })
)
// 组织恢复
export const returnOrg = (id) => (
  request({
    url: baseUrl + '/updateAvailable/' + id,
    method: 'get'
  })
)
// 指定负责人
export const assignOrg = (data) => (
  request({
    url: baseUrl + '/updateChargePerson',
    method: 'post',
    data
  })
)
// 获取当前登录人的归属单位
export const getOrganization = (data) => (
  request({
    url: baseUrl + '/findByPersonnelId',
    method: 'get',
    data
  })
)
// 获取当前人的所在组织的公司，分公司信息
export const getCompany = (data) => (
  request({
    url: baseUrl + '/findOrganizationFatherAndSonDTOByPersonnelId',
    method: 'get',
    data
  })
)

// 获取登录页面的用户的企业名称
export const geteCompanyLoginName = () => (
  request({
    url: baseUrl + '/getCompanyInfo',
    method: 'get'
  })
)

// 获取归属单位列表
export const getAttributionUnit = () => (
  request({
    url: baseUrl + '/getCurrentUserOrganization',
    method: 'get'
  })
)

// 导出
export const orgExport = (data) => (
  request({
    url: baseUrl + '/exportOrganizationInfo',
    method: 'post',
    data
  })
)

// 组织导入前验证
export const orgImportVai = getProdTwoName() + baseUrl + '/validationData'

// 导入
export const orgImport = (data) => (
  request({
    url: baseUrl + '/saveImport',
    method: 'post',
    data
  })
)
// 校验新增组织
export const verificationOrg = (data) => (
  request({
    url: baseUrl + '/verificationOrganization',
    method: 'post',
    data
  })
)
// 获取当前登录人的任职所在组织(包含主岗和任职)
export const getUserOrg = () => (
  request({
    url: baseUrl + '/getCurrentUserOrganizationAll',
    method: 'get'
  })
)

// 获取归属单位-根据组织-获取合同归属
export const getOrganizationByBelongList = (id, params) => {
  return request({
    url: baseUrl + '/findOrganization/' + id,
    method: 'get',
    params
  })
}
