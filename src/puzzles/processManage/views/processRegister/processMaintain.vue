<template>
  <div class="process-maintain">
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
        max-height="calc(100vh - 350px)"
        :default-sort="{
          prop: 'updateDate',
          order: 'descending'
        }"
        @sort-change="sortTable"
        @select="handleSelectionSingleChange"
      >
        <el-table-column label-class-name="table-selection" type="selection" width="40" />
        <el-table-column type="index" width="48" label="序号" align="center" />
        <el-table-column prop="code" label="流程编号" sortable="custom" align="center" width="200" show-overflow-tooltip />
        <el-table-column prop="name" label="流程名称" align="center" show-overflow-tooltip sortable="custom" />
        <el-table-column prop="applicationId" label="所属应用" align="center" sortable="custom">
          <template slot-scope="scope">
            <span>
              {{ scope.row.applicationName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="resourceId" label="绑定资源" align="center">
          <template slot-scope="scope">
            <span>
              {{ scope.row.resourceName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="callbackApi" label="业务回调接口" align="center" />
        <el-table-column prop="isAvailable" label="是否可用" align="center" sortable="custom">
          <template slot-scope="scope">
            <span>
              {{ scope.row.isAvailable ? '是':'否' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="isFreeFlow" label="是否支持自由流程" align="center" sortable="custom">
          <template slot-scope="scope">
            <span>
              {{ scope.row.isFreeFlow ? '是':'否' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="说明" align="center" />
        <el-table-column prop="updateDate" label="最后修改时间" align="center" sortable="custom" />
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
    <drag-dialog ref="processMaintain" :title="maintainTitle" width="50%">
      <el-form ref="processForm" :key="key" v-loading="formLoading" :model="processForm" :rules="processRules" class="ruleForm" label-width="140px">
        <el-form-item label="流程编号" prop="code">
          <el-input v-model.trim="processForm.code" :disabled="maintainTitle === '修改'" clearable :maxlength="20" placeholder="请输入流程编号" />
        </el-form-item>
        <el-form-item label="流程名称" prop="name">
          <el-input v-model.trim="processForm.name" clearable :maxlength="20" placeholder="请输入流程名称" />
        </el-form-item>
        <el-form-item label="所属应用" prop="applicationId">
          <el-select v-model="processForm.applicationId" filterable clearable placeholder="请选择所属应用" @change="changeApp">
            <el-option
              v-for="item in applicationList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="绑定资源" prop="resourceId">
          <el-cascader
            v-model="processForm.resourceId"
            filterable
            :disabled="processForm.applicationId === ''"
            placeholder="请选择绑定资源"
            clearable
            :options="resourceList"
            :props="{checkStrictly: true , expandTrigger: 'hover', value: 'id', label: 'name', children: 'child' }"
          />
        </el-form-item>
        <el-form-item label="是否支持自由流程" prop="isFreeFlow">
          <el-switch v-model="processForm.isFreeFlow" />
        </el-form-item>
        <el-form-item label="是否可用" prop="isAvailable">
          <el-switch v-model="processForm.isAvailable" />
        </el-form-item>
        <el-form-item label="业务回调接口" prop="callbackApi">
          <el-input v-model="processForm.callbackApi" clearable :maxlength="200" placeholder="请输入业务回调接口" />
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
</template>
<script>
import table from '@core/mixins/table'
import pagination from '@core/mixins/pagination'
import search from '@core/mixins/search'
import SearchBar from '@frames/dashboard/components/SearchBar'
import DragDialog from '@frames/dashboard/components/Dialog'
import { validateLength } from '@core/utils/validate'
import {
  getMaintainTable,
  addMaintain,
  editMaintain,
  deleteMaintain,
  maintainValidate
} from '@core/api/processManage/workflowmanager'
import { getNotPage, getResourceData } from '@core/api/authResourcegc'
import { mapGetters } from 'vuex'
export default {
  name: 'ProcessMaintain',
  components: {
    SearchBar,
    DragDialog
  },
  mixins: [pagination, table, search],
  data() {
    var validateNumber = (rule, value, callback) => {
      const params = {
        code: this.processForm.code,
        id: ''
      }
      if (this.maintainTitle === '修改') {
        params.id = this.multipleSelection[0].id
      }
      maintainValidate(params).then(res => {
        if (res && res.data === true) {
          callback()
        } else if (res && res.data === false) {
          callback('流程编号已存在，请重新输入')
        }
      })
    }
    return {
      count: null,
      loading: false,
      formLoading: false,
      sortParams: {
        propertyName: 'createDate',
        ascending: false
      },
      selectList: [
        {
          value: 'code',
          searchType: 'input',
          name: '流程编号'
        },
        {
          value: 'name',
          searchType: 'input',
          name: '流程名称'
        },
        {
          value: 'applicationId',
          searchType: 'select',
          name: '所属应用',
          selectOption: {
            label: 'name',
            value: 'id'
          },
          selectData: []
        }
      ],
      btnList: [
        {
          children: [
            {
              name: '新增',
              power: 'processmaintain:add',
              on: () => {
                this.orgJump('add')
              },
              icon: 'icon-xinzeng1-copy'
            },
            {
              name: '修改',
              power: 'processmaintain:edit',
              on: () => {
                this.orgJump('edit')
              },
              icon: 'icon-xiugai-copy'
            },
            {
              name: '删除',
              power: 'processmaintain:delete',
              on: () => {
                this.deleteData()
              },
              icon: 'icon-icon7-copy'
            }
          ]
        },
        {
          children: [
            {
              name: '返回',
              power: 'materialHouse:add',
              on: () => {
                this.$router.go(-1)
              },
              icon: 'icon-fanhui-copy'
            }
          ]
        }
      ],
      tableData: [],
      maintainTitle: '新增',
      processForm: {
        code: '',
        name: '',
        applicationId: '',
        resourceId: '',
        isFreeFlow: false,
        isAvailable: true,
        callbackApi: '',
        remark: ''
      },
      processRules: {
        code: [
          { required: true, message: '请输入流程编号', trigger: 'blur' },
          validateLength(0, 20),
          { required: true, validator: validateNumber, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入流程名称', trigger: 'blur' },
          validateLength(0, 20)
        ],
        applicationId: [
          { required: true, message: '请选择所属应用', trigger: 'change' }
        ],
        resourceId: [
          { required: true, message: '请选择绑定资源', trigger: 'change' }
        ],
        callbackApi: [
          { required: true, message: '请输入业务回调接口', trigger: 'blur' },
          validateLength(0, 200)
        ],
        remark: validateLength(0, 255)
      },
      multipleSelection: [],
      applicationList: [],
      resourceList: []
    }
  },
  computed: {
    ...mapGetters(['nodeId'])
  },
  created() {
    this.fetchData()
    this.getAppList()
  },
  methods: {
    orgJump(type) {
      switch (type) {
        case 'add':
          this.maintainTitle = '新增'
          this.$refs.processMaintain.show = true
          this.$nextTick(() => {
            this.$refs.processForm.resetFields()
          })
          if (this.nodeId.applicationId) {
            this.processForm.applicationId = this.nodeId.applicationId
            this.resourceList = []
            this.changeApp()
          }
          break
        case 'edit':
          this.maintainTitle = '修改'
          if (this.multipleSelection.length === 1) {
            this.$refs.processMaintain.show = true
            this.formLoading = true
            this.$nextTick(() => {
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
    deleteData() {
      if (this.multipleSelection.length === 1) {
        this.$confirm('请确认是否要删除这些数据，一旦删除将无法恢复', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteMaintain(this.multipleSelection[0].id).then(({ data }) => {
            this.fetchData()
            this.$message.success('删除成功')
          })
        })
          .catch(() => {})
      } else {
        this.$message.success('请选择一条数据')
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
      getMaintainTable(params).then(({ data }) => {
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
          params.resourceId = Array.isArray(params.resourceId) ? params.resourceId[params.resourceId.length - 1] : params.resourceId
          if (this.maintainTitle === '新增') {
            addMaintain(params).then(({ data }) => {
              this.fetchData()
              this.$message.success('新增成功')
              this.$refs.processMaintain.show = false
            })
          } else {
            editMaintain(params, this.multipleSelection[0].id).then(({ data }) => {
              this.fetchData()
              this.$message.success('修改成功')
              this.$refs.processMaintain.show = false
            })
          }
        }
      })
    },
    // 获取所属应用
    getAppList() {
      getNotPage().then(({ data }) => {
        this.selectList[2].selectData = data
        this.applicationList = data
        if (this.nodeId.applicationId) {
          this.processForm.applicationId = this.nodeId.applicationId
          this.resourceList = []
          this.changeApp()
        }
      })
    },
    changeApp() {
      this.processForm.resourceId = ''
      const param = {
        appId: this.processForm.applicationId
      }
      getResourceData(param).then(({ data }) => {
        this.resourceList = JSON.parse(JSON.stringify(data))
        this.resData(this.resourceList)
      })
    },
    resData(data) {
      data.forEach(item => {
        if (item.child.length === 0) {
          delete item.child
        } else {
          this.resData(item.child)
        }
      })
    },
    getDateil(data) {
      const { applicationId, code, isAvailable, isFreeFlow, name, remark, resourceId, callbackApi } = data
      const param = {
        appId: applicationId
      }
      getResourceData(param).then(({ data }) => {
        this.resourceList = JSON.parse(JSON.stringify(data))
        this.resData(this.resourceList)
        this.processForm = {
          applicationId,
          code,
          isAvailable,
          isFreeFlow,
          name,
          remark,
          callbackApi,
          resourceId
        }
        this.formLoading = false
      })
    }
  }

}
</script>
<style lang='less' scoped >
.process-maintain {
  padding: 10px;
  .ruleForm {
    display: flex;
    flex-wrap: wrap;
    & > .el-form-item {
      width: 50%;
    }
    & > .el-form-item:nth-of-type(8) {
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
.process-maintain {
  .el-table__body-wrapper {
    max-height: calc(100vh - 400px);
  }
}
</style>
