import request from '../config/axios'
const baseUrl = '/companyregister/register'

// 运营平台-注册服务-列表查询
export const getEnterpriseList = (data) => (
  request({
    url: baseUrl + '/list',
    method: 'post',
    data
  })
)
