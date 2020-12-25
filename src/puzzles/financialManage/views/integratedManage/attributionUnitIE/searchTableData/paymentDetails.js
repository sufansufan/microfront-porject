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
          name: '付款日期'
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
          name: '收款单位'
        },
        {
          value: 'name',
          searchType: 'select',
          name: '付款方式',
          selectData: []
        },
        {
          value: 'name',
          searchType: 'select',
          name: '状态',
          selectData: []
        },
        {
          value: 'name',
          searchType: 'select',
          name: '是否保证金',
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
          // sortable: 'custom',
          showTooltip: true,
          fixed: true
        },
        {
          label: '工程名称',
          prop: 'name',
          sortable: 'custom',
          width: '100',
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
          label: '付款日期',
          sortable: 'custom',
          width: '100',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '付款类型',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '付款类别',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '付款金额',
          sortable: 'custom',
          width: '100',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '未收票已付款金额',
          sortable: 'custom',
          width: '150',
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
          label: '是否保证金',
          prop: 'last_login_date',
          width: '100',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '付款方式',
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
          label: '付款账户类型',
          prop: 'last_login_date',
          sortable: 'custom',
          width: '130',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '付款账户',
          prop: 'last_login_date',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '收款单位',
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
          label: '是否有合同',
          prop: 'last_login_date',
          width: '100',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '(内)合同编号',
          prop: 'last_login_date',
          width: '100',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '合同名称',
          prop: 'last_login_date',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '合同金额',
          prop: 'last_login_date',
          render: (h, row) => {
            // return h('span', {}, parseTime(row.lastLoginDate, 'y-m-d h:i:s'))
          }
        },
        {
          label: '结算金额',
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
          prop: 'last_login_date',
          sortable: 'custom',
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
