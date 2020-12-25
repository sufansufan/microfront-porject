<template>
  <div class="accInvoice-information">

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
          prop="number"
          label="发票编号"
          align="center"
        />
        <el-table-column
          prop="name"
          label="报销科目"
          align="center"
        />
        <el-table-column
          prop="servicename"
          label="报销金额"
          align="right"
        />
        <el-table-column
          prop="serviceurl"
          label="收票日期"
          align="center"
        />
        <el-table-column
          prop="rule"
          label="开票日期"
          align="center"
        />
        <el-table-column
          prop="available"
          label="发票类型"
          align="center"
        />
        <el-table-column
          prop="rule"
          label="开票税率"
          align="right"
        />
        <el-table-column
          prop="available"
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
          label="发票代码"
          align="center"
        />
        <el-table-column
          prop="available"
          label="销方纳税人识别号"
          align="center"
          width="180px"
        />
        <el-table-column
          prop="available"
          label="开票单位"
          align="center"
        />
        <el-table-column
          prop="available"
          label="备注"
          align="center"
        />
        <el-table-column
          prop="name"
          label="附件"
          align="center"
        >
          <template slot-scope="scope">
            <div
              class="link-a"
              @click="changeTab('maintenanceView')"
            >{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="available"
          label="录入人"
          align="center"
        />
        <el-table-column
          prop="available"
          label="录入时间"
          align="center"
        />
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  components: { },
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
  .accInvoice-information {
   .link-a {
      color:@primary;
      cursor: pointer;
    }
    .btn-an {
      margin-top: 40px;
      text-align: center;
    }
  }
</style>
