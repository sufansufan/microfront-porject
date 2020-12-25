<!-- @date: 2020-08-17 15:55:03 -->
<template>
  <div class="approve">
    <div class="search">
      <search-bar :select-list="selectList" :btn-list="btnList" :search="search" @changeSearch="changeSearch" />
    </div>
    <div class="table">
      <el-table
        ref="tableRef"
        v-loading="loading"
        :data="tableData"
        row-key="id"
        border
        :default-sort="{
          prop: 'updateDate',
          order: 'descending'
        }"
        max-height="calc(100vh - 400px)"
        @sort-change="sortTable"
        @select="handleSelectionSingleChange"
      >
        <el-table-column type="selection" width="40" label-class-name="table-selection" />
        <el-table-column type="index" width="48" label="序号" align="center" />
        <el-table-column prop="approverCode" label="编号" sortable="custom" align="center" width="200" show-overflow-tooltip />
        <el-table-column prop="approverName" label="审批人名称" align="center" show-overflow-tooltip sortable="custom" />
        <el-table-column prop="registerId" label="所属流程" align="center" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.registerName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="说明" align="center" show-overflow-tooltip />
        <el-table-column prop="updateDate" label="最后修改时间" align="center" sortable="custom" show-overflow-tooltip />
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
    </div>
    <div class="dialog">
      <drag-dialog ref="processDialog" :title="processTitle" width="50%">
        <el-form ref="processForm" :key="key" :model="processForm" :rules="processRules" label-width="110px">
          <el-form-item label="编号" prop="approverCode">
            <el-input v-model.trim="processForm.approverCode" clearable :maxlength="20" placeholder="请输入编号" />
          </el-form-item>
          <el-form-item label="审批人名称" prop="approverName">
            <el-input v-model.trim="processForm.approverName" clearable :maxlength="20" placeholder="请输入审批人名称" />
          </el-form-item>
          <el-form-item label="所属流程" prop="registerId">
            <div v-if="!isCascade">
              <el-select v-model="processForm.registerId" filterable clearable placeholder="请选择所属流程" @change="changeLink">
                <el-option
                  v-for="item in linkList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </div>
            <div v-else>
              <el-cascader
                v-model="processForm.registerId"
                filterable
                placeholder="请选择所属流程"
                clearable
                :options="linkList"
                :props="{ expandTrigger: 'hover', value: 'id', label: 'name', children: 'businessFlowRegisters' }"
              />
            </div>
          </el-form-item>
          <el-form-item label="说明" prop="remark">
            <el-input v-model.trim="processForm.remark" type="textarea" :maxlength="255" :rows="3" placeholder="请输入说明" />
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button type="primary" @click="submit">确定</el-button>
        </div>
      </drag-dialog>
    </div>
  </div>
</template>

<script>
import pagination from '@core/mixins/pagination'
import table from '@core/mixins/table'
import search from '@core/mixins/search'
import SearchBar from '@frames/dashboard/components/SearchBar'
import DragDialog from '@frames/dashboard/components/Dialog'
import { validateLength } from '@core/utils/validate'
import { mapGetters, mapState } from 'vuex'
import { getApprover, addApprover, editApprover, deleteApprover, validateNumber } from '@core/api/processManage/workflowmanager'
export default {
  name: 'Approver',
  components: {
    SearchBar,
    DragDialog
  },
  mixins: [pagination, table, search],
  props: {
    processList: {
      default: () => {},
      type: Object
    }
  },
  data() {
    var validateApprover = (rule, value, callback) => {
      const registerId = Array.isArray(this.processForm.registerId) ? this.processForm.registerId[1] : this.processForm.registerId
      const params = {
        approverCode: this.processForm.approverCode,
        id: this.approverId,
        registerId: registerId
      }

      if (registerId) {
        validateNumber(params).then(res => {
          if (res && res.data === true) {
            callback()
          } else if (res && res.data === false) {
            callback('参数已存在，请重新输入')
          }
        })
      } else {
        callback()
      }
    }
    return {
      loading: false,
      searchParams: {},
      approverId: '',
      count: null,
      tableData: [],
      selectList: [
        {
          value: 'approverCode',
          searchType: 'input',
          name: '编号'
        },
        {
          value: 'approverName',
          searchType: 'input',
          name: '审批人名称'
        }
      ],
      btnList: [
        {
          children: [
            { name: '新增', power: 'approve:add', on: () => { this.orgJump('add') }, icon: 'icon-xinzeng1-copy' },
            { name: '修改', power: 'approve:edit', on: () => { this.orgJump('edit') }, icon: 'icon-xiugai-copy' },
            { name: '删除', power: 'approve:delete', on: () => { this.deleteData() }, icon: 'icon-icon7-copy' }
          ]
        }
      ],
      processForm: {
        approverCode: '',
        approverName: '',
        registerId: '',
        remark: ''
      },
      processRules: {
        approverCode: [{ required: true, message: '请输入编号', trigger: 'blur' }, validateLength(0, 20),
          { required: true, validator: validateApprover, trigger: 'blur' }],
        approverName: [{ required: true, message: '请输入审批人', trigger: 'blur' }, validateLength(0, 20)],
        registerId: [{ required: true, message: '请选择所属流程', trigger: 'change' }],
        remark: validateLength(0, 255)
      },
      processTitle: '新增',
      isCascade: false,
      linkList: [],
      multipleSelection: []
    }
  },
  computed: {
    ...mapGetters(['nodeId', 'constant']),
    ...mapState({
      applicationList: state => state.processManage.applicationListReg
    })
  },
  watch: {
    processList: {
      handler(val) {
        if (val) {
          if (val.businessFlowRegisters) {
            this.isCascade = false
            this.linkList = val.businessFlowRegisters
          } else {
            if (JSON.stringify(val) === '{}') return
            this.isCascade = true
            this.linkList = val.list
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() { this.fetchData() },
  methods: {
    orgJump(type) {
      switch (type) {
        case 'add':
          this.processTitle = '新增'
          this.$refs.processDialog.show = true
          this.$nextTick(() => {
            this.$refs.processForm.resetFields()
            if (this.nodeId.id) {
              this.processForm.registerId = this.nodeId.id
            } else {
              this.processForm.registerId = ''
            }
          })

          break
        case 'edit':
          this.processTitle = '修改'
          if (this.multipleSelection.length === 1) {
            this.getDateil(this.multipleSelection[0])
          } else {
            this.$message.warning('请选择一条数据')
          }
          break
        case 'copy':
          this.processTitle = '复制'
          this.$refs.processDialog.show = true
          break
        default:
          break
      }
    },
    fetchData(type) {
      this.multipleSelection = []
      this.loading = true
      this.queryCopy(type)
      const { page, size, sortData } = this
      const params = {
        page: page - 1,
        size,
        propertyName: 'updateDate',
        ascending: false,
        ...this.search,
        ...sortData
      }
      if (this.nodeId.applicationId) {
        params.applicationId = this.nodeId.applicationId
      }
      if (this.nodeId.id) {
        params.registerId = this.nodeId.id
      }
      getApprover(params).then(({ data }) => {
        this.loading = false
        const { content, total } = data
        this.tableData = content
        this.count = total
      })
    },
    submit() {
      this.$refs.processForm.validate(valid => {
        if (valid) {
          const params = {
            ...this.processForm
          }
          params.registerId = Array.isArray(params.registerId) ? params.registerId[1] : params.registerId
          if (this.processTitle === '新增') {
            addApprover(params).then(({ data }) => {
              this.$message.success('新增成功')
              this.$refs.processDialog.show = false
              this.fetchData()
            })
          } else {
            editApprover(this.multipleSelection[0].id, params).then(({ data }) => {
              this.$message.success('修改成功')
              this.$refs.processDialog.show = false
              this.fetchData()
            })
          }
        }
      })
    },
    getDateil(value) {
      this.$refs.processDialog.show = true
      this.approverId = value.id
      const { approverCode, approverName, registerId, remark } = value
      this.processForm = { approverCode, approverName, registerId, remark }
      this.$refs.processForm.resetFields()
    },
    deleteData() {
      if (this.multipleSelection.length === 1) {
        this.$confirm('请确认是否要删除这些数据，一旦删除将无法恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteApprover(this.multipleSelection[0].id).then(({ data }) => {
            this.$message.success('删除成功')
            this.fetchData()
          })
        })
          .catch(() => {})
      } else {
        this.$message.warning('请选择一条数据')
      }
    }
  }
}
</script>
<style lang='less' scoped>
.approve {
  .el-select {
    width: 100%;
  }
  .el-cascader{
    width: 100%;
  }
}
</style>
<style lang='less'>
.approve {
  .el-table__body-wrapper {
    max-height: calc(100vh - 440px);
  }
}
</style>
