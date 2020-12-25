export default {
  id: 'officeSupplies',
  name: '办公用品',
  leaf: false,
  children: [
    {
      id: 'procurementofsupplies',
      name: '用品采购',
      leaf: true,
      page: '/procurementofsupplies',
      puzzle: 'officeSupplies',
      children: [
        {
          id: 'viewdetails',
          name: '查看',
          leaf: true,
          page: '/viewdetails',
          puzzle: 'officeSupplies'
        }
      ]

    },
    {
      id: 'statisticalanalysis',
      name: '统计分析',
      leaf: true,
      page: '/statisticalanalysis',
      puzzle: 'officeSupplies'
    },
    {
      id: 'necessities',
      name: '用品领用',
      leaf: true,
      page: '/necessities',
      puzzle: 'officeSupplies',
      children: [
        {
          id: 'newsupplies',
          name: '新增',
          leaf: true,
          page: '/newsupplies',
          puzzle: 'officeSupplies'
        },
        {
          id: 'viewingsupplies',
          name: '查看',
          leaf: true,
          page: '/viewingsupplies',
          puzzle: 'officeSupplies'
        }
      ]

    }
  ],
  icon: 'puzzle',
  puzzle: 'officeSupplies',
  version: '0.1.0',
  host: '/puzzles'
}
