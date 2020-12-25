import request from '../config/axios'
const baseUrl = '/companyaudit'

// 运营平台-注册服务-审核通过
export const auditApproval = (data, id) => (
  request({
    url: baseUrl + '/audit/auditApproval/' + id,
    method: 'post',
    data
  })
)

// 运营平台-注册服务-审核不通过
export const auditNotApproval = (data, id) => (
  request({
    url: baseUrl + '/audit/auditNotApproval/' + id,
    method: 'post',
    data
  })
)

// 运营平台-注册服务管理-企业服务设置
export const updateSetting = (data) => (
  request({
    url: baseUrl + '/audit/updateSetting',
    method: 'post',
    data
  })
)

// 运营平台-注册服务管理-获取审核人
export const getOperationsta = (data) => (
  request({
    url: baseUrl + '/operationstafftel/getOperationstafftel',
    method: 'post',
    data
  })
)

// 运营平台-文件下载
export const fileDownLoad = (id) => (
  request({
    url: baseUrl + '/audit/downloadBusinessLicense/' + id,
    method: 'get',
    responseType: 'arraybuffer'
  })
)

// 运营平台-提醒手机号设置
export const updateReminderPhone = (data) => (
  request({
    url: baseUrl + '/operationstafftel/save',
    method: 'post',
    data
  })
)
