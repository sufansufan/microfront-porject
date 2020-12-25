<template>
  <el-dialog
    v-el-drag-dialog
    :title="oTitle"
    :width="width"
    :top="top"
    :close-on-click-modal="false"
    :visible.sync="show"
    class="dialog"
    :modal="modal"
    :append-to-body="append"
    @close="closed"
  >
    <div>
      <slot />
    </div>
    <div class="footer">
      <slot name="footer" />
    </div>
  </el-dialog>
</template>

<script>
import elDragDialog from './elDrag.js'
export default {
  directives: {
    elDragDialog
  },
  props: {
    width: {
      default: '50%',
      type: String
    },
    height: {
      default: '70%',
      type: String
    },
    title: {
      default: '',
      type: String
    },
    top: {
      default: '28vh',
      type: String
    },
    modal: {
      default: true,
      type: Boolean
    },
    append: {
      default: false,
      type: Boolean
    },
    isShow: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      oTitle: '',
      refShow: false
    }
  },
  computed: {
    show: {
      get() {
        return this.isShow || this.refShow
      },
      set(val) {
        this.refShow = val
        this.$emit('update:isShow', val)
      }
    }
  },
  watch: {
    title: {
      handler() {
        this.oTitle = this.title
      },
      immediate: true
    }
  },
  methods: {
    setTitle(title) {
      this.oTitle = title
    },
    closed() {
      this.show = false
    }
  }
}
</script>

<style lang="less">
.dialog {
  .el-dialog__header {
    background: #f5f5f5;
    padding: 10px;
    border-bottom: 1px solid #eee;
    min-height: 25px;
    .el-dialog__headerbtn {
      top: 15px;
    }
    .el-dialog__title {
      color: #333;
      font-size: 15px;
    }
  }
  .el-dialog__body {
    padding: 10px;
    // .btn {
    //   width: 100%;
    //   margin: 10px 0 0 0 !important;
    //   > div {
    //     display: flex !important;
    //     justify-content: center;
    //   }
    // }
    .footer {
      display: flex !important;
      justify-content: flex-end;
      margin-top: 10px;
    }
  }
}
</style>
