<template>
  <div class="authorize-manage">
    <div class="search">
      <div v-show="selectState" class="select">
        <div>
          <span>任务编号</span>
          <div>
            <el-input v-model.trim="search.id" placeholder="请输入任务编号" clearable />
          </div>
        </div>
        <div>
          <span>授权企业</span>
          <el-input v-model.trim="search.enterpriseName" placeholder="请输入授权企业名称" clearable />
        </div>
        <div>
          <span>状态</span>
          <el-select v-model="search.status" multiple placeholder="请选择状态" clearable>
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <span>创建时间</span>
          <div>
            <el-date-picker
              v-model="search.authorizedTime"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              clearable
              :picker-options="pickerOptions"
              :default-time="defaultTime"
              @keyup.enter.native="keyupSearch"
            />
          </div>
        </div>
        <div class="query">
          <div>
            <el-button type="primary" icon="el-icon-search" @click="fetchData('query')">查询</el-button>
          </div>
        </div>
      </div>
      <div v-if="!btnDisabled" class="btn">
        <div>
          <el-button-group>
            <el-button v-power="'authorize:claim'" type="primary" @click="taskAction('claim')">认领</el-button>
            <el-button v-power="'authorize:handover'" type="primary" @click="taskAction('handover')">转交</el-button>
            <el-button v-power="'authorize:apply'" type="primary" @click="taskAction('applyForRights')">申请权限</el-button>
            <el-button v-power="'authorize:grant'" type="primary" @click="taskAction('grantForRights')">授予权限</el-button>
            <el-button v-power="'authorize:accessDB'" type="primary" @click="taskAction('accessDB')">访问数据库</el-button>
            <el-button v-power="'authorize:handle'" type="primary" @click="taskAction('handle')">处理完成</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <div>
      <!--      <el-table ref="tableRef" v-loading="loading" :data="tableData" row-key="id" border @selection-change="handleSelectionSingleChange">-->
      <el-table
        ref="tableRef"
        v-loading="loading"
        :data="tableData"
        row-key="id"
        border
        default-expand-all
        height="calc(100vh - 330px)"
        :default-sort="{prop: 'authorizedTime', order: 'descending'}"
        @sort-change="sortTable"
        @select="handleSelectionSingleChange"
      >
        <!--        <el-table-column type="selection" width="48" />-->
        <el-table-column type="selection" width="40" label-class-name="table-selection" />
        <el-table-column type="index" label="序号" width="48" align="center" />
        <el-table-column label="任务编号" align="center" width="260">
          <template slot-scope="scope">
            <div class="table-click-color" @click="detail(scope.row.id)">
              {{ scope.row.id }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="authorizerName" label="授权人" align="center" width="130" />
        <el-table-column prop="enterpriseName" label="授权企业" align="center" width="200" />
        <el-table-column prop="description" label="描述" align="center" />
        <el-table-column prop="assigneeName" label="处理人" align="center" width="130" />
        <el-table-column prop="authorizedTime" sortable="custom" label="创建时间" align="center" width="160" />
        <el-table-column prop="assigneeTime" sortable="custom" label="处理时间" align="center" width="160" />
        <el-table-column prop="statusLabel" label="状态" align="center" width="100" />
      </el-table>
    </div>
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
    <drag-dialog ref="dialog" v-loading="dialogLoading" :title="dialogTitle[dialogType]" width="45%">
      <el-form ref="ruleForm" :key="key" :model="ruleForm" :rules="rules" label-width="110px" class="category-form">
        <el-form-item label="任务编号">
          <span>{{ ruleForm.id }}</span>
        </el-form-item>
        <el-form-item label="处理人">
          <span>{{ ruleForm.assigneeName }}</span>
        </el-form-item>
        <el-form-item label="原始问题">
          <span>{{ ruleForm.desc }}</span>
        </el-form-item>
        <el-form-item v-if="dialogType==='handover'" label="指派人" prop="assignee" filter-method="filter-method">
          <el-select
            v-model="ruleForm.assignee"
            filterable
            reserve-keyword
            clearable
            placeholder="请输入指派人名称"
            :loading="personLoading"
          >
            <el-option
              v-for="item in personnalList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="说明" prop="description">
          <el-input v-model="ruleForm.description" type="textarea" />
          <span v-if="dialogType==='handle'" style="color:red">该信息将同步到企业端，请谨慎填写，如不确定请转交部门经理</span>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submit()">确定</el-button>
      </div>
    </drag-dialog>

    <!--<drag-dialog ref="dialogGrant" title="授予权限" width="45%">
      <el-form ref="ruleFormGrant" :key="key" :model="ruleFormGrant" :rules="rulesGrant" label-width="110px" class="category-form">
        <el-form-item label="请输入密钥" prop="innerKey">
          <el-input type="textarea" v-model="ruleFormGrant.innerKey"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submitGrant()">确定</el-button>
      </div>
    </drag-dialog>-->
  </div>
</template>

<script>
import pagination from '@core/mixins/pagination'
import table from '@core/mixins/table'
import { parseTime } from '@core/utils'
import { getTableList, taskClaim, taskHandover, taskHandle, applyForRights, grantForRights, accessDB } from '@core/api/auditManageSys/accessAuthorization'
import { getCustodian } from '@core/api/personnel'
import DragDialog from '@frames/dashboard/components/Dialog'
import { getSessionStorage } from '@core/utils/auth'

const personnel = JSON.parse(getSessionStorage('personnel'))

export default {
  name: 'AuthorizeManage',
  components: {
    DragDialog
  },
  mixins: [pagination, table],
  inject: ['pageType'],
  props: {
    selectState: {
      type: Boolean,
      default: true
    },
    btnDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      count: 0,
      search: {
        id: '',
        enterpriseName: '',
        status: [],
        authorizedTime: []
      },
      loading: true,
      tableData: [],
      statusList: [
        { value: 'unclaimed', label: '待认领' },
        { value: 'claimed', label: '已认领' },
        { value: 'pending', label: '待处理' },
        { value: 'pending_grant', label: '待授权' },
        { value: 'granted', label: '已授权' },
        { value: 'processing', label: '处理中' },
        { value: 'done', label: '已完成' }
      ],
      grantStatusMap: {
        pending: '待授权',
        grant: '已授权',
        revoke: '已撤销授权'
      },
      personnalList: [],
      personLoading: false,
      companyList: [],
      companyLoading: false,
      dialogLoading: false,
      ruleForm: {
        id: '',
        assignee: '',
        assigneeName: '',
        description: '',
        desc: ''
      },
      ruleFormGrant: {
        id: '',
        innerKey: ''
      },
      rules: {
        assignee: [{ required: true, message: '请选择指派人', trigger: 'change' }],
        description: [{ required: true, message: '请输入说明', trigger: 'blur' }, { max: 255, message: '最大可输入255个字符', trigger: 'blur' }]
      },
      rulesGrant: {
        innerKey: [{ required: true, message: '请输入密钥', trigger: 'blur' }]
      },
      dialogType: 'handover',
      dialogTitle: {
        handover: '移交报告',
        handle: '处理报告'
      }
    }
  },
  computed: {
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(sortData) {
      this.loading = true
      if (typeof sortData === 'string') {
        this.deepSearch = JSON.parse(JSON.stringify(this.search))
        this.page = 1
        // this.size = 10
      }
      this.search = JSON.parse(JSON.stringify(this.deepSearch))
      const { authorizedTime } = this.search
      console.log(authorizedTime)
      const { propertyName, ascending } = sortData || {}
      const params = {
        size: this.size,
        page: this.page - 1,
        ...this.search,
        propertyName,
        ascending,
        authorizedTime: {}
      }
      if (authorizedTime) {
        params.authorizedTime = {
          after: authorizedTime[0],
          before: authorizedTime[1]
        }
      } else {
        delete params.authorizedTime
      }
      this.tableData = []
      getTableList(params).then(({ data: { content, total }}) => {
        this.loading = false
        this.tableData = content
        this.count = total
        this.tableData.map(item => {
          item.authorizedTime = parseTime(item.authorizedTime, 'y-m-d h:i:s')
          item.grantStatusLabel = this.grantStatusMap[item.grantStatus]
          return item
        })
      })
    },
    detail(id) {
      console.log(id)
      this.$router.push({ name: 'authorizeDetail', query: { id }})
    },
    findPersonnelList() {
      this.personLoading = true
      getCustodian().then(res => {
        this.personnalList = res.data
        this.personLoading = false
      })
    },
    submit() {
      if (this.dialogType === 'handover') {
        this.submitHandover()
      } else if (this.dialogType === 'handle') {
        this.submitHandle()
      }
    },
    submitHandover() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.ruleForm.assignee === personnel.id) {
            this.$message.warning('授权任务无法转交给自己')
            return
          }
          this.dialogLoading = true
          const params = {
            id: this.ruleForm.id,
            assignee: this.ruleForm.assignee,
            assigneeName: '',
            description: this.ruleForm.description
          }
          const filterList = this.personnalList.filter(item => {
            return item.id === this.ruleForm.assignee
          })
          params.assigneeName = filterList[0].name
          taskHandover(params).then(res => {
            this.dialogLoading = false
            if (res.code === 200) {
              this.fetchData()
              this.$message.success('转交成功')
              this.$refs.dialog.show = false
            }
          }).catch(() => {
            this.dialogLoading = false
          })
        }
      })
    },
    submitHandle() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$confirm('确认提交后，该信息将同步到企业端，\n是否确认提交？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.dialogLoading = true
            const params = {
              id: this.ruleForm.id,
              description: this.ruleForm.description
            }
            taskHandle(params).then(res => {
              this.dialogLoading = false
              if (res.code === 200) {
                this.fetchData()
                this.$message.success('处理成功')
                this.$refs.dialog.show = false
              }
            }).catch(() => {
              this.dialogLoading = false
            })
          }).catch(() => {})
        }
      })
    },
    /* submitGrant() {
            this.$refs.ruleFormGrant.validate(valid => {
                if (valid) {
                    const params = {
                        id: this.ruleFormGrant.id,
                        innerKey: this.ruleFormGrant.innerKey
                    }
                    grantForRights(params).then(res => {
                        if (res.code === 200) {
                            this.fetchData()
                            this.$message.success('处理成功')
                            this.$refs.dialogGrant.show = false
                        }
                    }).catch(() => {
                    })
                }
            })
        },*/
    taskAction(type) {
      if (this.multipleSelection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      const { id, status, assignee, assigneePost, grantStatus, taskStatus } = this.multipleSelection[0]
      this.ruleForm = Object.assign({}, this.multipleSelection[0])
      this.ruleFormGrant = Object.assign({}, this.multipleSelection[0])

      const params = {
        id: id
      }
      switch (type) {
        case 'claim':
          if (status !== 'unclaimed') {
            this.$message.warning('请选择状态为待认领的任务')
            return
          }
          this.$confirm('确认要认领选中的任务，是否继续', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            taskClaim(params).then(res => {
              if (res.code === 200) {
                this.$message.success('认领成功')
                this.fetchData()
              }
              return
            })
          }).catch(() => {})
          break
        case 'handover':
          if (personnel.id !== assignee) {
            this.$message.warning('非该用户下的授权任务，无法转交')
            return
          }
          /* if (status !== 'claimed' && status !== 'pending') {
                        this.$message.warning('请选择状态为已认领的任务')
                        return
                    }*/
          this.ruleForm.assignee = ''
          this.ruleForm.desc = this.ruleForm.description
          this.ruleForm.description = ''
          this.dialogType = 'handover'

          this.findPersonnelList()
          this.$refs.dialog.show = true
          break
        case 'handle':
          if (personnel.id !== assignee) {
            this.$message.warning('非该用户下的授权任务，无法处理')
            return
          }
          /* if (taskStatus !== 'processing') {
                        this.$message.warning('请选择状态为处理中的任务')
                        return
                    }*/
          this.$confirm('您的数据库访问权限未收回，\n若确认将收回权限，是否确认？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.ruleForm.assignee = ''
            this.ruleForm.desc = this.ruleForm.description
            this.ruleForm.description = ''
            this.dialogType = 'handle'
            this.$refs.dialog.show = true
          }).catch(() => {})
          break
        case 'applyForRights':
          /* if (grantStatus === 'pending' || grantStatus === 'grant') {
                        this.$message.warning('该访问授权任务已申请授权，无需再次申请')
                        return
                    }*/
          if (personnel.id !== assignee) {
            this.$message.warning('非该用户下的授权任务，无法申请权限')
            return
          }
          applyForRights(params).then(res => {
            if (res.code === 200) {
              this.$message.success('内部授权中，请等候')
              this.fetchData()
            }
          }).catch(() => {
          })
          break
        case 'grantForRights':
          /* if (grantStatus !== 'pending') {
                        this.$message.warning('该授权任务授权状态无效，无法授予权限')
                        return
                    }
                    if (personnel.mainPostId !== assigneePost) {
                        this.$message.warning('非该用户职位任务，无法授予权限')
                        return
                    }*/
          // this.$refs.dialogGrant.show = true
          this.$confirm('您的操作将会授予处理人数据库访问权限，是否确认？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const params = {
              id: this.ruleFormGrant.id
            }
            grantForRights(params).then(res => {
              if (res.code === 200) {
                this.fetchData()
                this.$message.success('处理成功')
                this.$refs.dialogGrant.show = false
              }
            }).catch(() => {
            })
          }).catch(() => {})
          break
        case 'accessDB':
          if (personnel.id !== assignee) {
            this.$message.warning('非该用户下的授权任务，无法处理')
            return
          }
          /* if (grantStatus !== 'grant') {
                        this.$message.warning('无数据库访问权限，请申请授权')
                        return
                    }*/
          accessDB(params).then(res => {
            if (res.code === 200) {
              this.$message.success('跳转到访问数据库页面，请等候')
              this.$router.push({ name: 'accessDB', query: { id }})
            }
          }).catch(() => {
          })
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .authorize-manage {
    width: calc(100% - 20px);
    height: calc(100vh - 140px);
    overflow-y: auto;
    padding: 10px;
  }
</style>
