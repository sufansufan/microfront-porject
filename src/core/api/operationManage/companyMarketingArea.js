import request from '../config/axios'
const baseUrl = '/os-platform/companyMarketingArea'

// 经销商管理-划分区域批量保存
export const saveBatch = (data) => (
  request({
    url: baseUrl + '/saveBatch',
    method: 'post',
    data
  })
)
