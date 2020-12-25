export default {
  id: 'portableVisual',
  name: '便携可视',
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
  puzzle: 'portableVisual',
  version: '0.1.0',
  host: '/puzzles'
}
