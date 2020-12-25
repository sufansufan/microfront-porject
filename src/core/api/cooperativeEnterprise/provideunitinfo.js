import request from '../config/axios'
const baseUrl = '/cooperativeunit'
// 添加提供给其他单位的企业信息
export const provideAdd = (data) => (
  request({
    url: baseUrl + '/provideunitinfo/save',
    method: 'post',
    data
  })
)
export const provideUpdate = (data) => (
  request({
    url: baseUrl + '/provideunitinfo/update',
    method: 'post',
    data
  })
)
// 提供给其他单位的企业信息集合
export const providelist = (operateinfoId) => (
  request({
    url: baseUrl + '/provideunitinfo/list/' + operateinfoId,
    method: 'post'
  })
)

// 完善信息时的取消操作
export const cancelDel = (operateinfoId) => (
  request({
    url: baseUrl + '/operateinfo/delete/' + operateinfoId,
    method: 'delete'
  })
)
