import request from '../config/axios'
const baseUrl = '/devicemanager'

// 设备名录-列表查询
export const queryDirectoriesList = (data) => (
  request({
    url: baseUrl + '/devicecatalogues/list',
    method: 'post',
    data
  })
)

// 设备名录-查询所有列表数据
export const queryDirectoriesAll = (data) => (
  request({
    url: baseUrl + '/devicecatalogues/findAll',
    method: 'post',
    data
  })
)

// 设备名录-根据ID获取设备名录
export const getDirectoriesFromId = (id) => (
  request({
    url: baseUrl + '/devicecatalogues/getById/' + id,
    method: 'get'
  })
)

// 设备名录-新增设备名录
export const addDirectories = (data) => (
  request({
    url: baseUrl + '/devicecatalogues/save',
    method: 'post',
    data
  })
)

// 设备名录-修改设备名录
export const editDirectories = (data) => (
  request({
    url: baseUrl + '/devicecatalogues/update',
    method: 'put',
    data
  })
)

// 设备名录-删除设备名录
export const deleteDirectories = (id) => (
  request({
    url: baseUrl + '/devicecatalogues/delete/' + id,
    method: 'delete'
  })
)

// 设备名录-下架设备名录
export const stopDirectories = (id) => (
  request({
    url: baseUrl + '/devicecatalogues/stopUse/' + id,
    method: 'put'
  })
)

// 设备名录-恢复设备名录
export const reciverDirectories = (id) => (
  request({
    url: baseUrl + '/devicecatalogues/recover/' + id,
    method: 'put'
  })
)

// 设备名录-新增设备-不可以增加已下架的设备名录
export const addEquipment = (data) => (
  request({
    url: baseUrl + '/deviceproducts/save',
    method: 'post',
    data
  })
)

// 设备名录-新增设备-可以增加已下架的设备名录
export const addStopEquipment = (data) => (
  request({
    url: baseUrl + '/deviceproducts/saveStopUse',
    method: 'post',
    data
  })
)

// 设备名录-获取历史价格
export const queryPrice = (data) => (
  request({
    url: baseUrl + '/devicehistoryprice/list',
    method: 'post',
    data
  })
)

// 设备名录-获取设备集合
export const queryEquipmentList = (data) => (
  request({
    url: baseUrl + '/deviceproducts/list',
    method: 'post',
    data
  })
)

// 设备名录-设备清单-修改设备
export const editEquipmentItem = (data) => (
  request({
    url: baseUrl + '/deviceproducts/update',
    method: 'put',
    data
  })
)

// 设备名录-设备清单-删除设备
export const deleteEquipmentItem = (id) => (
  request({
    url: baseUrl + '/deviceproducts/' + id,
    method: 'delete'
  })
)

// 设备名录-设备清单-单条获取设备
export const getEquipmentItem = (id) => (
  request({
    url: baseUrl + '/deviceproducts/' + id,
    method: 'get'
  })
)

// 入库管理-列表查询
export const queryLibraryList = (data) => (
  request({
    url: baseUrl + '/devicestorage/list',
    method: 'post',
    data
  })
)

// 入库管理-添加入库
export const addLibrary = (data) => (
  request({
    url: baseUrl + '/devicestorage/save',
    method: 'post',
    data
  })
)

// 入库管理-获取设备入库信息
export const getLibraryInfo = (id) => (
  request({
    url: baseUrl + '/devicestorage/' + id,
    method: 'get'
  })
)

//  查询全部设备
export const queryAllEquipment = (data) => (
  request({
    url: baseUrl + '/deviceproducts/AllList',
    method: 'post',
    data
  })
)

// 获取设备设备统计的list
export const queryStatisticsList = (data) => (
  request({
    url: baseUrl + '/devicestatistics/list',
    method: 'post',
    data
  })
)
