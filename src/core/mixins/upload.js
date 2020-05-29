import { fileLoad, deleteFile } from '../api/accessoryFile'
export default {
  data() {
    return {
      actionUrl: 'http://192.168.2.124:8888/accessoryfile/upload',
      fileList: [],
      uploadData: {
        businessDataId: '456',
        typeCode: '456',
        isSyn: true,
        clearCache: false
      },
      uploadHeaders: {
        token: 'sufan'
      }
    }
  },
  created() {
    fileLoad().then(({ data }) => {
      this.fileList = data
    })
  },
  methods: {
    handleRemove(file, fileList) {
      var id = ''
      if (file.response) {
        id = file.response.data[0].id
      } else {
        id = file.id
      }
      deleteFile(id).then(res => {
        console.log(res)
      })
    }
  }
}
