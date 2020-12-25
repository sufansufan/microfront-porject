<template>
  <div>
    <!-- 补充协议主页面table -->
    <extend-book
      :table-data="tableData"
      type="subPackage"
      :loading="loading"
      :total="total"
      :table-options="tableOptions"
      :extend-btn-list="extendBtnList"
      :settlement-state="breezeInfo.row.settlementState"
      @handlerClickBtn="handlerClickBtn"
      @clickRow="clickCurrentRow"
      @fetchData="fetchData"
    />
  </div>
</template>

<script>
import { getSupplyList
} from '@core/api/contractManage/contractmanager'
import ExtendBook from '../../../../components/extendBook'
import { formatMoney } from '@core/utils'
// getSupplyList
export default {
  name: 'Extend',
  components: {
    ExtendBook
  },
  props: {
    options: {
      type: Object,
      required: true
    },
    breezeInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      total: 0,
      loading: false,
      tableData: [],
      tableOptions: {
        maxHeight: 'calc( 100vh - 410px)',
        defaultSort: {
          order: 'descending',
          prop: 'contractNumber'
        }
      },
      extendBtnList: [
        [{
          type: 'add',
          label: '新增',
          valid: false,
          power: 'dsubpackageAgree:add',
          icon: 'icon-xinzeng1-copy'
        },
        {
          type: 'edit',
          label: '修改',
          valid: true,
          power: 'dsubpackageAgree:edit',
          icon: 'icon-xiugai-copy'
        },
        {
          type: 'del',
          label: '删除',
          valid: true,
          icon: 'icon-icon7-copy',
          power: 'dsubpackageAgree:delete'
        },
        {
          type: 'look',
          label: '版本查看',
          valid: true,
          power: 'dsubpackageAgree:edition',
          icon: 'icon-banbenchakan'
        }],
        [{
          type: 'back',
          label: '撤销',
          icon: 'icon-chexiao',
          valid: true,
          power: 'dsubpackageAgree:revoke'
        }]
      ]
    }
  },
  computed: {
    // breezeInfo 二进三 合同信息三内永远不变
    contractId() {
      return this.breezeInfo?.row.id
    }
  },
  methods: {
    async fetchData(params) {
      this.loading = true
      params['contractId'] = this.contractId
      const { data: { content, total }} = await getSupplyList(params)
      this.tableData = content
      this.tableData.map(item => {
        item.amount = formatMoney(item.amount)
        return item
      })
      this.total = total
      this.loading = false
    },
    handlerClickBtn({ type, row }) {
      this[`${type}Extend`](row)
    },
    // add 新增逻辑
    addExtend() {
      this.$emit('changeState', 'subExtendInfo', {
        type: 'add'
      })
    },
    // edit 修改逻辑
    editExtend(row) {
      this.$emit('changeState', 'subExtendInfo', {
        type: 'edit',
        row
      })
    },
    // del 删除逻辑
    delExtend(row) {},
    // detail 版本查看逻辑
    lookExtend(row) {
      this.$emit('changeState', 'subExtendVersion', {
        row
      })
    },
    // back 撤销逻辑
    backExtend(row) {
      console.log(row, 'back')
    },
    clickCurrentRow({ type, value, row }) {
      this.$emit('changeState', 'subExtendInfo', {
        type: 'details',
        row
      })
    }
  }
}
</script>

<style></style>
