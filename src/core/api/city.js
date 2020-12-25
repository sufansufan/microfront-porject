import request from './config/axios'

const baseUrl = '/city/city'

export const getCity = (data = {}) => (
  request({
    url: baseUrl + '/getTree',
    method: 'get',
    params: data
  })
)
