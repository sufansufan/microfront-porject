export default {
  id: 'cooperativeEnterprise',
  name: '合作企业',
  leaf: false,
  children: [
    {
      id: 'cooperativeEnterprise',
      name: '合作企业管理',
      leaf: true,
      page: '/cooperativeEnterprise',
      puzzle: 'cooperativeEnterprise'
    },
    {
      id: 'laborSubcontract',
      name: '劳务分包企业',
      leaf: true,
      child: true,
      cache: true,
      page: '/laborSubcontract',
      puzzle: 'cooperativeEnterprise'
    },
    {
      id: 'architecturalOrnament',
      name: '建筑装饰企业',
      leaf: true,
      child: true,
      cache: true,
      page: '/architecturalOrnament',
      puzzle: 'cooperativeEnterprise'
    },
    {
      id: 'otherEnterprises',
      name: '其他企业',
      leaf: true,
      child: true,
      cache: true,
      page: '/otherEnterprises',
      puzzle: 'cooperativeEnterprise'
    },
    {
      id: 'materialSupply',
      name: '材料供应企业',
      leaf: true,
      child: true,
      cache: true,
      page: '/materialSupply',
      puzzle: 'cooperativeEnterprise',
      children: [
        {
          id: 'enterpriseAdd',
          name: '新增',
          leaf: true,
          page: '/enterpriseAdd',
          puzzle: 'cooperativeEnterprise'
        },
        {
          id: 'enterpriseView',
          name: '查看',
          leaf: true,
          page: '/enterpriseView',
          puzzle: 'cooperativeEnterprise'
        },
        {
          id: 'enterpriseEdit',
          name: '新增,修改,查看',
          leaf: true,
          page: '/enterpriseEdit',
          puzzle: 'cooperativeEnterprise'
        },
        {
          id: 'enterpriseImport',
          name: '导入企业',
          leaf: true,
          page: '/enterpriseImport',
          puzzle: 'cooperativeEnterprise'
        },
        {
          id: 'enterpeiseHistory',
          name: '新增,修改,查看历史操作记录',
          leaf: true,
          page: '/enterpeiseHistory',
          puzzle: 'cooperativeEnterprise'
        }
      ]
    },
    {
      id: 'inviteMaterialsupply',
      name: '受邀企业',
      leaf: true,
      child: true,
      cache: true,
      page: '/inviteMaterialsupply',
      puzzle: 'cooperativeEnterprise',
      children: [
        {
          id: 'invitedEnterpriseAdd',
          name: '新增',
          leaf: true,
          page: '/invitedEnterpriseAdd',
          puzzle: 'cooperativeEnterprise'
        },
        {
          id: 'invitedEnterpriseView',
          name: '查看',
          leaf: true,
          page: '/invitedEnterpriseView',
          puzzle: 'cooperativeEnterprise'
        },
        {
          id: 'invitedEnterpriseEdit',
          name: '修改',
          leaf: true,
          page: '/invitedEnterpriseEdit',
          puzzle: 'cooperativeEnterprise'
        }
      ]
    }

  ],
  icon: 'puzzle',
  puzzle: 'cooperativeEnterprise',
  version: '0.1.0',
  host: '/puzzles'
}
