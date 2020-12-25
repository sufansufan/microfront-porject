export default {
  id: 'processManage',
  name: '流程管理',
  leaf: false,
  children: [
    {
      id: 'processRegister',
      name: '流程注册',
      leaf: true,
      page: '/processRegister',
      puzzle: 'processManage',
      cache: true,
      children: [
        {
          id: 'processMaintain',
          name: '流程维护',
          leaf: true,
          page: '/processMaintain',
          puzzle: 'processManage'
        }
      ]
    },
    {
      id: 'processConfig',
      name: '流程配置',
      leaf: true,
      cache: true,
      page: '/processConfig',
      puzzle: 'processManage',
      children: [
        {
          id: 'processAdd',
          name: '新增,修改,查看',
          leaf: true,
          page: '/add',
          puzzle: 'processManage'
        },
        {
          id: 'processEdit',
          name: '新增,修改,查看',
          leaf: true,
          page: '/edit',
          puzzle: 'processManage'
        },
        {
          id: 'custom',
          name: '新增,修改,自定义配置',
          leaf: true,
          page: '/custom',
          puzzle: 'processManage'
        }
      ]
    },
    {
      id: 'myApprove',
      name: '我的审批',
      leaf: true,
      cache: true,
      page: '/myApprove',
      puzzle: 'processManage',
      children: [
        {
          id: 'approve',
          name: '审批,审批,查看摘要',
          leaf: true,
          page: '/approve',
          puzzle: 'processManage'
        }
      ]
    }
  ],
  icon: 'puzzle',
  puzzle: 'processManage',
  version: '0.1.0',
  host: '/puzzles'
}
