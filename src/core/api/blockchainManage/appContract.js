import request from '../config/axios'
const baseUrl = '/blockchainmanager/app/contract'

export const createContract = (data) => (
  request({
    url: baseUrl,
    method: 'post',
    data
  })
)

export const updateContract = (id, data) => (
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

export const getContractById = (id) => (
    request({
        url: baseUrl + '/'+id,
        method: 'get'
    })
)

export const deleteContractById = (id) => (
    request({
        url: baseUrl + '/'+id,
        method: 'delete'
    })
)

export const checkAppContract = (appId, contractId) => (
    request({
        url: baseUrl + '/checkAppContract?appId='+appId+"&contractId="+contractId,
        method: 'get'
    })
)
