export default {
  id: 'blockchainManage',
  name: '区块链管理',
  leaf: false,
  icon: 'puzzle',
  children: [
    {
      id: 'appManage',
      name: '应用管理',
      leaf: true,
      page: '/appManage',
      puzzle: 'blockchainManage',
      children: [
        {
          id: 'list',
          name: '应用列表',
          leaf: true,
          page: '/index',
          puzzle: 'blockchainManage'
        },
        {
          id: 'create',
          name: '创建应用',
          leaf: true,
          page: '/create',
          puzzle: 'blockchainManage'
        },
        {
          id: 'detail',
          name: '详情',
          leaf: true,
          page: '/detail',
          puzzle: 'blockchainManage'
        }
      ]
    },
    {
      id: 'userCert',
      name: '用户证书',
      leaf: true,
      page: '/userCert',
      puzzle: 'blockchainManage',
      children: [
        {
          id: 'certGen',
          name: '证书生成',
          leaf: true,
          page: '/certGen',
          puzzle: 'blockchainManage'
        }
      ]
    }
  ],
  puzzle: 'blockchainManage',
  version: '0.1.0',
  host: '/puzzles'
}
