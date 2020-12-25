// @ts-check
import request from '../config/axios'
/** @type string */
const baseUrl = '/auditmanage/accessAuthorization'

export class AuditModel {
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
}
