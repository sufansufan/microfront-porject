<!--收票明细-->
<template>
  <div class="receipt-details">
    <comm-table
      ref="commTable"
      :single-selected="true"
      :columns="columns"
      :data="tableData"
      :count="count"
    />
  </div>
</template>
<script>
export default {
  name: 'ReceiptDeatils',
  data() {
    return {
      columns: [
        {
          label: '序号',
          index: true
        },
        {
          label: '来源',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '收票日期',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '开票日期',
          prop: 'name',
          showTooltip: true
        },
        {
          label: '发票编号',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom',
          align: 'right'
        },
        {
          label: '发票类型',
          prop: 'name',
          showTooltip: true
        },
        {
          label: '发票归类',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '发票金额',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '发票税率',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '发票无税金额',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '发票税金',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '发票付款金额',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '发票付款余额',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '是否认证',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom',
          width: 160
        },
        {
          label: '是否进项转出',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '发票代码',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '销方纳税人识别号',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '开票单位',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '是否有合同',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '合同编号',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '合同名称',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '合同金额',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '结算金额',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '备注',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '附件',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '录入人',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '录入时间',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '状态',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        }
      ],
      tableOptions: {
        maxHeight: 'calc( 100% - 350px)'
      },
      tableData: [{ name: '增值税专用发票' }],
      total: 0,
      count: null
    }
  }
}
</script>
