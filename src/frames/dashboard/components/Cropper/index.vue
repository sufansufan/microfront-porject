<template>
  <div class="cropper">
    <div class="cropper-content">
      <div>
        <vue-cropper
          ref="cropper"
          :img="option.img"
          :output-size="option.size"
          :output-type="option.outputType"
          :auto-crop="option.autoCrop"
          :auto-crop-width="option.autoCropWidth"
          :auto-crop-height="option.autoCropHeight"
          :center-box="option.centerBox"
          :fixed-box="option.fixedBox"
          @realTime="realTime"
        />
      </div>
      <div class="perview">
        <div>
          <div class="head">
            <div v-if="previewStyle.width !== '0px'" :style="previewStyle">
              <img :src="previews.url" :style="previews.img">
            </div>
            <img v-else :src="headImg" alt="">
          </div>
          <span>首页预览效果</span>
        </div>
        <div>
          <div class="im">
            <div v-if="previewStyleIm.width !== '0px'" :style="previewStyleIm">
              <img :src="previews.url || headImg" :style="previews.img">
            </div>
            <img v-else :src="headImg" alt="">
          </div>
          <span>IM头像预览效果</span>
        </div>
      </div>
    </div>
    <div class="operation">
      <div>
        <div>
          <label class="btn" for="uploads">选择</label>
          <input id="uploads" type="file" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
        </div>
        <div>
          <el-button-group>
            <el-button type="primary" style="width: 50px" @click="changeScale(1)"> + </el-button>
            <el-button type="primary" style="width: 50px" @click="changeScale(-1)"> - </el-button>
          </el-button-group>
        </div>
      </div>
      <div>
        <el-button type="primary" @click="finish">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import { saveHeadImg } from '@core/api/personelSet'
import { base64ChangeUrl } from '@core/api/accessoryFile'
import { getSessionStorage } from '@core/utils/auth'
export default {
  components: {
    VueCropper
  },
  props: {
    headImg: {
      type: String,
      default: ''
    },
    personnelId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      option: {
        img: '',
        size: null,
        outputType: '',
        autoCrop: true,
        autoCropWidth: 130,
        autoCropHeight: 130,
        centerBox: true,
        fixedBox: true
      },
      previews: {},
      previewStyle: {},
      previewStyleIm: {},
      scale: null,
      imgKey: 0
    }
  },
  methods: {
    uploadImg(e, num) {
      var file = e.target.files[0]
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }
      var reader = new FileReader()
      reader.onload = e => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        if (num === 1) {
          this.option.img = data
        } else if (num === 2) {
          this.example2.img = data
        }
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file)
    },
    // 放大或缩小
    changeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    // 实时预览
    realTime(data) {
      var previews = data
      this.previewStyle = {
        width: previews.w + 'px',
        height: previews.h + 'px',
        overflow: 'hidden',
        margin: '0',
        zoom: (130 / previews.h)
      }
      this.previewStyleIm = {
        width: previews.w + 'px',
        height: previews.h + 'px',

        overflow: 'hidden',
        margin: '0',
        zoom: (50 / previews.h)
      }
      this.previews = data
    },
    finish() {
      this.$refs.cropper.getCropData(data => {
        const params = {
          businessDataId: getSessionStorage('userId'),
          typeCode: 'userInfoPhoto',
          sync: false,
          clearCache: true,
          sort: 0,
          base64: data.split(',')[1],
          fileType: 'image/png',
          originalFilename: 'userInfoPhoto.png'
        }
        base64ChangeUrl(params).then(({ data }) => {
          console.log(data)
          this.saveHead(data.fileUrl)
        })
      })
    },
    saveHead(data) {
      saveHeadImg({ headImg: data, userId: getSessionStorage('userId') }).then(res => {
        this.imgKey += 1
        this.$emit('closeDialog', 'dialog', data)
        this.$message.success('上传成功')
        this.$store.commit('SET_HEADERIMG', this.imgKey)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.cropper {
  .cropper-content {
    height: 400px;
    display: flex;
    justify-content: space-between;
    & > div {
      &:first-child {
        width: 70%;
        height: 100%
      }
      &:last-child {
        width: calc(30% - 20px);
        height: 100%;
      }
    }
    .perview {
        & > div {
          width: 100%;
          text-align: center;
          margin-bottom: 20px;
          margin-top: 30px;
          line-height: 40px;
          .head {
            height: 130px;
            width: 130px;
            border: 1px dashed #a0a0a0;
            margin: 0 auto;
            border-radius: 50%;
            overflow: hidden;
            & > img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .im {
            height: 50px;
            width: 50px;
            border: 1px dashed #a0a0a0;
            margin: 0 auto;
            border-radius: 10px;
            overflow: hidden;
            & > img {
              width: 100%;
              height: 100%;
              border-radius: 10px;
            }
          }
        }
      }
  }
  .operation {
    display: flex;
    justify-content: space-between;
    margin: 10px 0px;
    & > div {
      display: flex;
      .btn {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #0a4c8a;
        color: #1f2d3d;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        padding: 8px 14px;
        font-size: 14px;
        border-radius: 3px;
        color: #fff;
        background-color: #0a4c8a;
        border-color: #0a4c8a;
        transition: all 0.2s ease;
        text-decoration: none;
        user-select: none;
      }
      & > div {
        margin-right: 20px;
      }
    }
  }
}
</style>
