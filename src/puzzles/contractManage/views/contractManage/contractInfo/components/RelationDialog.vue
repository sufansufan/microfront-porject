<template>
  <div class="relation-dialog">
    <drag-dialog ref="dialog" :title="title" top="8%" width="80%" :is-show.sync="isShow">

      <template #default>
        <search-bar
          :select-list="selectList"
          :btn-list="btnList"
          :search="search"
          @changeSearch="handlerOuterSearch"
        />

        <comm-table
          ref="table"
          :single-selected="true"
          :columns="columns"
          :table-options="tableOptions"
          :data="tableData"
          :parent-component="parentComponent"
          :count="total"
        />

      </template>

      <template #footer>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onConfirm">确 定</el-button>
        </span>
      </template>

    </drag-dialog>
  </div>
</template>

<script>
import SearchBar from '@framesDash/components/SearchBar'
import DragDialog from '@frames/dashboard/components/Dialog'
import CommTable from '@framesDash/components/CommTable'
import search from '@core/mixins/search'
import { codeChangeName, formatMoney } from '@core/utils'
import { handlerSearchBar } from '@core/utils'
import { mapGetters } from 'vuex'
import { detailVersionMainContract, getMainConstarctType } from '@core/api/contractManage/contractmanager'
export default {
  name: 'RelationDialog',
  components: {
    DragDialog,
    SearchBar,
    CommTable
  },
  mixins: [search],
  props: {
    show: Boolean,
    title: {
      type: String,
      default: '关联合同'
    }
  },
  data() {
    return {
      parentComponent: 'RelationDialog',
      btnList: [],
      columns: [
        {
          type: 'selection',
          single: true
        },
        {
          label: '序号',
          index: true
        },
        {
          label: '合同编号',
          prop: 'contractNumber',
          width: 180,
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '合同名称',
          prop: 'name',
          width: 160,
          showTooltip: true,
          sortable: 'custom'

        },
        {
          label: '合同类型',
          prop: 'type',
          width: 120,
          sortable: 'custom'
        },
        {
          label: '签订单位',
          prop: 'constructionUnit',
          width: 160,
          showTooltip: true,
          sortable: 'custom'

        },
        {
          label: '合同金额',
          prop: 'amount',
          width: 160,
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '经办组织',
          prop: 'handlingOrgName',
          width: 160,
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '发起组织',
          prop: 'startOrgName',
          sortable: 'custom',
          showTooltip: true
        }
      ],
      tableOptions: {
        maxHeight: 'calc( 100% - 350px)',
        defaultSort: {
          prop: 'contractNumber',
          order: 'descending'
        }
      },
      mainTypeList: [],
      tableData: [],
      total: 0,
      selectList: [
        {
          value: 'contractNumber',
          searchType: 'input',
          name: '合同编号'
        },
        {
          value: 'name',
          searchType: 'input',
          name: '合同名称'
        },
        {
          value: 'type',
          searchType: 'select',
          name: '合同类型',
          selectData: []
        }
      ]

    }
  },
  computed: {
    ...mapGetters(['constant']),
    isShow: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    }
  },
  async created() {
    // 数据字典改成接口获取
    const { data: mainTypeList } = await getMainConstarctType()
    this.mainTypeList = mainTypeList
    this.selectList = handlerSearchBar(this.selectList, [2], [mainTypeList])
    this.fetchData()
  },
  methods: {
    checkOnofTableData() {
      return this.$refs['table'].onlyOneData()
    },
    // 获得单选元素
    getMultipleSelection() {
      return this.$refs['table'].multipleSelection[0]
    },
    onConfirm() {
      if (!this.checkOnofTableData()) {
        this.$message.warning({ message: '请选择一条数据' })
        return
      }
      const row = this.getMultipleSelection()
      this.$emit('referRelationContract', row)
      this.isShow = false
    },
    getParams() {
      const defaultSort = {
        ascending: false,
        propertyName: 'contractNumber'
      }
      const params = {
        ...this.search,
        effectiveState: '02',
        size: this.size || 10,
        page: this.page ? this.page - 1 : 0,
        ...(this.sortData || defaultSort)
      }
      return params
    },
    async fetchData(qeury) {
      // 请求数据
      this.queryCopy(qeury)
      const params = this.getParams()
      const { data: { content, total }} = await detailVersionMainContract(params)
      this.tableData = content.map(item => {
        return {
          ...item,
          type: codeChangeName(this.constant.MainContractType, item.type),
          amount: formatMoney(item.amount)
        }
      })
      this.total = total
    },
    // 点击查询按钮
    handlerOuterSearch(params) {
      this.search = {
        contractNumber: '',
        name: '',
        type: '',
        ...params,
        effectiveState: '02'
      }
      this.fetchData('query')
    }
  }
}
</script>

<style lang='less'>
.relation-dialog{
  .el-table__body-wrapper {
    // max-height: calc(100vh - 400px);
    max-height: 300px;
  }
  .dialog-footer{
    margin-top: 10px;
  }
}
</style>
