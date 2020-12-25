export default {
  id: 'orgStructure',
  name: '组织架构',
  leaf: false,
  children: [
    {
      id: 'postManage',
      name: '岗位管理',
      leaf: true,
      page: '/postManage',
      puzzle: 'orgStructure',
      cache: true,
      children: [
        {
          id: 'postInfo',
          name: '新增岗位,修改岗位,查看岗位',
          leaf: true,
          page: '/postInfo',
          puzzle: 'orgStructure'
        },
        {
          id: 'setPostAuthority',
          name: '设置权限,修改权限,查看权限',
          leaf: true,
          page: '/setPostAuthority',
          puzzle: 'orgStructure'
        },
        {
          id: 'seePostAuthority',
          name: '查看权限',
          leaf: true,
          page: '/seePostAuthority',
          puzzle: 'orgStructure'
        }
      ]
    },
    {
      id: 'orgManage',
      name: '组织管理',
      leaf: true,
      page: '/orgManage',
      puzzle: 'orgStructure',
      cache: true,
      children: [
        {
          id: 'orgManageAdd',
          name: '新增组织,修改组织,查看组织',
          leaf: true,
          page: '/orgManageAdd',
          puzzle: 'orgStructure'
        },
        {
          id: 'organizationSee',
          name: '新增组织,修改组织,查看组织',
          leaf: true,
          page: '/organizationSee',
          puzzle: 'orgStructure'
        },
        {
          id: 'organizationEdit',
          name: '新增组织,修改组织,查看组织',
          leaf: true,
          page: '/organizationEdit',
          puzzle: 'orgStructure'
        },
        {
          id: 'importOrg',
          name: '导入组织',
          leaf: true,
          page: '/importOrg',
          puzzle: 'orgStructure'
        }
      ]
    },
    {
      id: 'employeeManage',
      name: '员工管理',
      leaf: true,
      cache: true,
      page: '/employeeManage',
      puzzle: 'orgStructure',
      children: [
        {
          id: 'employeeAdd',
          name: '新增员工',
          leaf: true,
          page: '/employeeAdd',
          puzzle: 'orgStructure'
        },
        {
          id: 'employeeInfo',
          name: '新增员工,修改员工,查看员工',
          leaf: true,
          page: '/employeeInfo',
          puzzle: 'orgStructure'
        },
        {
          id: 'importEmployee',
          name: '导入员工',
          leaf: true,
          page: '/importEmployee',
          puzzle: 'orgStructure'
        }
      ]
    }
  ],
  icon: 'puzzle',
  puzzle: 'orgStructure',
  version: '0.1.0',
  host: '/puzzles'
}
