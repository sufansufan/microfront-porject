<!--付款明细-->
<template>
  <div class="payment-details">
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
  name: 'PaymentDeatils',
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
          label: '付款日期',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '付款类型',
          prop: 'name',
          showTooltip: true
        },
        {
          label: '付款类别',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom',
          align: 'right'
        },
        {
          label: '付款金额',
          prop: 'name',
          showTooltip: true
        },
        {
          label: '未收票已付款金额',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '发票编号',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '是否保证金',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '付款方式',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '支票号',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '支票银行名称',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '付款账户类型',
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
          label: '付款账户',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '收款单位',
          prop: 'name',
          showTooltip: true,
          sortable: 'custom'
        },
        {
          label: '收款人',
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
