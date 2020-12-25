export default {
  id: 'purchasingManagement',
  name: '采购管理',
  leaf: false,
  children: [
    {
      id: 'purchasingManagement',
      name: '采购管理',
      leaf: true,
      page: '/index',
      puzzle: 'purchasingManagement'
    },
    {
      id: 'procurementStatistics',
      name: '采购统计',
      leaf: true,
      child: true,
      page: '/procurementStatistics',
      puzzle: 'purchasingManagement'
    },
    {
      id: 'materialConsumption',
      name: '材料用款',
      leaf: true,
      child: true,
      page: '/materialConsumption',
      puzzle: 'purchasingManagement',
      children: [
        {
          id: 'applicationDetails',
          name: '申请单号',
          leaf: true,
          child: true,
          page: '/applicationDetails',
          puzzle: 'purchasingManagement'
        }
      ]
    },
    {
      id: 'materialOutStock',
      name: '材料出库',
      leaf: true,
      child: true,
      page: '/materialOutStock',
      puzzle: 'purchasingManagement',
      children: [
        {
          id: 'outgoingSingleNumber',
          name: '出库单号',
          leaf: true,
          child: true,
          page: '/outgoingSingleNumber',
          puzzle: 'purchasingManagement'
        }
      ]
    },
    {
      id: 'siteAcceptance',
      name: '现场验收',
      leaf: true,
      child: true,
      page: '/siteAcceptance',
      puzzle: 'purchasingManagement',
      children: [
        {
          id: 'siteAcceptanceNumber',
          name: '验收单号',
          leaf: true,
          child: true,
          page: '/siteAcceptanceNumber',
          puzzle: 'purchasingManagement'
        },
        {
          id: 'sitePurchaseOrder',
          name: '采购单号',
          leaf: true,
          child: true,
          page: '/sitePurchaseOrder',
          puzzle: 'purchasingManagement'
        },
        {
          id: 'siteSupplyOrder',
          name: '供货单',
          leaf: true,
          child: true,
          page: '/siteSupplyOrder',
          puzzle: 'purchasingManagement'
        }
      ]
    },
    {
      id: 'procurementApplication',
      name: '采购申请',
      leaf: true,
      child: true,
      page: '/procurementApplication',
      puzzle: 'purchasingManagement',
      children: [
        {
          id: 'purchaseOrder',
          name: '采购单号',
          leaf: true,
          child: true,
          page: '/purchaseOrder',
          puzzle: 'purchasingManagement'
        },
        {
          id: 'modifyReplication',
          name: '复制修改',
          leaf: true,
          child: true,
          page: '/modifyReplication',
          puzzle: 'purchasingManagement'
        }
      ]
    },
    {
      id: 'procurementConfiguration',
      name: '采购配置',
      leaf: true,
      child: true,
      page: '/procurementConfiguration',
      puzzle: 'purchasingManagement'
    }
  ],
  icon: 'puzzle',
  puzzle: 'purchasingManagement',
  version: '0.1.0',
  host: '/puzzles'
}
