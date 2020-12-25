export default {
  id: 'onthejobTraining',
  name: '岗位培训',
  leaf: false,
  icon: 'puzzle',
  children: [
    {
      id: 'jobTraining',
      name: '岗位培训',
      leaf: true,
      page: '/jobTraining',
      puzzle: 'onthejobTraining',
      children: [
        {
          id: 'logsubmit',
          name: '公司日志提交流程',
          leaf: true,
          page: '/logsubmit',
          puzzle: 'onthejobTraining'
        },
      ]
    }
  ],
  puzzle: 'onthejobTraining',
  version: '0.1.0',
  host: '/puzzles'
}
