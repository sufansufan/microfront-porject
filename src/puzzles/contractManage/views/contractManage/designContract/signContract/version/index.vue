<template>
  <div class="sign-contract-version">
    <extend-book
      :table-data="tableData"
      type="extendVersion"
      :loading="loading"
      :total="total"
      @handlerClickBtn="handlerClickBtn"
      @clickRow="clickCurrentRow"
      @onBack="onBack"
      @fetchData="fetchData"
    />
  </div>
</template>

<script>
import ExtendBook from '../../../../components/extendBook/index'
import { getSupplyVersionList
} from '@core/api/contractManage/contractmanager'
export default {
  name: 'SignContractVersion',
  components: {
    ExtendBook
  },
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      tableData: [],
      total: 0
    }
  },
  computed: {
    currentId() {
      return this.info?.id
    },
    contractId() {
      return this.$route.query.id
    }
  },
  methods: {
    async fetchData(params) {
      this.loading = true
      // 当前归属合同Id
      params['contractId'] = this.contractId
      params['id'] = this.currentId
      const { data: { content, total }} = await getSupplyVersionList(params)
      this.total = total
      this.tableData = content
      this.loading = false
    },
    handlerClickBtn({ type, row }) {
      if (type === 'return') this.$emit('onBack')
    },
    // 点击行 向外触发 进入查看页面 额外显示流程图和历史记录
    clickCurrentRow({ type, value, row }) {
      this.$emit('lookVersion', {
        type,
        value,
        row
      })
    }
  }
}
</script>

<style lang="less" scoped>
.sign-contract-version {
}
</style>
