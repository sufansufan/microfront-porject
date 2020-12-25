import { fileLoad, deleteFile, fileLoadCoop, deleteFileCoop, downLoadFile } from '@core/api/accessoryFile'
import { getUuid, exportExcel, strFirstUpper } from '@core/utils'
import { getToken, getSessionStorage } from '@core/utils/auth'
export default {
  data() {
    return {
      actionUrl: '',
      fileList: [],
      uploadData: {
        businessDataId: getUuid(),
        typeCode: '',
        isSyn: true,
        clearCache: false
      },
      uploadImgUrl: '',
      uploadHeaders: {
        token: getToken(),
        companyId: JSON.parse(getSessionStorage('organization')).id // 为了兼容23的情况
      },
      uploadLoading: null
    }
  },
  created() {
    const componyType = window.location.pathname.split('/')
    const baseUrl = process.env.NODE_ENV === 'development' ? '' : componyType[1]
    this.actionUrl = baseUrl + '/platform/accessoryfile/upload'
  },
  methods: {
    handleRemove(file, fileList, fileListName = 'fileList', options) {
      var id = ''
      if (file.response) {
        id = file.response.data[0].id
      } else {
        id = file.id
      }
      const currentUrl = this.$route.path
      if (currentUrl.indexOf('cooperativeEnterprise') === -1) {
        deleteFile(id).then(res => {
          this[fileListName] = fileList
          this.judgeUploadRecord(fileListName, options)
        })
      } else {
        deleteFileCoop(id).then(res => {
          this[fileListName] = fileList
        })
      }
    },
    // 文件上传时的钩子
    uploadProgress(event, file, fileList) {

    },
    uploadChange(file, fileList) {

    },
    // 单条上传(上传图片)
    uploadSuccess(response, file, fileList) {
      this.uploadLoading.close()
      const { data } = response
      this.uploadImgUrl = data[0].fileUrl
    },
    // 多条上传成功
    uploadMoreSuccess(fileList, fileListName = 'fileList', options) {
      this[fileListName] = fileList
      this.uploadLoading.close()
      this.judgeUploadRecord(fileListName, options)
    },
    // 判断是否是父子组件
    judgeUploadRecord(fileListName, options) {
      if (options && options.record) {
        var obj = {
          type: 'file',
          name: options.name,
          oldList: this['deep' + strFirstUpper(fileListName)]
        }
        if (this[fileListName].length) {
          const modifyList = []
          this[fileListName].forEach(item => {
            if (item.response) {
              modifyList.push(...item.response.data)
            } else {
              modifyList.push(item)
            }
          })
          obj = {
            ...obj,
            modifyList: modifyList
          }
        } else {
          obj = {
            ...obj,
            modifyList: []
          }
        }
        const { children, formName } = options
        const row = this.formUpdateContext(obj)
        if (children) {
          this.$emit('getChangeUploadContext', row, formName)
        } else {
          if (formName instanceof Array) {
            this.getChangeUploadContext2(row, formName)
          } else {
            this.getChangeUploadContext(row, formName)
          }
        }
      }
    },
    getFileLoad(dataId = this.uploadData.businessDataId, typeCode = this.uploadData.typeCode) {
      return new Promise((resolve, reject) => {
        const currentUrl = this.$route.path
        if (currentUrl.indexOf('cooperativeEnterprise') === -1) {
          fileLoad(dataId, typeCode).then(({ data }) => {
            resolve(data)
          })
        } else {
          fileLoadCoop(dataId, typeCode).then(({ data }) => {
            resolve(data)
          })
        }
      })
    },
    // 覆盖进度条(记住改名字)
    handleRequest() {

    },

    // 设置上传限制大小 在文件上传之前进行的操作
    beforeUploadM(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const testMsgM = testmsg === 'jpg'
      const isLtM = file.size / 1024 / 20 >= 1 && file.size / 1024 / 750 <= 1

      if (!testMsgM) {
        this.$message.warning('请上传jpg格式的图片')
      }
      if (!isLtM) {
        this.$message.warning('上传文件大小不得小于20KB,不得大于750kB!')
      }
      if (testMsgM && isLtM) {
        this.uploadLoading = this.handlerUploadMark()
      }
      return testMsgM && isLtM
    },
    // 限制1M
    beforeUpload1M(file) {
      const testMsg1M = /^image\/(jpeg|png|jpg)$/.test(file.type)
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!testMsg1M) {
        this.$message.warning('请上传jpeg/png/jpg格式的图片')
      }
      if (!isLt1M) {
        this.$message.warning('上传文件大小不能超过 1M!')
      }
      if (testMsg1M && isLt1M) {
        this.uploadLoading = this.handlerUploadMark()
      }
      return isLt1M && testMsg1M
    },
    beforeUpload2M(file) {
      const testMsg2M = /^image\/(jpeg|png|jpg)$/.test(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!testMsg2M) {
        this.$message.warning('请上传jpeg/png/jpg格式的图片')
      }
      if (!isLt2M) {
        this.$message.warning('上传文件大小不能超过 2M!')
      }
      if (testMsg2M && isLt2M) {
        this.uploadLoading = this.handlerUploadMark()
      }
      return isLt2M && testMsg2M
    },

    // 限制10M
    beforeUpload10M(file) {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.warning('上传文件大小不能超过 10M!')
      } else {
        this.uploadLoading = this.handlerUploadMark()
      }
      return isLt10M
    },
    beforeUpload50M(file, limitName = '') {
      if (limitName) {
        this[limitName](file)
      }
      const isLt50M = file.size / 1024 / 1024 < 50
      if (!isLt50M) {
        this.$message.warning('上传文件大小不能超过 50M!')
      } else {
        this.uploadLoading = this.handlerUploadMark()
      }
      return isLt50M
    },

    // 格式限制
    docxAndDoc(file) {
      const last = file.name.lastIndexOf('.')
      const type = file.name.slice(last)
      const typeList = ['.docx', '.doc']
      const isType = typeList.includes(type)
      if (!isType) {
        this.$message.error('上传文件图片只能是 docx 或 doc 格式!')
        this.uploadLoading.close()
      } else {
        this.uploadLoading = this.handlerUploadMark()
      }
      return isType
    },

    // 文件个数限制
    handleExceed(files, fileList) {
      console.log(files)
    },

    // 上传报错的问题
    fileError(err, file, fileList) {
      console.log(err)
      this.uploadLoading.close()
      this.$message.warning('附件上传失败')
    },

    // 上传遮罩的问题
    handlerUploadMark() {
      const loading = this.$loading({
        lock: true,
        text: '正在上传中，请稍等...',
        color: '#fff',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      return loading
    },

    // 点击文件列表中已上传的文件时的钩子
    previewFile(file) {
      var idNum = ''; var name = ''
      if (file.response) {
        const { response: { data }} = file
        idNum = data[0].id
        name = data[0].fileName
      } else {
        const { fileName, id } = file
        idNum = id
        name = fileName
      }
      downLoadFile(idNum).then(res => {
        exportExcel(res, name)
      })
    }
  }
}
