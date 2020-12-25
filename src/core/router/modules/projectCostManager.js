export default {
  id: 'projectCostManager',
  name: '项目成本管理',
  leaf: false,
  children: [
    {
      id: 'projectCostManager',
      name: '项目成本管理',
      leaf: true,
      page: '/projectCostManager',
      puzzle: 'projectCostManager'
    }
  ],
  icon: 'puzzle',
  puzzle: 'projectCostManager',
  version: '0.1.0',
  host: '/puzzles'
}
