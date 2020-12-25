import { exportFile } from '@core/api/accessoryFile'
import { exportExcel } from '@core/utils'
export function fileDetails(h, row, tableData, cellName = '查看附件') {
  var popoverTable = h('comm-table',
    {
      ref: 'commTable',
      key: 0,
      props: {
        columns: [{
          label: '文件名称',
          prop: 'fileName',
          showTooltip: true,
          render: (h, row) => {
            return h('span',
              {
                class: { 'table-click-color': true },
                on: {
                  click: () => {
                    exportFile(row.id).then(res => {
                      exportExcel(res, row.fileName)
                    })
                  }
                }
              },
              row.fileName
            )
          }
        },
        {
          label: '文件大小',
          prop: 'fileSize',
          showTooltip: true,
          render: (h, row) => {
            return h('span',
              row.fileSize + 'KB'
            )
          }
        }],
        data: tableData
      }
    })
  const popoverContent = h('span',
    {
      slot: 'reference',
      class: {
        'table-click-color': true,
        'iconfont icon-fujia': true
      },
      on: {

      }
    }, cellName)
  return [row.renderTableTitleStatus ? popoverContent : null, popoverTable]
}
