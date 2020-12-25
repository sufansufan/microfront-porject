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
      cache: true,
      children: [
        {
          id: 'resourceAdd',
          name: '新增资源,修改资源,查看资源',
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
      cache: true,
      page: '/applicationConfig',
      puzzle: 'systemManage'
    },
    {
      id: 'roleManage',
      name: '角色管理',
      leaf: true,
      cache: true,
      page: '/roleManage',
      puzzle: 'systemManage',
      children: [
        {
          id: 'addrole',
          name: '新增角色,修改角色,查看角色',
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
      cache: true,
      page: '/applicationEmpower',
      puzzle: 'systemManage',
      children: [
        {
          id: 'addpost',
          name: '新增,修改,查看',
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
