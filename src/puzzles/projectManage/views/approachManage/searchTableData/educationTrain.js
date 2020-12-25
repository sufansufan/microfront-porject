import { fileDetails } from '@core/utils/renderTable.js'
import { parseTime } from '@core/utils'
export default {
  data() {
    return {
      selectList: [{
        value: 'subject',
        searchType: 'input',
        name: '培训主题'
      },
      {
        value: 'targetObject',
        searchType: 'input',
        name: '培训对象'
      },
      {
        value: 'hostPersonId',
        searchType: 'select',
        name: '主讲人',
        selectData: [],
        selectOption: {
          value: 'id',
          label: 'name'
        }
      }],
      btnList: [{
        children: [{
          name: '新增',
          power: 'educationRrain:add',
          on: () => {
            this.handlerEducationBtn('add')
          },
          icon: 'icon-xinzeng1-copy'
        },
        {
          name: '修改',
          power: 'educationRrain:edit',
          on: () => {
            this.handlerEducationBtn('edit')
          },
          icon: 'icon-xiugai-copy'
        },
        {
          name: '删除',
          power: 'educationRrain:delete',
          on: () => {
            this.handlerEducationBtn('delete')
          },
          icon: 'icon-icon7-copy'
        }]
      },
      {
        children: [
          {
            name: '下载',
            power: 'educationRrain:download',
            on: () => {
              this.handlerEducationBtn('download')
            },
            icon: 'icon-daochu-copy'
          }
        ]
      }
      ],
      columns: [{
        type: 'selection'
      },
      {
        label: '序号',
        index: true
      },
      {
        label: '编号',
        prop: 'number',
        showTooltip: true,
        width: 150,
        sortable: 'custom'
      },
      {
        label: '培训主题',
        showTooltip: true,
        prop: 'subject',
        width: 150
      },
      {
        label: '培训对象',
        prop: 'targetObject'
      },
      {
        label: '培训人数',
        prop: 'personNumber'
      },
      {
        label: '主讲人',
        prop: 'hostPersonName',
        showTooltip: true
      },
      {
        label: '培训开始日期',
        showTooltip: true,
        prop: 'startTime',
        sortable: 'custom',
        render: (h, row) => {
          return h('span', {}, parseTime(row.startTime, 'y-m-d'))
        }
      },
      {
        label: '学时',
        prop: 'classHours',
        showTooltip: true,
        sortable: 'custom'
      },
      {
        label: '安全教育记录',
        showTooltip: true,
        prop: 'constructionUnit',
        render: (h, row) => {
          return h('el-popover', {
            attrs: {
              placement: 'bottom',
              trigger: 'click',
              width: '300'
            }
          }, fileDetails(h, row, row.tableData, '安全教育培训记录表'))
        }
      },
      {
        label: '备注',
        prop: 'remark'
      }],
      tableOptions: {
        maxHeight: 'calc(100vh - 350px)',
        defaultSort: {
          prop: 'number',
          order: 'descending'
        }
      }
    }
  }
}
