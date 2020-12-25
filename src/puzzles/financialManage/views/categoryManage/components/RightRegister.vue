<template>
  <div class="right-register">
    <search-bar :select-list="selectList" :btn-list="btnList" :search="search" @changeSearch="changeSearch" />
    <comm-table
      ref="commTable"
      :single-selected="true"
      :columns="columns"
      :data="tableData"
      :count="total"
      :loading="loading"
      :table-options="tableOptions"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import searchTableData from '../searchTableData'
import {
  codeChangeName,
  parseTime,
  handlerSearchBar
} from '@core/utils'
import {
  financeclassList,
  getParentFinanceClass,
  financeclassAll
} from '@core/api/financialManage/financeclassmanager'
import search from '@core/mixins/search'
export default {
  directives: {
    'functSize': {
      bind(el, pinding) {
        el.style.fontSize = parseInt(pinding.value) + 'px'
      }
    }
  },
  mixins: [searchTableData, search],
  props: {
    financeClassId: {
      default: () => '',
      type: String
    }
  },
  data() {
    return {
      dialogTitle: '',
      total: 0,
      handleOrgList: [],
      tableOptions: {
        maxHeight: 'calc( 100% - 350px)'
      },
      selectData: [
        {
          label: 'select1',
          value: '1'
        },
        {
          label: 'select2',
          value: '2'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  watch: {
    financeClassId: {
      handler(val) {
        this.fetchData('query')
      },
      immediate: true,
      deep: true
    }
  },
  activated() {
    this.fetchData('query')
    this.parentFinanceClass()
    this.$store.dispatch('getConstant', ['applyBusiness', 'financeClassType', 'financeClassSource']).then(() => {
      financeclassAll({}).then(({ data }) => {
        const nameList = []
        data.forEach(item => {
          nameList.push({ name: item.name, code: item.id })
        })
        this.selectList = handlerSearchBar(this.selectList, [0, 1], [nameList, this.constant.financeClassType])
      })
    })
  },
  // activated() {

  // },
  mounted() {
    // this.$refs.dialogNumber.show = true
  },
  methods: {
    fetchData(type) {
      this.loading = true
      this.queryCopy(type)
      const { page, size, search } = this
      // const { id } = this.$route.query
      const params = {
        page: page - 1 || 0,
        size: size || 10,
        financeClassId: this.financeClassId,
        ...search
      }

      financeclassList(params).then(res => {
        const { data: { content, total }} = res
        content.forEach(item => {
          const businessTypeArr = item.businessType ? item.businessType.split(',') : []
          item.parentName = this.parentPathNameSte(item.parentPathName) // 上级类别
          item.typeName = codeChangeName(this.constant.financeClassType, item.type) // 所属类型
          item.sourceName = codeChangeName(this.constant.financeClassSource, item.source)// 来源
          item.dateStr = parseTime(item.operateDate, 'y-m-d')
          item.businessName = this.nemeStr(businessTypeArr) // 应用业务
        })
        this.total = total
        this.tableData = content
        this.loading = false
      })
    },
    parentFinanceClass() {
      getParentFinanceClass().then(res => {
        this.removeEmptyChildren(res.data)
      })
    },
    removeEmptyChildren(data) {
      data.forEach(element => {
        this.handleOrgList.push({
          id: element.id,
          name: element.name
        })
        if (element.childrens.length) {
          this.removeEmptyChildren(element.childrens)
        }
      })
      // return arr
    },
    nemeStr(arr) {
      let str = ''
      if (arr.length > 1) {
        arr.forEach(element => {
          str += codeChangeName(this.constant.applyBusiness, element) + ','
        })
        str = str.slice(0, str.length - 1)
      } else if (arr.length === 1) {
        str += codeChangeName(this.constant.applyBusiness, arr[0])
      }
      return str
    },
    parentPathNameSte(arr) {
      let str = ''
      if (arr.length >= 1) {
        arr.forEach(el => {
          str += el + '/'
        })
        str = str.slice(0, str.length - 1)
      }
      return str
    }
  }
}
</script>
<style lang="less" scoped>
.buttons{
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}
</style>
