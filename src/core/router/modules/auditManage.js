export default {
  id: 'auditManage',
  name: '审计相关',
  leaf: false,
  children: [{
    id: 'auditHome',
    name: '审计记录',
    cache: true,
    leaf: true,
    page: '/auditHome',
    puzzle: 'aboutAudit',
    children: [{
      id: 'auditDetail',
      name: '审计详情',
      leaf: true,
      page: '/auditDetail',
      puzzle: 'aboutAudit'
    }]
  },
  {
    id: 'sshkey',
    name: '认证管理',
    cache: true,
    leaf: true,
    page: '/sshkey',
    puzzle: 'aboutAudit'
  }],
  icon: 'puzzle',
  puzzle: 'aboutAudit',
  version: '0.1.0',
  host: '/puzzles'
}
