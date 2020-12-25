<template>
  <div class="enginner-version">
    <extend-book
      :loading="loading"
      :table-data="tableData"
      type="extendVersion"
      :total="total"
      @handlerClickBtn="handlerClickBtn"
      @clickRow="clickCurrentRow"
      @fetchData="fetchData"
    />
  </div>
</template>
<script>
import { getSupplyVersionList
} from '@core/api/contractManage/contractmanager'
import ExtendBook from '../../../../components/extendBook/index'
export default {
  name: 'EngineerVersion',
  components: {
    ExtendBook
  },
  props: {
    info: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      loading: false,
      total: 0,
      tableData: []
    }
  },
  computed: {
    currentId() {
      return this.info?.id
    },
    // 当前协议归属合同Id
    contractId() {
      return this.$route.query.id
    }
  },
  methods: {
    async fetchData(params) {
      this.loading = true
      params['contractId'] = this.contractId
      params['id'] = this.currentId
      const { data: { content, total }} = await getSupplyVersionList(params)
      this.total = total
      this.tableData = content
      this.loading = false
    },
    onBack() {
      this.$emit('onBack')
    },
    handlerClickBtn({ type, row }) {
      // 版本查看 拥有流程图 相当于修改 然后不显示button
      if (type === 'return') this.$emit('onBack')
      else if (type === 'del') {
        // 删除 撤销
        console.log('删除')
      } else {
        console.log('撤销')
      }
    },
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
