<template>
  <div>
    <extend-book
      :table-data="tableData"
      type="universal"
      :total="total"
      :loading="loading"
      :extend-btn-list="extendBtnList"
      :table-options="tableOptions"
      :settlement-state="breezeInfo.row.settlementState"
      @handlerClickBtn="handlerClickBtn"
      @clickRow="clickCurrentRow"
      @fetchData="fetchData"
    />
  </div>
</template>

<script>
import ExtendBook from '../../../../components/extendBook'
import { getSupplyList
} from '@core/api/contractManage/contractmanager'
import { formatMoney } from '@core/utils'
export default {
  name: 'Extend',
  components: {
    ExtendBook
  },
  props: {
    breezeInfo: Object
  },
  data() {
    return {
      total: 0,
      tableOptions: {
        maxHeight: 'calc( 100vh - 410px)',
        defaultSort: {
          order: 'descending',
          prop: 'contractNumber'
        }
      },
      loading: false,
      tableData: [],
      extendBtnList: [
        [{
          type: 'add',
          label: '新增',
          valid: false,
          power: 'dotherAgree:add',
          icon: 'icon-xinzeng1-copy'
        },
        {
          type: 'edit',
          label: '修改',
          valid: true,
          power: 'dotherAgree:edit',
          icon: 'icon-xiugai-copy'
        },
        {
          type: 'del',
          label: '删除',
          valid: true,
          icon: 'icon-icon7-copy',
          power: 'dotherAgree:delete'
        },
        {
          type: 'look',
          label: '版本查看',
          valid: true,
          power: 'dotherAgree:edition',
          icon: 'icon-banbenchakan'
        }],
        [{
          type: 'back',
          label: '撤销',
          icon: 'icon-chexiao',
          valid: true,
          power: 'dotherAgree:revoke'
        }]
      ]
    }
  },
  computed: {
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
      this.$emit('changeState', 'otherExtendInfo', {
        type: 'add',
        row: this.options?.row
      })
    },
    // edit 修改逻辑
    editExtend(row) {
      this.$emit('changeState', 'otherExtendInfo', {
        type: 'edit',
        row
      })
    },
    // 点击版本查看Btn
    lookExtend(row) {
      this.$emit('changeState', 'otherExtendVersion', {
        row
      })
    },
    // 当前当前行名称触发事件
    clickCurrentRow({ type, value, row }) {
      this.$emit('changeState', 'otherExtendInfo', {
        type: 'details',
        row
      })
    }
  }
}
</script>

<style></style>
