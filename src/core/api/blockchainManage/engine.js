import request from '../config/axios'
const baseUrl = '/blockchainmanager/engine'

export const findConsortiumList = (platform, data) => (
  request({
    url: baseUrl + "/" + platform + "/app/list",
    method: 'post',
    data
  })
)

export const findChainCodeList = (platform, data) => (
    request({
        url: baseUrl + "/" + platform + "/chaincode/list",
        method: 'post',
        data
    })
)

export const findNodeList = (platform, data) => (
    request({
        url: baseUrl + "/" + platform + "/node/list",
        method: 'post',
        data
    })
)

export const findUserList = (platform, data) => (
    request({
        url: baseUrl + "/" + platform + "/user/list",
        method: 'post',
        data
    })
)

