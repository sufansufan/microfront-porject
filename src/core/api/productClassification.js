import request from './config/axios'
const baseUrl = '/productclassmanager/productclass'
/**
 * 获取线上环境的二级域名
 */
// 查询所有的产品分类，树形结构
export const getLeftTree = (data) => (
  request({
    url: baseUrl + '/getLeftTree',
    method: 'get'
  })
)

//  产品分类分页
export const getPage = (data) => (
  request({
    url: baseUrl + '/page',
    method: 'post',
    data
  })
)

// 添加产品分类
export const addProductclass = (data) => (
  request({
    url: baseUrl + '/add',
    method: 'post',
    data
  })
)

// 产品分类获取
export const getOne = (id) => (
  request({
    url: baseUrl + '/get/' + id,
    method: 'get'
  })
)

// 产品分类修改
export const updateProductclass = (data, id) => (
  request({
    url: baseUrl + '/update/' + id,
    method: 'put',
    data
  })
)

// 产品分类删除
export const deleteOne = (id) => (
  request({
    url: baseUrl + '/delete/' + id,
    method: 'delete'
  })
)
// 产品分类停用
export const stopProduct = (id) => (
  request({
    url: baseUrl + '/stop/' + id,
    method: 'put'
  })
)
// 产品分类恢复
export const restartProduct = (id) => (
  request({
    url: baseUrl + '/resume/' + id,
    method: 'put'
  })
)
// 设置产品属性
export const addProperty = (data) => (
  request({
    url: baseUrl + '/addProperty',
    method: 'post',
    data
  })
)

// 导出
export const orgExport = (data) => (
  request({
    url: baseUrl + '/exportOrganizationInfo',
    method: 'post',
    data
  })
)
// 材料信息 左侧树查询一级，二级，三级分类，树形结构
export const getAllTree = (data) => (
  request({
    url: baseUrl + '/getLeftTreeForProduct',
    method: 'get',
    data
  })
)

// 材料信息 左侧树查询一级，二级分类，树形结构
export const getTwoLeveTree = (data) => (
  request({
    url: baseUrl + '/getTwoLevelTree',
    method: 'post',
    data
  })
)
// 材料信息 产品分类下拉树
export const getSelectTree = (data) => (
  request({
    url: baseUrl + '/getThreeLevelTree',
    method: 'get',
    data
  })
)
