<template>
  <div class="material-preview">
    <shopping-details v-loading="loading" :content="content">
      <div slot="footerBtn">
        <template v-if="content.publishStatus !== '1' && content.productClassifyName !==''">
          <el-button type="primary" @click="publishProduct">发布</el-button>
        </template>
        <template v-if="content.publishStatus === '1'">
          <el-button type="primary" @click="downpublish">下架</el-button>
        </template>
        <el-button type="primary" :disabled="!beforeExist" @click="previousProduct">上一个</el-button>
        <el-button type="primary" :disabled="!afterExist" @click="nextProduct">下一个</el-button>
        <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
      </div>
    </shopping-details>
    <drag-dialog ref="offShelf" title="下架" width="45%">
      <el-form ref="ruleForm" :key="key" :model="ruleForm" :rules="rules" label-width="110px">
        <el-form-item label="产品名称" prop="name" class="row-label">
          <el-input v-model.trim="ruleForm.name" type="textarea" :rows="3" disabled="true" placeholder="请输入产品名称" />
        </el-form-item>
        <el-form-item label="下架原因" prop="reason" class="row-label">
          <el-input v-model.trim="ruleForm.reason" type="textarea" :rows="3" :maxlength="255" placeholder="请输入下架原因" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="offShelfSubmit">确定</el-button>
      </div>
    </drag-dialog>
  </div>
</template>

<script>
import ShoppingDetails from '@frames/dashboard/components/ShoppingDetails.vue'
import { getProductId, productPublish, previous, next, checkPreviousAndNext, productNoUse } from '@core/api/materialHouse/product'
import { mapGetters } from 'vuex'
import DragDialog from '@frames/dashboard/components/Dialog'
import { validateLength } from '@core/utils/validate'
import { Loadings } from '@core/utils'
export default {
  components: {
    ShoppingDetails,
    DragDialog
  },
  data() {
    return {
      content: '',
      loading: true,
      previewId: '',
      publishStatus: false,
      beforeExist: false, // 上一个状态
      afterExist: false, // 下一个状态
      key: 0,
      ruleForm: {
        name: '',
        reason: ''
      },
      rules: {
        reason: [{ required: true, message: '请输入下架原因', trigger: 'blur' }, validateLength(0, 255)]
      }
    }
  },
  computed: {
    ...mapGetters(['materialSearch', 'constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['productBrand']).then(() => {})
    const { id } = this.$route.query
    this.previewId = id
    this.getContent()
    this.checkNumber()
  },
  methods: {
    getContent() {
      this.loading = true
      getProductId(this.previewId).then(({ data }) => {
        this.loading = false
        this.content = data
      })
    },
    publishProduct() {
      this.$confirm('确定要发布该产品吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        productPublish([this.previewId]).then(() => {
          this.publishStatus = true
          this.$message.success('发布成功')
          this.getContent()
        })
      })
    },
    downpublish() {
      this.ruleForm.name = this.content.name
      this.key += 1
      this.$refs.offShelf.show = true
    },
    // 下架
    offShelfSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          var loadingInstance = null
          loadingInstance = Loadings()
          productNoUse([this.previewId], this.ruleForm.reason).then(() => {
            // this.publishStatus = false
            this.$message.success('下架成功')
            this.$refs.offShelf.show = false
            this.getContent()
            this.ruleForm.reason = ''
            this.$refs['ruleForm'].resetFields()
            this.$refs.offShelf.show = false
            loadingInstance && loadingInstance.close()
          }).catch(() => {
            loadingInstance && loadingInstance.close()
          })
        } else {
          return
        }
      })
    },
    // 校验个数
    checkNumber() {
      checkPreviousAndNext(this.materialSearch, this.previewId).then(({ data }) => {
        this.changeData(data)
      })
    },
    // 上一个
    previousProduct() {
      this.loading = true
      previous(this.materialSearch, this.previewId).then(({ data }) => {
        this.loading = false
        this.changeData(data)
      })
    },
    // 下一个
    nextProduct() {
      this.loading = true
      next(this.materialSearch, this.previewId).then(({ data }) => {
        this.loading = false
        this.changeData(data)
      })
    },
    changeData(data) {
      const { afterExist, beforeExist, productVO } = data
      this.beforeExist = beforeExist
      this.afterExist = afterExist
      this.publishStatus = false
      if (productVO) {
        this.content = productVO
        this.previewId = productVO.id
      }
    }
  }
}
</script>

<style lang="less" scoped>
.material-preview {

}
</style>
