import request from './config/axios'

const baseUrl = '/platform'

// 文件上传首次查询id 获取附件
export const fileLoad = (dataId, typeCode) => (
  request({
    url: `${baseUrl}/accessoryfile/load/${dataId}/${typeCode}`,
    method: 'get'
  })
)

// 删除文件--注释
export const deleteFile = (fileId, isSyn = true) => (
  request({
    url: `${baseUrl}/accessoryfile/delete/${fileId}/${isSyn}`,
    method: 'delete'
  })
)

// 查看下载附件
export const downLoadFile = (fileId) => (
  request({
    url: baseUrl + '/accessoryfile/download/' + fileId,
    method: 'get',
    responseType: 'arraybuffer'
  })
)
//  图片排序
export const updateSort = (data) => (
  request({
    url: baseUrl + '/accessoryfile/updateSort',
    method: 'post',
    data
  })
)
// copy文件
export const copyFileList = (data) => (
  request({
    url: baseUrl + '/accessoryfile/copy/false',
    method: 'post',
    data
  })
)

// / 合作企业 文件查询  删除文件 copy文件
const baseUrlCoop = '/cooperativeunit'
// 文件查询
export const fileLoadCoop = (dataId, typeCode) => (
  request({
    url: `${baseUrlCoop}/accessoryfile/load/${dataId}/${typeCode}`,
    method: 'get'
  })
)
// 删除文件
export const deleteFileCoop = (fileId, isSyn = true) => (
  request({
    url: `${baseUrlCoop}/accessoryfile/delete/${fileId}/${isSyn}`,
    method: 'delete'
  })
)
// copy文件
export const copyFile = (data) => (
  request({
    url: baseUrlCoop + '/accessoryfile/copy/false',
    method: 'post',
    data
  })
)

// 查看下载附件
export const exportFile = (fileId) => (
  request({
    url: baseUrlCoop + '/accessoryfile/download/' + fileId,
    method: 'get',
    responseType: 'arraybuffer'
  })
)

// // 通过businessDataId查询附件
export const fileLoadNot = (businessDataId) => (
  request({
    url: baseUrlCoop + '/accessoryfile/loadNoTypeCode/' + businessDataId,
    method: 'get'
  })
)

// base64转成url
export const base64ChangeUrl = (data) => (
  request({
    url: baseUrl + '/accessoryfile/uploadBase64',
    method: 'post',
    data
  })
)
