<template>
  <div class="jdy-upload">
    <el-upload
      :file-list="fileLists"
      :action="actionUrl"
      :on-success="(response, file, fileList) => {
        uploadMoreSuccess(fileList, 'fileLists')
      }"
      :data="uploadData"
      :headers="uploadHeaders"
      :on-remove="(file, fileList) => {
        handleRemove(file, fileList, 'fileLists')
      }"
      :before-upload="beforeUpload50M"
      :on-error="fileError"
      :on-progress="uploadProgress"
      :on-preview="previewFile"
      :limit="limit"
    >
      <template v-if="!disabled">
        <el-button type="primary" @click="handlerClickUpload"><i class="iconfont icon-chuanshu_shangchuan" /> 上传附件</el-button>
      </template>
    </el-upload>
  </div>
</template>

<script>
import upload from '@core/mixins/upload'
export default {
  mixins: [upload],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    typeCode: {
      type: String,
      default: ''
    },
    businessDataId: {
      type: String,
      default: ''
    },
    isAdd: {
      type: Boolean,
      default: true
    },
    limit: {
      type: null,
      default: null
    }
  },
  data() {
    return {
      fileLists: []
    }
  },
  watch: {
    businessDataId: {
      handler(newV) {
        if (newV) {
          this.uploadData.businessDataId = newV
        }
        if (!this.isAdd && newV) { this.fetchFile() }
      },
      immediate: true
    }
  },
  created() {
    // if (this.businessDataId) {
    //   this.fetchFile()
    // }
  },
  destroyed() {
    this.fileLists = []
  },
  methods: {
    handlerClickUpload() {
      this.uploadData.typeCode = this.typeCode
      this.$emit('changeBindRuleFormId', this.uploadData.businessDataId)
    },
    fetchFile() {
      this.uploadData = {
        ...this.uploadData,
        typeCode: this.typeCode,
        businessDataId: this.businessDataId
      }
      this.$emit('changeBindRuleFormId', this.uploadData.businessDataId)
      this.getFileLoad().then(data => {
        this.fileLists = data.map(item => {
          item.name = item.fileName
          item.url = item.fileUrl
          return item
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.jdy-upload {
  width: 100%;
}
</style>
