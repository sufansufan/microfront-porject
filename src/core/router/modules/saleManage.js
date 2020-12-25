export default {
  id: 'saleManage',
  name: '销售团队管理',
  leaf: false,
  icon: 'puzzle',
  children: [
    {
      id: 'saleManage',
      name: '销售团队管理',
      leaf: true,
      cache: true,
      page: '/index',
      puzzle: 'saleManage'
    }
  ],
  puzzle: 'saleManage',
  version: '0.1.0',
  host: '/puzzles'
}
