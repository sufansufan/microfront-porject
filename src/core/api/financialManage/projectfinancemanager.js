// 项目财务综合管理
import request from '../config/axios'
const baseUrl = '/projectfinancemanager'

// 项目收支台账列表
export const projectAccountList = (data) => (
  request({
    url: baseUrl + '/projectaccount/page',
    method: 'post',
    data
  })
)

// 项目收支台账列表
export const projectAccountSummary = (data) => (
  request({
    url: baseUrl + '/projectaccount/summary',
    method: 'post',
    data
  })
)

// 项目收支台账成本会计
export const setCostAccounting = (data) => (
  request({
    url: baseUrl + '/projectaccount/assignAccountant',
    method: 'post',
    data
  })
)

// 项目收支台账列表 - 详情
export const getProjectDetails = (id) => (
  request({
    url: baseUrl + '/projectaccount/get/' + id,
    method: 'get'
  })
)

// 项目收支台账详情--成本
export const getCost = (contractId, paymentType) => (
  request({
    url: baseUrl + `/projectaccount/getCost/${contractId}/${paymentType}`,
    method: 'get'
  })
)

// 财务设置获取
export const getConfig = (id) => (
  request({
    url: baseUrl + '/financialconfig/get/' + id,
    method: 'get'
  })
)

// 财务设置
export const setConfig = (data) => (
  request({
    url: baseUrl + '/financialconfig/save',
    method: 'post',
    data
  })
)

// 项目结清
export const settle = (id, data) => (
  request({
    url: baseUrl + '/projectaccount/settle/' + id,
    method: 'put',
    data
  })
)

// 撤销结清
export const settleCancel = (id) => (
  request({
    url: baseUrl + '/projectaccount/cancelSettle/' + id,
    method: 'put'
  })
)

// 开票明细列表
export const billingdetailList = (data) => (
  request({
    url: baseUrl + '/billingdetail/page',
    method: 'post',
    data
  })
)

// 开票明细列表 -不分页
export const billingNopage = (data) => (
  request({
    url: baseUrl + '/billingdetail/list',
    method: 'post',
    data
  })
)

// 开票明细新增
export const billingdetailAdd = (data) => (
  request({
    url: baseUrl + '/billingdetail/save',
    method: 'post',
    data
  })
)

// 开票明细修改
export const billingdetailEdit = (data, id) => (
  request({
    url: baseUrl + '/billingdetail/update/' + id,
    method: 'put',
    data
  })
)

// 开票明细删除
export const billingdetailDel = (id) => (
  request({
    url: baseUrl + '/billingdetail/delete/' + id,
    method: 'delete'
  })
)

// 开票明细发票编号唯一性校验
export const billingdetailVal = (data) => (
  request({
    url: baseUrl + '/billingdetail/validate',
    method: 'post',
    data
  })
)

// 开票明细审核
export const billingApprove = (id) => (
  request({
    url: baseUrl + '/billingdetail/approve/' + id,
    method: 'put'
  })
)

// 开票明细撤销审核
export const billingCancelApprove = (id) => (
  request({
    url: baseUrl + '/billingdetail/cancelApprove/' + id,
    method: 'put'
  })
)

// 开票明细详情
export const billingDetails = (id) => (
  request({
    url: baseUrl + '/billingdetail/get/' + id,
    method: 'get'
  })
)

// 收款明细列表
export const receiveDetailList = (data) => (
  request({
    url: baseUrl + '/receivedetail/page',
    method: 'post',
    data
  })
)

// 收款明细详情
export const getReceiveDetail = (id) => (
  request({
    url: baseUrl + '/receivedetail/get/' + id,
    method: 'get'
  })
)

// 收款明细新增
export const receiveAdd = (data) => (
  request({
    url: baseUrl + '/receivedetail/save',
    method: 'post',
    data
  })
)

// 收款明细修改
export const receiveEdit = (data, id) => (
  request({
    url: baseUrl + '/receivedetail/update/' + id,
    method: 'put',
    data
  })
)

// 收款明细删除
export const receiveDelete = (id) => (
  request({
    url: baseUrl + '/receivedetail/delete/' + id,
    method: 'delete'
  })
)

// 收款明细审核
export const receiveReview = (id) => (
  request({
    url: baseUrl + '/receivedetail/approve/' + id,
    method: 'put'
  })
)

// 收款明细撤销审核
export const receiveCancelReview = (id) => (
  request({
    url: baseUrl + '/receivedetail/cancelApprove/' + id,
    method: 'put'
  })
)

// 收款明细关联发票
export const relationInvoice = (data, id) => (
  request({
    url: baseUrl + '/receivedetail/relationInvoice/' + id,
    method: 'put',
    data
  })
)
// 开票单位
export const getInvoicingUnitList = (data) => (
  request({
    url: baseUrl + '/receiptdetail/getInvoicingUnitList',
    method: 'post',
    data
  })
)

// 收票明细列表
export const receiptDetaillList = (data) => (
  request({
    url: baseUrl + '/receiptdetail/page',
    method: 'post',
    data
  })
)

// 收票明细列表 --- 不分页
export const receiptDetaillAllList = (data) => (
  request({
    url: baseUrl + '/receiptdetail/list',
    method: 'post',
    data
  })
)

// 收票明细详情
export const getReceiptDetail = (id) => (
  request({
    url: baseUrl + '/receiptdetail/get/' + id,
    method: 'get'
  })
)

// 收票明细新增
export const receiptAdd = (data) => (
  request({
    url: baseUrl + '/receiptdetail/save',
    method: 'post',
    data
  })
)

// 收票明细新增
export const receiptValid = (data) => (
  request({
    url: baseUrl + '/receiptdetail/validate',
    method: 'post',
    data
  })
)

// 收票明细修改
export const receiptEdit = (data, id) => (
  request({
    url: baseUrl + '/receiptdetail/update/' + id,
    method: 'put',
    data
  })
)

// 收票明细删除
export const receiptDelete = (id) => (
  request({
    url: baseUrl + '/receiptdetail/delete/' + id,
    method: 'delete'
  })
)

// 收票明细审核
export const receiptReview = (id) => (
  request({
    url: baseUrl + '/receiptdetail/approve/' + id,
    method: 'put'
  })
)

// 收票明细撤销审核
export const receiptCancelReview = (id) => (
  request({
    url: baseUrl + '/receiptdetail/cancelApprove/' + id,
    method: 'put'
  })
)

// 付款明细列表
export const paymentDetaillList = (data) => (
  request({
    url: baseUrl + '/paymentdetail/page',
    method: 'post',
    data
  })
)

// 付款明细详情
export const getpaymentDetail = (id) => (
  request({
    url: baseUrl + '/paymentdetail/get/' + id,
    method: 'get'
  })
)

// 付款明细新增
export const paymentAdd = (data) => (
  request({
    url: baseUrl + '/paymentdetail/save',
    method: 'post',
    data
  })
)

// 付款明细修改
export const paymentEdit = (data, id) => (
  request({
    url: baseUrl + '/paymentdetail/update/' + id,
    method: 'put',
    data
  })
)

// 付款明细删除
export const paymentDelete = (id) => (
  request({
    url: baseUrl + '/paymentdetail/delete/' + id,
    method: 'delete'
  })
)

// 付款明细审核
export const paymentReview = (id) => (
  request({
    url: baseUrl + '/paymentdetail/approve/' + id,
    method: 'put'
  })
)

// 付款明细撤销审核
export const paymentCancelReview = (id) => (
  request({
    url: baseUrl + '/paymentdetail/cancelApprove/' + id,
    method: 'put'
  })
)

// 付款明细关联发票
export const paymentRelationInvoice = (id, data) => (
  request({
    url: baseUrl + '/paymentdetail/relationInvoice/' + id,
    method: 'put',
    data
  })
)

// 往来款明细列表
export const contactDetaillList = (data) => (
  request({
    url: baseUrl + '/contactdetail/page',
    method: 'post',
    data
  })
)

// 往来款明细列表---汇总
export const contactDetaillSummary = (data) => (
  request({
    url: baseUrl + '/contactdetail/summary',
    method: 'post',
    data
  })
)

// 往来款明细详情
export const getcontactDetail = (id) => (
  request({
    url: baseUrl + '/contactdetail/get/' + id,
    method: 'get'
  })
)

// 往来款明细新增
export const contactAdd = (data) => (
  request({
    url: baseUrl + '/contactdetail/save',
    method: 'post',
    data
  })
)

// 往来款明细修改
export const contactEdit = (data, id) => (
  request({
    url: baseUrl + '/contactdetail/update/' + id,
    method: 'put',
    data
  })
)

// 往来款明细删除
export const contactDelete = (id) => (
  request({
    url: baseUrl + '/contactdetail/delete/' + id,
    method: 'delete'
  })
)

// 往来款明细-还款-列表
export const repaymentList = (data) => (
  request({
    url: baseUrl + '/repaymentdetail/list',
    method: 'post',
    data
  })
)

// 往来款明细-还款-add
export const repaymentAdd = (data) => (
  request({
    url: baseUrl + '/repaymentdetail/save',
    method: 'post',
    data
  })
)

// 往来款明细-还款-delete
export const repaymentDel = (id) => (
  request({
    url: baseUrl + '/repaymentdetail/delete/' + id,
    method: 'delete'
  })
)

// 质保押金列表
export const warrantyDepositList = (data) => (
  request({
    url: baseUrl + '/warrantydeposit/page',
    method: 'post',
    data
  })
)

// 往来款明细列表---汇总
export const warrantydepositSummary = (data) => (
  request({
    url: baseUrl + '/warrantydeposit/summary',
    method: 'post',
    data
  })
)

// 质保押金详情
export const getwarrantydeposit = (id) => (
  request({
    url: baseUrl + '/warrantydeposit/get/' + id,
    method: 'get'
  })
)

// 质保押金新增
export const warrantyDepositAdd = (data) => (
  request({
    url: baseUrl + '/warrantydeposit/save',
    method: 'post',
    data
  })
)

// 质保押金修改
export const warrantyDepositEdit = (data, id) => (
  request({
    url: baseUrl + '/warrantydeposit/update/' + id,
    method: 'put',
    data
  })
)

// 质保押金删除
export const warrantyDepositDelete = (id) => (
  request({
    url: baseUrl + '/warrantydeposit/delete/' + id,
    method: 'delete'
  })
)

// 质保押金审核
export const warrantyDepositReview = (id) => (
  request({
    url: baseUrl + '/warrantydeposit/approve/' + id,
    method: 'put'
  })
)

// 质保押金撤销审核
export const warrantyDepositCancelReview = (id) => (
  request({
    url: baseUrl + '/warrantydeposit/cancelApprove/' + id,
    method: 'put'
  })
)

// 导出
// 项目收支台账列表导出
export const exportProjectAccount = (data) => (
  request({
    url: baseUrl + '/export/exportProjectAccount',
    method: 'post',
    data
  })
)

// 开票明细导出
export const exportBillingDetail = (data) => (
  request({
    url: baseUrl + '/export/exportBillingDetail',
    method: 'post',
    data
  })
)

// 往来款明细导出
export const exportContactDetail = (data) => (
  request({
    url: baseUrl + '/export/exportContactDetail',
    method: 'post',
    data
  })
)

// 付款明细导出
export const exportPaymentDetail = (data) => (
  request({
    url: baseUrl + '/export/exportPaymentDetail',
    method: 'post',
    data
  })
)

// 收票明细导出
export const exportReceiptDetail = (data) => (
  request({
    url: baseUrl + '/export/exportReceiptDetail',
    method: 'post',
    data
  })
)

// 收款明细导出
export const exportReceiveDetail = (data) => (
  request({
    url: baseUrl + '/export/exportReceiveDetail',
    method: 'post',
    data
  })
)

// 质保押金导出
export const exportWarrantyDeposit = (data) => (
  request({
    url: baseUrl + '/export/exportWarrantyDeposit',
    method: 'post',
    data
  })
)
