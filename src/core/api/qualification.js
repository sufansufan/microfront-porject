import request from './config/axios'
const baseUrl = '/platform'

// 组织架构-组织管理-添加证书
export const addCertificate = (data) => (
  request({
    url: baseUrl + '/qualification/saveOgCertificate',
    method: 'post',
    data
  })
)
// 组织架构-组织管理-添加资质
export const addQualifications = (data) => (
  request({
    url: baseUrl + '/qualification/saveQualification',
    method: 'post',
    data
  })
)
// 组织架构-组织管理-删除资质或证书
export const delQualification = (id) => (
  request({
    url: baseUrl + '/qualification/' + id,
    method: 'delete'
  })
)
// 组织架构-组织管理-资质和证书获取
export const getQualification = (id) => (
  request({
    url: baseUrl + '/qualification/' + id,
    method: 'get'
  })
)
// 组织架构-组织管理-更新组织证书
export const updateOgCertificate = (data) => (
  request({
    url: baseUrl + '/qualification/updateOgCertificate',
    method: 'put',
    data
  })
)
// 组织架构-组织管理-更新资质
export const updateQualification = (data) => (
  request({
    url: baseUrl + '/qualification/updateQualification',
    method: 'put',
    data
  })
)
// 组织架构-组织管理-通过组织id查询资质和证书集合
export const getQuaCer = (data, organizationId) => (
  request({
    url: baseUrl + '/qualification/listByOrganizationId/' + organizationId,
    method: 'post',
    data
  })
)
// 组织架构-组织管理-证书编号唯一性校验
export const checkUnique = (data) => (
  request({
    url: baseUrl + '/qualification/checkUnique',
    method: 'post',
    data
  })
)

