import request from './config/axios'
const baseUrl = '/platform/accessorytype'

// 系统管理-应用配置-附件类型
// 查询列表
export const getEnclosureList = (data) => (
  request({
    url: baseUrl + '/query',
    method: 'post',
    data
  })
)
// 保存
export const saveEnclosure = (data) => (
  request({
    url: baseUrl + '/save',
    method: 'post',
    data
  })
)

// 修改
export const updateEnclosure = (data) => (
  request({
    url: baseUrl + '/update',
    method: 'put',
    data
  })
)

// 删除
export const deleteEnclosure = (id) => (
  request({
    url: baseUrl + '/' + id,
    method: 'delete'
  })
)
