import request from '../config/axios'
const baseUrl = '/cooperativeunit/operateinfo'
// 发送邀请合作
export const sendInvite = (data) => (
  request({
    url: baseUrl + '/invitation',
    method: 'post',
    data
  })
)
// 操作记录获取
export const getMesDetails = (id) => (
  request({
    url: baseUrl + '/getById/' + id,
    method: 'get',
    id
  })
)
// 处置邀请操作
export const dealInvitation = (data) => (
  request({
    url: baseUrl + '/dealInvitation',
    method: 'post',
    data
  })
)
// 处置被动方的反馈信息
export const dealInvitationFulback = (id, result) => (
  request({
    url: baseUrl + '/dealInvitationFullback/' + id + '/' + result,
    method: 'get'
  })
)
// 更新操作
export const updateOperate = (data) => (
  request({
    url: baseUrl + '/updateOperate',
    method: 'post',
    data
  })
)
// 处置更新操作
export const dealUpdateOperate = (id, result) => (
  request({
    url: baseUrl + '/dealUpdateOperate/' + id + '/' + result,
    method: 'post'
  })
)
// 终止合作
export const stopCooperate = (data) => (
  request({
    url: baseUrl + '/stopCooperate',
    method: 'post',
    data
  })
)
// 处理终止合作
export const dealStopCooperate = (id, result) => (
  request({
    url: baseUrl + '/dealStopCooperate/' + id + '/' + result,
    method: 'post'

  })
)

// 操作记录获取
export const operateinfo = (id) => (
  request({
    url: baseUrl + '/getById/' + id,
    method: 'get'
  })
)
// 查询 我通知的合作企业
export const myAction = (data, informationCode, organizationId) => (
  request({
    url: baseUrl + '/myAction/' + informationCode + '/' + organizationId,
    method: 'post',
    data
  })
)
// 查询 合作企业通知我的
export const hisAction = (data, myInformationCode, organizationId) => (
  request({
    url: baseUrl + '/hisAction/' + myInformationCode + '/' + organizationId,
    method: 'post',
    data
  })
)
// 查询 最新的 我提供的信息
export const history = (myInformationCode, organizationId) => (
  request({
    url: baseUrl + '/history/' + myInformationCode + '/' + organizationId,
    method: 'get'
  })
)
