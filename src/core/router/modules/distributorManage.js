export default {
  id: 'distributorManage',
  name: '经销商管理',
  leaf: false,
  icon: 'puzzle',
  children: [
    {
      id: 'distributorManage',
      name: '经销商管理',
      leaf: true,
      page: '/index',
      puzzle: 'distributorManage'
    }
  ],
  puzzle: 'distributorManage',
  version: '0.1.0',
  host: '/puzzles'
}
