export default {
  id: 'contractManage',
  name: '合同管理',
  leaf: false,
  children: [{
    id: 'contractInput',
    name: '合同录入',
    leaf: true,
    cache: true,
    page: '/contractManage',
    puzzle: 'contractManage',
    children: [{
      id: 'contractDetail',
      name: '合同信息',
      leaf: true,
      child: true,
      page: '/contractDetail',
      puzzle: 'contractManage'
    },
    {
      id: 'contractAdd',
      name: '新增合同',
      page: '/contractInfo',
      puzzle: 'contractManage'
    },
    {
      id: 'contractEdit',
      name: '新增合同, 修改合同,合同查看',
      page: '/contractInfos',
      puzzle: 'contractManage'
    },
    // version
    {
      id: 'contractVersion',
      name: '版本查看',
      leaf: true,
      page: '/contractVersion',
      puzzle: 'contractManage'
    },
    // 相关合同路由
    {
      id: 'engineerDetail',
      name: '工程合同',
      leaf: true,
      page: '/engineerDetail',
      puzzle: 'contractManage'
    },
    {
      id: 'designDetail',
      name: '设计合同',
      leaf: true,
      page: '/designDetail',
      puzzle: 'contractManage'
    },
    {
      id: 'officeDetail',
      name: '办公类合同',
      leaf: true,
      page: '/officeDetail',
      puzzle: 'contractManage'
    },
    {
      id: 'otherDetail',
      name: '其它合同',
      leaf: true,
      page: '/otherDetail',
      puzzle: 'contractManage'
    }
    ]
  }],
  icon: 'puzzle',
  puzzle: 'contractManage',
  version: '0.1.0',
  host: '/puzzles'
}
