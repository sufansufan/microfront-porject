<template>
  <div class="post-info">
    <div v-if="!disabled">
      <el-button type="primary" @click="updatePost('add')">添加</el-button>
    </div>
    <el-table ref="tableRef" v-loading="loading" :data="tableData" row-key="id" border>
      <el-table-column type="index" width="48" label="序号" align="center" />
      <el-table-column prop="orgName" label="所属组织" align="center" width="320" />
      <el-table-column prop="postName" label="任职岗位" align="center" />
      <el-table-column prop="postStartDate" label="任职开始日期" align="center" width="120" />
      <el-table-column prop="postEndDate" label="任职结束日期" align="center" width="120" />
      <el-table-column prop="stateName" label="任职状态" align="center" width="120" />
      <el-table-column label="是否设为主岗" align="center" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isMainPostStatus"
            @change="switchChange(scope.row.id,scope.row.isMainPostStatus)"
          />
        </template>
      </el-table-column>
      <el-table-column v-if="!disabled" prop="name" label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="primary" @click="updatePost('edit', scope.row)">修改</el-button>
          <el-button type="danger" @click="deletePost(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <drag-dialog ref="dialog" :title="title" element-loading-background="rgba(0, 0, 0, 0.8)" width="50%" element-loading-spinner="el-icon-loading" element-loading-text="正在添加任职信息">
      <div class="explain">
        说明：第一次添加的任职岗位默认被设置为主岗岗位，如需更改，请在列表中设置
      </div>
      <el-form ref="ruleForm" :key="key" :rules="rules" :model="ruleForm" label-width="130px" class="ruleForm">
        <el-form-item label="所属组织" prop="orgId">
          <el-select v-model="ruleForm.orgId" clearable :disabled="disabled" placeholder="请选择所属组织" @change="changeOrgId">
            <el-option
              v-for="item in constant.levelOrganization"
              :key="item.id"
              :label="item.orgName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="任职岗位" prop="postId">
          <el-cascader
            v-model="ruleForm.postId"
            :options="allPostById"
            clearable
            :disabled="disabled"
            placeholder="请选择任职岗位"
            :props="{ expandTrigger: 'hover', value: 'id', label: 'postName', children: 'children',checkStrictly: true }"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="任职状态" prop="state">
          <el-select v-model="ruleForm.state" clearable :disabled="disabled" placeholder="请选择任职状态" @change="editStatus">
            <el-option
              v-for="item in constant.PersonnelPostState"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="任职开始日期" prop="postStartDate">
          <el-date-picker
            v-model="ruleForm.postStartDate"
            type="date"
            clearable
            placeholder="请选择任职开始日期"
            style="width: 100%"
            :picker-options="pickerOptionsStart"
          />
        </el-form-item>
        <el-form-item
          v-show="ruleForm.state === 'OUT'"
          label="任职结束日期"
          prop="postEndDate"
          :rules="[{
            required: ruleForm.state === 'OUT', message: '请选择任职结束日期', trigger: 'change' }
          ]"
        >
          <el-date-picker
            v-model="ruleForm.postEndDate"
            type="date"
            clearable
            placeholder="请选择任职结束日期"
            style="width: 100%"
            :picker-options="pickerOptionsEnd"
          />
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button type="primary" style="margin-top: 20px" @click="saveOrUpdateData()">确定</el-button>
      </template>
    </drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import { mapGetters } from 'vuex'
import { getPostList, saveEmployeePost, updateMainPost, deletePersonnelpost, updateEmployeePost, validationPostUnique } from '@core/api/personnelpost'
import { getPostsByOrg } from '@core/api/post'
import table from '@core/mixins/table'
import { parseTime } from '@core/utils'
export default {
  name: 'PostInfo',
  components: {
    DragDialog
  },
  mixins: [table],
  props: {
    disabled: {
      default: false,
      type: Boolean
    },
    personnelId: {
      default: '',
      type: String
    }
  },
  data() {
    const validatePostId = (rule, value, callback) => {
      this.checkPostId(value, callback)
    }
    return {
      pickerOptionsStart: {
        disabledDate: time => {
          const endDateVal = this.ruleForm.postEndDate
          if (endDateVal) {
            return (time.getTime() > new Date(endDateVal).getTime() - 1 * 24 * 60 * 60 * 1000)
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          const beginDateVal = this.ruleForm.postStartDate
          if (beginDateVal) {
            return (time.getTime() < new Date(beginDateVal).getTime() + 1 * 24 * 3600 * 1000)
          }
        }
      },
      loading: false,
      title: '',
      tableData: [],
      ruleForm: {
        orgId: '',
        orgName: '',
        postName: '',
        personnelId: '',
        state: 'IN',
        isMainPost: false,
        postStartDate: '',
        postEndDate: '',
        postId: []
      },
      rules: {
        orgId: [{ required: true, message: '请选择所属组织', trigger: 'change' }],
        postId: [{ required: true, validator: validatePostId, trigger: 'change' }],
        state: [{ required: true, message: '请选择任职状态', trigger: 'change' }],
        postStartDate: [{ required: true, message: '请选择任职开始日期', trigger: 'change' }]
      },
      allPostById: [],
      addOrEditType: '',
      editPostId: '',
      PostIdStatus: '',
      id: ''

    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  watch: {
    'ruleForm.orgId'(newV) {
      if (newV) {
        getPostsByOrg(this.ruleForm.orgId).then(({ data }) => {
          this.allPostById = data
        })
      }
    }

  },
  created() {
    this.$store.dispatch('getConstant', ['PersonnelPostState', 'allPost', 'levelOrganization', 'IsOrNot']).then(() => {
      if (this.personnelId) {
        this.fetchData()
      }
    })
  },
  methods: {
    changeOrgId() {
      this.ruleForm.postId = []
    },
    // 校验
    checkPostId(validatePostId, callback) {
      const { personnelId, id, ruleForm: { postId, orgId }} = this
      const singlePostId = postId[postId.length - 1]
      if (postId.length) {
        validationPostUnique(personnelId, singlePostId, orgId, id).then(({ data }) => {
          if (data) {
            callback(new Error('该岗位已被添加、请选择其他岗位'))
          } else {
            callback()
          }
        })
      } else {
        callback(new Error('请选择一条任职岗位'))
      }
    },
    fetchData() {
      this.loading = true
      getPostList(this.personnelId).then(({ data }) => {
        this.tableData = data
        this.loading = false
        this.tableData.map(item => {
          item.isMainPostStatus = item.isMainPost === 'OK'
          const stateName = this.constant.PersonnelPostState.filter(v => v.code === item.state)[0]
          if (stateName) {
            item.stateName = stateName.name
          } else {
            item.stateName = item.state
          }
          item.postStartDate = parseTime(item.postStartDate, 'y-m-d')
          item.postEndDate = parseTime(item.postEndDate, 'y-m-d')
          return item
        })
      })
    },
    saveOrUpdateData() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const { postId } = this.ruleForm
          const params = {
            Loading: true,
            ...this.ruleForm,
            personnelId: this.personnelId,
            postId: postId[postId.length - 1],
            cascadeParentId: postId.toString()
          }
          if (this.addOrEditType === 'add') {
            saveEmployeePost(params).then(({ code, message }) => {
              this.$message.success('添加成功!')
              this.$refs.dialog.show = false
              this.fetchData()
            })
          } else {
            updateEmployeePost(params, this.editPostId).then(({ code, message }) => {
              this.submitLoading = false
              this.$message.success('修改成功!')
              this.$refs.dialog.show = false
              this.fetchData()
            })
          }
        } else {
          return false
        }
      })
    },

    switchChange(id, status) {
      if (!status) {
        this.$message.warning('员工任职岗位有且必须有一个主岗')
      } else {
        this.$confirm('只能设置一个主岗岗位，继续设置当前岗位为主岗', '提示', {
          confirmButtonText: '继续',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateMainPost(id).then(res => {
            this.$message.success('设置成功')
            this.fetchData()
          })
        }).catch(() => {})
      }
    },
    deletePost(row) {
      if (row.state === 'IN') {
        this.$message.warning('该岗位在任，不可删除，如果要删除先卸任')
        return
      }
      this.$confirm('请确认是否要删除这些数据，一旦删除将无法恢复！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        deletePersonnelpost(row.id).then(res => {
          this.$message.success('删除成功!')
          this.fetchData()
        })
      }).catch(() => {})
    },
    updatePost(type, row) {
      this.id = row ? row.id : ''
      this.addOrEditType = type
      if (type === 'edit') {
        this.title = '修改任职信息'
        const { orgId, personnelId, state, isMainPost, postStartDate, postEndDate, cascadeParentId } = JSON.parse(JSON.stringify(row))
        this.ruleForm = {
          orgId,
          postId: cascadeParentId && cascadeParentId.split(','),
          personnelId,
          state,
          isMainPost,
          postStartDate: postStartDate,
          postEndDate: postEndDate
        }
        this.editPostId = row.id
      } else {
        this.title = '添加任职信息'
        this.ruleForm = { ...this.deepRuleForm }
      }
      this.key += 1
      this.$refs.dialog.show = true
    },
    // 修改员工在职状态
    editStatus() {
      this.ruleForm.postEndDate = ''
    }
  }
}
</script>

<style lang="less" scoped>
.post-info {
  & > div {
    &:first-child {
      margin-bottom: 10px;
    }
  }
  .ruleForm {
    display: flex;
    flex-wrap: wrap;
    & > .el-form-item {
      width: 50%;
    }
    .el-select {
      width: 100%;
    }
  }
  .explain {
    color: #999;
    line-height: 25px;
    margin-left: 30px;
  }
  footer{
    margin-top: 20px;
  }
}
</style>
