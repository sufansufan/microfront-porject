// 财务类别管理
import request from '../config/axios'
const baseUrl = '/financeclassmanager'
// 添加财务类别
export const financeclassAdd = (data) => (
  request({
    url: baseUrl + '/financeclass/save',
    method: 'post',
    data
  })
)
// 查询上级类别
export const getParentFinanceClass = (data) => (
  request({
    url: baseUrl + '/financeclass/getParentFinanceClass',
    method: 'get'
  })
)
// 财务分类列表
export const financeclassList = (data) => (
  request({
    url: baseUrl + '/financeclass/page',
    method: 'post',
    data
  })
)

// 财务类别不分页
export const financeclassAll = (data) => (
  request({
    url: baseUrl + '/financeclass/list',
    method: 'post',
    data
  })
)

// 财务类别不分页 --- 财务类别所有数据 ---发票归类
export const financeclassAllList = (data) => (
  request({
    url: baseUrl + '/financeclass/allList',
    method: 'post',
    data
  })
)

// 财务类别根据应业务查询
export const financeCalssByBusiness = (data) => (
  request({
    url: baseUrl + '/financeclass/getByBusiness',
    method: 'post',
    data
  })
)

// 财务类别左侧树
export const getLeftTree = (data) => (
  request({
    url: baseUrl + '/financeclass/getLeftTree',
    method: 'get'
  })
)
// 检验类别编号或者类别名称是否唯一可用
export const validate = (data) => (
  request({
    url: baseUrl + '/financeclass/validate',
    method: 'post',
    data
  })
)
// 财务类别修改
export const upClassdata = (data, id) => (
  request({
    url: `${baseUrl}/financeclass/update/${id}`,
    method: 'put',
    data
  })
)
// 财务类别是否可以修改
export const canUpdate = (id) => (
  request({
    url: `${baseUrl}/financeclass/canUpdate/${id}`,
    method: 'get'
  })
)
// 财务类别删除
export const deleteClass = (id) => (
  request({
    url: `${baseUrl}/financeclass/delete/${id}`,
    method: 'delete'
  })
)
// 获取财务类别详情
export const getClassDetail = (id) => (
  request({
    url: `${baseUrl}/financeclass/get/${id}`,
    method: 'get'
  })
)
