import request from './config/axios'

const baseUrl = '/platform'

export const getDictionary = (data) => (
  request({
    url: baseUrl + '/dictionarys',
    method: 'get',
    params: data
  })
)

export const getDictionaryTree = (data) => (
  request({
    url: baseUrl + '/dictionarys/getTree',
    method: 'get',
    params: data
  })
)

export const addDictionary = (data) => (
  request({
    url: baseUrl + '/dictionarys',
    method: 'post',
    data
  })
)

export const updateDictionary = (data, id) => (
  request({
    url: baseUrl + '/dictionarys/' + id,
    method: 'put',
    data
  })
)

export const deleteDictionary = (data) => (
  request({
    url: baseUrl + '/dictionarys/' + data,
    method: 'delete'
  })
)

export const getDictionaryType = (data) => (
  request({
    url: baseUrl + '/dictionarytypes/tree',
    method: 'get',
    params: data
  })
)

export const addDictionaryeType = (data) => (
  request({
    url: baseUrl + '/dictionarytypes',
    method: 'post',
    data
  })
)

export const deleteDictionaryeType = (data) => (
  request({
    url: baseUrl + '/dictionarytypes/' + data,
    method: 'delete'
  })
)

export const updateDictionaryeType = (id, data) => (
  request({
    url: baseUrl + '/dictionarytypes/' + id,
    method: 'put',
    data
  })
)

// 获取字典类型值
export const getTypeCode = (data) => (
  request({
    url: baseUrl + '/dictionarys/bytypecode',
    method: 'get',
    params: data
  })
)

// 获取tree字典类型数据
export const getTreeTypeCode = (data) => (
  request({
    url: baseUrl + '/dictionarys/treebytypecode',
    method: 'get',
    params: data
  })
)

// 字典数据切换数据类型
export const switchDataType = (data) => (
  request({
    url: baseUrl + '/dictionarys/switchType',
    method: 'post',
    data
  })
)

// 数字字典类型的编号校验
export const dictionaryTypeCode = (data) => (
  request({
    url: baseUrl + '/dictionarytypes/validateDataUnique',
    method: 'post',
    data
  })
)

// 获取字典分类
export const dictionaryNopage = (data) => (
  request({
    url: baseUrl + '/dictionarytypes/nopage',
    method: 'get',
    params: data
  })
)
