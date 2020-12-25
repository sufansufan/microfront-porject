export default {
  id: 'platformEquipmentManage',
  name: '平台设备管理',
  leaf: false,
  children: [
    {
      id: 'equipmentDirectory',
      name: '平台设备名录',
      leaf: true,
      page: '/equipmentDirectory',
      puzzle: 'platformEquipmentManage',
      children: [
        {
          id: 'addDirectory',
          name: '新增名录, 修改名录',
          leaf: true,
          page: '/addDirectory',
          puzzle: 'platformEquipmentManage'
        },
        {
          id: 'seeDirectory',
          name: '查看名录',
          leaf: true,
          page: '/seeDirectory',
          puzzle: 'platformEquipmentManage'
        },
        {
          id: 'seeDirectoryNumber',
          name: '查看名录数量',
          leaf: true,
          page: '/seeDirectoryNumber',
          puzzle: 'platformEquipmentManage'
        },
        {
          id: 'seeStatistic',
          name: '查看统计量',
          leaf: true,
          page: '/seeStatistic',
          puzzle: 'platformEquipmentManage'
        },
        {
          id: 'seeOrder',
          name: '查看订单',
          leaf: true,
          page: '/seeOrder',
          puzzle: 'platformEquipmentManage'
        },
        {
          id: 'seeWarehouseOrder',
          name: '查看入库单号',
          leaf: true,
          page: '/seeWarehouseOrder',
          puzzle: 'platformEquipmentManage'
        },
        {
          id: 'addEquipment',
          name: '新增设备',
          leaf: true,
          page: '/addEquipment',
          puzzle: 'platformEquipmentManage'
        }
      ]
    },
    {
      id: 'warehousManage',
      name: '平台入库管理',
      leaf: true,
      page: '/warehousManage',
      puzzle: 'platformEquipmentManage',
      children: [
        {
          id: 'addWarehous',
          name: '入库,修改入库,查看入库',
          leaf: true,
          page: '/addWarehous',
          puzzle: 'platformEquipmentManage'
        }
      ]
    },
    {
      id: 'equipmentPurchase',
      name: '平台设备采购订单',
      leaf: true,
      page: '/equipmentPurchase',
      puzzle: 'platformEquipmentManage',
      children: [
        {
          id: 'addSend',
          name: '发货,发货,查看发货',
          leaf: true,
          page: '/addSend',
          puzzle: 'platformEquipmentManage'
        }
      ]
    }
  ],
  icon: 'puzzle',
  puzzle: 'platformEquipmentManage',
  version: '0.1.0',
  host: '/puzzles'
}
