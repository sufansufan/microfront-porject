<template>
  <div class="bank-info">
    <div v-show="!disabled" class="search">
      <div class="btn">
        <div>
          <el-button type="primary" @click="dialogStatus('add')">添加</el-button>
        </div>
        <div>
          <el-button-group>
            <el-button type="primary" @click="changeState('02')"><i class="iconfont icon-tingyong-copy" /> 停用</el-button>
            <el-button type="primary" @click="changeState('01')">恢复</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <el-table ref="tableRef" v-loading="loading" :data="tableData" row-key="id" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40" />
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column prop="companyName" label="企业名称" align="center" />
      <el-table-column prop="accountName" label="账户名称" align="center" />
      <el-table-column prop="accountNumber" label="银行账号" align="center" />
      <el-table-column prop="bankName" label="开户行" align="center" />
      <el-table-column prop="bankAddress" label="开户行地址" align="center" />
      <el-table-column prop="stateName" label="状态" align="center" />
      <el-table-column v-if="!disabled" label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button @click="dialogStatus('edit', scope.row)"> 修改</el-button>
          <el-button type="danger" @click="deleteRow(scope.row.id)"> 删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        v-show="count"
        :page-sizes="pageSizes"
        :page-size="size"
        :total="count"
        :current-page="page"
        :layout="pageLayout"
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
    <drag-dialog ref="dialog" width="50%">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="bank-form">
        <el-form-item label="账户名称" prop="accountName">
          <el-input v-model="ruleForm.accountName" placeholder="请输入账户名称" :disabled="disabled" />
        </el-form-item>
        <el-form-item label="银行账号" prop="accountNumber">
          <el-input v-model="ruleForm.accountNumber" placeholder="请输入银行账号" :disabled="disabled" />
        </el-form-item>
        <el-form-item label="开户行" prop="bankName">
          <el-input v-model="ruleForm.bankName" placeholder="请输入开户行" :disabled="disabled" />
        </el-form-item>
        <el-form-item label="开户行地址">
          <el-input v-model="ruleForm.bankAddress" placeholder="请输入开户行地址" :disabled="disabled" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submit">保存</el-button>
      </div>
    </drag-dialog>
  </div>
</template>

<script>
import { getTableList, bankSave, bankUpdate, tableDelete, changeBankState } from '@core/api/operationManage/bankAccount'
import pagination from '@core/mixins/pagination'
import table from '@core/mixins/table'
import DragDialog from '@frames/dashboard/components/Dialog'
import { mapGetters } from 'vuex'
import { codeChangeName } from '@core/utils'
export default {
  components: {
    DragDialog
  },
  mixins: [pagination, table],
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      count: 0,
      tableData: [],
      loading: true,
      ruleForm: {
        accountName: '',
        accountNumber: '',
        bankName: '',
        bankAddress: '',
        id: ''
      },
      rules: {
        accountName: [{ required: true, message: '请输入账户名称', trigger: 'blur' }],
        accountNumber: [{ required: true, message: '请输入银行账号', trigger: 'blur' }],
        bankName: [{ required: true, message: '请输入开户行', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['OsBankAccountState']).then(() => {
      this.fetchData()
    })
  },
  methods: {
    fetchData() {
      this.loading = true
      getTableList({ companyId: this.$route.query.id }).then(({ data: { content, total }}) => {
        this.loading = false
        this.tableData = content
        this.count = total
        this.tableData.map(item => {
          item.stateName = codeChangeName(this.constant.OsBankAccountState, item.state)
          return item
        })
      })
    },
    dialogStatus(type, row) {
      this.ruleForm = JSON.parse(JSON.stringify(this.deepRuleForm))
      if (type === 'add') {
        this.$refs.dialog.title = '添加银行信息'
      }
      if (type === 'edit') {
        const { accountName, accountNumber, bankName, bankAddress, id, state } = row
        this.ruleForm = {
          accountName,
          accountNumber,
          bankName,
          bankAddress,
          id,
          state
        }
        this.$refs.dialog.title = '修改银行信息'
      }
      this.$refs.dialog.show = true
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const { id } = this.ruleForm
          const params = {
            ...this.ruleForm,
            companyId: this.$route.query.id
          }
          delete params.id
          if (id) {
            bankUpdate(params, id).then(() => {
              this.$message.success('修改成功')
              this.$refs.dialog.show = false
              this.fetchData()
            })
          } else {
            params.state = '01'
            bankSave(params).then(() => {
              this.$message.success('新增成功')
              this.$refs.dialog.show = false
              this.fetchData()
            })
          }
        } else {
          return false
        }
      })
    },
    deleteRow(id) {
      this.$confirm('此操作将删除选中数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        tableDelete(id).then(res => {
          this.$message.success('删除成功!')
          this.fetchData()
        })
      }).catch(() => {
        this.$message.info('已取消')
      })
    },
    changeState(state) {
      if (this.onlyOneData()) {
        const id = this.multipleSelection[0].id
        this.$confirm('此操作将改变选中数据的状态？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          changeBankState({ id, state }).then(res => {
            this.$message.success('修改成功')
            this.fetchData()
          })
        }).catch(() => {
          this.$message.info('已取消')
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.bank-info {
  .bank-form {
    display: flex;
    flex-wrap: wrap;
    & > .el-form-item {
      width: 50%;
      .el-input{
        width: 100%;
      }
    }
  }

}
</style>
