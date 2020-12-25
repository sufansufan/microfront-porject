export default {
  id: 'sealManagement',
  name: '印信管理',
  leaf: false,
  children: [
    {
      id: 'applicationcommission',
      name: '介委授申请',
      leaf: true,
      page: '/applicationcommission',
      puzzle: 'sealManagement',
      children: [
        {
          id: 'newapplications',
          name: '新增',
          leaf: true,
          page: '/newapplications',
          puzzle: 'sealManagement'
        },
        {
          id: 'viewapplication',
          name: '查看',
          leaf: true,
          page: '/viewapplication',
          puzzle: 'sealManagement'
        }
      ]

    },
    {
      id: 'corroborateinformation',
      name: '印证信息',
      leaf: true,
      page: '/corroborateinformation',
      puzzle: 'sealManagement',
      children: [
        {
          id: 'viewverification',
          name: '查看',
          leaf: true,
          page: '/viewverification',
          puzzle: 'sealManagement'
        }
      ]
    },

    {
      id: 'verificationapplication',
      name: '印证申请',
      leaf: true,
      page: '/verificationapplication',
      puzzle: 'sealManagement',
      children: [
        {
          id: 'newapplication',
          name: '新增',
          leaf: true,
          page: '/newapplication',
          puzzle: 'sealManagement'
        },
        {
          id: 'viewapplications',
          name: '查看',
          leaf: true,
          page: '/viewapplications',
          puzzle: 'sealManagement'
        },
        {
          id: 'addnextstep',
          name: '新增下一步',
          leaf: true,
          page: '/addnextstep',
          puzzle: 'sealManagement'
        }
      ]

    }
  ],
  icon: 'puzzle',
  puzzle: 'sealManagement',
  version: '0.1.0',
  host: '/puzzles'
}
