// 资金账户管理
import request from '../config/axios'
const baseUrl = '/capitalaccountmanager'

//  银行账户分页
export const bankaccountList = (data) => (
  request({
    url: baseUrl + '/bankaccount/page',
    method: 'post',
    data
  })
)
// 添加银行账户
export const addBankaccount = (data) => (
  request({
    url: baseUrl + '/bankaccount',
    method: 'post',
    data
  })
)
//  银行账户获取
export const getDetailBankaccount = (id) => (
  request({
    url: `${baseUrl}/bankaccount/${id}`,
    method: 'get'
  })
)
// 银行账户修改
export const putBankaccount = (data, id) => (
  request({
    url: `${baseUrl}/bankaccount/${id}`,
    method: 'put',
    data
  })
)
// 银行账户删除
export const deleteBankaccount = (id) => (
  request({
    url: `${baseUrl}/bankaccount/${id}`,
    method: 'delete'
  })
)
//  停用账户
export const stopBkaccount = (id) => (
  request({
    url: `${baseUrl}/bankaccount/${id}/disable`,
    method: 'put'
  })
)
// 恢复账户
export const recoverBkaccount = (id) => (
  request({
    url: `${baseUrl}/bankaccount/${id}/recover`,
    method: 'put'
  })
)
// 转账
export const transfer = (id, type, data) => (
  request({
    url: `${baseUrl}/bankaccount/${id}/${type}/transfer`,
    method: 'post',
    data
  })
)
// 现金账户分页
export const cashPage = (data) => (
  request({
    url: `${baseUrl}/cashaccount/page`,
    method: 'post',
    data
  })
)
// 银行账户明细分页
export const getBankdetail = (data, id) => (
  request({
    url: `${baseUrl}/bankdetail/${id}/page`,
    method: 'post',
    data
  })
)
// 现金账户分页
export const getCashList = (data) => (
  request({
    url: `${baseUrl}/cashaccount/page`,
    method: 'post',
    data
  })
)
// 添加现金账户
export const addCash = (data) => (
  request({
    url: `${baseUrl}/cashaccount`,
    method: 'post',
    data
  })
)
// 现金账户获取
export const detailCash = (id) => (
  request({
    url: `${baseUrl}/cashaccount/${id}`,
    method: 'get'
  })
)
// 现金账户修改
export const editCash = (data, id) => (
  request({
    url: `${baseUrl}/cashaccount/${id}`,
    method: 'put',
    data
  })
)
// 现金账户删除
export const deleteCash = (id) => (
  request({
    url: `${baseUrl}/cashaccount/${id}`,
    method: 'delete'
  })
)
// 停用现金账户
export const stopCash = (id) => (
  request({
    url: `${baseUrl}/cashaccount/${id}/disable`,
    method: 'put'
  })
)
// 恢复现金账户
export const recoverCash = (id) => (
  request({
    url: `${baseUrl}/cashaccount/${id}/recover`,
    method: 'put'
  })
)
// 现金账户转账
export const transferCash = (id, type, data) => (
  request({
    url: `${baseUrl}/cashaccount/${id}/${type}/transfer`,
    method: 'post',
    data
  })
)
// 添加银行账户明细
export const addBankdetail = (data) => (
  request({
    url: `${baseUrl}/bankdetail`,
    method: 'post',
    data
  })
)

// 银行账户明细获取
export const bankDetailed = (id) => (
  request({
    url: `${baseUrl}/bankdetail/${id}`,
    method: 'get'
  })
)
// 银行账户明细修改
export const bankdetailEdit = (id, data) => (
  request({
    url: `${baseUrl}/bankdetail/${id}`,
    method: 'put',
    data
  })
)
// 银行账户明细删除
export const bankdetailDeleta = (id) => (
  request({
    url: `${baseUrl}/bankdetail/${id}`,
    method: 'delete'
  })
)

// 银行账户明细结算
export const bankdetailSettlement = (id) => (
  request({
    url: `${baseUrl}/bankdetail/${id}/settlement`,
    method: 'put'
  })
)
// 银行账户明细撤销结算
export const bankdetailCancelSettlement = (id) => (
  request({
    url: `${baseUrl}/bankdetail/${id}/cancelSettlement`,
    method: 'put'
  })
)

// 银行账户明细延期转支出
export const transformExpenditure = (id) => (
  request({
    url: `${baseUrl}/bankdetail/${id}/transformExpenditure`,
    method: 'put'
  })
)
// 银行账户明细银行账户数据导出
export const exportBankdetail = (id, data) => (
  request({
    url: `${baseUrl}/bankaccount/${id}/export`,
    method: 'post',
    data
  })
)
// 现金账户明细分页
export const cashaccountdetailList = (data, id) => (
  request({
    url: `${baseUrl}/cashaccountdetail/${id}/page`,
    method: 'post',
    data
  })
)
// 添加现金账户明细
export const addCashaccountdetai = (data) => (
  request({
    url: `${baseUrl}/cashaccountdetail`,
    method: 'post',
    data
  })
)
// 现金账户明细获取
export const getCashDetai = (id) => (
  request({
    url: `${baseUrl}/cashaccountdetail/${id}`,
    method: 'get'
  })
)
// 现金账户明细修改
export const editCashDetai = (id, data) => (
  request({
    url: `${baseUrl}/cashaccountdetail/${id}`,
    method: 'put',
    data
  })
)
// 现金账户明细删除
export const deleteCashDetai = (id) => (
  request({
    url: `${baseUrl}/cashaccountdetail/${id}`,
    method: 'delete'
  })
)
// 现金账户明细数据导出
export const exportCashDetai = (id, data) => (
  request({
    url: `${baseUrl}/cashaccount/${id}/export`,
    method: 'post',
    data
  })
)
// 投标保证金管理分页
export const bidearnestmoneymanagePage = (data) => (
  request({
    url: `${baseUrl}/bidearnestmoneymanage/page`,
    method: 'post',
    data
  })
)
// 添加投标保证金管理
export const bidearnestmoneymanageAdd = (data) => (
  request({
    url: `${baseUrl}/bidearnestmoneymanage`,
    method: 'post',
    data
  })
)
// 投标保证金管理获取
export const bidearnestmoneymanageDetail = (id) => (
  request({
    url: `${baseUrl}/bidearnestmoneymanage/${id}`,
    method: 'get'
  })
)
// 投标保证金管理修改
export const bidearnestmoneymanageEdit = (id, data) => (
  request({
    url: `${baseUrl}/bidearnestmoneymanage/${id}`,
    method: 'put',
    data
  })
)
// 投标保证金管理结清
export const bidearnestmoneymanageSettle = (id, data) => (
  request({
    url: `${baseUrl}/bidearnestmoneymanage/${id}/settle`,
    method: 'put',
    data
  })
)
// 投标保证金管理删除
export const bidearnestmoneymanageDelete = (id) => (
  request({
    url: `${baseUrl}/bidearnestmoneymanage/${id}`,
    method: 'delete'
  })
)
// 投标保证金管理撤销结清
export const cancelSettle = (id) => (
  request({
    url: `${baseUrl}/bidearnestmoneymanage/${id}/cancelSettle`,
    method: 'put'
  })
)
// 投标保证金管理导出
export const exportInfor = (data) => (
  request({
    url: `${baseUrl}/bidearnestmoneymanage/export`,
    method: 'post',
    data
  })
)

// 投标保证金明细列表
export const bidManageDetailList = (data) => (
  request({
    url: baseUrl + '/bidearnestmoneymanagedetail/list',
    method: 'post',
    data
  })
)

// 投标保证金明细  --详情
export const bidManageDetail = (id) => (
  request({
    url: baseUrl + '/bidearnestmoneymanagedetail/' + id,
    method: 'get'
  })
)

// 投标保证金明细 -新增
export const bidManageAdd = (data) => (
  request({
    url: baseUrl + '/bidearnestmoneymanagedetail',
    method: 'post',
    data
  })
)
// 投标保证金明细 -修改
export const bidManageEdit = (data, id) => (
  request({
    url: baseUrl + '/bidearnestmoneymanagedetail/' + id,
    method: 'put',
    data
  })
)
// 投标保证金明细 -删除
export const bidManageDel = (id) => (
  request({
    url: baseUrl + '/bidearnestmoneymanagedetail/' + id,
    method: 'delete'
  })
)
// 投标保证金明细 -审阅
export const bidManageCheck = (id) => (
  request({
    url: baseUrl + '/bidearnestmoneymanagedetail/' + id + '/check',
    method: 'put'
  })
)
// 投标保证金明细 -撤销审阅
export const bidManageRevokeCheck = (id) => (
  request({
    url: baseUrl + '/bidearnestmoneymanagedetail/' + id + '/revokeCheck',
    method: 'put'
  })
)
