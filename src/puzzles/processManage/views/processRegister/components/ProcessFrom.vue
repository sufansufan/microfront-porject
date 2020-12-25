<!-- @date: 2020-08-17 15:55:03 -->
<template>
  <div class="process-from">
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
        <el-table-column prop="name" label="表单名称" sortable="custom" align="center" width="200" show-overflow-tooltip />
        <el-table-column prop="type" label="表单类型" align="center" show-overflow-tooltip sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.typeName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="definitionId" label="所属流程" align="center" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.definitionName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="route" label="路由" align="center" sortable="custom" show-overflow-tooltip />
        <el-table-column prop="routeParam" label="路由参数" align="center" sortable="custom" show-overflow-tooltip />
        <el-table-column prop="appFormUrl" label="app表单" align="center" sortable="custom" show-overflow-tooltip />
        <el-table-column prop="appFormCode" label="app表单编号" align="center" sortable="custom" show-overflow-tooltip />
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
        <el-form ref="processForm" :key="key" :model="processForm" :rules="processRules" class="ruleForm" label-width="110px">
          <el-form-item label="表单名称" prop="name">
            <el-input v-model.trim="processForm.name" clearable :maxlength="20" placeholder="请输入参数" />
          </el-form-item>
          <el-form-item label="表单类型" prop="type">
            <el-radio-group v-model="processForm.type">
              <el-radio label="approve">审批</el-radio>
              <el-radio label="handle">办理</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="所属流程" prop="definitionId">
            <div v-if="!isCascade">
              <el-select v-model="processForm.definitionId" filterable clearable placeholder="请选择所属流程" @change="changeLink">
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
                v-model="processForm.definitionId"
                filterable
                placeholder="请选择所属流程"
                clearable
                :options="linkList"
                :props="{ expandTrigger: 'hover', value: 'id', label: 'name', children: 'businessFlowRegisters' }"
                @change="changeLink"
              />
            </div>
          </el-form-item>
          <el-form-item label="app表单编号" prop="appFormCode">
            <el-input v-model.trim="processForm.appFormCode" clearable :maxlength="20" placeholder="请输入app表单编号" />
          </el-form-item>
          <el-form-item label="路由" prop="route">
            <el-input v-model.trim="processForm.route" clearable :maxlength="200" placeholder="请输入路由" />
          </el-form-item>
          <el-form-item label="参数" prop="routeParam">
            <el-input v-model.trim="processForm.routeParam" clearable :maxlength="20" placeholder="请输入参数" />
          </el-form-item>
          <el-form-item label="app表单路径" prop="appFormUrl">
            <el-input v-model.trim="processForm.appFormUrl" clearable :maxlength="200" placeholder="请输入app表单路径" />
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
import { getProcessForm, addForm, editForm, deleteForm, validateAppNumber } from '@core/api/processManage/workflowmanager'
import { validateLength } from '@core/utils/validate'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'ProcessFrom',
  components: {
    DragDialog,
    SearchBar
  },
  mixins: [pagination, table, search],
  props: {
    processList: {
      default: () => {},
      type: Object
    }
  },
  data() {
    const validateAppCode = (rule, value, callback) => {
      const registerId = Array.isArray(this.processForm.definitionId) ? this.processForm.definitionId[1] : this.processForm.definitionId
      const param = this.processForm.appFormCode
      const paramId = { formId: '' }
      if (this.processTitle === '修改') {
        paramId.formId = this.multipleSelection[0].id
      }
      if (registerId && param) {
        validateAppNumber(registerId, param, paramId).then(res => {
          if (res && res.data === true) {
            callback()
          } else if (res && res.data === false) {
            callback('app表单编号已存在，请重新输入')
          }
        })
      } else {
        callback()
      }
    }
    return {
      searchParams: {},
      loading: false,
      sort: null,
      count: null,
      tableData: [],
      selectList: [
        {
          value: 'name',
          searchType: 'input',
          name: '表单名称'
        },
        {
          value: 'type',
          searchType: 'select',
          name: '表单类型',
          selectOption: {
            label: 'name',
            value: 'code'
          },
          selectData: []
        }
      ],
      btnList: [
        {
          children: [
            { name: '新增', power: 'processfrom:add', on: () => { this.orgJump('add') }, icon: 'icon-xinzeng1-copy' },
            { name: '修改', power: 'processfrom:edit', on: () => { this.orgJump('edit') }, icon: 'icon-xiugai-copy' },
            { name: '删除', power: 'processfrom:delete', on: () => { this.deleteData() }, icon: 'icon-icon7-copy' }
          ]
        }
      ],
      linkList: [],
      processForm: {
        name: '',
        type: 'approve',
        definitionId: '',
        appFormCode: '',
        route: '',
        routeParam: '',
        appFormUrl: '',
        remark: ''
      },
      processRules: {
        name: [{ required: true, message: '请输入表单名称', trigger: 'blur' }, validateLength(0, 20)],
        type: [{ required: true, message: '', trigger: 'blur' }],
        definitionId: [{ required: true, message: '请选择所属流程', trigger: 'change' }],
        appFormCode: [validateLength(0, 20), { required: false, validator: validateAppCode, trigger: 'blur' }],
        route: [{ required: true, message: '请输入路由', trigger: 'blur' }, validateLength(0, 200)],
        routeParam: validateLength(0, 20),
        appFormUrl: validateLength(0, 200),
        remark: validateLength(0, 255)
      },
      processTitle: '新增',
      isCascade: false,
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
  created() {
    this.$store.dispatch('getConstant', ['formType']).then(() => {
      this.selectList[1].selectData = this.constant.formType
    })
  },
  activated() {
    this.fetchData()
  },
  methods: {

    orgJump(type) {
      switch (type) {
        case 'add':
          this.processTitle = '新增'
          this.$refs.processDialog.show = true
          this.$nextTick(() => {
            this.$refs.processForm.resetFields()
            if (this.nodeId.id) {
              this.processForm.definitionId = this.nodeId.id
            } else {
              this.processForm.definitionId = ''
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
        case 'details':
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
        params.definitionId = this.nodeId.id
      }

      getProcessForm(params).then(({ data }) => {
        this.loading = false
        const { content, total } = data
        this.tableData = content
        this.count = total
        this.tableData.map(item => {
          if (item.type === 'approve') {
            item.typeName = '审批'
          } else if (item.type === 'handle') {
            item.typeName = '办理'
          }
        })
      })
    },
    submit() {
      this.$refs.processForm.validate(valid => {
        if (valid) {
          const params = {
            ...this.processForm
          }
          params.definitionId = Array.isArray(params.definitionId) ? params.definitionId[1] : params.definitionId
          if (this.processTitle === '新增') {
            addForm(params).then(({ data }) => {
              this.$message.success('新增成功')
              this.$refs.processDialog.show = false
              this.fetchData()
            })
          } else {
            editForm(this.multipleSelection[0].id, params).then(({ data }) => {
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
      this.processForm = {
        ...value
      }
      this.$refs.processForm.resetFields()
    },
    deleteData() {
      if (this.multipleSelection.length === 1) {
        this.$confirm('请确认是否要删除这些数据，一旦删除将无法恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteForm(this.multipleSelection[0].id).then(({ data }) => {
            this.$message.success('删除成功')
            this.fetchData()
          })
        })
          .catch(() => {})
      } else {
        this.$message.warning('请选择一条数据')
      }
    },
    changeLink() {
      console.log(this.linkList)
    }
  }
}
</script>
<style lang='less' scoped>
.process-from {
		.ruleForm {
			display: flex;
			flex-wrap: wrap;
			&>.el-form-item {
				width: 50%;
      }
      &>.el-form-item:last-child{
        width: 100%;
      }
			.el-date-editor.el-input,
			.el-date-editor.el-input__inner,
			.el-select {
				width: 100%;
      }
      .el-cascader {
        width: 100%;
      }
    }

	}
</style>
<style lang='less'>
.process-from {
  .el-table__body-wrapper {
    max-height: calc(100vh - 450px);
  }
}
</style>
