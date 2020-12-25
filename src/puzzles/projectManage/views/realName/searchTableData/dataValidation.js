export default {
  data() {
    return {
      columns: [{
        type: 'selection',
        single: true
      },
      {
        label: '序号',
        index: true
      },
      {
        label: '姓名',
        showTooltip: true,
        width: 150,
        render: (h, row) => {
          return h('span', {
            class: {
              'table-click-color': true
            },
            on: {
              click: () => {
                this.handleVerification('dataDetails', row)
              }
            }
          }, row.name)
        }
      },
      {
        label: '性别',
        prop: 'gender',
        sortable: 'custom',
        showTooltip: true,
        width: 150,
        render: (h, row) => {
          return h('span', row.genderName)
        }

      },
      {
        label: '身份证号',
        prop: 'idNumber',
        showTooltip: true,
        width: 200,
        sortable: 'custom'
      },
      {
        label: '手机',
        prop: 'telephone',
        showTooltip: true,
        width: 150
      },
      {
        label: '家庭住址',
        showTooltip: true,
        width: 200,
        prop: 'homeAddress'
      },
      {
        label: '施工队/施工班组',
        prop: 'constructionTeamName',
        showTooltip: true,
        sortable: 'custom',
        width: 150
      },
      {
        label: '任命',
        showTooltip: true,
        prop: 'appointment',
        width: 150,
        render: (h, row) => {
          return h('span', row.appointmentName)
        }
      },
      {
        label: '工种',
        prop: 'workType',
        sortable: 'custom',
        showTooltip: true,
        width: 150,
        render: (h, row) => {
          return h('span', row.workTypeName)
        }
      },
      {
        label: '证书',
        prop: 'certificateAllName',
        showTooltip: true,
        width: 150,
        render: (h, row) => {
          return h('span', row.certificateAllName)
        }
      },
      {
        label: '提交时间',
        prop: 'submitTime',
        showTooltip: true,
        sortable: 'custom',
        width: 150
      },
      {
        label: '状态',
        prop: 'verificationState',
        showTooltip: true,
        sortable: 'custom',
        width: 150,
        render: (h, row) => {
          return h('span', row.verificationStateName)
        }
      }
      ],
      tableOptions: {
        maxHeight: 'calc(100vh - 280px)',
        defaultSort: {
          prop: 'submitTime',
          order: 'descending'
        }
      }
    }
  },
  created() {

  },
  methods: {

  }
}
