<template>
  <div class="show-pictures">
    <div class="view-pic">
      <el-upload
        ref="upload"
        :action="actionUrl"
        :show-file-list="false"
        :data="uploadData"
        :headers="uploadHeaders"
        :on-success="fileSuccess"
        :before-upload="beforeUpload2M"
        :disabled="pictureList.length === 5"
      >
        <el-button v-if="$route.query.type !=='details'" size="small" type="primary" :disabled="pictureList.length === 5">添加图片</el-button>
      </el-upload>
      <div v-if="$route.query.type !=='details'" class="explain">
        图片最多可上传5张，用于商城产品展示。只能上传格式为jpg或png文件，且大小不超过2M，建议上传图片为等比例大小的，否则会自行裁剪。
      </div>
    </div>
    <div class="img-block">
      <template v-if="pictureList.length">
        <div v-for="(item,index) in pictureList" :key="index" style="padding:10px 10px 0 0;">
          <div v-if="$route.query.type !=='details'" class="img-btn">
            <div style="padding-left:10px;">
              <i v-if="index !=0" class="iconfont icon-zuoyi" @click="btnReomve(index, '-')" />
              <i v-if="index != pictureList.length - 1" class="iconfont icon-youyi" @click="btnReomve(index, '+')" />
            </div>
            <div />
            <div style="padding-right:10px;">
              <i class="iconfont icon-shanchu" @click="deleteImg(item.id,index,)" />
            </div>
          </div>
          <div v-viewer class="img-text">
            <img :src="item.fileUrl" class="avatar">
          </div>
        </div>
      </template>
      <template v-else>
        <not-content name="notData" />
      </template>
    </div>
  </div>
</template>

<script>
import upload from '@core/mixins/upload'
import { updateSort, deleteFile, copyFileList } from '@core/api/accessoryFile'
import NotContent from '@frames/dashboard/components/NotContent'
import { mapGetters } from 'vuex'
import { syncProductImg } from '@core/api/materialHouse/product'
import { getSessionStorage } from '@core/utils/auth'
export default {
  components: {
    NotContent
  },
  mixins: [upload],
  props: {
    copyId: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      pictureList: [],
      dialogImageUrl: ''
    }
  },
  computed: {
    ...mapGetters(['materialInfoId'])
  },
  created() {
    this.uploadData.typeCode = 'productPic'
    this.uploadData.businessDataId = this.materialInfoId
    this.fetchFileLoad()
  },
  methods: {
    btnReomve(index, type) {
      const position = type === '+' ? index + 1 : index - 1
      const up = this.pictureList[position]
      this.$set(this.pictureList, position, this.pictureList[index])
      this.$set(this.pictureList, index, up)
    },
    fetchFileLoad() {
      const { handelType } = this.$route.query
      if (handelType === 'copy') {
        this.pictureList = JSON.parse(getSessionStorage('imgList'))
        const param = JSON.parse(getSessionStorage('imgList'))
        if (param) {
          param.map(item => {
            item.businessDataId = this.copyId
            return item
          })
          copyFileList(param).then(({ data }) => {
            this.pictureList = data
          })
        }
      } else {
        this.getFileList()
      }
    },
    getFileList() {
      this.getFileLoad().then(data => {
        this.pictureList = data
      })
    },
    // 上传成功
    fileSuccess(response, file, fileList) {
      this.uploadLoading.close()
      this.pictureList.push(...response.data)
    },
    deleteImg(id, index) {
      deleteFile(id)
      this.pictureList.splice(index, 1)
    },
    saveSubmit() {
      if (!this.pictureList.length) {
        this.$message.warning('需要至少上传一张图片')
        return false
      }
      let pictureNum = 0
      const table = this.pictureList.map(item => {
        item.sort = pictureNum++
        return item
      })
      updateSort(table).then(({ data }) => {
        this.$message.success('保存成功!')
        this.syncProduct()
      })
    },
    syncProduct() {
      syncProductImg(this.materialInfoId).then(({ data }) => {})
    }

  }
}
</script>

<style lang="less" scoped>
.show-pictures {
  padding: 0 10px;
  .view-pic{
    display:flex;
    .avatar-uploader-icon {
     font-size: 28px;
     color: #8c939d;
     width: 200px;
     height: 200px;
     line-height: 200px;
     text-align: center;
    }
    .explain{
      line-height:32px;
      font-size:14px;
      color:#999;
      padding-left:10px;
    }
  }
  .img-block {
     display:flex;
     flex-wrap: wrap;
     width:100%;
     height: 250px;
     .img-btn {
       width:202px;
       height:30px;
       background: #dfdfdf;
       display:flex;
       justify-content: space-between;
       align-items: center;
       .iconfont{
         font-size:16px;
         color:#666;
       }
       .iconfont:hover{
         cursor: pointer;
         color:#0a4c8a
       }
    }
    .img-text {
      width:200px;
      height:200px;
      border:1px solid #dfdfdf;
      .el-icon-plus {
        font-size: 22px;
        line-height: 200px;
        display: block;
        text-align: center;
        }
      img {
        width:100%;
        height:100%;
        object-fit: cover;
        cursor: pointer;
      }
    }
  }

}
</style>
