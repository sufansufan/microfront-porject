import request from '../config/axios'
const baseUrl = '/blockchainmanager/app'

export const createApp = (data) => (
  request({
    url: baseUrl,
    method: 'post',
    data
  })
)

export const updateApp = (id, data) => (
    request({
        url: baseUrl + '/' +id,
        method: 'put',
        data
    })
)

export const getTableList = (data) => (
    request({
        url: baseUrl + '/page',
        method: 'post',
        data
    })
)

export const checkAppName = (appName) => (
    request({
        url: baseUrl + '/checkAppName?appName='+appName,
        method: 'get'
    })
)

export const getAppById = (id) => (
    request({
        url: baseUrl + '/'+id,
        method: 'get'
    })
)

export const disableApp = (id) => (
    request({
        url: baseUrl + '/disable/'+id,
        method: 'put'
    })
)

export const enableApp = (id) => (
    request({
        url: baseUrl + '/enable/'+id,
        method: 'put'
    })
)
