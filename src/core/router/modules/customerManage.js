export default {
  id: 'customerManage',
  name: '客户管理',
  leaf: false,
  icon: 'puzzle',
  children: [
    {
      id: 'customerManage',
      name: '客户管理',
      leaf: true,
      cache: true,
      page: '/index',
      puzzle: 'customerManage'
    },
    {
      id: 'customerDetails',
      name: '客户相关信息',
      leaf: true,
      page: '/customerDetails',
      puzzle: 'customerManage'
    },
    {
      id: 'customerEdit',
      name: '修改',
      leaf: true,
      page: '/customerEdit',
      puzzle: 'customerManage'
    },
    {
      id: 'contactsCustomerAdd',
      name: '联系人新增',
      leaf: true,
      page: '/add',
      puzzle: 'customerManage'
    },
    {
      id: 'contactsCustomerEdit',
      name: '联系人修改',
      leaf: true,
      page: '/edit',
      puzzle: 'customerManage'
    }
  ],
  puzzle: 'customerManage',
  version: '0.1.0',
  host: '/puzzles'
}
