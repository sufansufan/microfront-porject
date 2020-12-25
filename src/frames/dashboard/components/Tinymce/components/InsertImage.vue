<template>
  <div class="insert-image">
    <drag-dialog ref="dialog" title="插入图片" top="25vh">
      <ul class="insert-image-content">
        <li v-for="(item, index) in imageList" :key="index">
          <img :src="item.url" alt="">
          <div class="icon-image" @click="deleteImage(index, item.id)">
            <i class="el-icon-circle-close" />
          </div>
        </li>
      </ul>
      <div class="insert-image-btn">
        <div>
          <el-upload
            ref="upload"
            :file-list="imageList"
            :action="actionUrl"
            :on-success="uploadSuccess"
            :data="uploadData"
            :headers="uploadHeaders"
            :before-upload="beforeUpload2M"
            :show-file-list="false"
          >
            <el-button type="primary">上传图片</el-button>
          </el-upload>
        </div>
        <div>
          <el-button type="primary" @click="submit">确定</el-button>
        </div>
      </div>
    </drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import upload from '@core/mixins/upload'
import { deleteFile } from '@core/api/accessoryFile'
export default {
  components: {
    DragDialog
  },
  mixins: [upload],
  data() {
    return {
      imageList: []
    }
  },
  created() {
    this.uploadData.typeCode = 'tinymceImage'
  },
  methods: {
    submit() {
      this.$emit('imageSuccess', this.imageList)
    },
    uploadSuccess(response, file, fileList) {
      this.uploadLoading.close()
      const { data } = response
      const { id, fileUrl } = data[0]
      this.imageList.push({ id, url: fileUrl })
    },
    deleteImage(index, id) {
      this.imageList.splice(index, 1)
      deleteFile(id)
    }
  }
}
</script>

<style lang="less" scoped>
.insert-image {
  &-content {
    min-height: 30vh;
    border: 1px dashed #c1c0c0;
    display: flex;
    flex-wrap: wrap;
    & > li {
      width: 100px;
      height: 100px;
      margin-right: 10px;
      margin-top: 10px;
      position: relative;
      & > img {
        height: 100%;
        width: 100%;
        object-fit: scale-down;
      }
      & > .icon-image {
        position: absolute;
        top: -7px;
        right: -7px;
        cursor: pointer;
        & > i {
          font-size: 18px;
          color: #ee3d3d;
        }
      }
    }
  }
  &-btn {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
}
</style>
