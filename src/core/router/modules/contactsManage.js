export default {
  id: 'contactsManage',
  name: '联系人管理',
  leaf: false,
  icon: 'puzzle',
  children: [
    {
      id: 'contactsManage',
      name: '联系人管理',
      leaf: true,
      page: '/contactsManage',
      puzzle: 'contactsManage',
      children: [
        {
          id: 'contactsAdd',
          name: '新增',
          leaf: true,
          page: '/add',
          puzzle: 'contactsManage'
        },
        {
          id: 'contactsEdit',
          name: '修改',
          leaf: true,
          page: '/edit',
          puzzle: 'contactsManage'
        },
        {
          id: 'contactsDelete',
          name: '删除',
          leaf: true,
          page: '/delete',
          puzzle: 'contactsManage'
        }
      ]
    }
  ],
  puzzle: 'contactsManage',
  version: '0.1.0',
  host: '/puzzles'
}
