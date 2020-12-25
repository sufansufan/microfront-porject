import request from './config/axios'
const baseUrl = '/personalset'

// 个人设置--获取个人头像
export const getHeadImg = () => (
  request({
    url: baseUrl + '/userheadimg/getHeadImg',
    method: 'get'
  })
)

// 员工管理-头像根据id获取头像
export const getIdHeadImg = (data) => (
  request({
    url: baseUrl + '/userheadimg/getHeadImgs',
    method: 'post',
    data
  })
)

// 个人设置--设置个人头像
export const saveHeadImg = (data) => (
  request({
    url: baseUrl + '/userheadimg/save',
    method: 'post',
    data
  })
)

// 个人设置--更新个人头像
export const updateHeadImg = (data) => (
  request({
    url: baseUrl + '/userheadimg/update',
    method: 'post',
    data
  })
)

// 常用语保存
export const languageSave = (data) => (
  request({
    url: baseUrl + '/commonlyevaluation/save',
    method: 'post',
    data
  })
)

// 常用语删除
export const languageDelete = (id) => (
  request({
    url: baseUrl + '/commonlyevaluation/' + id,
    method: 'delete'
  })
)

// 获取常用语
export const languageList = () => (
  request({
    url: baseUrl + '/commonlyevaluation/list',
    method: 'get'
  })
)

// 报表设置-或者所有的报表的权限和报表项
export const getAllReportPower = () => (
  request({
    url: baseUrl + '/reportitem/getAllReportItem',
    method: 'get'
  })
)

// 报表设置-交换顺序保存
export const changeReportSortSave = (data) => (
  request({
    url: baseUrl + '/reportitem/addReportItem',
    method: 'post',
    data
  })
)

// 报表设置-更新
export const updateReportSortSave = (data) => (
  request({
    url: baseUrl + '/reportitem/updateReportItem',
    method: 'put',
    data
  })
)

// 报表设置-删除
export const deleteReportSetting = (id) => (
  request({
    url: baseUrl + '/reportitem/deleteItem/' + id,
    method: 'delete'
  })
)

// 首页-报表头信息
export const homeMyReportTab = () => (
  request({
    url: baseUrl + '/reportitem/getMyReportTab',
    method: 'get'
  })
)

// 首页-查询我的统计
export const getHomeMyReportItem = () => (
  request({
    url: baseUrl + '/reportitem/getMyReportItem',
    method: 'get'
  })
)

// 首页-查询tab切换顺序
export const homeUpdateReportItem = (data) => (
  request({
    url: baseUrl + '/reportitem/updateReportItem',
    method: 'put',
    data
  })
)

// 首页-根据资源查询报表
export const homeResourceReport = (id) => (
  request({
    url: baseUrl + '/reportitem/getReportItem/' + id,
    method: 'get'
  })
)
