<template>
  <div>
    <extend-book
      :table-data="tableData"
      type="extendVersion"
      :loading="loading"
      @handlerClickBtn="handlerClickBtn"
      @clickRow="clickCurrentRow"
      @fetchData="fetchData"
    />
  </div>
</template>

<script>
import ExtendBook from '../../../../components/extendBook'
import { getSupplyVersionList
} from '@core/api/contractManage/contractmanager'
export default {
  name: 'VersionDetail',
  components: {
    ExtendBook
  },
  props: {
    options: Object
  },
  data() {
    return {
      tableData: [],
      loading: false
    }
  },
  computed: {
    currentId() {
      return this.options?.row.id
    }
  },
  methods: {
    async fetchData(params) {
      this.loading = true
      //  params['contractId'] = this.contractId
      params['id'] = this.currentId
      const { data: { content, total }} = await getSupplyVersionList(params)
      this.total = total
      this.tableData = content
      this.loading = false
    },
    handlerClickBtn({ type, row }) {
      if (type === 'return') this.$emit('changeState', 'subExtendMain')
    },
    clickCurrentRow({ row }) {
      this.$emit('changeState', 'subExtendInfo', {
        type: 'detailVersion',
        row
      })
    }
  }
}
</script>

<style></style>
