<!-- @date: 2020-08-17 15:55:03 -->
<template>
  <div class="process-param">
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
        <el-table-column prop="param" label="参数" sortable="custom" align="center" width="200" show-overflow-tooltip />
        <el-table-column prop="name" label="参数名称" align="center" show-overflow-tooltip sortable="custom" />
        <el-table-column prop="type" label="参数类型" align="center" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.typeName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dictionaryTypeId" label="字典分类" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.dictionaryTypeName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="definitionId" label="所属流程" align="center" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.definitionName }}</span>
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
    <!-- add -->
    <div class="dialog">
      <drag-dialog ref="processDialog" :title="processTitle" width="50%">
        <el-form ref="processForm" :key="key" v-loading="formLoading" :model="processForm" :rules="processRules" class="ruleForm" label-width="110px">
          <el-form-item label="参数" prop="param">
            <el-input v-model.trim="processForm.param" :disabled="processTitle==='修改'" clearable :maxlength="20" placeholder="请输入参数" />
          </el-form-item>
          <el-form-item label="参数名称" prop="name">
            <el-input v-model.trim="processForm.name" clearable :maxlength="20" placeholder="请输入参数名称" />
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
          <el-form-item label="参数类型" prop="type">
            <el-select v-model="processForm.type" filterable clearable placeholder="请选择参数类型" @change="changeLink">
              <el-option
                v-for="item in constant.paramType"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="processForm.type == 'dictionary'" label="字典分类" prop="dictionaryTypeId">
            <el-select v-model="processForm.dictionaryTypeId" filterable clearable placeholder="请选择字典分类" @blur="focusInfo">
              <el-option
                v-for="item in dictionaryList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="说明" prop="remark" class="full-width row-label">
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
import DragDialog from '@frames/dashboard/components/Dialog'
import SearchBar from '@frames/dashboard/components/SearchBar'
import { getParamList, validParam, addParam, editParam, deleteParam } from '@core/api/processManage/workflowmanager'
import { validateLength } from '@core/utils/validate'
import { dictionaryNopage } from '@core/api/dictionary'
import { mapGetters, mapState } from 'vuex'
import { codeChangeName } from '@core/utils'
export default {
  name: 'ProcessParam',
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
    var validateParam = (rule, value, callback) => {
      const registerId = Array.isArray(this.processForm.definitionId) ? this.processForm.definitionId[1] : this.processForm.definitionId
      const param = this.processForm.param
      const paramId = { paramId: this.paramId }
      if (registerId) {
        validParam(registerId, param, paramId).then(res => {
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
      formLoading: false,
      searchParams: {},
      sort: null,
      count: null,
      selectList: [
        {
          value: 'param',
          searchType: 'input',
          name: '参数'
        },
        {
          value: 'name',
          searchType: 'input',
          name: '参数名称'
        }
      ],
      btnList: [
        {
          children: [
            { name: '新增', power: 'processparam:add', on: () => { this.orgJump('add') }, icon: 'icon-xinzeng1-copy' },
            { name: '修改', power: 'processparam::edit', on: () => { this.orgJump('edit') }, icon: 'icon-xiugai-copy' },
            { name: '复制', power: 'processparam:copy', on: () => { this.orgJump('copy') }, icon: 'icon-fuzhi' },
            { name: '删除', power: 'processparam:delete', on: () => { this.deleteData() }, icon: 'icon-icon7-copy' }
          ]
        }
      ],
      linkList: [],
      processForm: {
        param: '',
        name: '',
        dictionaryTypeId: '',
        definitionId: '',
        type: '',
        remark: ''
      },
      processRules: {
        param: [
          { required: true, message: '请输入参数', trigger: 'blur' },
          validateLength(0, 20),
          { required: true, validator: validateParam, trigger: 'blur' }
        ],
        name: [{ required: true, message: '请输入参数名称', trigger: 'blur' }, validateLength(0, 20)],
        definitionId: [{ required: true, message: '请选择所属流程', trigger: 'change' }],
        dictionaryTypeId: [{ required: true, message: '请选择字典分类', trigger: 'change' }],
        type: [{ required: true, message: '请选择参数类型', trigger: 'change' }],
        remark: validateLength(0, 255)
      },
      processTitle: '新增',
      paramType: [],
      isCascade: false,
      dictionaryList: [],
      paramId: ''
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
  activated() {
    this.$store.dispatch('getConstant', ['paramType']).then(() => {
      const nodeId = {
        applicationId: '',
        id: ''
      }
      this.$store.commit('SET_NODEID', nodeId)
      this.fetchData()
    })
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
            this.$nextTick(_ => {
              this.$refs.processForm.resetFields()
            })
            this.getDateil(this.multipleSelection[0])
          } else {
            this.$message.warning('请选择一条数据')
          }
          break
        case 'copy':
          this.processTitle = '复制'
          if (this.multipleSelection.length === 1) {
            this.$nextTick(_ => {
              this.$refs.processForm.resetFields()
            })
            this.getDateil(this.multipleSelection[0])
          } else {
            this.$message.warning('请选择一条数据')
          }
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
        ...this.search,
        propertyName: 'updateDate',
        ascending: false,
        ...sortData
      }
      if (this.nodeId.applicationId) {
        params.applicationId = this.nodeId.applicationId
      }
      if (this.nodeId.id) {
        params.definitionId = this.nodeId.id
      }
      getParamList(params).then(({ data }) => {
        this.loading = false
        const { content, total } = data
        this.tableData = content
        this.tableData.map(item => {
          item.typeName = codeChangeName(this.constant.paramType, item.type)
          return item
        })
        this.count = total
      })
    },
    submit() {
      this.$refs.processForm.validate(valid => {
        if (valid) {
          const params = {
            ...this.processForm
          }
          params.definitionId = Array.isArray(params.definitionId) ? params.definitionId[1] : params.definitionId
          if (this.processTitle === '新增' || this.processTitle === '复制') {
            addParam(params).then(({ data }) => {
              this.$message.success('保存成功')
              this.$refs.processDialog.show = false
              this.fetchData()
            })
          } else {
            editParam(this.multipleSelection[0].id, params).then(({ data }) => {
              this.$message.success('修改成功')
              this.$refs.processDialog.show = false
              this.fetchData()
            })
          }
        }
      })
    },
    getDictionaryType(id) {
      if (id === '') return
      const param = {
        applicationId: id
      }
      dictionaryNopage(param).then(({ data }) => {
        this.dictionaryList = data
      })
    },
    changeLink(value) {
      if (value === 'dictionary' || value === 'number') {
        this.processForm.dictionaryTypeId = ''
      } else {
        this.processForm.dictionaryTypeId = ''
        this.dictionaryList = []
        if (this.isCascade) {
          if (value.length !== 0) {
            this.getDictionaryType(value[0])
          }
        } else {
          if (value) {
            this.linkList.forEach(item => {
              if (item.id === value) {
                this.getDictionaryType(item.applicationId)
              }
            })
          }
        }
      }
    },
    focusInfo() {
      if (this.dictionaryList.length === 0) {
        this.$message.warning('先选定所属流程')
      }
    },
    getDateil(value) {
      this.$refs.processDialog.show = true
      this.paramId = value.id
      this.formLoading = true
      const param = {
        applicationId: ''
      }
      if (this.isCascade) {
        this.linkList.forEach(item => {
          item.businessFlowRegisters.forEach(e => {
            if (value.definitionId === e.id) {
              param.applicationId = e.applicationId
            }
          })
        })
      } else {
        this.linkList.forEach(item => {
          if (value.definitionId === item.id) {
            param.applicationId = item.applicationId
          }
        })
      }
      dictionaryNopage(param).then(({ data }) => {
        this.dictionaryList = data
        this.processForm = {
          ...value
        }
        this.formLoading = false
      })
    },
    deleteData() {
      if (this.multipleSelection.length === 1) {
        this.$confirm('请确认是否要删除这些数据，一旦删除将无法恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteParam(this.multipleSelection[0].id).then(({ data }) => {
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
	.process-param {
		.ruleForm {
			display: flex;
			flex-wrap: wrap;
			&>.el-form-item {
				width: 50%;
      }
      .full-width {
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
.process-param {
  .el-table__body-wrapper {
    max-height: calc(100vh - 443px);
  }
}
</style>
