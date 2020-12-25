<template>
  <div class="list">
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>企业名称</span>
          <el-input v-model.trim="search.name" clearable placeholder="请输入企业名称" class="fill-line" @keyup.enter.native="keyupSearch" />
        </div>
        <template v-if="lwfb">
          <div class="fill-name">
            <span>经营模式</span>
            <el-select v-model.trim="search.managementModel" clearable placeholder="请选择经营模式" class="fill-line" @keyup.enter.native="keyupSearch">
              <el-option v-for="item in constant.managementModel" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </div>
          <div class="fill-name">
            <!-- 主营产品分类暂无数据  managementModelw 需要修改-->
            <span>主营产品分类</span>
            <el-select v-model.trim="search.mainProducts" clearable placeholder="请选择主营产品类别" class="fill-line" @keyup.enter.native="keyupSearch">
              <el-option v-for="item in constant.managementModelw" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </div>
          <div class="fill-name">
            <span>加工定制</span>
            <el-select v-model.trim="search.machining" clearable placeholder="请选择加工定制" class="fill-line" @keyup.enter.native="keyupSearch">
              <el-option v-for="item in isMachining" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </div>
        </template>
        <template v-if="clgy">
          <div class="fill-name">
            <span>主项资质</span>
            <el-cascader
              v-model.trim="search.qualificationCategory"
              style="width:100%"
              clearable
              placeholder="请选择主项资质"
              :options="constant.quaCategory"
              :props="{ expandTrigger: 'hover', value: 'code', label: 'name', }"
            />
            <!-- <el-cascader
              v-model.trim="search.qualificationCategory"
              placeholder="请选择主项资质"
              clearable
              :options="constant.quaCategory"
              :props="{ expandTrigger: 'hover', value: 'id', label: 'name', children: 'childs', checkStrictly: true }"
              style="width:100%"
            /> -->
          </div>
        </template>
        <div class="fill-name">
          <span>注册地</span>
          <el-cascader
            v-model.trim="search.registeredPlace"
            placeholder="请选择注册地"
            clearable
            :options="constant.nativePlace"
            :props="{ expandTrigger: 'hover', value: 'id', label: 'zh', children: 'children', checkStrictly: true }"
            style="width:100%"
            @keyup.enter.native="keyupSearch"
          />
        </div>
        <div class="fill-name">
          <span>联系人</span>
          <el-input v-model.trim="search.contacts" clearable placeholder="请输入联系人" class="fill-line" @keyup.enter.native="keyupSearch" />
        </div>
        <div class="fill-name">
          <span>首次合作日期</span>
          <el-date-picker
            v-model="search.firstDate"
            clearable
            style="width:100%"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @keyup.enter.native="keyupSearch"
          />
        </div>
        <template v-if="lwfb || jzzs">
          <div class="fill-name">
            <span>注册企业</span>
            <el-select v-model.trim="search.registerCompany" clearable placeholder="请选择注册企业" class="fill-line" @keyup.enter.native="keyupSearch">
              <el-option v-for="item in isRegister" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </div>
          <div class="fill-name">
            <span>合作类型</span>
            <el-select v-model.trim="search.cooperateType" clearable placeholder="请选择合作类型" class="fill-line" @keyup.enter.native="keyupSearch">
              <el-option v-for="item in cooperateType" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </div>
        </template>
        <div class="fill-name">
          <span>归属单位</span>
          <el-select v-model.trim="search.belongOrganizationId" clearable placeholder="请选择归属单位" class="fill-line" @keyup.enter.native="keyupSearch">
            <el-option v-for="item in organizationList" :key="item.id" :label="item.orgName" :value="item.id" />
          </el-select>
        </div>
        <div class="fill-name">
          <span>状态</span>
          <el-select v-model.trim="search.state" placeholder="请选择状态" clearable class="fill-line" @keyup.enter.native="keyupSearch">
            <el-option v-for="item in stateData" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </div>
        <div>
          <div>
            <el-button type="primary" icon="el-icon-search" @click="fetchData('query')">查询</el-button>
          </div>
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button-group>
            <el-button type="primary" @click="HOJump('add') "><i class="iconfont icon-xinzeng1-copy" /> 新增</el-button>
            <el-button type="primary" @click="HOJump('edit')"><i class="iconfont icon-xiugai-copy" /> 修改</el-button>
            <el-button type="primary" @click="deleteCompany"><i class="iconfont icon-icon7-copy" /> 删除</el-button>
          </el-button-group>
          <template v-if="lwfb || jzzs">
            <el-button-group>
              <el-button type="primary" @click="inviteCooperationClick"><i class="iconfont icon-hezuo" /> 邀请合作</el-button>
              <el-button type="primary" @click="updateMes"><i class="iconfont icon-shuaxin1-copy" /> 更新信息</el-button>
              <el-button type="primary" @click="stopHandle"><i class="iconfont icon-zhongzhihezuo" /> 终止合作</el-button>
            </el-button-group>
          </template>
          <el-button-group>
            <el-button type="primary" @click="stopCompany"><i class="iconfont icon-tingyong-copy" /> 停用</el-button>
            <el-button type="primary" @click="returnCompany"><i class="iconfont icon-huifu" /> 恢复</el-button>
          </el-button-group>
          <el-button-group>
            <el-button type="primary" @click="HOJump('import')"><i class="iconfont icon-daoru-copy" /> 导入</el-button>
            <el-button type="primary" @click="companyExport"><i class="iconfont icon-daochu-copy" /> 导出</el-button>
          </el-button-group>
        </div>
        <div>
          <el-button type="primary" @click="$router.push({name:'applicationConfig'})"><i class="iconfont icon-weihu" /> 合作企业类型维护</el-button>
        </div>
      </div>
    </div>
    <div class="material-table">
      <el-table ref="tableRef" v-loading="loading" :data="tableData" width="100%" row-key="id" border :default-sort="defaultSort" max-height="calc(100vh - 400px)" @selection-change="handleSelectionChange" @sort-change="sortTable">
        <el-table-column type="selection" width="40" />
        <el-table-column type="index" width="48" label="序号" align="center" />
        <el-table-column prop="unitNumber" label="编号" sortable="custom" width="160" align="center" :show-overflow-tooltip="true" />
        <el-table-column prop="name" label="企业名称" align="left" header-align="center" width="320" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span
              class="table-click-color one-ellipsis"
              @click="$router.push({name: 'enterpriseView', query: {view:'details', id: scope.row.id, organizationList: organizationList,code:codeList
              }})"
            >{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <template v-if="clgy">
          <el-table-column prop="qualificationCategory" label="主项资质" align="center" :show-overflow-tooltip="true" />
        </template>
        <template v-if="lwfb">
          <el-table-column prop="managementModel" label="经营模式" align="center" :show-overflow-tooltip="true" />
          <el-table-column prop="mainProducts" label="主营产品类别" align="center" width="120" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span class="table-click-color one-ellipsis" @click="$router.push({name: 'inviteFeedback'})">{{ scope.row.mainProducts }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="machining" label="加工定制" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.machining === true? '是' : '否' }}</span>

            </template>
          </el-table-column>
        </template>
        <el-table-column prop="registeredPlace" label="注册地" align="center" width="320" :show-overflow-tooltip="true" />
        <el-table-column prop="officeAddress" label="办公地址" align="center" width="320" :show-overflow-tooltip="true" />
        <el-table-column prop="contacts" label="联系人" align="center" width="120" :show-overflow-tooltip="true" />
        <el-table-column prop="contactPhone" label="联系电话" align="center" width="160" />
        <el-table-column prop="firstDate" label="首次合作日期" sortable="custom" width="150" align="center" />
        <el-table-column prop="belongOrganizationName" label="归属单位" align="center" width="120" :show-overflow-tooltip="true" />
        <el-table-column prop="sign" label="签订合同" align="center" :show-overflow-tooltip="true" min-width="100">
          <template slot-scope="scope">
            <span class="table-click-color" @click="$router.push({name: 'enterpriseView', query: {type:'view', sign: scope.row.sign}})">{{ scope.row.sign }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cooperation" label="合作项目" align="center" :show-overflow-tooltip="true" min-width="100">
          <template slot-scope="scope">
            <span class="table-click-color" @click="$router.push({name: 'enterpriseView', query: {type:'view', cooperation: scope.row.cooperation}})">{{ scope.row.cooperation }}</span>
          </template>
        </el-table-column>
        <template v-if="lwfb || jzzs">
          <el-table-column prop="companyId" label="注册企业" sortable="custom" align="center" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.companyId === '' || scope.row.companyId === null ? '否' : '是' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="cooperateType" label="合作类型" sortable="custom" align="center" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.cooperateType=='0'?'线上':(scope.row.cooperateType=='1'?'线下':'') }}</span>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="state" label="状态" sortable="custom" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.state == '01'?'正常':(scope.row.state=='02'?'停用':'终止') }}</span>
          </template>
        </el-table-column>
        <template v-if="lwfb || jzzs">
          <el-table-column prop="name" label="历史操作记录" align="center" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="viewHistory(scope)">查看</el-button>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-show="count"
        ref="pagination"
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
    <drag-dialog ref="invite" title="邀请已有企业合作" width="60%">
      <invite-cooperation :multiple-selection="multipleSelection" :organization-d-t-o="organizationDTO" @dialog="submit" />
    </drag-dialog>
    <drag-dialog ref="update" title="更新信息" width="45%">
      <el-form ref="updateRuleForm" :key="key" :rules="rules" :model="updateRuleForm" label-width="110px" class="ruleForm">
        <el-form-item label="企业名称" prop="inviteCompanyName" class="fill-name">
          <el-input v-model.trim="updateRuleForm.inviteCompanyName" type="textarea" clearable placeholder="请输入企业名称" :disabled="true" />
          <p>确定邀请以上企业吗？确定后完善信息，对方同意后即可更新信息</p>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button type="primary" @click="updateData()">确定</el-button>
      </template>
    </drag-dialog>
    <drag-dialog ref="stop" title="终止合作信息" width="45%">
      <el-form ref="stopRuleForm" :key="key" :rules="rules" :model="stopRuleForm" label-width="110px" class="ruleForm">
        <el-form-item label="企业名称" prop="inviteCompanyName" class="fill-name">
          <el-input v-model.trim="stopRuleForm.inviteCompanyName" :disabled="true" type="textarea" clearable placeholder="请输入企业名称" />
        </el-form-item>
        <el-form-item label="归属单位" prop="organizationName" class="fill-name">
          <el-select v-model="stopRuleForm.organizationName" :disabled="true" placeholder="请选择归属单位">
            <el-option v-for="item in organizationList" :key="item.id" :label="item.orgName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="终止理由" prop="reason" class="fill-name">
          <el-input v-model.trim="stopRuleForm.reason" show-word-limit type="textarea" maxlength="200" clearable placeholder="请输入终止理由" />
        </el-form-item>
        <el-form-item label="备注" prop="remark" class="fill-name">
          <el-input v-model.trim="stopRuleForm.remark" show-word-limit maxlength="200" type="textarea" clearable placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button type="primary" @click="stopData()">确定</el-button>
      </template>
    </drag-dialog>
  </div>
</template>

<script>
import pagination from '@core/mixins/pagination'
import table from '@core/mixins/table'
import keyup from '@core/mixins/keyup'
import DragDialog from '@frames/dashboard/components/Dialog'
import { mapGetters } from 'vuex'
import InviteCooperation from './InviteCooperation'
import { getBusinessList, deleteBusiness, stopBusiness, returnBusiness } from '@core/api/cooperativeEnterprise/companyinfo'
import { stopCooperate, history } from '@core/api/cooperativeEnterprise/operateinfo'
import { getOrganization, getCompany } from '@core/api/organization'
import { getUserInfo } from '@core/api/personnel'
import { exportCompanyInfo } from '@core/api/cooperativeEnterprise/export'
import { exportExcel, codeChangeName, getUuid } from '@core/utils'
import { setSessionStorage, getSessionStorage } from '@core/utils/auth'
export default {
  components: {
    DragDialog,
    InviteCooperation
  },
  mixins: [pagination, table, keyup],
  data() {
    return {
      stateData: [],
      clgy: true,
      lwfb: true,
      qtqy: true,
      jzzs: false,

      count: null,
      search: {
        name: '',
        managementModel: '',
        mainProducts: '',
        machining: '',
        qualificationCategory: [],
        registeredPlace: [],
        contacts: '',
        firstDate: '',
        registerCompany: '',
        cooperateType: '',
        belongOrganizationId: '',
        state: ''
      },
      loading: true,
      updateRuleForm: {
        inviteCompanyName: ''
      },
      tableData: [],
      stopRuleForm: {
        inviteCompanyName: '',
        organizationName: '',
        reason: ''
      },
      rules: {
        reason: [{ required: true, message: '请输入终止理由 ', trigger: 'blur' }]
      },
      organizationList: [],
      isRegister: [
        { code: true, name: '是' },
        { code: false, name: '否' }],
      isMachining: [
        { code: true, name: '是' },
        { code: false, name: '否' }],
      cooperateType: [
        { code: '0', name: '线上' },
        { code: '1', name: '线下' }],
      Allcompany: {
        company: {},
        subCompany: {}
      },
      organization: {},
      codeList: '',
      organizationDTO: {},
      businessName: '',
      place: '',
      updateDataList: [],
      defaultSort: {
        prop: 'firstDate',
        order: 'descending'
      },
      paginationFlag: true
    }
  },
  computed: {
    ...mapGetters(['constant', 'cooperMenuName'])
  },
  watch: {
    '$route.fullPath': {
      handler() {
        this.$store.dispatch('getConstant', 'CooperativeUnitState').then(() => {
          this.handlerMenuFetchData()
        })
      },
      immediate: true,
      deep: true
    }
  },

  created() {
    this.$store.dispatch('getConstant', ['enterpriseNature', 'jzzs_cooperateunit', 'clgy_cooperateunit', 'qtqy_cooperateunit', 'nativePlace', 'taxpayerType', 'managementModel', 'quaCategory', 'CooperativeUnitState']).then(() => {
      this.constant.quaCategory = this.constant.quaCategory.map(item => {
        item.children = [{
          code: '01',
          name: '一级'
        }, {
          code: '02',
          name: '二级'
        }, {
          code: '03',
          name: '不分等级'
        }]
        return item
      })
    })
    this.getUserOrg()
    this.getCompany()
    this.getloginMes()
  },
  methods: {
    handlerMenuFetchData() {
      var { code } = this.$route.query
      const { mainBusiness } = JSON.parse(getSessionStorage('navInfo'))
      if (!code) {
        if (mainBusiness === 'CLGY') {
          code = this.constant.clgy_cooperateunit[0].code + ',' + this.constant.clgy_cooperateunit[0].childs[0].code
        } else if (mainBusiness === 'JZZS') {
          code = this.constant.jzzs_cooperateunit[0].code + ',' + this.constant.jzzs_cooperateunit[0].childs[0].code
        } else {
          code = this.constant.qtqy_cooperateunit[0].code + ',' + this.constant.qtqy_cooperateunit[0].childs[0].code
        }
      }
      this.codeList = code.split(',')
      if (this.codeList[1] === 'CLGY') {
        this.clgy = false
        this.stateData = this.constant.CooperativeUnitState
      } else if (this.codeList[1] === 'LWFB') {
        this.lwfb = false
        this.stateData = this.constant.CooperativeUnitState.filter(item => {
          return item.code !== '03'
        })
      } else if (this.codeList[1] === 'JZZS') {
        this.clgy = false
        this.lwfb = false
        this.jzzs = true
        this.stateData = this.constant.CooperativeUnitState
      } else if (this.codeList[1] !== 'CLGY' && this.codeList[1] !== 'LWFB' && this.codeList[1] !== 'JZZS') {
        this.stateData = this.constant.CooperativeUnitState.filter(item => {
          return item.code !== '03'
        })
        this.clgy = false
        this.lwfb = false
      } else {
        return
      }
      this.fetchData(1)
    },
    companyExport() {
      const { code } = this.$route.query
      /* eslint-disable */
      const [one, two] = code.split(',')
      var exportName = ''
      switch (two) {
        case 'CLGY':
          exportName = '材料供应'
          break
        case 'LWFB':
          exportName = '劳务分包'
          break
        case 'JZZS':
          exportName = '建筑装饰'
          break
        default:
          exportName = '其他企业'
          break
      }
      exportCompanyInfo(this.params).then(res => {
        exportExcel(res, `合作企业_${exportName}.xls`)
      })
    },
    getCompany() {
      getCompany().then(({ data }) => {
        const { company, subCompany } = data
        this.Allcompany = {
          company: company,
          subCompany: subCompany
        }
      })
    },
    submit() {
      this.$refs.invite.show = false
    },
    getUserOrg() {
      getOrganization().then(({ data }) => {
        const {id,orgName,orgType,creditCode}=data
        this.organization = data
        this.organizationList.push(data)
         setSessionStorage('userOrgId',id)
         setSessionStorage('creditCode',creditCode)
         setSessionStorage('userOrgName', orgName)
         setSessionStorage('userOrgType',orgType)
         setSessionStorage('userOrg', JSON.stringify(data))

      })
    },
    stopCompany() {
      if (this.codeList[1] === 'JZZS' || this.codeList[1] === 'CLGY') {
        // jzzs/clgy只能停用合作类型为“线下”且状态为“正常”的合作企业；其他类型的企业只能停止状态为“正常”的合作企业；
        if (this.multipleSelection && this.multipleSelection.length > 0) {
          var stopflag = this.multipleSelection.some(item => {
            return item.cooperateType === '1' && item.state === '01'
          })
          if (!stopflag) {
            this.$message.warning('请选择线下且状态正常的企业')
          } else {
            this.$confirm('此操作将停用选中企业？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              const ids = this.multipleSelection.map(v => v.id)
              stopBusiness(ids).then(res => {
                this.$message.success('停用成功!')
                this.fetchData()
              })
            }).catch(() => {
              this.$message.info('已取消停用')
            })
          }
        } else {
          this.$message.warning('请选择一条数据')
        }
      } else {
        if (this.multipleSelection && this.multipleSelection.length > 0) {
          var otherstopflag = this.multipleSelection.some(item => {
            return item.state === '02' || item.state === '03'
          })
          if (otherstopflag) {
            this.$message.warning('请选择状态正常的企业')
          } else {
            this.$confirm('此操作将停用选中企业？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              const ids = this.multipleSelection.map(v => v.id)
              stopBusiness(ids).then(res => {
                this.$message.success('停用成功!')
                this.fetchData()
              })
            }).catch(() => {
              this.$message.info('已取消停用')
            })
          }
        } else {
          this.$message.warning('请选择一条数据')
        }
      }
    },
    returnCompany() {
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        var flag = this.multipleSelection.some(item => {
          return item.state === '01' || item.state === '03'
        })
        if (flag) {
          this.$message.warning('请选择状态停用的企业')
        } else {
          this.$confirm('此操作将恢复选中企业？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const ids = this.multipleSelection.map(v => v.id)
            returnBusiness(ids).then(res => {
              this.$message.success('恢复成功!')
              this.fetchData()
            })
          }).catch(() => {
            this.$message.info('已取消恢复')
          })
        }
      } else {
        this.$message.warning('请选择一条数据')
      }
    },
    deleteCompany() {
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        var flag = this.multipleSelection.some(item => {
          return item.state === '01' || item.state === '03'
        })
        if (flag) {
          this.$message.warning('请选择状态停用的企业')
        } else {
          this.$confirm('此操作将删除选中企业？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const ids = this.multipleSelection.map(v => v.id)
            deleteBusiness(ids).then(res => {
              this.$message.success('删除成功!')
              this.fetchData()
            })
          }).catch(() => {
            this.$message.info('已取消删除')
          })
        }
      } else {
        this.$message.warning('请选择一条数据')
      }
    },
    inviteCooperationClick() {
      // 只能邀请合作类型为“线下”且状态为“正常” 和“线上”且状态为“终止”  的合作企业
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        var inviteDown = this.multipleSelection.every(item => {
          return item.cooperateType === '1' && item.state === '01'
        })
        var inviteUp = this.multipleSelection.every(item => {
          return item.cooperateType === '0' && item.state === '03'
        })
        if (inviteDown || inviteUp) {
          var isRegister = this.multipleSelection.every(item => {
            return item.companyId === null || item.companyId === ''
          })
          var notRegister = this.multipleSelection.every(item => {
            return item.companyId !== null || item.companyId !== ''
          })
          if (isRegister || notRegister) {
            this.$refs.invite.show = true
          } else {
            this.$message.warning('一次只能邀请注册企业同为“是”或“否”的企业')
          }
        } else {
          this.$message.warning('请选择线下且状态正常的企业或线上且状态终止的企业')
        }
      } else {
        this.$message.warning('请选择一条数据')
      }
    },
    updateMes() {
      // 只能更新合作类型为“线上”且状态为“正常”的合作企业 注册企业为是的时候
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        this.updateDataList = this.multipleSelection[0]
        var update = this.multipleSelection.every(item => {
          return item.cooperateType === '0' && item.state === '01'
        })
        const registered = this.multipleSelection.every(item => {
          return item.companyId
        })
        if (!update) {
          this.$message.warning('请选择线上且状态正常的企业')
        } else {
          if(registered){
            this.$refs.update.show = true
            this.updateRuleForm.inviteCompanyName = this.multipleSelection.map(item => {
              return `${item.name}(${item.registeredPlace})`
            }).join('，')
          }else{
            this.$message.warning('非注册企业无法更新信息')
          }
        }

      } else {
        this.$message.warning('请选择一条数据')
      }
    },
    stopData() {
      this.$refs.stopRuleForm.validate(valid => {
        if (valid) {
          const { companyId, name, informationCode } = this.multipleSelection[0]
          const { establishmentDate, id, creditCode, legalPersonName, registeredPlace, registeredCapital, unitNature, officeAddress,orgName,orgType } =JSON.parse(getSessionStorage('userOrg'))
          const { name: personnelName, telephone: personnelPhone, id: personnelId } = JSON.parse(getSessionStorage('personnel'))
          const params = {
            acceptCompanyId: companyId,
            acceptCompanyName: name,
            acceptInformationCode: informationCode,
            establishmentDate: establishmentDate,
            informationCode: creditCode,
            inviteCompanyName: this.organizationDTO.orgName,
            legal: legalPersonName,
            mainBusiness: this.organizationDTO.mainBusiness,
            officeAddress: officeAddress,
            organizationId: id,
            inviteUserId:personnelId,
            inviteUserName: personnelName,
            phone: personnelPhone,
            organizationName: orgName,
            organizationType: orgType,
            registerAddress: registeredPlace,
            registeredCapital: registeredCapital,
            reason: this.stopRuleForm.reason,
            unitNature: unitNature
          }
          stopCooperate([params]).then(() => {
            this.$message.success('操作成功')
            this.$refs.stop.show = false
          })
        } else {
          return false
        }
      })
    },
    updateData() {
      const creditCode = getSessionStorage('creditCode')
      const { belongOrganizationId } = this.updateDataList
      const {orgName,orgType}=JSON.parse(getSessionStorage('userOrg'))
      history(creditCode, belongOrganizationId).then((res) => {
        if (res.data !== null) {
          this.$router.push({ name: 'invitedEnterpriseAdd', query: { multipleSelection: this.multipleSelection[0], company: this.Allcompany.company, orgName: orgName, orgType: orgType, newsId: res.data.id,title:'更新信息',operaId: getUuid() }})
        } else {
          this.$router.push({ name: 'invitedEnterpriseAdd', query: { multipleSelection: this.multipleSelection[0], company: this.Allcompany.company, orgName: orgName, orgType: orgType,title:'更新信息',operaId: getUuid() }})
        }
      })
    },
    stopHandle() {
      // 只能终止合作类型为“线上”且状态为“正常”的合作企业
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        var stop = this.multipleSelection.every(item => {
          return item.cooperateType === '0' && item.state === '01'
        })
        if (!stop) {
          this.$message.warning('请选择线上且状态正常的企业')
        } else {
          this.$refs.stop.show = true
          this.stopRuleForm.inviteCompanyName = this.multipleSelection.map(item => {
            return `${item.name}(${item.registeredPlace})`
          }).join('，')
          this.stopRuleForm.organizationName = getSessionStorage('userOrgId')
        }
      } else {
        this.$message.warning('请选择一条数据')
      }
    },
    getloginMes() {
      getUserInfo().then(({ data }) => {
        this.organizationDTO = data.organizationDTO
      })
    },
    HOJump(type) {
      switch (type) {
        case 'add':
          this.$router.push({
            name: 'enterpriseAdd',
            query: {
              type,
              code: this.codeList,
              organizationList: this.organizationList
            }
          })
          break
        case 'edit':
          if (this.multipleSelection && this.multipleSelection.length > 0) {
            if (this.multipleSelection.length !== 1) {
              this.$message.warning('请选择一条数据')
              return
            }
            this.multipleSelection.forEach(item => {
              const cooperateType = item.cooperateType
              if (cooperateType === '1') {
                this.$router.push({
                  name: 'enterpriseEdit',
                  query: {
                    type:'edit',
                    id: this.multipleSelection[0]['id']
                  }
                })
              } else {
                this.$message.warning('请选择线下企业')
              }
            })
          } else {
            this.$message.warning('请选择一条数据')
          }
          break
        case 'import':
          this.$router.push({
            name: 'enterpriseImport',
            query: {
              code: this.codeList,
              organizationId: getSessionStorage('userOrgId'),
              orgName: getSessionStorage('userOrgName'),

            }
          })
          break
        default:
          break
      }
    },
    fetchData(sortData) {
      this.loading = true
      if (typeof sortData === 'string') {
        this.deepSearch = JSON.parse(JSON.stringify(this.search))
        this.page = 1
        this.size = 10
      }
      if(JSON.stringify(this.deepSearch) !== '{}'){
        this.search = JSON.parse(JSON.stringify(this.deepSearch))
      }

      const { page, size, search: { name, managementModel, mainProducts, machining, qualificationCategory, registeredPlace, contacts, firstDate, registerCompany, cooperateType, state,belongOrganizationId}} = this
      const { propertyName, ascending } = sortData || {}
      this.params = {
        page: page - 1,
        size,
        name,
        managementModel,
        mainProducts,
        machining,
        qualificationCategory: qualificationCategory.toString(),
        registeredPlace: registeredPlace.length ? registeredPlace[registeredPlace.length - 1] : '',
        contacts,
        firstDate: {
          after: firstDate ? firstDate[0] : '',
          before: firstDate ? firstDate[1] : ''
        },
        registerCompany: registerCompany ? true : null || null,
        notRegisterCompany: registerCompany === false ? true : null || null,
        cooperateType,
        belongOrganizationId,
        state,
        propertyName,
        ascending,
        companyChildType: this.codeList[1],
        companyType: this.codeList[0]
      }
      //将所有的查询条件存在vuex中
      if (typeof sortData === 'string' || JSON.stringify(sortData) === '{}') {
         this.$store.commit('SET_COOPERSEARCHBAR', this.params)
      }

      if(typeof sortData === "number" || JSON.stringify(sortData) === '{}'){
        this.params.propertyName = 'firstDate'
      }
      if(sortData === 1 && JSON.stringify(this.$store.state.cooperativeEnterprise.cooperSearchBar) !== '{}' ){
        this.searchEcho(this.$store.state.cooperativeEnterprise.cooperSearchBar)
        this.params = this.$store.state.cooperativeEnterprise.cooperSearchBar

      }
      getBusinessList(this.params).then(({ data: { total, content }}) => {
        this.loading = false
        this.tableData = content || []
        this.count = total
        this.tableData.map(item => {
          item.managementModel = codeChangeName(this.constant.managementModel, item.managementModel)
          return item
        })
      })
    },
    //查看历史操作记录
    viewHistory(scope){
      this.$router.push({name: 'enterpeiseHistory', query: {type:'handle', informationCode: scope.row.informationCode,organizationId:this.organization.id, myInformationCode:this.organization.creditCode,hisorganizationId:scope.row.organizationId,companyId:scope.row.companyId }})
    },
    //搜索条件回显
    searchEcho(data){
      const {name, managementModel, mainProducts, machining, qualificationCategory, registeredPlace, contacts, firstDate, registerCompany, cooperateType, state,belongOrganizationId, page, size,} = data
      this.search = {
        name,
        managementModel,
        mainProducts,
        machining,
        qualificationCategory,
        registeredPlace,
        contacts,
        firstDate:firstDate ? [firstDate.after,firstDate.before] : '',
        registerCompany,
        cooperateType,
        state,
        belongOrganizationId
      }
      this.page = page + 1
      this.size = size
      // this.$nextTick(() => {
      //   this.$refs.pagination.internalCurrentPage = page + 1
      // })
    }
  },
  destroyed(){
    if(this.$route.path.includes('home')){
      this.$store.commit('SET_COOPERSEARCHBAR', {})
    }
  },
}
</script>
<style lang="less">
.list {
  .el-table__body-wrapper {
    max-height: calc(100vh - 450px);
  }
  .search > .select > .fill-name {
    width: 31%;
    margin-right: 5px;
    .fill-line {
      width: 100%;
    }
  }
  .material-table {
    width: calc(100vw - 235px);
  }
  .ruleForm {
		display: flex;
		flex-wrap: wrap;
		& >.el-form-item {
      width: 50%;
		}
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner,
    .el-select {
      width: 100%;
    }
    .fill-name {
      width:100%
    }
    p {
      font-size:12px;
      color:#999
    }
  }
}
</style>
