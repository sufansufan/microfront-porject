import request from './config/axios'
const baseUrl = '/authresource/role'

// 应用授权 -- 基础角色
export const getNotPage = (data) => (
  request({
    url: baseUrl + '/getNotPage',
    method: 'post',
    data
  })
)
