export default {
  id: 'auditManageSys',
  name: '审计管理',
  leaf: false,
  icon: 'puzzle',
  children: [
    {
      id: 'accessAuthorization',
      name: '访问授权',
      leaf: true,
      page: '/accessAuthorization',
      puzzle: 'auditManageSys',
      children: [
        {
          id: 'authorizeDetail',
          name: '详情',
          leaf: true,
          page: '/detail/index',
          puzzle: 'auditManageSys'
        },
        {
          id: 'accessDB',
          name: '访问数据库',
          leaf: true,
          page: '/accessDB',
          puzzle: 'auditManageSys'
        }
      ]
    },
    {
      id: 'accessSecret',
      name: '访问密钥',
      leaf: true,
      page: '/accessSecret',
      puzzle: 'auditManageSys',
      children: [
        {
          id: 'secretAdd',
          name: '添加',
          leaf: true,
          page: '/secretAdd',
          puzzle: 'auditManageSys'
        }
      ]
    }
  ],
  puzzle: 'auditManageSys',
  version: '0.1.0',
  host: '/puzzles'
}
