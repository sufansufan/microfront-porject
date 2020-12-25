import request from '../config/axios'
const baseUrl = '/deviceordermanager'

// 采购订单-列表查询
export const queryOrderList = (data) => (
  request({
    url: baseUrl + '/deviceorder/page/supply',
    method: 'post',
    data
  })
)

// 采购订单-确认收款
export const confirmCollection = (data, id) => (
  request({
    url: baseUrl + '/deviceorderschedule/confirmCollection/' + id,
    method: 'post',
    data
  })
)

// 采购订单-确认收货
export const confirmGoods = (data, id) => (
  request({
    url: baseUrl + '/deviceorderschedule/confirmReceived/' + id,
    method: 'post',
    data
  })
)

// 采购订单-开票
export const makeInvoice = (data, id) => (
  request({
    url: baseUrl + '/deviceorderschedule/makeInvoice/' + id,
    method: 'post',
    data
  })
)
// 采购订单-获取订单信息
export const queryOrderInfo = (id) => (
  request({
    url: baseUrl + '/deviceorder/get/' + id,
    method: 'get'
  })
)

// 采购订单-获取发货单信息
export const queryGoodsInfo = (id) => (
  request({
    url: baseUrl + '/devicedeliverylist/get/' + id,
    method: 'get'
  })
)

// 采购订单-保存设备发货单
export const saveInvoice = (data) => (
  request({
    url: baseUrl + '/devicedeliverylist/save',
    method: 'post',
    data
  })
)

// 采购订单-保存并新增发货单
export const saveConfigInvoice = (data) => (
  request({
    url: baseUrl + '/devicedeliverylist/confirmDelivery',
    method: 'post',
    data
  })
)

// 采购订单-根据订单编号获取数据
export const queryorderNumberInfo = (id) => (
  request({
    url: baseUrl + '/deviceorder/getByOrderNumber/' + id,
    method: 'get'
  })
)

// 采购订单-根据订单编号获取发货单
export const queryorderNumberGoods = (id) => (
  request({
    url: baseUrl + '/devicedeliverylist/getByOrderNumber/' + id,
    method: 'get'
  })
)
// 采购订单-导出发货单
export const exportInvoice = (id) => (
  request({
    url: baseUrl + '/export/exportDeliveryList/' + id,
    method: 'get'
  })
)
// 采购订单-导出装箱单
export const exportPacking = (id) => (
  request({
    url: baseUrl + '/export/exportPackingList/' + id,
    method: 'get'
  })
)
// 采购订单-关闭订单
export const closeOrder = (data, id) => (
  request({
    url: baseUrl + '/deviceorderschedule/closeOrder/' + id,
    method: 'post',
    data
  })
)

// 配合
export const getCoordination = (id) => (
  request({
    url: baseUrl + '/deviceorder/getDistribution/' + id,
    method: 'post'
  })
)

// 下载说明书
export const instructionsLoad = (data) => (
  request({
    url: baseUrl + '/download/file',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
)

// 校验校验是否存在非已关闭
export const checkOrderByCataloguesId = (id) => (
  request({
    url: baseUrl + '/deviceorder/getOrderByCataloguesId/' + id,
    method: 'get'
  })
)
