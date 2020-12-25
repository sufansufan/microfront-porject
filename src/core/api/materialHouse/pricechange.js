import request from '../config/axios'
const baseUrl = '/productpublish/pricechange'
// 材料信息 价格调整集合
export const priceChangeList = (data) => (
  request({
    url: baseUrl + '/list',
    method: 'post',
    data
  })
)
// 材料信息 添加价格调整
export const savePrice = (data) => (
  request({
    url: baseUrl + '/save',
    method: 'post',
    data
  })
)
