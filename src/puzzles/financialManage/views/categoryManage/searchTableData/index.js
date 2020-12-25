import { canUpdate, deleteClass } from '@core/api/financialManage/financeclassmanager'
export default {
  data() {
    return {
      btnList: [
        {
          children: [
            { name: '新增', power: 'processconfig:add', on: () => { this.handleInfor('add') }, icon: 'icon-xinzeng1-copy' },
            { name: '修改', power: 'processconfig:edit', on: () => { this.handleInfor('edit') }, icon: 'icon-xiugai-copy' },
            { name: '删除', power: 'processconfig:delete', on: () => { this.handleInfor('delete') }, icon: 'icon-icon7-copy' }
          ]
        }
      ],
      selectList: [
        {
          value: 'id',
          searchType: 'select',
          name: '类别名称',
          selectData: []
        },
        {
          value: 'type',
          searchType: 'select',
          name: '所属类型',
          selectData: []
        }
      ],
      loading: false,
      tableData: [],
      columns: [
        {
          type: 'selection',
          single: true
        },
        {
          label: '序号',
          index: true
        },
        {
          label: '类别编号',
          prop: 'classNumber',
          showTooltip: true,
          sortable: 'custom'
        },
        { label: '类别姓名', prop: 'name' },
        {
          label: '上级类别',
          prop: 'parentId',
          showTooltip: true,
          render: (h, row) => {
            return h('span', {
            }, row.parentName)
          }
        },
        {
          label: '应用业务',
          prop: 'businessType',
          render: (h, row) => {
            return h('span', {}, row.businessName)
          }
        },
        {
          label: '所属类型',
          prop: 'type',
          render: (h, row) => {
            return h('span', {}, row.typeName)
          }
        },
        {
          label: '备注',
          prop: 'remark'
        },
        {
          label: '来源',
          prop: 'source',
          render: (h, row) => {
            return h('span', {}, row.sourceName)
          }

        },
        {
          label: '操作人',
          prop: 'operatePersonName'
        },
        {
          label: '操作时间',
          prop: 'operateDate',
          render: (h, row) => {
            return h('span', {}, row.dateStr)
          }
        }
      ]
    }
  },
  methods: {
    handleInfor(type) {
      const { onlyOneData } = this.$refs.commTable
      if (type === 'add') {
        this.$router.push({ name: 'CategoryAdd', query: { type: 'add' }})
      } else if (type === 'edit') {
        if (!onlyOneData()) return
        const { id } = this.$refs.commTable.multipleSelection[0]

        canUpdate(id).then(({ data, message }) => {
          if (!data) {
            this.$message.warning(message || '此类别不允许修改')
          } else {
            this.$router.push({ name: 'CategoryAdd', query: { type: 'edit', id: id }})
          }
        })
      } else {
        if (!onlyOneData()) return
        const { id } = this.$refs.commTable.multipleSelection[0]
        this.$confirm(
          '确定要删除该类别吗？',
          '提示',
          {
            type: 'warning',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
          .then(_ => {
            // this.setDeletUseInfor(id)
            deleteClass(id).then(({ data }) => {
              this.fetchData()
            })
          }).catch(_ => {})
      }
    }
  }
}
