export default {
  id: 'flowManage',
  name: '流程管理',
  leaf: false,
  children: [
    {
      id: 'flowConfig',
      name: '流程配置',
      leaf: true,
      page: '/flowConfig',
      puzzle: 'flowManage'
    },
    {
      id: 'myApproval',
      name: '我的审批',
      leaf: true,
      page: '/myApproval',
      puzzle: 'flowManage',
      children: [
        {
          id: 'loanapproval',
          name: '借款审批',
          leaf: true,
          page: '/loanapproval',
          puzzle: 'flowManage'
        }, {
          id: 'confirmationofloan',
          name: '出纳借款确认',
          leaf: true,
          page: '/confirmationofloan',
          puzzle: 'flowManage'
        }, {
          id: 'costAccounting',
          name: '成本会计录票',
          leaf: true,
          page: '/costAccounting',
          puzzle: 'flowManage'
        }, {
          id: 'cashierReimbursement',
          name: '出纳确认报销',
          leaf: true,
          page: '/cashierReimbursement',
          puzzle: 'flowManage'
        }, {
          id: 'reimbursementApproval',
          name: '报销审批（录票前）',
          leaf: true,
          page: '/reimbursementApproval',
          puzzle: 'flowManage'
        }, {
          id: 'approvalafter',
          name: '报销审批（录票后）',
          leaf: true,
          page: '/approvalafter',
          puzzle: 'flowManage'
        },
        {
          id: 'viewrevoked',
          name: '已撤销',
          leaf: true,
          page: '/viewrevoked',
          puzzle: 'flowManage'
        },
        {
          id: 'viewapproved',
          name: '已审核',
          leaf: true,
          page: '/viewapproved',
          puzzle: 'flowManage'
        }
      ]
    }
  ],
  icon: 'puzzle',
  puzzle: 'flowManage',
  version: '0.1.0',
  host: '/puzzles'
}
