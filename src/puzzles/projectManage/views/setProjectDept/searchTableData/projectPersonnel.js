export default {
  data() {
    return {
      btnList: [{
        children: [
          {
            name: '成员任命',
            dataPower: 'projectNumber:add:' + this.$route.query.projectId,
            power: 'projectNumber:add',
            on: () => {
              this.handlerBtn('appoint')
            },
            icon: 'icon-shouye-wode-chengyuanguanli-chengyuanrenming-shouyujiaose'
          },
          {
            name: '发布通知',
            dataPower: 'projectNumber:release:' + this.$route.query.projectId,
            power: 'projectNumber:release',
            on: () => {
              this.handlerNotice()
            },
            icon: 'icon-fabutongzhi1'
          },
          {
            name: '退出项目',
            dataPower: 'projectNumber:out:' + this.$route.query.projectId,
            power: 'projectNumber:out',
            on: () => {
              this.handlerBtn('outProject')
            },
            icon: 'icon-tuichuxiangmu'
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
        label: '项目岗位',
        prop: 'postName',
        showTooltip: true,
        width: 150
      },
      {
        label: '员工工号',
        showTooltip: true,
        prop: 'userNumber',
        sortable: true,
        width: 150
      },
      {
        label: '员工姓名',
        prop: 'userName',
        width: 120
      },
      {
        label: '员工类型',
        prop: 'userTypeName',
        width: 120
      },
      {
        label: '其他职责',
        prop: 'otherDutyName',
        showTooltip: true
      },
      {
        label: '进入日期',
        prop: 'inDate',
        sortable: true
      },
      {
        label: '退出日期',
        prop: 'outDate',
        sortable: true
      },
      {
        label: '天数',
        prop: 'day',
        sortable: true
      },
      {
        label: '通知状态',
        prop: 'noticeStatusName',
        sortable: true
      },
      {
        label: '状态',
        prop: 'statusName',
        sortable: true
      },
      {
        label: '操作',
        show: this.$route.query.type !== 'details',
        render: (h, row) => {
          const btnList = [
            { msg: '修改', type: 'primary', power: 'projectNumber:delete', category: 'edit' },
            { msg: '清空', type: 'danger', power: 'projectNumber:empty', category: 'clear' }
          ]
          return h('div', {},
            btnList.map(ctx => {
              return h('el-button', {
                props: {
                  type: ctx.type
                },
                directives: [
                  {
                    name: 'power',
                    value: ctx.power || ctx.power + ':' + this.$route.query.projectId
                  }
                ],
                on: {
                  click: () => {
                    this.handlerOperate(ctx.category, row)
                  }
                }
              }, ctx.msg)
            })
          )
        },
        width: 200
      }],
      tableOptions: {
        defaultSort: {},
        sortTable: true,
        maxHeight: 'calc(100vh - 270px)'
      }
    }
  }
}
