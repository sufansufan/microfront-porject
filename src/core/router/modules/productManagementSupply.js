export default {
  id: 'productManagementSupply',
  name: '产品管理',
  leaf: false,
  children: [
    {
      id: 'productMaintenance',
      name: '产品维护',
      leaf: true,
      page: '/productMaintenance',
      puzzle: 'productManagementSupply',
      children: [
        {
          id: 'productName',
          name: '查看',
          leaf: true,
          page: '/productName',
          puzzle: 'productManagementSupply'
        }
      ]
    },

    {
      id: 'releaseManagement',
      name: '发布管理',
      leaf: true,
      page: '/releaseManagement',
      puzzle: 'productManagementSupply',
      children: [
        {
          id: 'supplierName',
          name: '查看',
          leaf: true,
          page: '/supplierName',
          puzzle: 'productManagementSupply'
        }
      ]
    }
  ],
  icon: 'puzzle',
  puzzle: 'productManagementSupply',
  version: '0.1.0',
  host: '/puzzles'
}
