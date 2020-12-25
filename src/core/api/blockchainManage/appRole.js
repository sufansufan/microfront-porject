import request from '../config/axios'
const baseUrl = '/blockchainmanager/appRole'

export const createRole = (data) => (
  request({
    url: baseUrl,
    method: 'post',
    data
  })
)

export const updateRole = (id, data) => (
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

export const getRoleById = (id) => (
    request({
        url: baseUrl + '/'+id,
        method: 'get'
    })
)

export const deleteRoleById = (id) => (
    request({
        url: baseUrl + '/'+id,
        method: 'delete'
    })
)

export const checkRoleName = (roleName) => (
    request({
        url: baseUrl + '/checkRoleName?roleName='+roleName,
        method: 'get'
    })
)
