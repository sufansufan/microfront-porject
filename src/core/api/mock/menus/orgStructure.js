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
      children: [
        {
          id: 'postInfo',
          name: '',
          leaf: true,
          page: '/postInfo',
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
      children: [
        {
          id: 'orgManageAdd',
          name: '新增',
          leaf: true,
          page: '/orgManageAdd',
          puzzle: 'orgStructure'
        },
        {
          id: 'organizationSee',
          name: '查看',
          leaf: true,
          page: '/organizationSee',
          puzzle: 'orgStructure'
        },
        {
          id: 'organizationEdit',
          name: '修改',
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
          name: '',
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
