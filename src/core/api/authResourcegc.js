import request from './config/axios'
const baseUrl = '/authresource'

// 应用授权-应用
export const getNotPage = (data = { isEffective: 1, parentIdIsNull: true }) => (
  request({
    url: baseUrl + '/resource/getNotPage',
    method: 'post',
    data
  })
)

// 角色管理-获取角色列表
export const getRole = (data) => (
  request({
    url: baseUrl + '/role/getPage',
    method: 'post',
    data
  })
)

// 角色管理-根据id查询角色
export const getRoleById = (id) => (
  request({
    url: baseUrl + '/role/' + id,
    method: 'get'
  })
)

// 角色管理-新增角色
export const saveRole = (data) => (
  request({
    url: baseUrl + '/role/save',
    method: 'post',
    data
  })
)

// 角色管理-修改角色
export const editRole = (data, id) => (
  request({
    url: baseUrl + '/role/' + id,
    method: 'put',
    data
  })
)

// 应用授权-应用授权-获取多个活单个应用设置树
export const getTreeData = (data) => (
  request({
    url: baseUrl + '/resource/getAppPermissionsTreeData',
    method: 'get',
    params: data
  })
)

// 系统管理-资源管理-table查询
export const getResourceData = (data) => (
  request({
    url: baseUrl + '/resource/getTreeData ',
    method: 'post',
    data
  })
)

// 系统管理-资源管理-新增
export const addResource = (data) => (
  request({
    url: baseUrl + '/resource ',
    method: 'post',
    data
  })
)

// 系统管理-资源管理-修改
export const updateResource = (data, id) => (
  request({
    url: baseUrl + '/resource/' + id,
    method: 'put',
    data
  })
)

export const deleteResource = (id) => (
  request({
    url: baseUrl + '/resource/' + id,
    method: 'delete'
  })
)

// 系统管理-资源管理-单一查询
export const getSingleResource = (id) => (
  request({
    url: baseUrl + '/resource/' + id,
    method: 'get'
  })
)

// 系统管理-资源管理-过滤器table
export const getFilterData = (data) => (
  request({
    url: baseUrl + '/dataFilter/getNotPage',
    method: 'get',
    params: data
  })
)

// 系统管理-应用授权-获取所有应用授权树
export const getAppEmpowerTree = () => (
  request({
    url: baseUrl + '/resource/getPermissionsTreeData',
    method: 'get'
  })
)

// 系统管理-应用授权-获取单、多个应用权限设置树
export const getAppPermissionTreeData = (data) => (
  request({
    url: baseUrl + '/resource/getAppPermissionsTreeData',
    method: 'get',
    params: data
  })
)

// 应用授权-查询-不分页
export const getApproleList = (data) => (
  request({
    url: baseUrl + '/approle/list',
    method: 'post',
    data
  })
)

// 首页-应用权限
export const homeAppMenuList = (data) => (
  request({
    url: baseUrl + '/resource/getMenuResourceData',
    method: 'get'
  })
)

// 资源管理-导出脚本
export const resourceExport = (data) => (
  request({
    url: baseUrl + '/resource/export',
    method: 'post',
    data
  })
)

// 角色管理-导出脚本
export const roleExport = (data) => (
  request({
    url: baseUrl + '/role/export',
    method: 'post',
    data
  })
)

// 应用授权 -- 导出脚本
export const approleExport = (data) => (
  request({
    url: baseUrl + '/approle/export',
    method: 'post',
    data
  })
)

// 应用配置  --导出脚本
export const applicationConfigExport = (data) => (
  request({
    url: '/platform/applicationConfig/export',
    method: 'post',
    data
  })
)
// 查看应用的岗位
export const getPostroleList = (id) => (
  request({
    url: '/organization/post/findByRoleId/' + id,
    method: 'get'
  })
)
