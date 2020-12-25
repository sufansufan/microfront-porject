import request from '../config/axios'
const baseUrl = '/productpublish/product'
import { getProdTwoName } from '@core/utils'

// 材料信息 检验唯一性
export const validateUnique = (data) => (
  request({
    url: baseUrl + '/validateUnique',
    method: 'post',
    data
  })
)
// 材料信息 产品集合
export const productList = (data) => (
  request({
    url: baseUrl + '/list',
    method: 'post',
    data
  })
)
// 材料信息 产品发布
export const changeStatus = (data) => (
  request({
    url: baseUrl + '/publish',
    method: 'put',
    data
  })
)
// 材料信息 产品-停产
export const productStop = (data) => (
  request({
    url: baseUrl + '/stop',
    method: 'put',
    data
  })
)
// 材料信息 excel-检查
export const checkExcel = getProdTwoName() + baseUrl + '/checkExcel'
// 材料信息 产品删除
export const productDelete = (data) => (
  request({
    url: baseUrl + '/delete',
    method: 'delete',
    data
  })
)
// 材料信息 产品修改
export const productEdit = (data) => (
  request({
    url: baseUrl + '/edit',
    method: 'put',
    data
  })
)
// 材料信息-excel-导出
export const exportProduct = (data) => (
  request({
    url: baseUrl + '/export',
    method: 'post',
    data
  })
)
// 材料信息 产品获取DTO
export const getProductId = (id) => (
  request({
    url: baseUrl + '/getVO/' + id,
    method: 'get'
  })
)
// 材料信息-excel-插入数据
export const importProduct = (data) => (
  request({
    url: baseUrl + '/insertExcelDate',
    method: 'post',
    data
  })
)
// 材料信息-添加产品
export const productSave = (data) => (
  request({
    url: baseUrl + '/save',
    method: 'post',
    data
  })
)
// 材料信息-产品下架
export const productNoUse = (data, reason) => (
  request({
    url: baseUrl + '/notUse/' + reason,
    method: 'put',
    data
  })
)

// 材料信息-同步产品图片
export const syncProductImg = (id) => (
  request({
    url: baseUrl + '/synchronizeImg/' + id,
    method: 'put'
  })
)

// 材料信息-修改价格
export const pricesChangeBlur = (id, price) => (
  request({
    url: baseUrl + '/changePrice/' + id + '/' + price,
    method: 'put'
  })
)

// 保存富文本
export const saveTinymceInfo = (data) => (
  request({
    url: baseUrl + '/editProductDesc',
    method: 'put',
    data
  })
)

// 产品发布
export const productPublish = (data) => (
  request({
    url: baseUrl + '/publish',
    method: 'put',
    data
  })
)

// 查询是否有上一个或者下一个
export const checkPreviousAndNext = (data, id) => (
  request({
    url: baseUrl + '/check/' + id,
    method: 'post',
    data
  })
)

// 上一个
export const previous = (data, id) => (
  request({
    url: baseUrl + '/getBeforeVO/' + id,
    method: 'post',
    data
  })
)

// 下一个
export const next = (data, id) => (
  request({
    url: baseUrl + '/getAfterVO/' + id,
    method: 'post',
    data
  })
)

// 区块链账本历史
export const blockchainBookHistory = (id) => (
  request({
    url: baseUrl + '/blockLink/' + id,
    method: 'get'
  })
)
