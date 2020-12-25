import request from '../config/axios'
const baseUrl = '/cooperativeunit/export'
// 导出银行账户信息
export const exportBank = (id) => (
  request({
    url: baseUrl + '/exportBankAccountInfo/' + id,
    method: 'get'
  })
)
// 导出合作企业信息
export const exportCompanyInfo = (data) => (
  request({
    url: baseUrl + '/exportCompanyInfo',
    method: 'post',
    data
  })
)
