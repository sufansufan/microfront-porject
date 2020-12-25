import request from '../config/axios'
const baseUrl = '/blockchainmanager/contract'

export const findContractList = (data) => (
  request({
    url: baseUrl + "/list",
    method: 'post',
    data
  })
)

export const findContractFunction = (data) => (
    request({
        url: baseUrl + '/functionList',
        method: 'post',
        data
    })
)
