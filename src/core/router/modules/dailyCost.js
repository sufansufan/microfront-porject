export default {
  id: 'dailyCost',
  name: '日常费用',
  leaf: false,
  children: [
    {
      id: 'loanApply',
      name: '借款申请',
      leaf: true,
      page: '/loanApply',
      puzzle: 'dailyCost',
      children: [
        {
          id: 'addLoan',
          name: '新增',
          leaf: true,
          page: '/addLoan',
          puzzle: 'dailyCost'
        },
        {
          id: 'loandetail',
          name: '详情',
          leaf: true,
          page: '/loandetail',
          puzzle: 'dailyCost'
        },
        {
          id: 'repayment',
          name: '还款',
          leaf: true,
          page: '/repayment',
          puzzle: 'dailyCost'
        }
      ]
    },
    {
      id: 'reimbursementApply',
      name: '报销申请',
      leaf: true,
      page: '/reimbursementApply',
      puzzle: 'dailyCost',
      children: [
        {
          id: 'reimbursementAdd',
          name: '新增',
          leaf: true,
          page: '/reimbursementAdd',
          puzzle: 'dailyCost'
        },
        {
          id: 'detail',
          name: '详情',
          leaf: true,
          page: '/detail',
          puzzle: 'dailyCost'
        }
      ]
    },
    {
      id: 'costStatistics',
      name: '费用统计',
      leaf: true,
      page: '/costStatistics',
      puzzle: 'dailyCost'
    }
  ],
  icon: 'puzzle',
  puzzle: 'dailyCost',
  version: '0.1.0',
  host: '/puzzles'
}
