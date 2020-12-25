<template>
  <div class="invoice-list">
    <div class="search">
      <div class="btn">
        <div>
          <el-button-group>
            <el-button
              type="primary"
              @click="changeTab()"
            >添加发票</el-button>
            <el-button type="primary">修改发票</el-button>
            <el-button type="primary">删除发票</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <div>
      <el-table
        :data="tableData"
        row-key="id"
        border
        default-expand-all
      >
        <el-table-column
          type="selection"
          width="40"
        />
        <el-table-column
          prop="id"
          label="序号"
          width="50"
          align="center"
        />
        <el-table-column
          prop="name"
          label="发票编号"
          align="center"
        >
          <template slot-scope="scope">
            <div
              class="table-click-color"
              @click="changeTab('maintenanceView')"
            >{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="收票日期"
          align="center"
        />
        <el-table-column
          prop="servicename"
          label="开票日期"
          align="right"
        />
        <el-table-column
          prop="serviceurl"
          label="发票类型"
          align="center"
        />
        <el-table-column
          prop="rule"
          label="发票归类"
          align="center"
        />
        <el-table-column
          prop="available"
          label="开票税"
          align="center"
        />
        <el-table-column
          prop="rule"
          label="发票金额"
          align="right"
        />
        <el-table-column
          prop="available"
          label="发票税金"
          align="right"
        />
        <el-table-column
          prop="available"
          label="发票无税金额"
          align="right"
        />
        <el-table-column
          prop="available"
          label="发票无税金额"
          align="right"
        />

        <el-table-column
          prop="available"
          label="备注"
          align="center"
        />
      </el-table>
      <drag-dialog
        ref="dialog"
        title="添加发票"
        width="50%"
        height="80%"
      >
        <add-invoice />
      </drag-dialog>
    </div>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import AddInvoice from './addInvoice'
export default {
  components: { DragDialog, AddInvoice },
  data() {
    return {
      count: 30,
      tableData: [
        {
          id: '1',
          number: '01',
          name: '组织缺少负责人',
          servicename: '服务名称',
          serviceurl: '服务路径',
          rule: '触发规则',
          available: '是否可用'
        },
        {
          id: '2',
          number: '02',
          name: '组织缺少负责人',
          servicename: '服务名称',
          serviceurl: '服务路径',
          rule: '触发规则',
          available: '是否可用'
        }
      ]
    }
  },
  methods: {
    changeTab(status) {
      this.$refs.dialog.show = true
    }
  }
}
</script>

<style lang="less">
.invoice-list{
  margin-bottom:20px;
}
</style>
