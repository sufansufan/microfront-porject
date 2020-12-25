export default {
  id: 'marketingArea',
  name: '营销区域管理',
  leaf: false,
  icon: 'puzzle',
  children: [
    {
      id: 'index',
      name: '营销区域管理',
      leaf: true,
      page: '/index',
      puzzle: 'marketingArea'
    }
  ],
  puzzle: 'operationManageJdy',
  version: '0.1.0',
  host: '/puzzles'
}
