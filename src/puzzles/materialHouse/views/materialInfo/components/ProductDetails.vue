<template>
  <div class="product-details">
    <tinymce ref="tinymce" v-model="content" v-loading="tinymceLoading" :readonly="$route.query.type === 'details'" />
  </div>
</template>

<script>
import Tinymce from '@frames/dashboard/components/Tinymce'
import { saveTinymceInfo } from '@core/api/materialHouse/product'
import { mapGetters } from 'vuex'
import { getProductId } from '@core/api/materialHouse/product'
export default {
  components: {
    Tinymce
  },
  props: {
    copyId: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      content: '',
      tinymceLoading: false
    }
  },
  computed: {
    ...mapGetters(['materialInfoId', 'tinymce'])
  },
  created() {
    this.$nextTick(() => {
      const { type, handelType } = this.$route.query
      if (type !== 'add' || handelType === 'copy') this.getContent()
      this.content = this.tinymce
    })
  },
  methods: {
    saveTinymce() {
      return new Promise((resolve, reject) => {
        const { handelType } = this.$route.query
        const params = {
          Loading: true,
          productDesc: this.$refs.tinymce.getContent(),
          id: handelType === 'copy' ? this.copyId : this.materialInfoId
        }
        saveTinymceInfo(params).then(() => {
          this.$message.success('保存成功')
          resolve()
        })
      })
    },
    getContent() {
      this.tinymceLoading = true
      getProductId(this.materialInfoId).then(({ data: { productDesc }}) => {
        this.content = productDesc
        this.tinymceLoading = false
      })
    }
  }

}
</script>

<style lang="less" scoped>
.product-details {

}
</style>
