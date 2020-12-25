export default {
  data() {
    return {
      btnList: [{
        children: [
          { name: '导出', power: 'processconfig:add', on: () => { this.handleInfor() }, icon: 'icon-daochu-copy' }
        ]
      }
      ],
      selectList: [
        {
          value: 'newTime',
          searchType: 'pickerDate',
          name: '收款日期'
        },
        {
          value: 'phone',
          searchType: 'input',
          name: '合同编号'
        },
        {
          value: 'name',
          searchType: 'select',
          name: '工程名称',
          selectData: []
        },
        {
          value: 'status',
          searchType: 'input',
          name: '建设单位'
        },
        {
          value: 'name',
          searchType: 'select',
          name: '收款方式',
          selectData: []
        },
        {
          value: 'name',
          searchType: 'select',
          name: '状态',
          selectData: []
        }
      ],
      tableData: [
        {
          id: '1',
          phone: '16611111111',
          nickname: null,
          functionType: null,
          useType: false,
          createDate: 1602560641000,
          createUserId: null,
          createUserName: '超级管理员'
        },
        {
          id: '2',
          phone: '16611111111',
          nickname: null,
          functionType: null,
          useType: false,
          createDate: 1602560641000,
          createUserId: null,
          createUserName: '超级管理员'
        }
      ],
      columns: [
        {
          label: '序号',
          index: true,
          fixed: true
        },
        {
          label: '合同编号',
          prop: 'phone',
          showTooltip: true,
          sortable: 'custom',
          width: '100',
          fixed: true
        },
        {
          label: '工程姓名',
          prop: 'name',
          fixed: true
        },
        {
          label: '建设单位',
          prop: 'state'
        },
        {
          label: '来源',
          prop: 'operateDate',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.operateDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '收款日期',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '100',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '收款类型',
          prop: 'last_login_date',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '收款类别',
          prop: 'last_login_date',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '收款金额',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '100',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '收款未开票金额',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '140',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '收款方式',
          prop: 'last_login_date',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '支票号',
          prop: 'last_login_date',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '支票银行名称',
          prop: 'last_login_date',
          width: '120',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '收款账户类型',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '130',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '收款账户',
          prop: 'last_login_date',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '对应发票',
          prop: 'last_login_date',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '收款计划',
          prop: 'last_login_date',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '收款人',
          prop: 'last_login_date',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '摘要',
          prop: 'last_login_date',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '备注',
          prop: 'last_login_date',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '录入人',
          prop: 'last_login_date',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '录入时间',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '100',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '状态',
          sortable: 'custom',
          prop: 'last_login_date',
          fixed: 'right',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        }
      ]
    }
  },
  methods: {
    handleInfor() {
      console.log('导出列表')
    }
  }
}
