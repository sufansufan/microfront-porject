<template>
  <div class="material-add">
    <div class="back-info">
      <div class="title-name">{{ productName }}</div>
    </div>
    <jdy-steps :action="action">
      <jdy-step title="基本信息" />
      <jdy-step title="展示图片" />
      <jdy-step title="产品介绍" />
    </jdy-steps>
    <keep-alive>
      <template v-if="action===0">
        <base-info ref="baseInfo" :disabled="false" :add-or-edit-state="addOrEditState" :copy-id="copyId" @childEvent="parentEvent" />
      </template>
      <template v-if="action===1">
        <show-pictures ref="showPictures" :disabled="false" :copy-id="copyId" />
      </template>
    </keep-alive>
    <template v-if="action===2">
      <product-details ref="productDetails" :disabled="false" :copy-id="copyId" />
    </template>
    <div class="steps-action">
      <el-button type="primary" @click="saveAndNext('save')">保存</el-button>
      <template v-if="action===0">
        <el-button type="primary" @click="saveAndNext('down')"> 下一步</el-button>
      </template>
      <template v-if="action===1">
        <el-button type="primary" @click="config('reduce')">上一步</el-button>
        <el-button type="primary" @click="config('add','next')">下一步</el-button>
      </template>
      <template v-if="action===2">
        <el-button type="primary" @click="config('reduce', 'tinymce')">上一步</el-button>
        <el-button type="primary" @click="finish"> 完成</el-button>
      </template>
      <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>

<script>
import BaseInfo from './components/BaseInfo'
import ShowPictures from './components/ShowPictures'
import ProductDetails from './components/ProductDetails'
import { getUuid } from '@core/utils/index'
export default {
  name: 'MaterialAdd',
  components: {
    BaseInfo,
    ShowPictures,
    ProductDetails
  },
  data() {
    return {
      action: 0,
      productName: this.$route.query.name,
      addOrEditState: '',
      copyId: getUuid()
    }
  },
  destroyed() {
    this.$store.commit('SET_TINYMCE', '')
  },
  methods: {
    config(type, isNext) {
      switch (type) {
        case 'add':
          if (isNext === 'next') {
            if (this.saveProductPic() === false) {
              return
            }
          }
          this.action += 1
          break
        case 'reduce':
          if (isNext === 'tinymce') {
            this.$store.commit('SET_TINYMCE', this.$refs.productDetails.content)
          } else if (isNext === 'backBase') {
            this.$refs.showPictures.saveSubmit()
          }
          this.action -= 1
          break
        default:
          break
      }
    },
    saveAndNext(type) {
      if (this.action === 0) {
        this.$refs.baseInfo.addOrEdit().then(res => {
          this.addOrEditState = res
          if (type === 'down') {
            this.config('add')
          }
        })
      } else if (this.action === 1) {
        if (type === 'save') {
          this.saveProductPic()
        }
      } else if (this.action === 2) {
        this.$refs.productDetails.saveTinymce()
      }
    },
    saveProductPic() {
      return this.$refs.showPictures.saveSubmit()
    },
    parentEvent(data) {
      this.productName = data
    },
    finish() {
      this.$refs.productDetails.saveTinymce().then(() => {
        this.$router.go(-1)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.material-add {
  padding: 10px;
  height: calc(100vh - 140px);
  overflow-y: auto;
  .back-info{
    padding-bottom:10px;
    .title-name{
     font-size:16px;
     color:#333;
     font-weight: bold;
     text-align:center;
   }
  }
  .steps-action {
    display: flex;
    justify-content: center;
    margin: 30px auto;
  }
}
</style>
