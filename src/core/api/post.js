import request from './config/axios'
const baseUrl = '/organization/post'

// 应用授权 -- 岗位
export const getFindAll = (appid, id) => (
  request({
    url: baseUrl + '/findAll/' + appid + '/' + id,
    method: 'get'
  })
)

export const getFindByRoleId = (id) => (
  request({
    url: baseUrl + '/findByRoleId/' + id,
    method: 'get'
  })
)

// 组织架构-岗位管理-添加岗位管理
export const addPost = (data) => (
  request({
    url: baseUrl + '/save',
    method: 'post',
    data
  })
)
// 修改岗位管理
export const updatePost = (data, id) => (
  request({
    url: baseUrl + '/put/' + id,
    method: 'put',
    data
  })
)
// 删除岗位管理
export const deletePost = (id, orgType) => (
  request({
    url: baseUrl + '/delete/' + id + '/' + orgType,
    method: 'delete'

  })
)
// 岗位树集合
export const getPostTree = (data) => (
  request({
    url: baseUrl + '/getTree',
    method: 'post',
    data
  })
)
export const getTree = (data) => (
  request({
    url: baseUrl + '/getTree',
    method: 'post',
    data

  })
)
// 设置权限
export const saveAuthority = (data) => (
  request({
    url: baseUrl + '/saveAuthority',
    method: 'post',
    data
  })
)
// 获取岗位对应的所有权限
export const getPostPower = (id) => (
  request({
    url: baseUrl + '/getAllAppRole/' + id,
    method: 'get'

  })
)
// 组织架构-员工管理-添加任职信息-根据所属组织查询岗位列表
export const getPostsByOrg = (orgId) => (
  request({
    url: baseUrl + '/getPosts/' + orgId,
    method: 'get'
  })
)
export const getDetails = (id) => (
  request({
    url: baseUrl + '/get/' + id,
    method: 'get'
  })
)
export const getList = (data) => (
  request({
    url: baseUrl + '/list',
    method: 'post',
    data
  })
)
export const stopUsePost = (data) => (
  request({
    url: baseUrl + '/updateUnavailable',
    method: 'post',
    data
  })
)
export const resumePost = (id, data) => (
  request({
    url: baseUrl + '/updateAvailable/' + id,
    method: 'get',
    data
  })
)

// 组织架构-员工管理-查询条件-主岗列表
export const getAllPost = () => (
  request({
    url: baseUrl + '/findAll',
    method: 'get'
  })
)

// 组织架构-岗位管理-新增/修改-上级岗位列表
export const getprePost = (data) => (
  request({
    url: baseUrl + '/getAllPost',
    method: 'post',
    data
  })
)
// 组织架构-岗位管理-校验新增岗位
export const verificationPost = (data) => (
  request({
    url: baseUrl + '/verificationPost',
    method: 'post',
    data
  })
)

// 应用授权 -- 岗位
export const getFindAllDaily = () => (
  request({
    url: baseUrl + '/findAll',
    method: 'get'
  })
)

export const getByCondition = (data) => (
  request({
    url: baseUrl + '/findPostByCondition',
    method: 'post',
    data
  })
)
