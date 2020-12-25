<template>
  <div>
    <extend-book
      btn="extend"
      :loading="loading"
      :total="tableDataCount"
      :table-data="tableData"
      type="extendVersion"
      @handlerClickBtn="handlerClickBtn"
      @clickRow="clickCurrentRow"
      @fetchData="fetchData"
    />
  </div>
</template>
<script>
import ExtendBook from '../../../components/extendBook/index'
import { getSupplyVersionList } from '@core/api/contractManage/contractmanager'
import pagination from '@core/mixins/pagination'

export default {
  name: 'SupplementaryAgreementOfficeVersion',
  components: {
    ExtendBook
  },
  mixins: [pagination],
  props: {
    info: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      loading: false,
      tableData: [],
      tableDataCount: 10
    }
  },
  methods: {
    onBack() {
      this.$emit('onBack')
    },
    handlerClickBtn({ type, row }) {
      if (type === 'return') this.$emit('onBack')
    },
    clickCurrentRow({ prop, value, row }) {
      if (prop === 'name') {
        this.$emit('lookVersion', {
          prop: prop,
          value,
          row
        })
      }
    },
    fetchData() {
      this.loading = true
      const params = {
        size: this.size,
        page: this.page - 1,
        contractId: this.info.contractId, // 主合同Id
        id: this.info.id, // 内部合同Id
        contractNumber: ''// 内部合同编号
      }
      getSupplyVersionList(params).then(({ data: { total, content }}) => {
        /* content.map(item => {
          item.state = this.$parent.constant.contractState.map(stateItem => {
            if (stateItem.code === item.state) return stateItem.name
          })
          item.approvalStatus = this.$parent.constant.contractState.map(stateItem => {
            if (stateItem.code === item.approvalStatus) return stateItem.name
          })
          item.effectiveState = this.$parent.constant.contractState.map(stateItem => {
            if (stateItem.code === item.effectiveState) return stateItem.name
          })
        })*/
        this.loading = false
        this.tableData = content
        this.tableDataCount = total
      })
    }

  }
}
</script>
