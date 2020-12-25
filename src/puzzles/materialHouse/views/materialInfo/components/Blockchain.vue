<template>
  <div class="block-chain">
    <comm-table ref="commTable" v-loading="loading" :table-options="tableOptions" :columns="columns" :data="tableData" />
  </div>
</template>

<script>
import CommTable from '@frames/dashboard/components/CommTable'
import { blockchainBookHistory } from '@core/api/materialHouse/product'
import { codeChangeName } from '@core/utils'
import { mapGetters } from 'vuex'
export default {
  components: {
    CommTable
  },
  data() {
    return {
      columns: [
        { label: '序号', index: true },
        { label: '唯一键', prop: 'key', showTooltip: true },
        { label: '产品编码', prop: 'productNumber', showTooltip: true },
        { label: '产品名称', prop: 'name' },
        { label: '品牌', prop: 'brandName' },
        { label: '单位', prop: 'unit' },
        { label: '型号', prop: 'model' },
        { label: '市场价格', prop: 'price', type: 'num' },
        { label: '生产状态', prop: 'produceStatus', render: (h, row) => h('span', row.produceStatus === '0' ? '生产中' : (row.produceStatus === '1' ? '已停产' : '')) },
        { label: '发布状态', prop: 'publishStatus', render: (h, row) => h('span', row.publishStatus === '0' ? '未发布' : (row.publishStatus === '1' ? '已发布' : '已下架')) },
        { label: '区块链交易ID', prop: 'txId', showTooltip: true },
        { label: '区块链交易时间', prop: 'created', width: '150' },
        { label: '是否删除', prop: 'deletedName' }
      ],
      tableData: [],
      loading: true,
      tableOptions: {
        maxHeight: 'calc(100vh - 205px)'
      }
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['productBrand']).then(() => {
      this.fetchData()
    })
  },
  methods: {
    fetchData() {
      this.loading = true
      const { id } = this.$route.query
      blockchainBookHistory(id).then(({ data }) => {
        this.tableData = JSON.parse(data).map(item => {
          const stringPaese = JSON.parse(item.stringValue)
          const obj = {
            ...stringPaese,
            brandName: codeChangeName(this.constant.productBrand, stringPaese.brand),
            deletedName: stringPaese.deleted ? '是' : '否'
          }
          return Object.assign({}, item, obj)
        })
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less">
.block-chain {
  .el-table__body-wrapper {
    max-height: calc(100vh - 255px);
  }
}
</style>
