import request from '../config/axios'

const baseUrl = '/workflowmanager'

// 流程注册-左侧树-All
export const getTreeAll = () => (
  request({
    url: baseUrl + '/businessregister/leftAllList',
    method: 'post'
  })
)

// 流程注册-左侧树
export const getTree = () => (
  request({
    url: baseUrl + '/businessregister/leftList',
    method: 'post'
  })
)

// 流程维护表格
export const getMaintainTable = (data) => {
  return request({
    url: baseUrl + '/businessregister/page',
    method: 'post',
    data
  })
}

// 获取流程维护
export const getMaintain = (id) => {
  return request({
    url: baseUrl + `/businessregister/get/${id}`,
    method: 'get'
  })
}

// 添加流程维护
export const addMaintain = (data) => {
  return request({
    url: baseUrl + '/businessregister/add',
    method: 'post',
    data
  })
}

// 修改流程维护
export const editMaintain = (data, id) => {
  return request({
    url: baseUrl + '/businessregister/update/' + id,
    method: 'put',
    data
  })
}

// 删除流程维护
export const deleteMaintain = (id) => {
  return request({
    url: baseUrl + `/businessregister/delete/${id}`,
    method: 'delete'
  })
}

// 流程维护流程编号唯一性校验
export const maintainValidate = (data) => (
  request({
    url: baseUrl + '/businessregister/validate',
    method: 'post',
    data
  })
)

// 流程参数列表
export const getParamList = (data) => (
  request({
    url: baseUrl + '/businessParam/page',
    method: 'post',
    data
  })
)

// 流程参数列表  不分页
export const getParamListNo = (data) => (
  request({
    url: baseUrl + '/businessParam/list',
    method: 'post',
    data
  })
)

// 检查流程参数编号是否可用
export const validParam = (registerId, param, paramId) => (
  request({
    url: baseUrl + '/businessParam/validate/' + registerId + '/' + param,
    method: 'get',
    params: paramId
  })
)
// 流程参数添加
export const addParam = (data) => (
  request({
    url: baseUrl + '/businessParam/add',
    method: 'post',
    data
  })
)

// 流程参数修改
export const editParam = (id, data) => (
  request({
    url: baseUrl + '/businessParam/update/' + id,
    method: 'put',
    data
  })
)

// 流程参数删除
export const deleteParam = (id) => (
  request({
    url: baseUrl + '/businessParam/delete/' + id,
    method: 'delete'

  })
)

// 流程注册导出
export const exportRegister = (data) => (
  request({
    url: baseUrl + '/export/exportWorkflowRegister',
    method: 'post',
    data
  })
)

// 流程配置导出
export const exportConfig = (data) => (
  request({
    url: baseUrl + '/export/exportWorkflowConfig',
    method: 'post',
    data
  })
)

// 流程表单列表  分页
export const getProcessForm = (data) => (
  request({
    url: baseUrl + '/businessform/page',
    method: 'post',
    data
  })
)

// 流程表单  不分页
export const getProcessFormList = (data) => (
  request({
    url: baseUrl + '/businessform/list',
    method: 'post',
    data
  })
)

// 流程表单新增
export const addForm = (data) => (
  request({
    url: baseUrl + '/businessform/add',
    method: 'post',
    data
  })
)

// 流程表单修改
export const editForm = (id, data) => (
  request({
    url: baseUrl + '/businessform/update/' + id,
    method: 'put',
    data
  })
)

// 流程表单删除
export const deleteForm = (id) => (
  request({
    url: baseUrl + '/businessform/delete/' + id,
    method: 'delete'
  })
)

// 流程表单app编号唯一性校验
export const validateAppNumber = (registerId, appFormCode, data) => (
  request({
    url: baseUrl + `/businessform/validate/${registerId}/${appFormCode}`,
    method: 'get',
    params: data
  })
)

// 特定审批人列表
export const getApprover = (data) => (
  request({
    url: baseUrl + '/businessapprover/page',
    method: 'post',
    data
  })
)

// 特定审批人列表  不分页
export const getApproverLists = (data) => (
  request({
    url: baseUrl + '/businessapprover/list',
    method: 'post',
    data
  })
)

// 特定审批人新增
export const addApprover = (data) => (
  request({
    url: baseUrl + '/businessapprover/add',
    method: 'post',
    data
  })
)

// 特定审批人修改
export const editApprover = (id, data) => (
  request({
    url: baseUrl + '/businessapprover/update/' + id,
    method: 'put',
    data
  })
)

// 特定审批人删除
export const deleteApprover = (id) => (
  request({
    url: baseUrl + '/businessapprover/delete/' + id,
    method: 'delete'
  })
)

// 特定审批人编号唯一性校验
export const validateNumber = (data) => (
  request({
    url: baseUrl + '/businessapprover/validate',
    method: 'post',
    data
  })
)

// 流程配置列表
export const getConfig = (data) => (
  request({
    url: baseUrl + '/flowconfig/page',
    method: 'post',
    data
  })
)

// 流程配置新增-基本信息
export const addConfigBase = (data) => (
  request({
    url: baseUrl + '/flowconfig/add',
    method: 'post',
    data
  })
)

// 流程配置修改-基本信息
export const editConfigBase = (data, id) => (
  request({
    url: baseUrl + '/flowconfig/put/' + id,
    method: 'put',
    data
  })
)

// 流程配置新增 - 流程图保存
export const saveConfigProcess = (data) => (
  request({
    url: baseUrl + '/flowconfig/addFlow',
    method: 'post',
    data
  })
)

// 流程配置 - 流程图默认配置发布
export const releaseDefault = (data) => (
  request({
    url: baseUrl + '/flowconfig/releaseDefaultConfig',
    method: 'post',
    data
  })
)

// 流程配置 - 流程图默认配置发布 - 自定义
export const releaseCustom = (data) => (
  request({
    url: baseUrl + '/flowconfig/releaseCustomConfig',
    method: 'post',
    data
  })
)

// 流程记录
export const getProcessRecord = (data) => (
  request({
    url: baseUrl + '/process/getApproveRecord',
    method: 'post',
    data
  })
)

// 流程配置 --删除
export const delConfig = (id) => (
  request({
    url: baseUrl + '/flowconfig/delete/' + id,
    method: 'delete'
  })
)

// 待我审批列表
export const getWaitApprove = (data) => (
  request({
    url: baseUrl + '/myApprove/waitApprove',
    method: 'post',
    data
  })
)

// 我已审批列表
export const getApproved = (data) => (
  request({
    url: baseUrl + '/myApprove/approved',
    method: 'post',
    data
  })
)

// 抄送我的列表
export const getCcToMe = (data) => (
  request({
    url: baseUrl + '/myApprove/ccToMe',
    method: 'post',
    data
  })
)

// 我发起的列表
export const getStartByMe = (data) => (
  request({
    url: baseUrl + '/myApprove/startByMe',
    method: 'post',
    data
  })
)

// 流程配置详情获取
export const getConfigId = (id) => (
  request({
    url: baseUrl + '/flowconfig/get/' + id,
    method: 'get'
  })
)

// 流程配置的校验
export const validateFlow = (data) => (
  request({
    url: baseUrl + '/flowconfig/validateFlow',
    method: 'post',
    data
  })
)

// 流程配置取消发布
export const cancelRelease = (id) => (
  request({
    url: baseUrl + '/flowconfig/cancelRelease/' + id,
    method: 'post'
  })
)

// 流程配置恢复默认配置
export const restoreDefault = (id) => (
  request({
    url: baseUrl + '/flowconfig/resume/' + id,
    method: 'put'
  })
)

// 审批操作信息获取
export const getOperaInfo = (data) => (
  request({
    url: baseUrl + '/process/getActionInfo',
    method: 'post',
    data
  })
)
// 审批操作同意
export const btnAgree = (data) => (
  request({
    url: baseUrl + '/process/approve',
    method: 'post',
    data
  })
)

// 审批操作确认
export const btnConfirm = (data) => (
  request({
    url: baseUrl + '/process/confirm',
    method: 'post',
    data
  })
)

// 审批操作拒绝
export const btnRefuse = (data) => (
  request({
    url: baseUrl + '/process/reject',
    method: 'post',
    data
  })
)

// 审批操作退回
export const btnReturn = (data) => (
  request({
    url: baseUrl + '/process/returned',
    method: 'post',
    data
  })
)

// 审批操作转交
export const btnForward = (data) => (
  request({
    url: baseUrl + '/process/transfer',
    method: 'post',
    data
  })
)

// 审批操作抄送
export const btnCC = (data) => (
  request({
    url: baseUrl + '/process/cc',
    method: 'post',
    data
  })
)

// 审批操作评论
export const btnComment = (data) => (
  request({
    url: baseUrl + '/process/comment',
    method: 'post',
    data
  })
)

// 审批操作提交审批
export const btnSubmit = (data) => (
  request({
    url: baseUrl + '/process/sumbit',
    method: 'post',
    data
  })
)
// 预览流程
export const previewProcess = (data) => (
  request({
    url: baseUrl + '/process/preview',
    method: 'post',
    data
  })
)

// 读取抄送的流程
export const readCcProcess = (taskId) => (
  request({
    url: baseUrl + '/myApprove/read/' + taskId,
    method: 'get'
  })
)

// 撤销流程
export const previewCancel = (data) => (
  request({
    url: baseUrl + '/process/cancel',
    method: 'post',
    data
  })
)

// 自定义配置添加
export const customConfigAdd = (data) => (
  request({
    url: baseUrl + '/flowconfig/customAdd',
    method: 'post',
    data
  })
)

// 自定义配置修改
export const customConfigEdit = (data, id) => (
  request({
    url: baseUrl + '/flowconfig/customPut/' + id,
    method: 'put',
    data
  })
)

// 流程配置复制-默认
export const copyDefault = (data) => (
  request({
    url: baseUrl + '/flowconfig/copyDefault',
    method: 'post',
    data
  })
)

// 流程配置复制-自定义
export const copyCustom = (data) => (
  request({
    url: baseUrl + '/flowconfig/customCopy',
    method: 'post',
    data
  })
)
