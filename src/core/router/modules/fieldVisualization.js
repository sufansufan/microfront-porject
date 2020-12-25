export default {
  id: 'fieldvisualization',
  name: '现场可视',
  leaf: false,
  children: [
    {
      id: 'monitoringAplayback',
      name: '监控与回放',
      leaf: true,
      page: '/monitoringAplayback',
      puzzle: 'officeSupplies',
      children: [
        {
          id: 'organizationalmonitoring',
          name: '组织监控',
          leaf: true,
          page: '/organizationalmonitoring',
          puzzle: 'officeSupplies'
        },
        {
          id: 'singleprojectmonitoring',
          name: '单项目监控',
          leaf: true,
          page: '/singleprojectmonitoring',
          puzzle: 'officeSupplies'
        }

      ]

    },
    {
      id: 'fieldproblems',
      name: '现场问题',
      leaf: true,
      page: '/fieldproblems',
      puzzle: 'officeSupplies'

    }

  ],
  icon: 'puzzle',
  puzzle: 'fieldvisualization',
  version: '0.1.0',
  host: '/puzzles'
}
