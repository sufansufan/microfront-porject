
import upload from '@core/mixins/upload'
export default {
  mixins: [upload],
  computed: {
    isShowSettlementBookList() {
      return this.settlementBookList.length > 0
    }
  },
  methods: {
    uploadBusinessId(number, typeCode = 'contract') {
      this.uploadData.businessDataId = number // 审批单号赋值
      this.uploadData.typeCode = typeCode // 上传typeCode
    },
    fetchFormFileList(array, number) {
      const fetchArray = []
      const approvalNo = number
      array.forEach(file => {
        const type = file
        fetchArray.push(this._fetchFile(approvalNo, type))
      })
      return Promise.all(fetchArray)
    },
    // 合同详情
    async _fetchFile(id, type) {
      this.uploadData.typeCode = type
      this.uploadData.businessDataId = id
      const data = await this.getFileLoad()
      return data.map(file => {
        file.name = file.fileName
        file.url = file.fileUrl
        return file
      })
    }
  }
}
