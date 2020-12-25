export default {
  id: 'financialManage',
  name: '财务管理',
  leaf: false,
  children: [
    {
      id: 'categoryManage',
      name: '财务类别管理',
      leaf: true,
      cache: true,
      page: '/categoryManage',
      puzzle: 'financialManage',
      children: [
        {
          id: 'CategoryAdd',
          name: '新增,修改,查看',
          leaf: true,
          page: '/add',
          puzzle: 'financialManage'
        }
      ]
    },
    {
      id: 'accountManage',
      name: '资金账户管理',
      leaf: true,
      page: '/accountManage',
      cache: true,
      puzzle: 'financialManage',
      children: [
        {
          id: 'bankAdd',
          name: '新增,修改,查看',
          leaf: true,
          page: '/bankAdd',
          puzzle: 'financialManage'
        },
        {
          id: 'cashAdd',
          name: '新增,修改,查看',
          leaf: true,
          page: '/cashAdd',
          puzzle: 'financialManage'
        },
        {
          id: 'bankDetail',
          name: '银行账户详情',
          leaf: true,
          page: '/bankDetail',
          puzzle: 'financialManage'
        },
        {
          id: 'cashDetail',
          name: '现金账户详情',
          leaf: true,
          page: '/cashDetail',
          puzzle: 'financialManage'
        },
        {
          id: 'bankTransfer',
          name: '银行账户转账',
          leaf: true,
          page: '/bankTransfer',
          puzzle: 'financialManage'
        },
        {
          id: 'cashTransfer',
          name: '现金账户转账',
          leaf: true,
          page: '/cashTransfer',
          puzzle: 'financialManage'
        }
      ]
    },
    {
      id: 'integratedManage',
      name: '项目财务综合管理',
      leaf: true,
      page: '/integratedManage',
      puzzle: 'financialManage',
      cache: true,
      redirect: '/projectRevenueAccount',
      children: [
        {
          id: 'projectRevenueAccount',
          name: '项目收支台账',
          leaf: true,
          child: true,
          page: '/projectRevenueAccount',
          puzzle: 'financialManage',
          children: [
            {
              id: 'detailsView',
              name: '查看详情',
              leaf: true,
              child: true,
              page: '/detailsView',
              puzzle: 'financialManage'
            }
          ]
        },
        {
          id: 'bidBondManage',
          name: '投标保证金管理',
          leaf: true,
          child: true,
          page: '/bidBondManage',
          puzzle: 'financialManage',
          children: [
            {
              id: 'projectAdd',
              name: '新增,修改',
              leaf: true,
              page: '/projectAdd',
              puzzle: 'bidBondManage'
            },
            {
              id: 'projectView',
              name: '查看详情',
              leaf: true,
              child: true,
              page: '/projectView',
              puzzle: 'financialManage'
            },
            {
              id: 'settleView',
              name: '结清',
              leaf: true,
              child: true,
              page: '/settleView',
              puzzle: 'financialManage'
            }
          ]
        },
        {
          id: 'monthlyCarryover',
          name: '月度结转',
          leaf: true,
          child: true,
          page: '/monthlyCarryover',
          puzzle: 'financialManage'
        },
        {
          id: 'realTimeCost',
          name: '实时成本统计',
          leaf: true,
          child: true,
          page: '/realTimeCost',
          puzzle: 'financialManage',
          children: [
            {
              id: 'realDetailsView',
              name: '查看详情',
              leaf: true,
              child: true,
              page: '/realDetailsView',
              puzzle: 'financialManage'
            }
          ]
        },
        {
          id: 'receivableStatistics',
          name: '应收款统计表',
          leaf: true,
          child: true,
          page: '/receivableStatistics',
          puzzle: 'financialManage'
        },
        {
          id: 'attributionUnitIE',
          name: '归属单位收支汇总',
          leaf: true,
          child: true,
          page: '/attributionUnitIE',
          puzzle: 'financialManage',
          children: [
            {
              id: 'details',
              name: '查看详情',
              leaf: true,
              child: true,
              page: '/details',
              puzzle: 'financialManage'
            }
          ]
        },
        {
          id: 'warrantyDepositStatistics',
          name: '质保押金统计表',
          leaf: true,
          child: true,
          page: '/warrantyDepositStatistics',
          puzzle: 'financialManage'
        },
        {
          id: 'invoiceReceivePayment',
          name: '发票收付款统计表',
          leaf: true,
          child: true,
          page: '/invoiceReceivePayment',
          puzzle: 'financialManage'
        }
      ]
    }
  ],
  icon: 'puzzle',
  puzzle: 'financialManage',
  version: '0.1.0',
  host: '/puzzles'
}
