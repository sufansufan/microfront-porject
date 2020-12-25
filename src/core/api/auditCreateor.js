// @ts-check
import request from './config/axios'
/** @type string */
const baseUrl = '/auditmanage/api/accessAuthorization'

export class AuditModel {
  getTableList(data) {
    // return "获得数据"
    return request({
      url: `${baseUrl}/page`,
      method: 'POST',
      data
    })
  }

  getAuditFlow(data) {
    return request({
      url: `${baseUrl}/logs`,
      method: 'POST',
      data
    })
  }

  getLogTable(data) {
    return request({
      url: `${baseUrl}/dbLogs`,
      method: 'POST',
      data
    })
  }
  visitAuthorize(data) {
    return request({
      url: `${baseUrl}/authorize`,
      method: 'POST',
      data
    })
  }
}
