export default {
  id: 'workLogManage',
  name: '日志管理',
  leaf: false,
  children: [
    {
      id: 'myWorkLog',
      name: '我的日志',
      leaf: true,
      cache: true,
      page: '/myWorkLog',
      puzzle: 'workLogManage',
      children: [
        {
          id: 'writeLog',
          name: '写日志,修改日志,查看日志',
          leaf: true,
          page: '/writeLog',
          puzzle: 'workLogManage'
        },
        {
          id: 'readingRecord',
          name: '阅读记录',
          leaf: true,
          page: '/readingRecord',
          puzzle: 'workLogManage'
        }
      ]
    },
    {
      id: 'subWorkLog',
      name: '下属日志',
      leaf: true,
      cache: true,
      page: '/subWorkLog',
      puzzle: 'workLogManage'
    },
    {
      id: 'workLogQuery',
      name: '日志查询',
      leaf: true,
      cache: true,
      page: '/workLogQuery',
      puzzle: 'workLogManage'
    },
    {
      id: 'workLogStatistic',
      name: '日志统计',
      leaf: true,
      cache: true,
      page: '/workLogStatistic',
      puzzle: 'workLogManage'
    },
    {
      id: 'workLogConf',
      name: '日志配置',
      leaf: true,
      cache: true,
      page: '/workLogConf',
      puzzle: 'workLogManage'
    }
  ],
  icon: 'puzzle',
  puzzle: 'workLogManage',
  version: '0.1.0',
  host: '/puzzles'
}
