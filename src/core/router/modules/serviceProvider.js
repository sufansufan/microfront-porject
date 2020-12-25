export default {
  id: 'serviceProvider',
  name: '服务商',
  leaf: false,
  children: [
    {
      id: 'serviceProviderManage',
      name: '服务商',
      leaf: true,
      page: '/serviceProviderManage',
      puzzle: 'serviceProvider',
      cache: true,
      children: [
        {
          id: 'serviceAdd',
          name: '新增',
          leaf: true,
          page: '/add',
          puzzle: 'serviceProvider'
        },
        {
          id: 'serviceEdit',
          name: '新增,修改,查看',
          leaf: true,
          page: '/edit',
          puzzle: 'serviceProvider'
        },
        {
          id: 'serviceDetails',
          name: '新增,修改,查看',
          leaf: true,
          page: '/details',
          puzzle: 'serviceProvider'
        },
        {
          id: 'importService',
          name: '导入',
          leaf: true,
          page: '/importService',
          puzzle: 'serviceProvider'
        }
      ]
    }
  ],
  icon: 'puzzle',
  puzzle: 'serviceProvider',
  version: '0.1.0',
  host: '/puzzles'
}
