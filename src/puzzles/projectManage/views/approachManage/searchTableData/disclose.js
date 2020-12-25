import { fileDetails } from '@core/utils/renderTable.js'
import { parseTime } from '@core/utils'
export default {
  data() {
    return {
      selectList: [{
        value: 'name',
        searchType: 'input',
        name: '安全技术交底名称'
      },
      {
        value: 'userId',
        searchType: 'select',
        name: '交底人',
        selectData: [],
        selectOption: {
          value: 'userId',
          label: 'userName'
        }
      },
      {
        value: 'uploadDate',
        searchType: 'pickerDate',
        name: '上传日期'
      }],
      btnList: [{
        children: [{
          name: '新增',
          power: 'disclose:add',
          on: () => {
            this.handlerDiscloseBtn('add')
          },
          icon: 'icon-xinzeng1-copy'
        },
        {
          name: '修改',
          power: 'disclose:edit',
          on: () => {
            this.handlerDiscloseBtn('edit')
          },
          icon: 'icon-xiugai-copy'
        },
        {
          name: '删除',
          power: 'disclose:delete',
          on: () => {
            this.handlerDiscloseBtn('delete')
          },
          icon: 'icon-icon7-copy'
        }]
      },
      {
        children: [
          {
            name: '导出',
            power: 'disclose:export',
            on: () => {
              this.handlerEducationBtn('explore')
            },
            icon: 'icon-daochu-copy'
          },
          {
            name: '下载',
            power: 'disclose:download',
            on: () => {
              this.handlerEducationBtn('download')
            },
            icon: 'icon-daochu-copy'
          }
        ]
      },
      {
        children: [{
          name: '返回',
          power: '',
          class: 'back-btn',
          on: () => {
            this.$router.go(-1)
          },
          icon: 'icon-fanhui-copy'
        }]
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
        prop: 'number',
        showTooltip: true,
        width: 150,
        sortable: 'custom'
      },
      {
        label: '安全技术交底名称',
        showTooltip: true,
        prop: 'name',
        width: 150
      },
      {
        label: '交底人',
        prop: 'userName'
      },
      {
        label: '交底日期',
        prop: 'date',
        sortable: 'custom',
        render: (h, row) => {
          return h('span', parseTime(row.date, 'y-m-d'))
        }
      },
      {
        label: '安全技术交底表',
        showTooltip: true,
        prop: 'constructionUnit',
        render: (h, row) => {
          return h('el-popover', {
            attrs: {
              placement: 'bottom',
              trigger: 'click',
              width: '300'
            }
          }, fileDetails(h, row, [{ contractNumber: '23423423' }], '安全技术交底表'))
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
          order: 'ascending'
        }
      }
    }
  }
}
