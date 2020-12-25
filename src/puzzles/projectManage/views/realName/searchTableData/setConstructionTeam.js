export default {
  data() {
    return {
      selectList: [{
        value: 'code',
        searchType: 'input',
        name: '编号'
      },
      {
        value: 'name',
        searchType: 'input',
        name: '名称'
      },
      {
        value: 'level',
        searchType: 'select',
        name: '级别',
        selectData: []
      }
      ],
      btnList: [{
        children: [{
          name: '新增施工队',
          power: 'setConstructionTeam:addTeam',
          on: () => {
            this.handleAddTeam('team')
          },
          icon: 'icon-shigongdui'
        },
        {
          name: '新增施工班组',
          power: 'setConstructionTeam:addGroup',
          on: () => {
            this.handleAddTeam('group')
          },
          icon: 'icon-shigongbanzu'
        },
        {
          name: '修改',
          power: 'setConstructionTeam:edit',
          on: () => {
            this.handleAddTeam('edit')
          },
          icon: 'icon-xiugai-copy'
        },
        {
          name: '删除',
          power: 'setConstructionTeam:delete',
          on: () => {
            this.handleDeleteTeam()
          },
          icon: 'icon-icon7-copy'
        }
        ]
      },
      {
        children: [{
          name: '导出花名册',
          power: 'setConstructionTeam:export',
          on: () => {
            this.handleExportTeam()
          },
          icon: 'icon-daochu-copy'
        }
        ]
      },
      {
        children: [{
          name: '返回',
          power: 'contractInput:settle',
          class: 'back-btn',
          on: () => {
            this.$router.go(-1)
          },
          icon: 'icon-fanhui-copy'
        }
        ]
      }
      ],
      columns: [{
        type: 'selection',
        single: true
      },
      {
        label: '序号',
        index: true
      },
      {
        label: '编号',
        prop: 'code',
        showTooltip: true,
        width: 180,
        sortable: 'custom',
        render: (h, row) => {
          return h('span', row.code)
        }
      },
      {
        label: '名称',
        showTooltip: true,
        sortable: 'custom',
        width: 200,
        render: (h, row) => {
          return h('span', {
            class: {
              'table-click-color': true
            },
            on: {
              click: () => {
                this.handleAddTeam('details', row)
              }
            }
          }, row.name)
        }
      },
      {
        label: '级别',
        prop: 'level',
        showTooltip: true,
        sortable: 'custom',
        width: 180,
        render: (h, row) => {
          return h('span', row.levelName)
        }
      },
      {
        label: '所属公司',
        prop: 'cooperativeUnitName',
        showTooltip: true,
        sortable: 'custom',
        width: 180
      },
      {
        label: '负责人',
        prop: 'chargePersonName',
        sortable: 'custom',
        showTooltip: true,
        width: 180
      },
      {
        label: '负责人联系电话',
        showTooltip: true,
        prop: 'chargePersonTel',
        sortable: 'custom',
        width: 180
      },
      {
        label: '代班',
        prop: 'agentPersonName',
        showTooltip: true,
        sortable: 'custom',
        width: 180
      },
      {
        label: '代班联系电话',
        showTooltip: true,
        prop: 'agentPersonTel',
        sortable: 'custom',
        width: 180
      },
      {
        label: '当前在施人数',
        prop: 'currentMemberCount',
        sortable: 'custom',
        showTooltip: true,
        width: 180
      },
      {
        label: '进场日期',
        prop: 'approachDate',
        sortable: 'custom',
        showTooltip: true,
        width: 180
      },
      {
        label: '退场日期',
        prop: 'exitDate',
        showTooltip: true,
        sortable: 'custom',
        width: 180
      }],
      tableOptions: {
        maxHeight: 'calc(100vh - 205px)',
        defaultSort: {
          prop: 'code',
          order: 'ascending'
        },
        treeProps: {
          children: 'child',
          hasChildren: 'hasChildren'
        },
        defaultExpandAll: true
      }
    }
  },
  methods: {

  }
}
