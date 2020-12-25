import request from '../config/axios'
const baseUrl = '/company/company'

// 运营平台-客户管理-获取公司信息
export const getCompanyInfo = (id) => (
  request({
    url: baseUrl + '/get/' + id,
    method: 'get'
  })
)

// 运营平台-客户管理-修改公司信息
export const updateCompanyInfo = (data, id) => (
  request({
    url: baseUrl + '/update/' + id,
    method: 'put',
    data
  })
)

// 运营平台-客户管理-获取所属经销商
export const geteCompanyNotPage = (data) => (
  request({
    url: baseUrl + '/geteCompanyNotPage',
    method: 'post',
    data
  })
)

// 运营平台-客户管理-获取所属经销商
export const findByCompanyNameLike = (companyName) => (
    request({
        url: baseUrl + '/findByCompanyNameLike/'+companyName,
        method: 'get'
    })
)

// 运营平台-客户管理-获取所属经销商
export const findAllCompany = () => (
    request({
        url: baseUrl + '/all',
        method: 'get'
    })
)
