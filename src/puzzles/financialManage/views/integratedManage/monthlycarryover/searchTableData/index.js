export default {
  data() {
    return {
      columns: [

        {
          label: '序号',
          index: true
        },
        {
          label: '年月',
          prop: 'name'
        },
        {
          label: '通用附加税率（%）',
          prop: 'name'
        },
        {
          label: '状态',
          prop: 'name'
        },
        {
          label: '操作',
          prop: 'name'
        }
      ],
      btnList: [
        {
          children: [
            {
              name: '初始化',
              power: 'contractInput:settle',
              on: () => {
                this.orgJump('add')
              },
              icon: 'icon-fabu-copy'
            }
          ]
        }
      ],
      tableOptions: {
        maxHeight: 'calc( 100% - 350px)'
      },
      tableData: [{ name: '增值税专用发票' }],
      total: 0,
      count: null
    }
  },
  methods: {
    orgJump() {

    }
  }
}
