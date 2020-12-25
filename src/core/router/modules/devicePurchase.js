export default {
  id: 'devicePurchase',
  name: '平台设备采购',
  leaf: false,
  children: [
    {
      id: 'platformProcurement',
      name: '平台设备采购',
      leaf: true,
      page: '/platformProcurement',
      puzzle: 'devicePurchase'
    },
    {
      id: 'platformOrder',
      name: '采购订单',
      leaf: true,
      page: '/platformOrder',
      puzzle: 'devicePurchase'
    },
    {
      id: 'platformDetails',
      name: '订单详情',
      leaf: true,
      page: '/platformDetails',
      puzzle: 'devicePurchase'
    }
  ],
  icon: 'puzzle',
  puzzle: 'devicePurchase',
  version: '0.1.0',
  host: '/puzzles'
}
