<template>
  <div class="entry-aexit-records">
    <comm-table
      ref="table"
      v-loading="loading"
      :single-selected="true"
      :columns="columns"
      :table-options="tableOptions"
      :data="tableData"
      :count="total"
    />
  </div>
</template>

<script>
import { getInoroutList } from '@core/api/projectManage/projectmanager'
import search from '@core/mixins/search'
import { parseTime, codeChangeName } from '@core/utils'
import { mapGetters } from 'vuex'
export default {
  mixins: [search],
  props: {
    personnelId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tableData: [],
      loading: false,
      columns: [
        {
          label: '序号',
          index: true
        },
        {
          label: '日期',
          prop: 'recordDate',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '类型',
          prop: 'type',
          showTooltip: true,
          render: (h, row) => {
            return h('span', row.typeName)
          }
        },
        {
          label: '天数',
          prop: 'days',
          showTooltip: true
        },
        {
          label: '提交人',
          prop: 'submitPersonName',
          showTooltip: true
        },
        {
          label: '提交时间',
          showTooltip: true,
          prop: 'submitDate'
        },
        {
          label: '处理人',
          prop: 'handlePersonName',
          showTooltip: true
        },
        {
          label: '处理时间',
          showTooltip: true,
          prop: 'handleDate'
        },
        {
          label: '说明',
          prop: 'description',
          showTooltip: true,
          width: 180
        }
      ],
      tableOptions: {
        maxHeight: 'calc(100vh - 350px)',
        defaultSort: {
          prop: 'recordDate',
          order: 'ascending'
        }
      }

    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['entryRecordType']).then(() => {})
    this.fetchData()
  },
  methods: {
    fetchData(type) {
      this.loading = true
      this.queryCopy(type)
      const params = {
        ...this.search,
        propertyName: 'recordDate',
        ascending: true,
        memberId: this.personnelId,
        ...this.sortData
      }
      getInoroutList(params).then(({ data }) => {
        this.tableData = data.map(item => {
          item.recordDate = parseTime(item.recordDate, 'y-m-d')
          item.typeName = codeChangeName(this.constant.entryRecordType, item.type)
          if (item.type === '01') { // 进场
            item.days === ''
            item.submitPersonName === ''
            item.submitDate === ''
          } else if (item.type === '02') { // 离场
            item.submitPersonName === ''
            item.submitDate === ''
          } else if (item.type === '03') { // 返场
            item.days === ''
          }

          return item
        })
        this.loading = false
      })
    }
  }
}
</script>

<style>

</style>
