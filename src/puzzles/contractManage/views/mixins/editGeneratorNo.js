import { copyFileList } from '@core/api/accessoryFile'
import { strFirstUpper } from '@core/utils'

export default {
  computed: {
    approvalNo() {
      return this.constant.generateNo
    }
  },
  methods: {
    async _uploadCopyFile(list) {
      const type = list[0].frontType
      const { data } = await copyFileList(list)
      data.forEach(file => {
        file.name = file.fileName
      })
      this[`${type}List`] = data
      const upperType = strFirstUpper(type)
      this[`deep${upperType}List`] = data
    },
    _copyFileList() {
      // 结算书 施工许可证 中标通知书
      const fileList = [
        'contract', // 合同
        'constructionPermit', // 施工许可证
        'winBidBook', // 中标通知书
        'settlementBook', // 结算书
        'agree' // 协议
      ]
      // 需要改变typeCode 和 需要改变新的审批单号
      let leafFileList = fileList.map(key => {
        if (this[`${key}List`] && this[`${key}List`].length > 0) {
          this[`${key}List`][0].frontType = key
          return this[`${key}List`]
        }
      })
      // 去空
      leafFileList = leafFileList.filter(file => (Boolean(file)))
      // 处理
      // 活着的文件列表
      leafFileList.forEach(file => {
        file.forEach(i => {
          i.businessDataId = this.approvalNo
        })
        this._uploadCopyFile(file)
      })
    },
    editGeneratorNo(approvalStatus, type = 'main') {
      if (approvalStatus === '01' || approvalStatus === '06') return
      const prefix = type === 'main' ? 'parentParams' : 'ruleForm'
      console.log(this.constant.generateNo)
      this[prefix]['approvalNo'] = this.approvalNo
      // copyFile 复制文件
      this._copyFileList()
    }
  }
}
