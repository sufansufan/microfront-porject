export default {
  id: 'systemManage',
  name: '系统管理',
  leaf: false,
  children: [
    {
      id: 'resourceManage',
      name: '资源管理',
      leaf: true,
      page: '/resourceManage',
      puzzle: 'systemManage',
      children: [
        {
          id: 'resourceAdd',
          name: '新增',
          leaf: true,
          page: '/resourceAdd',
          puzzle: 'systemManage'
        }
      ]
    },
    {
      id: 'applicationConfig',
      name: '应用配置',
      leaf: true,
      page: '/applicationConfig',
      puzzle: 'systemManage'
    },
    {
      id: 'roleManage',
      name: '角色管理',
      leaf: true,
      page: '/roleManage',
      puzzle: 'systemManage',
      children: [
        {
          id: 'addrole',
          name: '资源管理',
          leaf: true,
          page: '/addrole',
          puzzle: 'systemManage'
        }
      ]
    },
    {
      id: 'applicationEmpower',
      name: '应用授权',
      leaf: true,
      page: '/applicationEmpower',
      puzzle: 'systemManage',
      children: [
        {
          id: 'addpost',
          name: '资源管理',
          leaf: true,
          page: '/addpost',
          puzzle: 'systemManage'
        }
      ]
    }

  ],
  icon: 'puzzle',
  puzzle: 'systemManage',
  version: '0.1.0',
  host: '/puzzles'
}
