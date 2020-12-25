<template>
  <div class="monthly-carryover">
    <div class="fille-line">
      <el-button
        type="primary"
        @click="changetab"
      >初始化</el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        row-key="id"
        border
        default-expand-all
      >
        <el-table-column
          prop="index"
          label="序号"
          align="center"
        />
        <el-table-column
          prop="index"
          label="年月"
          align="center"
        />>
        <el-table-column
          prop="index"
          label="通用附加税率%"
          align="center"
        >
          <el-input />
        </el-table-column>
        <el-table-column
          prop="index"
          label="状态"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="Monthlyknots(scope.$index, scope.row)"
            >月结</el-button>
            <el-button
              size="mini"
              @click="Revoke(scope.$index, scope.row)"
            >撤销月结</el-button>
          </template>

        </el-table-column>
      </el-table>
    </div>
    <drag-dialog
      ref="dialog"
      title="初始化"
      width="30%"
      height="60%"
    >
      <el-form
        label-width="170px"
        :rules="rules"
        :model="ruleform"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="请选择要初始年月"
              prop="rolename"
            >
              <el-date-picker
                v-model="ruleform.rolename"
                type="month"
                placeholder="选择月"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="通用附加税率（%）"
              prop="rolename"
            >
              <el-date-picker
                v-model="ruleform.rolename"
                type="month"
                placeholder="选择月"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="text-align:right">
          <el-col :span="24">
            <el-button type="primary">确定</el-button>
          </el-col>
        </el-row>
      </el-form>

    </drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
export default {
  components: {
    DragDialog
  },
  data() {
    return {
      tableData: [
        {
          index: '1',
          number: '02',
          category: '定时',
          typename: '公司资质即将到期',
          downtime: '是',
          rate: '路由',
          task: '路有参数',
          vestingunit: '资质名称，资质到期时间',
          finish: '是',
          updatetime: '2020.01.01'
        }
      ],
      ruleform: {
        rolename: ''
      }
    }
  },
  methods: {
    changetab() {
      this.$refs.dialog.show = true
    },
    Monthlyknots(index, row) {
      this.$confirm(
        '月结后不可以对的发票进行预缴税，专票认证、进项转出、抵扣、退税、您确定月结吗？',
        {
          distinguishCancelAndClose: true,
          confirmButtonText: '取消',
          cancelButtonText: '确定'
        }
      )
        .then(() => {
          this.$message({
            type: 'info',
            message: '取消'
          })
        })
        .catch(action => {
          this.$message({
            type: 'info',
            message: '确定'
          })
        })
    },
    Revoke(index, row) {
      this.$confirm('您确定要对2017年7月份进行撤销月结操作', {
        distinguishCancelAndClose: true,
        confirmButtonText: '取消',
        cancelButtonText: '确定'
      })
        .then(() => {
          this.$message({
            type: 'info',
            message: '取消'
          })
        })
        .catch(action => {
          this.$message({
            type: 'info',
            message: '确定'
          })
        })
    }
  }
}
</script>

<style lang='less' >
.monthly-carryover {
  .fille-line {
    margin-bottom: 20px;
  }
}
</style>
