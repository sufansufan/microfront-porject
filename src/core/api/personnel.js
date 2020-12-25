import request from './config/axios'
const baseUrl = '/organization/personnel'
import { getProdTwoName } from '@core/utils'
// 组织架构-员工管理-员工列表查询接口
export const personnelList = (data) => (
  request({
    url: baseUrl + '/list',
    method: 'post',
    data
  })
)

// 组织架构-员工管理-员工添加接口
export const saveEmployee = (data) => (
  request({
    url: baseUrl + '/save',
    method: 'post',
    data
  })
)

// 组织架构-员工管理-员工修改接口
export const editEmployee = (data, id) => (
  request({
    url: baseUrl + '/put/' + id,
    method: 'put',
    data
  })
)

// 组织架构-员工管理-员工删除接口
export const deleteEmployee = (id) => (
  request({
    url: baseUrl + '/delete/' + id,
    method: 'delete'
  })
)

// 组织架构-员工管理-重置密码接口
export const updatePassword = (id) => (
  request({
    url: baseUrl + '/updatePassword/' + id,
    method: 'get'
  })
)

// 组织架构-员工管理-员工详情查询
export const employeeDetail = (id) => (
  request({
    url: baseUrl + '/get/' + id,
    method: 'get'
  })
)

// 组织架构-员工管理-导入
export const saveImport = (data) => (
  request({
    url: baseUrl + '/saveImport',
    method: 'post',
    data
  })
)

// 主框架-获取当前登录人员信息
export const getUserInfo = () => (
  request({
    url: baseUrl + '/getUserInfo',
    method: 'get'
  })
)

// 主框架-获取当前登录人员用户的按钮权限
export const getUserPower = () => (
  request({
    url: baseUrl + '/getCurrentUserpermissions',
    method: 'get'
  })
)

// 数据权限
export const getUserDataPower = () => (
  request({
    url: baseUrl + '/getCurrentDataPermissions',
    method: 'get'
  })
)

// 根据人员获取组织信息（非部门）
export const getOrg = () => (
  request({
    url: baseUrl + '/getOrganizationByUserId',
    method: 'get'
  })
)
// 根据组织获取人员(管理岗)
export const getPersonnel = () => (
  request({
    url: baseUrl + '/getPersonnelByOrgId',
    method: 'get'
  })
)
// 根据组织获取人员（不包含下级组织的人员）  //紧急任务
export const getPersonnelTask = (id) => (
  request({
    url: baseUrl + '/getPersonnelsByOrgId/' + id,
    method: 'get'
  })
)
// 修改密码
export const changePassword = (data) => (
  request({
    url: baseUrl + '/changePassword',
    method: 'post',
    data
  })
)
// 获取该组织下的所有员工
export const getAllPersonnel = (id, params) => (
  request({
    url: baseUrl + '/getPersonnelByOrgId/' + id,
    method: 'get',
    params
  })
)

// 根据当前登录人主岗所在的组织查询该组织下非离职的员工
export const getLoginPersonnel = (data) => (
  request({
    url: baseUrl + '/findPersonnelsByOrgId',
    method: 'get',
    data
  })
)

//  根据组织获取人员
export const getPersonnelsByOrgId = (id) => (
  request({
    url: baseUrl + '/findPersonnelDTOByOrgId/' + id,
    method: 'get'
  })
)
// 校验手机号
export const validateTeleUnique = (tele, data) => (
  request({
    url: baseUrl + '/validateUniqueTelephone/' + tele,
    method: 'get',
    params: data
  })
)

// 校验工号
export const validateJobNumber = (number, data) => (
  request({
    url: baseUrl + '/validateUniqueJobNumber/' + number,
    method: 'get',
    params: data
  })
)

// 校验身份证号
export const validateIdNumber = (number, data) => (
  request({
    url: baseUrl + '/validateUniqueIdNumber/' + number,
    method: 'get',
    params: data
  })
)

// 获取所有保管人
export const getCustodian = () => (
  request({
    url: baseUrl + '/findAllPersonnel',
    method: 'get'
  })
)

// 获取当前登录人员是不是只是分公司项目部成员
export const judgePersonnelProOrDep = () => (
  request({
    url: baseUrl + '/isProjectOrDepartmebt',
    method: 'get'
  })
)

// 获取当前登录人的基本信息
export const getCurrentPersonnelInfo = (id) => (
  request({
    url: baseUrl + '/getCurrentPersonnelInfoDTO/' + id,
    method: 'get'
  })
)

// 员工管理 --- 导出
export const employeeExport = (data) => (
  request({
    url: baseUrl + '/exportPersonneltInfo',
    method: 'post',
    data
  })
)

// 员工导入前验证
export const employeeImportVai = getProdTwoName() + baseUrl + '/validationData'

// 员工导入
export const employeeImport = (data) => (
  request({
    url: baseUrl + '/saveImport',
    method: 'post',
    data
  })
)

// 获取流程配置审批人 根据岗位获取人员 postId岗位id orgId 组织id orgTypeList组织类型
export const getApproverList = (data) => (
  request({
    url: baseUrl + '/findPersonnelByCondition',
    method: 'post',
    data
  })
)

