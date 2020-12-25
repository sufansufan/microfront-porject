export default {
  data() {
    return {
      btnList: [{
        children: [{
          name: '同意',
          power: 'returnConfirmation:agree',
          on: () => {
            this.handleAgree()
          },
          icon: 'icon-tongyi'
        },
        {
          name: '拒绝',
          power: 'returnConfirmation:refuse',
          on: () => {
            this.handleRefuse()
          },
          icon: 'icon-jujue'
        }
        ]
      },
      {
        children: [{
          name: '删除',
          power: 'returnConfirmation:delete',
          on: () => {
            this.handleDelete()
          },
          icon: 'icon-icon7-copy'
        }]
      }],
      columns: [{
        type: 'selection',
        single: true
      },
      {
        label: '序号',
        index: true
      },
      {
        label: '考勤编号',
        prop: 'attendanceNumber',
        showTooltip: true,
        sortable: 'custom'
      },
      {
        label: '姓名',
        showTooltip: true,
        render: (h, row) => {
          return h('span', {
            class: {
              'table-click-color': true
            },
            on: {
              click: () => {
                this.jumpState('returnPerDetails', row)
              }
            }
          }, row.name)
        }
      },
      {
        label: '工种',
        prop: 'workType',
        sortable: 'custom',
        showTooltip: true,
        render: (h, row) => {
          return h('span', row.workTypeName)
        }
      },
      {
        label: '施工队/施工班组',
        prop: 'constructionTeamName',
        width: 200,
        showTooltip: true,
        sortable: 'custom'
      },
      {
        label: '返场日期',
        prop: 'recordDate',
        sortable: 'custom',
        showTooltip: true
      },
      {
        label: '返场说明',
        showTooltip: true,
        prop: 'description'
      },
      {
        label: '施工队长',
        prop: 'submitPersonName',
        showTooltip: true
      },
      {
        label: '提交时间',
        showTooltip: true,
        prop: 'submitDate',
        sortable: 'custom'
      },
      {
        label: '状态',
        prop: 'state',
        sortable: 'custom',
        showTooltip: true,
        render: (h, row) => {
          return h('span', row.stateName)
        }
      }
      ],
      tableOptions: {
        maxHeight: 'calc(100vh - 280px)',
        defaultSort: {
          prop: 'submitDate',
          order: 'descending'
        }
      }
    }
  },
  methods: {
  }
}
