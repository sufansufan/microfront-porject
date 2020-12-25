import { parseTime } from '@core/utils'
import { fileDetails } from '@core/utils/renderTable.js'
export default {
  data() {
    return {
      selectList: [{
        value: 'attendanceNumber',
        searchType: 'input',
        name: '考勤编号'
      },
      {
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
      }],
      btnList: [{
        children: [{
          name: '录入信息',
          power: 'buildPerson:add',
          on: () => {
            this.handlePersonBtn('addInfo')
          },
          icon: 'icon-zujianxiangmubu'
        },
        {
          name: '确认进场',
          power: 'buildPerson:confirm',
          on: () => {
            this.handlePersonBtn('confirmInto')
          },
          icon: 'icon-zujianxiangmubu'
        }]
      },
      {
        children: [{
          name: '下载',
          power: 'buildPerson:download',
          on: () => {
            this.handleApproachBtn('load')
          },
          icon: 'icon-daochu-copy'
        }, {
          name: '导出',
          power: 'buildPerson:export',
          dropdown: true,
          on: (val) => {
            this.handleApproachBtn(val)
          },
          icon: 'icon-zujianxiangmubu',
          children: [
            { name: '安全记录登记表', command: 'table' },
            { name: '花名册', command: 'roster' },
            { name: '特殊工种花名册', command: 'specialRoster' }
          ]
        }
        ]
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
        showTooltip: true,
        width: 150,
        sortable: 'custom',
        fixed: 'left'
      },
      {
        label: '姓名',
        showTooltip: true,
        width: 150,
        fixed: 'left',
        render: (h, row) => {
          return h('span', {
            class: {
              'table-click-color': true
            },
            on: {
              click: () => {
                this.handleAddProject('details', row)
              }
            }
          }, row.name)
        }
      },
      {
        label: '工种',
        prop: 'workTypeName',
        sortable: 'custom',
        width: 100
      },
      {
        label: '性别',
        prop: 'genderName',
        sortable: 'custom'
      },
      {
        label: '年龄',
        prop: 'age',
        sortable: 'custom',
        showTooltip: true
      },
      {
        label: '施工队/班组',
        showTooltip: true,
        prop: 'constructionTeamName',
        sortable: 'custom',
        width: 130
      },
      {
        label: '首次进场日期',
        prop: 'firstEntryDate',
        showTooltip: true,
        sortable: 'custom',
        width: 150,
        render: (h, row) => {
          return h('span', row.firstEntryDate)
        }
      },
      {
        label: '教育、培训日期',
        showTooltip: true,
        prop: 'constructionUnit',
        width: 300,
        render: (h, row) => {
          return h('span', `${parseTime(row.startDate, 'y-m-d') || ''} ${parseTime(row.startDate, 'y-m-d') ? '-' : ''} ${parseTime(row.endDate, 'y-m-d') || ''}`)
        }
      },
      {
        label: '教育时间(学时)',
        width: 150,
        prop: 'classHours'
      },
      {
        label: '考核绩效',
        prop: 'score'
      },
      {
        label: '劳动合同编号',
        width: 200,
        prop: 'attendanceNumber'
      },
      {
        label: '安全教育卡',
        width: 150,
        render: (h, row) => {
          return h('el-popover', {
            attrs: {
              placement: 'bottom',
              trigger: 'click',
              width: '300'
            }
          }, fileDetails(h, row, row.safeTableData, '安全教育卡'))
        }
      },
      {
        label: '考卷',
        render: (h, row) => {
          return h('el-popover', {
            attrs: {
              placement: 'bottom',
              trigger: 'click',
              width: '300'
            }
          }, fileDetails(h, row, row.poperTableData, '考卷'))
        }
      },
      {
        label: '安全作业承诺书',
        width: 150,
        render: (h, row) => {
          return h('el-popover', {
            attrs: {
              placement: 'bottom',
              trigger: 'click',
              width: '300'
            }
          }, fileDetails(h, row, row.bookTableData, '安全作业承诺书'))
        }
      },
      {
        label: '体检报告',
        prop: 'absolutePeriod',
        width: 150,
        fixed: 'right',
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
        label: '离场日期',
        prop: 'leaveDate',
        sortable: 'custom',
        width: 100,
        fixed: 'right'
      }, {
        label: '状态',
        prop: 'stateName',
        sortable: 'custom',
        fixed: 'right'
      }
      ],
      tableOptions: {
        maxHeight: 'calc(100vh - 350px)',
        defaultSort: {
          prop: 'attendanceNumber',
          order: 'descending'
        }
      }
    }
  }
}
