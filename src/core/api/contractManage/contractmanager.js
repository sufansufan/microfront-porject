import request from '../config/axios'
const baseUrl = '/contractmanager'

// 主合同列表页
export const getMainList = (data) => {
  return request({
    url: baseUrl + '/contract/page',
    method: 'post',
    data
  })
}

export const getMainAllList = (data) => {
  return request({
    url: baseUrl + '/contract/list',
    method: 'post',
    data
  })
}

// 删除主合同
export const deleteMainContract = (id) => {
  return request({
    url: baseUrl + '/contract/' + id,
    method: 'delete'
  })
}

// 撤销主合同
export const revokeMainContract = (id) => {
  return request({
    url: baseUrl + '/contract/revoke' + id,
    method: 'get'
  })
}

// 新增主合同
export const addMainContract = (data, type) => {
  return request({
    url: baseUrl + '/contract/save/' + type,
    method: 'post',
    data
  })
}

// 编辑查看
export const editMainEngContract = (id) => {
  return request({
    url: baseUrl + '/contract/engineering/' + id,
    method: 'get'
  })
}

export const editMainDesignContract = (id) => {
  return request({
    url: baseUrl + '/contract/design/' + id,
    method: 'get'
  })
}

export const editMainOfficeContract = (id) => {
  return request({
    url: baseUrl + '/contract/office/' + id,
    method: 'get'
  })
}

export const editMainOtherContract = (id) => {
  return request({
    url: baseUrl + '/contract/other/' + id,
    method: 'get'
  })
}

// 结算主合同
export const settleMainContract = (data) => {
  return request({
    url: baseUrl + '/contract/settle',
    method: 'post',
    data
  })
}

// 拉去主合同金额 结算
export const countContractAmount = (id) => (
  request({
    url: baseUrl + '/contract/getAmount/' + id,
    method: 'get'
  })
)

// 拉去内部合同金额 结算
export const countSubContractAmount = (id) => (
  request({
    url: baseUrl + '/subcontract/getAmount/' + id,
    method: 'get'
  })
)

// 版本查看主合同详情 工程
export const detailVersionEngContract = (id, number) => {
  return request({
    url: baseUrl + '/contract/engineering/' + `${id}/${number}`,
    method: 'get'
  })
}

export const detailVersionSignContract = (id, number) => {
  return request({
    url: baseUrl + '/contract/design/' + `${id}/${number}`,
    method: 'get'
  })
}

export const detailVersionOfficeContract = (id, number) => {
  return request({
    url: baseUrl + '/contract/office/' + `${id}/${number}`,
    method: 'get'
  })
}

export const detailVersionOtherContract = (id, number) => {
  return request({
    url: baseUrl + '/contract/other/' + `${id}/${number}`,
    method: 'get'
  })
}

// 编辑 保存/提交 主合同
export const saveEditMainEngContract = (data, id) => {
  return request({
    url: baseUrl + '/contract/engineering/update/' + id,
    method: 'put',
    data
  })
}

export const saveEditMainSignContract = (data, id) => {
  return request({
    url: baseUrl + '/contract/design/update/' + id,
    method: 'put',
    data
  })
}

export const saveEditMainOfficeContract = (data, id) => {
  return request({
    url: baseUrl + '/contract/office/update/' + id,
    method: 'put',
    data
  })
}

export const saveEditMainOtherContract = (data, id) => {
  return request({
    url: baseUrl + '/contract/other/update/' + id,
    method: 'put',
    data
  })
}

// 版本查看主合同list
export const detailVersionMainContract = (data) => {
  return request({
    url: baseUrl + '/contract/revision/page',
    method: 'post',
    data
  })
}

// 删除指定版本合同
export const deleteVersionContract = (id, number) => {
  return request({
    url: baseUrl + '/contract/revision/page' + `${id}/${number}`,
    method: 'delete'
  })
}

// 查询办公类合同当前版本详细信息
export const getOneOfOffice = (id) => (
  request({
    url: baseUrl + '/contract/office/' + id,
    method: 'get'
  })
)

// 办公类合同修改
export const updateOfficeContract = (data, id) => (
  request({
    url: baseUrl + '/contract/office/' + id,
    method: 'put',
    data
  })
)

// 办公类合同删除
export const deleteOffice = (id) => (
  request({
    url: baseUrl + '/contract/office/' + id,
    method: 'delete'
  })
)

// 查询办公类合同指定版本详细信息
export const getRevisionInfoOfOffice = (id, revisionNumber) => (
  request({
    url: baseUrl + '/contract/office/' + id + '/' + revisionNumber,
    method: 'get'
  })
)

//  查询办公类合同版本分页列表
export const getOfficesForVersion = (data) => (
  request({
    url: baseUrl + '/contract/office/revision/page',
    method: 'post',
    data
  })
)

// 办公类合同保存
export const addOfficeContract = (data) => (
  request({
    url: baseUrl + '/contract/office/save',
    method: 'post',
    data
  })
)

// 查询其他合同当前版本详细信息
export const getOneOfOther = (id) => (
  request({
    url: baseUrl + '/contract/other/' + id,
    method: 'get'
  })
)

// 其他合同修改
export const updateOtherContract = (data, id) => (
  request({
    url: baseUrl + '/contract/other/' + id,
    method: 'put',
    data
  })
)

// 其他合同删除
export const deleteOther = (id) => (
  request({
    url: baseUrl + '/contract/other/' + id,
    method: 'delete'
  })
)

// 查询其他合同指定版本详细信息
export const getRevisionInfoOfOther = (id, revisionNumber) => (
  request({
    url: baseUrl + '/contract/other/' + id + '/' + revisionNumber,
    method: 'get'
  })
)

//  查询其他合同版本分页集合
export const getOthersForVersion = (data) => (
  request({
    url: baseUrl + '/contract/other/revision/page',
    method: 'post',
    data
  })
)

// 其他合同保存
export const addOtherContract = (data) => (
  request({
    url: baseUrl + '/contract/other/save',
    method: 'post',
    data
  })
)
// 内部合同
// 撤销内部合同流程
export const handleRevoke = (id) => (
  request({
    url: baseUrl + '/subcontract/revoke/' + id,
    method: 'get'
  })
)
// 生成合同审批单号
export const getGenerateNo = (data) => (
  request({
    url: baseUrl + '/subcontract/generateNo',
    method: 'get',
    data
  })
)
// 获取合同金额
export const getAmount = (id) => (
  request({
    url: baseUrl + '/subcontract/getAmount/' + id,
    method: 'get'
  })
)
// 查询我的合作企业列表
export const getCooperatunits = (orgId) => (
  request({
    url: baseUrl + '/subcontract/myCooperatunits/' + orgId,
    method: 'get'
  })
)

// 条件查询(分页)
export const contractPage = (data) => (
  request({
    url: baseUrl + '/subcontract/supplementalagreement/page',
    method: 'post',
    data
  })
)

// 补充协议添加
export const supplytSave = (data, type) => (
  request({
    url: baseUrl + '/supplementalagreement/save/' + type,
    method: 'post',
    data
  })
)

// 补充协议修改
export const supplyUpdate = (data, operateType) => (
  request({
    url: baseUrl + '/supplementalagreement/update/' + operateType,
    method: 'put',
    data
  })
)
// 补充协议删除
export const supplyDelete = (id) => (
  request({
    url: baseUrl + '/supplementalagreement/delete/' + id,
    method: 'delete'
  })
)
// 补充协议单一查询
export const getSupplyDetails = (id) => (
  request({
    url: baseUrl + '/supplementalagreement/getById/' + id,
    method: 'get'
  })
)
// // 补充协议单一查询
// export const getSupplyVersionDetails = (id) => (
//   request({
//     url: baseUrl + '/supplementalagreement/getById/' + id,
//     method: 'get'
//   })
// )
// 补充协议单历史版本的一查询
export const getSupplyVersionDetails = (id, number) => (
  request({
    url: baseUrl + '/supplementalagreement/get/' + id + '/' + number,
    method: 'get'
  })
)
// 补充协议版本删除
export const supplyVersionDelete = (id, version) => (
  request({
    url: baseUrl + '/supplementalagreement/delete/' + id + '/' + version,
    method: 'delete'
  })
)

// 查询一个补充协议的各个版本
export const getSupplyVersionList = (data) => (
  request({
    url: baseUrl + '/supplementalagreement/revision/list',
    method: 'post',
    data
  })
)

// 查询内部合同分页列表
export const subContractPage = (data) => (
  request({
    url: baseUrl + '/subcontract/page',
    method: 'post',
    data
  })
)

// 查询内部合同分页列表 -- 不分页
export const subContractList = (data) => (
  request({
    url: baseUrl + '/subcontract/allList',
    method: 'post',
    data
  })
)

// 撤销内部合同
export const subRevokeContract = (id) => {
  return request({
    url: baseUrl + '/subcontract/revoke/' + id,
    method: 'get'
  })
}

// 劳动合同添加
export const laborContractSave = (data, operateType) => (
  request({
    url: baseUrl + '/subcontract/laborcontract/save/' + operateType,
    method: 'post',
    data
  })
)
// 劳动合同修改
export const laborContractEdit = (data, operateType) => (
  request({
    url: baseUrl + '/subcontract/laborcontract/' + operateType,
    method: 'put',
    data
  })
)
// 查询当前版本分包合同详细信息
export const laborContractDetails = (id) => (
  request({
    url: baseUrl + '/subcontract/getById/' + id,
    method: 'get'
  })
)
// 采购合同添加
export const purchasingContractSave = (data, operateType) => (
  request({
    url: baseUrl + '/subcontract/purchasingcontract/save/' + operateType,
    method: 'post',
    data
  })
)
// 采购合同修改
export const purchasingContractEdit = (data, operateType) => (
  request({
    url: baseUrl + '/subcontract/purchasingcontract/' + operateType,
    method: 'put',
    data
  })
)

// 查询当前版本分包合同详细信息
export const purchasingContractDetails = (id) => (
  request({
    url: baseUrl + '/subcontract/getById/' + id,
    method: 'get'
  })
)
// 机械合同添加
export const mechanicalContractSave = (data, operateType) => (
  request({
    url: baseUrl + '/subcontract/mechanicalcontract/save/' + operateType,
    method: 'post',
    data
  })
)
// 机械合同修改
export const mechanicalContractEdit = (data, operateType) => (
  request({
    url: baseUrl + '/subcontract/mechanicalcontract/' + operateType,
    method: 'put',
    data
  })
)

// 查询当前版本机械合同详细信息
export const mechanicalContractDetails = (id) => (
  request({
    url: baseUrl + '/subcontract/getById/' + id,
    method: 'get'
  })
)
// 分包合同保存
export const subContractSave = (data, operateType) => (
  request({
    url: baseUrl + '/subcontract/subpack/save/' + operateType,
    method: 'post',
    data
  })
)
// 分包合同修改
export const subContractEdit = (data, operateType) => (
  request({
    url: baseUrl + '/subcontract/subpack/' + operateType,
    method: 'put',
    data
  })
)

// 查询当前版本分包合同详细信息
export const subContractDetails = (id) => (
  request({
    url: baseUrl + '/subcontract/getById/' + id,
    method: 'get'
  })
)

// 工程保险合同保存
export const insuranceContractSave = (data, operateType) => (
  request({
    url: baseUrl + '/subcontract/insurance/save/' + operateType,
    method: 'post',
    data
  })
)
// 工程保险合同修改
export const insuranceContractEdit = (data, operateType) => (
  request({
    url: baseUrl + '/subcontract/insurance/' + operateType,
    method: 'put',
    data
  })
)

// 查询当前版本工程保险合同详细信息
export const insuranceContractDetails = (id) => (
  request({
    url: baseUrl + '/subcontract/getById/' + id,
    method: 'get'
  })
)

// 其他合同保存
export const otherContractSave = (data, operateType) => (
  request({
    url: baseUrl + '/subcontract/other/save/' + operateType,
    method: 'post',
    data
  })
)
// 其他合同修改
export const otherContractEdit = (data, operateType) => (
  request({
    url: baseUrl + '/subcontract/other/' + operateType,
    method: 'put',
    data
  })
)
// 查询当前版本其他合同详细信息
export const otherContractDetails = (id) => (
  request({
    url: baseUrl + '/subcontract/getById/' + id,
    method: 'get'
  })
)

// 子合同删除
export const sonContractDelete = (id) => (
  request({
    url: baseUrl + '/subcontract/' + id,
    method: 'delete'
  })
)
// 查询内部合同 其中一个版本的的修改记录/和所有版本的修改修改记录
export const sonContractVersionDetails = (id, revisionNumber) => (
  request({
    url: baseUrl + '/subcontract/' + id + '/' + revisionNumber,
    method: 'get'
  })
)
// 内部合同删除(特定版本)
export const sonContractVersionDelete = (id, revisionNumber) => (
  request({
    url: baseUrl + '/subcontract/' + id + '/' + revisionNumber,
    method: 'delete'
  })
)

// 结算子合同
export const sonContractSettle = (data) => (
  request({
    url: baseUrl + '/subcontract/settle',
    method: 'post',
    data
  })
)
// 撤销内部合同/补充协议流程
export const revoke = (data) => (
  request({
    url: baseUrl + '/subcontract/revoke',
    method: 'get',
    data
  })
)
// 查询子合同版本分页列表
export const getContractVersionList = (data) => (
  request({
    url: baseUrl + '/subcontract/revision/page',
    method: 'post',
    data
  })
)

// 补充协议删除
export const deleteSupplementalagreement = (id) => (
  request({
    url: baseUrl + '/subcontract/supplementalagreement/' + id,
    method: 'delete'
  })
)

// 补充协议单一查询
export const getSupplementalagreement = (id) => (
  request({
    url: baseUrl + '/subcontract/supplementalagreement/' + id,
    method: 'get'
  })
)

// 补充协议添加
// operateType : 0 保存,1  提交
export const addSupplementalagreement = (data, operateType) => (
  request({
    url: baseUrl + '/supplementalagreement/save/' + operateType,
    method: 'post',
    data
  })
)
// 补充协议
// 条件查询(分页)
export const getSupplyList = (data) => (
  request({
    url: baseUrl + '/supplementalagreement/list',
    method: 'post',
    data
  })
)

// 补充协议修改
export const updateSupplementalagreement = (data, id) => (
  request({
    url: baseUrl + '/supplementalagreement/update/' + id,
    method: 'put',
    data
  })
)
// 撤销补充协议流程
export const supplementalagreementRevoke = (id) => (
  request({
    url: baseUrl + '/subcontract/supplementalagreement/revoke/' + id,
    method: 'get'
  })
)

// 验证主合同字段是否唯一
export const validateMainUnique = (data) => (
  request({
    url: baseUrl + '/contract/validateUnique',
    method: 'post',
    data
  })
)
// 验证合同编号是否唯一
export const validateUnique = (data) => (
  request({
    url: baseUrl + '/subcontract/validateUnique',
    method: 'post',
    data
  })
)
// 验证协议编号是否唯一
export const validateUniqueSupply = (data) => (
  request({
    url: baseUrl + '/supplementalagreement/validateUnique',
    method: 'post',
    data
  })
)

// 查询是否存在审批通过的记录 补充协议
export const searchHasApproveVersion = (id) => {
  return request({
    url: baseUrl + '/supplementalagreement/hasApprovedVersion/' + id,
    method: 'get'
  })
}
// 查询是否存在审批通过的记录 内部合同
export const hasApprovedVersionContract = (id) => {
  return request({
    url: baseUrl + '/subcontract/hasApprovedVersion/' + id,
    method: 'get'
  })
}
// 查询补充协议的版本个数
export const getSupplyVersionNum = (id) => {
  return request({
    url: baseUrl + '/supplementalagreement/hasVersion/' + id,
    method: 'get'
  })
}

// 查询一个补充协议的各个版本
export const getSupplyRevisionList = (data) => (
  request({
    url: baseUrl + '/supplementalagreement/revision/list',
    method: 'post',
    data
  })
)

// 合同审批流程发起人环节在次提交
export const processAgainSubmit = (data, type) => (
  request({
    url: baseUrl + '/contract/resubmit/' + type,
    method: 'put',
    data
  })
)

// 查询内部合同的版本个数
export const getHasVersion = (id) => (
  request({
    url: baseUrl + '/subcontract/hasVersion/' + id,
    method: 'get'
  })
)
// 查询内部合同列表
export const getInsideAllList = (data) => (
  request({
    url: baseUrl + '/subcontract/allList',
    method: 'post',
    data
  })
)

// 合同类型
export const getMainConstarctType = () => {
  return request({
    url: baseUrl + '/contract/getMainContractType',
    method: 'get'
  })
}

// 合同归属
export const getContractAttribution = () => {
  return request({
    url: baseUrl + '/contract/getContractAttribution',
    method: 'get'
  })
}

// 在一次提交补充协议
export const processAgainAgree = (data, taskId) => {
  return request({
    url: baseUrl + '/supplementalagreement/reApproval/' + taskId,
    method: 'post',
    data
  })
}

// 在一次提交内部合同
export const processSubcontractAgree = (data, taskId) => {
  return request({
    url: baseUrl + '/subcontract/reApproval/' + taskId,
    method: 'post',
    data
  })
}

// 在一次提交内部结算
export const processSubcontractreSettle = (data, taskId) => {
  return request({
    url: baseUrl + '/subcontract/reSettle/' + taskId,
    method: 'post',
    data
  })
}

// 在一次提交主合同结算
export const processMainSettle = (data, type) => (
  request({
    url: baseUrl + '/contract/resettle/' + type,
    method: 'put',
    data
  })
)
