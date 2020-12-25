import request from '../config/axios'
const baseUrl = '/blockchainmanager/cert'

export const genCert = (data) => (
  request({
    url: baseUrl + '/genCert',
    method: 'post',
    data
  })
)

export const prkSign = (data) => (
    request({
        url: baseUrl + '/prkSign',
        method: 'post',
        data
    })
)

export const exportCert = (data) => (
    request({
        url: baseUrl + '/exportCert',
        method: 'post',
        data
    })
)
