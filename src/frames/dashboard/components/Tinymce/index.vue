<template>
  <div class="tinymce-container" :class="{fullscreen:fullscreen}" :style="{width:containerWidth}">
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <div class="tinymce-custom-btn-container">
      <el-tooltip v-for="item in customPluginsData" :key="item.type" style="top: 215px" effect="dark" :content="item.content" popper-class="tinymce-tooltip" placement="bottom">
        <div :class="`${item.type}-container`" @click="item.event(() => {customTinymceDialog(item.ref)})">
          <i class="iconfont icon-type" :class="[item.icon, readonly ? 'readonly' : '']" />
        </div>
      </el-tooltip>
    </div>
    <insert-image ref="insertImage" @imageSuccess="imageSuccess" />
  </div>
</template>

<script>
import load from '@core/utils/dynamicLoadScript'
const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.5/tinymce.min.js'
import { plugins, customPlugins } from './plugins'
import toolbar from './toolbar'
import InsertImage from './components/InsertImage'
export default {
  name: 'Tinymce',
  components: {
    InsertImage
  },
  props: {
    id: {
      type: String,
      default: function() {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    height: {
      type: [Number, String],
      required: false,
      default: 360
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fullscreen: false,
      tinymceId: this.id,
      hasInit: false
    }
  },
  computed: {
    customPluginsData() {
      return customPlugins
    },
    containerWidth() {
      const width = this.width
      if (/^[\d]+(\.[\d]+)?$/.test(width)) {
        return `${width}px`
      }
      return width
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''))
      }
    }
  },
  mounted() {
    this.init()
  },
  destroyed() {
    this.destroyTinymce()
  },
  methods: {
    init() {
      load(tinymceCDN, (err) => {
        if (err) {
          this.$message.error(err.message)
          return
        }
        this.initTinymce()
      })
    },
    initTinymce() {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        language: 'zh_CN',
        height: this.height,
        toolbar: toolbar,
        plugins: plugins,
        nonbreaking_force_tab: true,
        readonly: _this.readonly,
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        }
      })
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }

      if (tinymce) {
        tinymce.destroy()
      }
    },
    // 自定义弹框
    customTinymceDialog(type) {
      if (this.readonly) return
      this.$refs[type].$refs.dialog.show = true
    },
    // 获取富文本内容
    getContent() {
      return window.tinymce.get(this.tinymceId).getContent()
    },
    // 设置内容
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    // 上传照片成功回调
    imageSuccess(arr) {
      this.$refs['insertImage'].$refs.dialog.show = false
      this.$refs['insertImage'].imageList = []
      arr.forEach(v => window.tinymce.get(this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`))
    }
  }
}
</script>

<style lang="less" scoped>
.tinymce-box() {
  box-sizing: border-box;
  border: 1px solid #fff;
  cursor: pointer;
  text-align: center;
  &:hover {
    box-sizing: border-box;
    border: 1px solid #e2e4e7;
  }
}
.tinymce-container {
  position: relative;
  line-height: normal;
  ::v-deep {
    .mce-fullscreen {
      z-index: 10000;
    }
  }
  .tinymce-textarea {
    visibility: hidden;
    z-index: -1;
  }
  .tinymce-custom-btn-container {
    position: absolute;
    left: 520px;
    top: 72px;
    .image-container {
      width: 29px;
      height: 30px;
      .tinymce-box();
    }
    .icon-type {
      line-height: 28px;
      text-align: center;
      font-size: 22px;
      color: #595959;
      &.readonly {
        color: #bbb;
      }
    }
  }
}

.fullscreen .tinymce-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
</style>

<style lang="less">
.tinymce-tooltip {
  padding: 5px;
  border-radius: 0px;
  top: 275px !important;
}
</style>
