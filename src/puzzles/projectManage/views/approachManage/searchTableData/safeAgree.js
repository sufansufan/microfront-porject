import { fileDetails } from '@core/utils/renderTable.js'
import { parseTime } from '@core/utils'

export default {
  data() {
    return {
      that: this,
      btnList: [{
        children: [{
          name: '下载',
          power: 'safeAgree:download',
          on: () => {
            this.filesDownload()
          },
          icon: 'icon-daochu-copy'
        }]
      }, {
        children: [{
          name: '返回',
          power: '',
          class: 'back-btn',
          on: () => {
            this.$router.go(-1)
          },
          icon: 'icon-fanhui-copy'
        }]
      }],
      columns: [{
        type: 'selection'
      },
      {
        label: '序号',
        index: true
      },
      {
        label: '施工队编号',
        prop: 'code',
        showTooltip: true,
        sortable: 'custom'
      },
      {
        label: '施工队名称',
        showTooltip: true,
        prop: 'name'
      },
      {
        label: '施工队负责人',
        prop: 'chargePersonName',
        width: 200
      },
      {
        label: '所属公司',
        prop: 'cooperativeUnitName'
      },
      {
        label: '安全协议',
        prop: 'projectSiteName',
        showTooltip: true,
        width: 150,
        render: (h, row) => {
          return h('el-popover', {
            attrs: {
              placement: 'bottom',
              trigger: 'click',
              width: '300'
            },
            on: {
              'after-enter'() {

              }
            }
          }, fileDetails(h, row, row.tableData, '安全协议'))
        }
      },
      {
        label: '上传人',
        showTooltip: true,
        prop: 'uploadUserName'
      },
      {
        label: '上传日期',
        prop: 'uploadDate',
        showTooltip: true,
        sortable: 'custom',
        render: (h, row) => {
          return h('span', parseTime(row.uploadDate, 'y-m-d'))
        }
      },
      {
        label: '操作',
        showTooltip: true,
        width: 250,
        render: (h, row) => {
          const btnList = [
            { name: '上传', type: 'primary', power: 'safeAgree:upload', category: 'add' },
            { name: '修改', type: 'primary', power: 'safeAgree:edit', category: 'edit' },
            { name: '清空', type: 'danger', power: 'safeAgree:empty', category: 'clear' }
          ]
          return h('div', btnList.map(item => {
            return h('el-button', {
              props: {
                type: item.type
              },
              directives: [
                {
                  name: 'power',
                  value: item.power
                }
              ],
              on: {
                click: () => {
                  this.handlerOperate(item.category, row)
                }
              }
            }, item.name)
          }))
        }
      }],
      tableOptions: {
        maxHeight: 'calc(100vh - 300px)',
        defaultSort: {
          prop: 'code',
          order: 'ascending'
        }
      }
    }
  }
}
