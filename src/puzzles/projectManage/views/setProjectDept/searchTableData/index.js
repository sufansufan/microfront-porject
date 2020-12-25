export default {
  data() {
    return {
      selectList: [{
        value: 'contractNumber',
        searchType: 'input',
        name: '合同编号'
      },
      {
        value: 'id',
        searchType: 'select',
        name: '工程名称',
        selectData: [],
        selectOption: {
          custom: true,
          value: 'id',
          label: 'name',
          customLeft: 'name',
          customRight: 'contractNumber'
        }
      },
      {
        value: 'projectSite',
        searchType: 'cascader',
        name: '工程地点',
        selectOption: {
          expandTrigger: 'hover',
          value: 'id',
          label: 'zh',
          children: 'children',
          checkStrictly: true
        },
        selectData: []
      },
      {
        value: 'userName',
        searchType: 'input',
        name: '项目经理'
      },
      {
        value: 'constructionUnit',
        searchType: 'input',
        name: '建设单位'
      },
      {
        value: 'projectState',
        searchType: 'select',
        name: '工程状态',
        selectData: []
      }
      ],
      btnList: [{
        children: [{
          name: '组建项目部',
          power: 'setProjectDept:create',
          on: () => {
            this.handleAddProject('add')
          },
          icon: 'icon-zujianxiangmubu'
        }
        ]
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
        label: '合同编号',
        prop: 'contractNumber',
        showTooltip: true,
        width: 150,
        sortable: 'custom'
      },
      {
        label: '工程名称',
        showTooltip: true,
        width: 150,
        prop: 'name',
        sortable: 'custom',
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
        label: '归属单位',
        prop: 'belongOrgName',
        sortable: 'custom',
        width: 200
      },
      {
        label: '项目经理',
        prop: 'userName',
        sortable: 'custom'
      },
      {
        label: '工程地点',
        prop: 'projectSiteName',
        sortable: 'custom',
        showTooltip: true,
        width: 200
      },
      {
        label: '建筑面积',
        showTooltip: true,
        prop: 'buildArea',
        sortable: 'custom'
      },
      {
        label: '工程状态',
        prop: 'projectState',
        showTooltip: true,
        sortable: 'custom',
        width: 120,
        render: (h, row) => {
          return h('span', row.projectStateName)
        }
      },
      {
        label: '建设单位',
        showTooltip: true,
        prop: 'constructionUnit',
        sortable: 'custom',
        width: 150
      },
      {
        label: '开工日期',
        prop: 'startDate',
        sortable: 'custom'
      },
      {
        label: '竣工日期',
        prop: 'endDate',
        sortable: 'custom'
      },
      {
        label: '绝对工期',
        prop: 'absolutePeriod',
        sortable: 'custom'
      },
      {
        label: '当前成员人数',
        prop: 'memberCount',
        sortable: 'custom',
        showTooltip: true,
        width: 150,
        render: (h, row) => {
          return h('span', row.memberCount ? row.memberCount : 0)
        }
      }],
      tableOptions: {
        maxHeight: 'calc(100vh - 350px)',
        defaultSort: {
          prop: 'contractNumber',
          order: 'descending'
        }
      },
      sortData: {
        propertyName: 'contractNumber',
        ascending: false
      }
    }
  }
}
