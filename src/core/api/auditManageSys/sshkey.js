import request from '../config/axios'
const baseUrl = '/auditmanage/sshkey'

/*// 审计管理-SSH密钥-查询列表
export const getTableList = (data) => (
  request({
    url: baseUrl + '/page',
    method: 'post',
    data
  })
)
// 审计管理-SSH密钥-创建密钥
export const addKey = (data) => (
    request({
        url: baseUrl + '/add',
        method: 'post',
        data
    })
)

// 审计管理-SSH密钥-删除密钥
export const deleteKey = (id) => (
    request({
        url: baseUrl + '/delete/'+id,
        method: 'post'
    })
)*/
// 审计管理-认证管理-导出证书
export const exportCert = () => (
    request({
        url: baseUrl + '/exportCert',
        method: 'post'
    })
)
// 审计管理-认证管理-重置证书
export const resetCert = () => (
    request({
        url: baseUrl + '/resetCert',
        method: 'post'
    })
)

// 审计管理-认证管理-获取证书状态
export const getCertStatus = () => (
    request({
        url: baseUrl + '/getCertStatus',
        method: 'post'
    })
)
