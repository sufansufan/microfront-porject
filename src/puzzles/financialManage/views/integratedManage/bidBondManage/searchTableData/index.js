export default {
  data() {
    return {
      selectList: [
        {
          value: 'name',
          searchType: 'select',
          name: '工程名称',
          selectData: []
        },
        {
          value: 'type',
          searchType: 'input',
          name: '招标单位'
        },
        {
          value: 'state',
          searchType: 'select',
          name: '状态',
          selectData: []
        }
      ],
      btnList: [
        {
          children: [
            {
              name: '新增',
              power: 'contractInput:settle',
              on: () => {
                this.orgJump('add')
              },
              icon: 'icon-fabu-copy'
            },
            {
              name: '修改',
              power: 'contractInput:settle',
              on: () => {
                this.orgJump('edit')
              },
              icon: 'icon-fabu-copy'
            },
            {
              name: '删除',
              power: 'contractInput:settle',
              on: () => {
                this.orgJump('delete')
              },
              icon: 'icon-fabu-copy'
            }
          ]
        },
        {
          children: [
            {
              name: '结清',
              power: 'contractInput:revoke',
              on: () => {
                this.orgJump()
              },
              icon: 'icon-daoru-copy'
            },
            {
              name: '撤销结清',
              power: 'contractInput:revoke',
              on: () => {
                this.orgJump()
              },
              icon: 'icon-daoru-copy'
            },
            {
              name: '导出',
              power: 'contractInput:revoke',
              on: () => {
                this.orgJump()
              },
              icon: 'icon-daoru-copy'
            }
          ]
        }
      ]
    }
  },
  methods: {

    orgJump() {

    }
  }
}
