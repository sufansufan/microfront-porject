import { fileDetails } from '@core/utils/renderTable.js'
export default {
  data() {
    return {
      selectList: [
        {
          value: 'attendanceNumber',
          searchType: 'input',
          name: '考勤编号'
        }, {
          value: 'name',
          searchType: 'input',
          name: '姓名'
        },
        {
          value: 'workType',
          searchType: 'select',
          name: '工种',
          selectData: []
        },
        {
          value: 'state',
          searchType: 'select',
          name: '状态',
          selectData: []
        }
      ],
      btnList: [{
        children: [{
          name: '新增',
          power: 'buildPerson:add',
          on: () => {
            this.jumpState('add')
          },
          icon: 'icon-xinzeng1-copy'
        },
        {
          name: '修改',
          power: 'buildPerson:edit',
          on: () => {
            this.jumpState('edit')
          },
          icon: 'icon-xiugai-copy'
        },
        {
          name: '删除',
          power: 'buildPerson:delete',
          on: () => {
            this.handleDelete()
          },
          icon: 'icon-icon7-copy'
        }
        ]
      },
      {
        children: [{
          name: '更新资料',
          power: 'buildPerson:update',
          dropdown: true,
          on: (val) => {
            this.handleCommand(val)
          },
          children: [
            {
              name: '照片',
              command: 'photo'
            },
            {
              name: '体检报告',
              command: 'report'
            },
            {
              name: '银行卡信息',
              command: 'bankCard'
            }
          ]
        }]
      },
      {
        children: [{
          name: '离场',
          power: 'buildPerson:departure',
          on: () => {
            this.handleGoAndCome('goback')
          },
          icon: 'icon-lichang'
        },
        {
          name: '返场',
          power: 'buildPerson:return',
          on: () => {
            this.handleGoAndCome('comeback')
          },
          icon: 'icon-fanchang'
        }]
      },
      {
        children: [{
          name: '导出花名册',
          power: 'buildPerson:export',
          on: () => {
            this.handleExportTeam()
          },
          icon: 'icon-daochu-copy'
        },
        {
          name: '下载体检报告',
          power: 'buildPerson:download',
          on: () => {
            this.handleReport()
          },
          icon: 'icon-xiazai'
        }]
      }],
      columns: [{
        type: 'selection',
        single: false
      },
      {
        label: '序号',
        index: true
      },
      {
        label: '考勤编号',
        prop: 'attendanceNumber',
        sortable: 'custom',
        showTooltip: true,
        width: 150
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
                this.jumpState('personDetails', row)
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
        width: 150,
        render: (h, row) => {
          return h('span', row.workTypeName)
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
        label: '年龄',
        prop: 'entryAge',
        sortable: 'custom',
        showTooltip: true,
        width: 150
      },
      {
        label: '手机',
        prop: 'telephone',
        showTooltip: true,
        width: 150
      },
      {
        label: '身份证号',
        prop: 'idNumber',
        showTooltip: true,
        width: 200,
        sortable: 'custom'
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
        label: '所在公司',
        prop: 'cooperativeUnitName',
        showTooltip: true,
        width: 150
      },
      {
        label: '首次进场日期',
        prop: 'firstEntryDate',
        showTooltip: true,
        sortable: 'custom',
        width: 150,
        render: (h, row) => {
          return h('el-popover', {
            attrs: {
              placement: 'bottom',
              trigger: 'click',
              width: '300'
            }
          }, this.seeFirstEntryDate(h, row, row.dataTableData, row.firstEntryDate))
        }
      },
      {
        label: '离场日期',
        showTooltip: true,
        prop: 'leaveDate',
        sortable: 'custom',
        width: 150
      },
      {
        label: '体检报告',
        showTooltip: true,
        render: (h, row) => {
          return h('el-popover', {
            attrs: {
              placement: 'bottom',
              trigger: 'click',
              width: '300'
            }
          }, fileDetails(h, row, row.tableData, '体检报告'))
        }
      },
      {
        label: '状态',
        prop: 'state',
        showTooltip: true,
        sortable: 'custom',
        width: 150,
        render: (h, row) => {
          return h('span', row.stateName)
        }

      }
      ],
      tableOptions: {
        maxHeight: 'calc(100vh - 280px)',
        defaultSort: {
          prop: 'attendanceNumber',
          order: 'descending'
        }
      }
    }
  },
  created() {

  },
  methods: {
    seeFirstEntryDate(h, row, tableData, cellName = '') {
      var popoverTable = h('comm-table',
        {
          ref: 'commTable',
          key: 0,
          props: {
            columns: [{
              label: '日期',
              prop: 'recordDate',
              showTooltip: true
            },
            {
              label: '类型',
              prop: 'typeName',
              showTooltip: true
            },
            {
              label: '天数',
              prop: 'days',
              showTooltip: true
            }],
            data: tableData
          }
        })
      const popoverContent = h('span',
        {
          slot: 'reference',
          class: {
            'table-click-color': true
          }
        }, cellName)
      return [row.renderTableTitleStatus ? popoverContent : null, popoverTable]
    }

  }
}
