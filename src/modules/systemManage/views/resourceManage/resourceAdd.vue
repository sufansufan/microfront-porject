<template>
  <div class="resorce-add">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="resorce-form">
      <el-form-item label="编号" prop="code">
        <el-input v-model="ruleForm.code" placeholder="请输入编号" />
      </el-form-item>
      <el-form-item label="资源名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入资源名称" />
      </el-form-item>
      <el-form-item label="资源类型" prop="type">
        <el-radio-group v-model="ruleForm.type">
          <el-radio v-for="item in constant.AR_RM_ResourceType" :key="item.id" :label="item.code">{{ item.name }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="域名" prop="domainUrl">
        <el-input v-model="ruleForm.domainUrl" placeholder="请输入域名" />
      </el-form-item>
      <el-form-item label="是否需要二次验证" prop="isNeedVerificationAgain">
        <el-switch v-model="ruleForm.isNeedVerificationAgain" />
      </el-form-item>
      <el-form-item label="是否项目资源" prop="isProjectPost">
        <el-switch v-model="ruleForm.isProjectPost" />
      </el-form-item>
      <el-form-item v-if="typeShow === 'app' || typeShow === 'menu'" label="图标">
        <div class="upload-frame">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
          >
            <img v-if="ruleForm.icon" :src="ruleForm.icon" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item v-if="typeShow === 'app' || typeShow === 'menu'" />
      <el-form-item v-if="typeShow !== null && typeShow !== 'btn' " label="显示顺序" prop="sequenceNumber">
        <el-input v-model.number="ruleForm.sequenceNumber" placeholder="请输入显示顺序" />
      </el-form-item>
      <el-form-item v-if="typeShow !== null && typeShow !== 'btn'" label="是否APP显示" prop="isAppDisplay">
        <el-switch v-model="ruleForm.isAppDisplay" />
      </el-form-item>
      <template v-if="typeShow !== 'app' && typeShow !== null">
        <el-form-item label="所属应用" prop="application" :rules="[ {required: ruleForm.type !=='app', message: '请选择所属应用', trigger: 'change'}]">
          <el-select v-model="ruleForm.application" placeholder="请选择所属应用" @change="applicationChanage">
            <el-option
              v-for="item in constant.applicationList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属菜单/报表" placeholder="请选择所属菜单/报表">
          <el-cascader
            v-model="ruleForm.menu"
            :options="menuList"
            style="width: 100%"
            :props="defaultProps"
          />
        </el-form-item>
        <el-form-item label="路由" :rules="[ {required: ruleForm.type !=='app', message: '请输入路由', trigger: 'blur'}]" prop="routeUrl">
          <el-input v-model="ruleForm.routeUrl" placeholder="请输入路由" />
        </el-form-item>
        <el-form-item label="参数">
          <el-input v-model="ruleForm.routeParams" placeholder="请输入参数" />
        </el-form-item>
      </template>
      <template v-if="typeShow === 'btn'">
        <el-form-item label="接口">
          <el-input v-model="ruleForm.url" placeholder="请输入接口" />
        </el-form-item>
        <el-form-item label="接口参数">
          <el-input v-model="ruleForm.params" placeholder="请输入接口参数" />
        </el-form-item>
        <el-form-item label="接口请求类型">
          <el-input v-model="ruleForm.requestType" placeholder="请输入接口请求类型" />
        </el-form-item>
      </template>
      <template v-if="typeShow !=='app' && typeShow !== null">
        <el-form-item label="权限点">
          <el-input v-model="ruleForm.permissions" placeholder="请输入权限点" />
        </el-form-item>
        <template v-if="typeShow === 'btn'">
          <el-form-item label="是否继承菜单/报表的过滤器">
            <el-switch v-model="ruleForm.isInherit" />
          </el-form-item>
        </template>
        <template v-if="!ruleForm.isInherit || typeShow !== 'btn'">
          <el-form-item label="是否存在数据过滤器">
            <el-switch v-model="ruleForm.isFilter" />
          </el-form-item>
        </template>
      </template>
      <el-form-item v-if="typeShow !== null" label="说明" class="full-width">
        <el-input v-model="ruleForm.remark" type="textarea" placeholder="请输入说明" />
      </el-form-item>
      <template v-if="ruleForm.isFilter">
        <el-form-item label="数据过滤器" class="full-width">
          <div class="filter-add">
            <el-button type="primary" @click="filterDialog('add')">添加</el-button>
          </div>
          <el-table ref="tableRef" :data="tableData" row-key="id" border>
            <el-table-column prop="hibernateFilter" label="hibernateFilter" align="center" width="150" />
            <el-table-column prop="name" label="名称" align="center" />
            <el-table-column prop="params" align="center" label="参数" width="300" />
            <el-table-column prop="componentFilters" label="页面组件过滤" align="center" width="300" />
            <el-table-column prop="isDefaultName" label="是否默认" align="center" />
            <el-table-column prop="isProjectPostName" label="是否项目可见" align="center" />
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="primary" @click="filterDialog('edit', scope.$index, scope.row)">修改</el-button>
                <el-button type="danger" @click="filterDelete(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </template>
      <div class="btn">
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </div>
    </el-form>
    <drag-dialog ref="dialog" title="添加数据过滤器" width="40%">
      <el-form ref="dialogForm" :model="dialogForm" :rules="dialogFormRules" label-width="115px" class="dialog-form">
        <el-form-item label="名称" prop="name">
          <el-input v-model="dialogForm.name" />
        </el-form-item>
        <el-form-item label="hibernateFilter" prop="hibernateFilter">
          <el-input v-model="dialogForm.hibernateFilter" />
        </el-form-item>
        <el-form-item label="参数" class="full-width">
          <el-input v-model="dialogForm.params" type="textarea" />
        </el-form-item>
        <el-form-item label="页面组件过滤器" class="full-width">
          <el-input v-model="dialogForm.componentFilters" type="textarea" />
        </el-form-item>
        <el-form-item label="是否默认">
          <el-switch v-model="dialogForm.isDefault" />
        </el-form-item>
        <el-form-item label="是否项目可见">
          <el-switch v-model="dialogForm.isProjectPost" />
        </el-form-item>
        <el-form-item label="说明" class="full-width">
          <el-input v-model="dialogForm.remark" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="dialogSubmit">确定</el-button>
      </div>
    </drag-dialog>
  </div>
</template>
<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import upload from '@core/mixins/upload'
import { addResource, getResourceData, getSingleResource, updateResource, getFilterData } from '@core/api/authResourcegc'
import { booleanChangeString } from '@core/utils'
import { mapGetters } from 'vuex'
export default {
  components: {
    DragDialog
  },
  mixins: [upload],
  data() {
    return {
      ruleForm: {
        code: '',
        name: '',
        type: '',
        domainUrl: '',
        isNeedVerificationAgain: false,
        isProjectPost: false,
        icon: '../../../assets/application/projectCostManager/projectCostManager.png',
        sequenceNumber: '',
        isAppDisplay: false,
        application: '',
        menu: [],
        routeUrl: '',
        routeParams: '',
        url: '',
        params: '',
        requestType: '',
        permissions: '',
        isInherit: true,
        isFilter: false,
        remark: '',
        parentId: ''
      },
      menuList: [],
      dialogForm: {
        name: '',
        hibernateFilter: '',
        params: '',
        componentFilters: '',
        isDefault: false,
        isProjectPost: false,
        remark: ''
      },
      deepDialogForm: {},
      typeShow: null,
      tableData: [],
      filterIndex: null,
      isId: '',
      defaultProps: {
        children: 'child',
        label: 'name',
        value: 'id',
        checkStrictly: true
      },
      rules: {
        code: [{ required: true, message: '请输入编号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入资源名称', trigger: 'blur' }],
        type: [{ required: true, message: '请输入资源类型', trigger: 'change' }],
        domainUrl: [{ required: true, message: '请输入域名', trigger: 'change' }],
        sequenceNumber: [
          { required: true, message: '请输入显示顺序' },
          { type: 'number', message: '显示顺序必须是数字' }
        ]
      },
      dialogFormRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        hibernateFilter: [{ required: true, message: '请输入hibernateFilter', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  watch: {
    'ruleForm.type'() {
      this.typeShow = this.ruleForm.type
      if (this.ruleForm.type === 'app') {
        this.ruleForm.isFilter = false
      }
      if (this.isId) return
      this.ruleForm.isFilter = false
    },
    'ruleForm.isInherit'(o) {
      if (!o) {
        if (this.isId) return
        this.ruleForm.isFilter = false
      }
    }
  },
  created() {
    this.$store.dispatch('getConstant', ['AR_RM_ResourceType', 'applicationList'])
    this.deepDialogForm = JSON.parse(JSON.stringify(this.deepDialogForm))
    const query = this.$route.query
    this.isId = Object.prototype.hasOwnProperty.call(query, 'id')
    if (this.isId) {
      this.fetchSingleData(query.id)
      this.filterData(query.id)
    }
  },
  methods: {
    fetchSingleData(id) {
      getSingleResource(id).then(({ data }) => {
        const { code, name, type, domainUrl, isNeedVerificationAgain, isProjectPost, icon, sequenceNumber, isAppDisplay, routeUrl, routeParams, url, params, requestType, permissions, isInherit, isFilter, remark, parentId, parentPath, id } = data
        this.ruleForm = {
          code, name, type, domainUrl, isNeedVerificationAgain, isProjectPost, icon, sequenceNumber, isAppDisplay, routeUrl, routeParams, url, params, requestType, permissions, isInherit, isFilter, remark, parentId, id
        }
        for (const key in this.ruleForm) {
          if (key !== 'sequenceNumber') {
            if (this.ruleForm[key] === 0) {
              this.ruleForm[key] = false
            } else if (this.ruleForm[key] === 1) {
              this.ruleForm[key] = true
            }
          }
        }
        const parentArray = parentPath.split(',')
        if (parentArray.length > 1) {
          this.ruleForm.menu = parentArray
          this.ruleForm.application = parentArray[0]
        } else {
          this.ruleForm.application = parentArray[0]
        }
        this.applicationChanage(parentArray[0])
      })
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        const { application, menu, type, isInherit } = this.ruleForm
        const params = {
          Loading: true,
          ...this.ruleForm,
          parentId: menu[menu.length - 1] || application,
          parentPath: menu.length ? menu.toString() : application,
          dataFilterDTOList: this.tableData
        }
        delete params.application
        delete params.menu
        params.dataFilterDTOList.map(item => {
          item = booleanChangeString(item)
          delete item.isDefaultName
          delete item.isProjectPostName
          return item
        })
        if (type === 'app' || isInherit === true) {
          params.dataFilterDTOList = []
        }
        if (valid) {
          if (this.isId) {
            updateResource(booleanChangeString(params), params.id).then(() => {
              this.$message.success('修改成功')
              this.$router.go(-1)
            })
          } else {
            addResource(booleanChangeString(params)).then(res => {
              this.$message.success('新增成功')
              this.$router.go(-1)
            })
          }
        } else {
          return false
        }
      })
    },
    applicationChanage(id) {
      getResourceData({ appId: id }).then(({ data }) => {
        this.menuList = data
      })
    },
    dialogSubmit() {
      typeof (this.filterIndex) === 'number' ? this.$set(this.tableData, this.filterIndex, this.dialogForm) : this.tableData.push(this.dialogForm)
      this.tableData.map(item => {
        item.isDefaultName = item.isDefault ? '是' : '否'
        item.isProjectPostName = item.isProjectPost ? '是' : '否'
      })
      this.$refs.dialog.show = false
    },
    filterDialog(type, index, row) {
      if (type === 'edit') {
        this.dialogForm = JSON.parse(JSON.stringify(row))
        this.filterIndex = index
      } else {
        this.filterIndex = null
        this.dialogForm = JSON.parse(JSON.stringify(this.deepDialogForm))
      }
      this.$refs.dialog.show = true
    },
    filterDelete(index) {
      this.$confirm('此操作将会删除数据过滤器', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const data = JSON.parse(JSON.stringify(this.tableData))
        data.splice(index, 1)
        this.tableData = data
        this.$message.success('删除成功!')
      }).catch(action => {
        this.$message.info('已取消')
      })
    },
    filterData(id) {
      getFilterData({ resourceId: id }).then(({ data }) => {
        this.tableData = data
        this.tableData.map(item => {
          item.isDefaultName = item.isDefault ? '是' : '否'
          item.isProjectPostName = item.isProjectPost ? '是' : '否'
        })
      })
    }

  }
}
</script>

<style lang="less" scoped>
.resorce-add {
  padding: 20px;
  height: calc(100vh - 160px);
  overflow-y: auto;
  .resorce-form, .dialog-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-form-item {
      width: 49%;
      &.full-width {
        width: 100%;
      }
      .el-select {
        width: 100%;
      }
    }
    .filter-add {
      margin-bottom: 20px;
    }
    .btn {
      width: 100%;
      text-align: center;
      margin-top: 20px;
    }
  }

}
</style>
<style lang="less">
.resorce-add {
  .upload-frame {
    .avatar-uploader .el-upload {
      display: inline-block
    }
  }
}
</style>
