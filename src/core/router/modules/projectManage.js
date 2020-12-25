export default {
  id: 'projectManage',
  name: '项目管理',
  leaf: false,
  children: [
    {
      id: 'setProjectDept',
      name: '组建项目部',
      leaf: true,
      cache: true,
      page: '/setProjectDept',
      puzzle: 'projectManage',
      children: [
        {
          id: 'projectDept',
          name: '组建项目部,修改,查看',
          leaf: true,
          page: '/projectDept',
          puzzle: 'projectManage'
        },
        {
          id: 'projectInfo',
          name: '组建项目部,修改,查看',
          leaf: true,
          page: '/info',
          puzzle: 'projectManage'
        }
      ]
    },
    {
      id: 'realName',
      name: '工人实名制',
      leaf: true,
      cache: true,
      page: '/realName',
      puzzle: 'projectManage',
      children: [
        {
          id: 'setConstructionTeam',
          name: '组建施工队,施工人员管理',
          leaf: true,
          page: '/setConstructionTeam',
          puzzle: 'projectManage',
          children: [
            {
              id: 'buildAdd',
              name: '新增,修改,查看',
              leaf: true,
              page: '/buildAdd',
              puzzle: 'projectManage'
            },
            {
              id: 'buildEdit',
              name: '新增,修改,查看',
              leaf: true,
              page: '/buildEdit',
              puzzle: 'projectManage'
            }
          ]
        },
        {
          id: 'constructionPerManage',
          name: '组建施工队,施工人员管理',
          leaf: true,
          page: '/constructionPerManage',
          puzzle: 'projectManage'
        }
      ]
    },
    {
      id: 'approachManage',
      name: '进场管理',
      leaf: true,
      cache: true,
      page: '/approachManage',
      puzzle: 'projectManage',
      children: [
        {
          id: 'safeAgree',
          name: '安全协议',
          leaf: true,
          page: '/safeAgree',
          puzzle: 'projectManage'
        },
        {
          id: 'safeEducation',
          name: '三级安全教育',
          leaf: true,
          page: '/safeEducation',
          puzzle: 'projectManage'
        },
        {
          id: 'disclose',
          name: '安全技术交底',
          leaf: true,
          page: '/disclose',
          puzzle: 'projectManage'
        },
        {
          id: 'discloseAdd',
          name: '新增,修改,查看',
          leaf: true,
          page: '/discloseAdd',
          puzzle: 'projectManage'
        }
      ]
    }
  ],
  icon: 'puzzle',
  puzzle: 'projectManage',
  version: '0.1.0',
  host: '/puzzles'
}
