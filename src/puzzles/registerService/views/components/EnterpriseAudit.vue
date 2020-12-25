<template>
  <div class="enterprise-audit">
    <div class="search">
      <div class="select">
        <div>
          <span>企业编号</span>
          <el-input v-model.trim="search.companyNumber" placeholder="请输入企业编号" clearable />
        </div>
        <div>
          <span>企业名称</span>
          <el-input v-model.trim="search.companyName" placeholder="请输入企业编号" clearable />
        </div>
        <div>
          <span>注册日期</span>
          <el-date-picker
            v-model="search.createDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            clearable
            :picker-options="pickerOptions"
            :default-time="defaultTime"
          />
        </div>
        <div>
          <span>信用代码</span>
          <el-input v-model.trim="search.creditCode" placeholder="请输入信用代码" clearable />
        </div>
        <div>
          <span>联系人</span>
          <el-input v-model.trim="search.contactPerson" placeholder="请输入联系人" clearable />
        </div>
        <div>
          <span>手机号</span>
          <el-input v-model.trim="search.telephone" placeholder="请输入手机号" clearable />
        </div>
        <div>
          <span>身份证</span>
          <el-input v-model.trim="search.idNumber" placeholder="请输入身份证" clearable />
        </div>
        <div>
          <span>状态</span>
          <el-select v-model="search.state" placeholder="请选择状态" clearable>
            <el-option
              v-for="item in stateList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </div>
        <div>
          <span>所在地</span>
          <el-cascader
            v-model="search.companyAddress"
            placeholder="请选择所在地"
            clearable
            :options="constant.nativePlace"
            :props="{ expandTrigger: 'hover', value: 'id', label: 'zh', children: 'children', checkStrictly: true }"
            style="width: 100%"
          />
        </div>
        <div>
          <span>公司类型</span>
          <el-select v-model="search.unitType" placeholder="请选择公司类型" clearable>
            <el-option
              v-for="item in companyType"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </div>
        <div>
          <span>审核人</span>
          <el-input v-model.trim="search.approvalUserName" placeholder="请输入审核人" clearable />
        </div>
        <div>
          <span>审核日期</span>
          <el-date-picker
            v-model="search.approvalDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            clearable
            :picker-options="pickerOptions"
            :default-time="defaultTime"
          />
        </div>
        <div class="query">
          <div>
            <el-button type="primary" icon="el-icon-search" @click="fetchData('query')">查询</el-button>
          </div>
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button-group>
            <el-button type="primary" @click="approvalClick(true)">审核通过</el-button>
            <el-button type="primary" @click="approvalClick(false)">不通过</el-button>
          </el-button-group>
        </div>
        <div>
          <el-button-group>
            <el-button type="primary" @click="handleCommand('phone', 'operation')">设置审核人员手机号</el-button>
            <el-button type="primary" @click="handleCommand('phone', 'customerService')">设置客服提醒手机号</el-button>
            <el-button type="primary" @click="handleCommand('port')">设置考勤端口</el-button>
            <el-button type="primary" @click="handleCommand('date')">设置试用期</el-button>
            <el-button type="primary" @click="handleCommand('date')">启停企业应用服务</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <div>
      <el-table ref="tableRef" v-loading="loading" :data="tableData" row-key="id" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40" />
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="state" label="状态" header-align="center" />
        <el-table-column prop="companyNumber" label="企业编号" align="center" width="100" />
        <el-table-column prop="companyName" label="企业名称" align="center" width="200" />
        <el-table-column label="统一社会信用代码" align="center" width="200">
          <template slot-scope="scope">
            <span>
              {{ scope.row.creditCode }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="unitType" label="公司类型" align="center" width="100" />
        <el-table-column prop="contactPerson" label="联系人" align="center" width="100" />
        <el-table-column prop="telephone" label="手机号" align="center" width="130" />
        <el-table-column prop="idNumber" label="身份证号" align="center" width="150" />
        <el-table-column prop="qyPassword" label="管理密码" align="center" width="150" />
        <el-table-column prop="companyAddress" label="所在地" align="center" width="150" />
        <el-table-column prop="email" label="邮箱" align="center" width="150" />
        <el-table-column label="营业执照" align="center" width="150">
          <template slot-scope="scope">
            <span class="table-click-color" @click="seeFile(scope.row.creditCode)">查看附件</span>
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="注册时间" align="center" width="150" />
        <el-table-column prop="registerIp" label="注册IP地址" align="center" width="150" />
        <el-table-column prop="approvalUserName" label="审核人" align="center" width="150" />
        <el-table-column prop="approvalDate" label="审核时间" align="center" width="150" />
        <el-table-column prop="approvalDesc" label="审核说明" align="center" width="150" />
        <el-table-column prop="deployDate" label="部署时间" align="center" width="150" />
        <el-table-column prop="attendancePort" label="考勤机端口" align="center" width="200" />
        <el-table-column label="服务状态" align="center" width="200" />
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
    <drag-dialog ref="phone" :title="phoneTitle" width="40%">
      <span>请输入要接收提醒的手机号码，多个手机号以英文逗号隔开</span>
      <el-form ref="ruleFormPhone" :key="key" :rules="rules" :model="ruleFormPhone">
        <el-form-item prop="phone">
          <el-input v-model="ruleFormPhone.phone" type="textarea" placeholder="请输入手机号" :rows="3" style="width: 100%" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="settingSubmit('phone', 'ruleFormPhone')">确定</el-button>
      </div>
    </drag-dialog>
    <drag-dialog ref="port" title="考勤机端口设置" width="40%">
      <el-form ref="ruleFormPort" :key="key" :model="ruleFormPort" label-width="100px">
        <el-form-item label="当前企业">
          <el-input v-model="companyName" placeholder="请输入当前企业" style="width: 100%" disabled />
        </el-form-item>
        <el-form-item label="考勤服务地址">
          <el-input v-model="ruleFormPort.attendancePort" placeholder="考勤服务地址" style="width: 100%" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="settingSubmit('port', 'ruleFormPort')">确定</el-button>
      </div>
    </drag-dialog>
    <drag-dialog ref="date" title="企业试用期设置" width="40%">
      <el-form ref="ruleFormDate" :key="key" :rules="rules" :model="ruleFormDate" label-width="100px">
        <el-form-item label="当前企业">
          <el-input v-model="companyName" placeholder="请输入当前企业" style="width: 100%" />
        </el-form-item>
        <el-form-item label="试用期(天)" prop="probation">
          <el-input v-model.number="ruleFormDate.probation" placeholder="请输入试用期(天)" style="width: 100%" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="settingSubmit('date', 'ruleFormDate')">确定</el-button>
      </div>
    </drag-dialog>
    <drag-dialog ref="approval" title="企业注册审核" width="40%">
      <el-form ref="approvalForm" :key="key" :model="approval" :rules="rules" label-width="80px">
        <el-form-item label="审核说明" prop="approvalDesc">
          <el-input v-model="approval.approvalDesc" type="textarea" :row="3" placeholder="请输入审核说明" style="width: 100%" />
        </el-form-item>
        <el-form-item v-if="!approvalStatus">
          <el-checkbox v-model="approval.sendMessage">发短信通知注册人</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="approvalSubmit">确定</el-button>
      </div>
    </drag-dialog>
  </div>
</template>

<script>
import pagination from '@core/mixins/pagination'
import table from '@core/mixins/table'
import { getEnterpriseList } from '@core/api/operationManage/register'
import DragDialog from '@frames/dashboard/components/Dialog'
import { auditApproval, auditNotApproval, updateSetting, getOperationsta, fileDownLoad, updateReminderPhone } from '@core/api/operationManage/audit'
import { getSessionStorage } from '@core/utils/auth'
import { exportExcel } from '@core/utils'
import { mapGetters } from 'vuex'
import { validateMorePhone } from '@core/utils/validate'
export default {
  components: {
    DragDialog
  },
  mixins: [pagination, table],
  data() {
    var validMorePhone = (rule, value, callback) => {
      if (!validateMorePhone(value)) {
        callback(new Error('请输入正确的格式'))
      } else {
        callback()
      }
    }
    return {
      count: 0,
      search: {
        companyNumber: '',
        companyName: '',
        createDate: [],
        creditCode: '',
        contactPerson: '',
        telephone: '',
        idNumber: '',
        state: '',
        companyAddress: [],
        unitType: '',
        approvalUserName: '',
        approvalDate: []
      },
      loading: true,
      tableData: [],
      effectiveList: [],
      ruleFormPhone: {
        phone: ''
      },
      ruleFormPort: {
        attendancePort: ''
      },
      ruleFormDate: {
        probation: ''
      },
      companyName: '',
      approvalStatus: null,
      phoneType: '',
      approval: {
        approvalDesc: '',
        approvalUserName: '',
        sendMessage: false,
        id: ''
      },
      rules: {
        approvalDesc: [
          { required: true, message: '请输入审核说明', trigger: 'blur' },
          { max: 50, message: '最长在 50 个字符', trigger: 'blur' }
        ],
        probation: [
          { required: true, message: '请输入天数', trigger: 'blur' },
          { type: 'number', message: '请输入数字' }
        ],
        phone: [
          { required: true, validator: validMorePhone, trigger: 'blur' },
          { max: 500, message: '最长在 500 个字符', trigger: 'blur' }
        ]
      },
      stateList: [
        {
          code: '01',
          name: '未审核'
        },
        {
          code: '02',
          name: '已通过'
        },
        {
          code: '03',
          name: '未通过'
        },
        {
          code: '04',
          name: '已部署'
        }
      ],
      companyType: [
        {
          code: 'JZZS',
          name: '建筑装饰'
        },
        {
          code: 'CLGY',
          name: '材料供应'
        },
        {
          code: 'QTQY',
          name: '其他企业'
        }
      ],
      phoneTitle: ''
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  activated() {
    this.$store.dispatch('getConstant', ['nativePlace'])
    this.fetchData()
  },
  methods: {
    fetchData(type) {
      this.loading = true
      if (typeof sortData === 'string') {
        this.deepSearch = JSON.parse(JSON.stringify(this.search))
        this.page = 1
        this.size = 10
      }
      this.search = JSON.parse(JSON.stringify(this.deepSearch))
      // if (type === 'query') {
      //   this.page = 1
      //   this.size = 10
      // }
      const { createDate, approvalDate, companyAddress } = this.search
      const params = {
        page: this.page - 1,
        size: this.size,
        ...this.search,
        companyAddress: companyAddress.toString(),
        createDate: {
          after: createDate ? createDate.length ? createDate[0] : '' : '',
          before: createDate ? createDate.length ? createDate[1] : '' : ''
        },
        approvalDate: {
          after: approvalDate ? approvalDate.length ? approvalDate[0] : '' : '',
          before: approvalDate ? approvalDate.length ? approvalDate[1] : '' : ''
        },
        propertyName: 'createDate',
        ascending: false
      }
      getEnterpriseList(params).then(({ data: { content, total }}) => {
        this.loading = false
        this.count = total
        this.tableData = content
      })
    },
    handleCommand(type, phoneType) {
      if (type === 'phone' ? true : this.onlyOneData()) {
        if (type === 'phone') {
          this.phoneType = phoneType
          if (phoneType === 'operation') {
            this.phoneTitle = '设置审核人员手机号'
          } else {
            this.phoneTitle = '设置客服提醒手机号'
          }
        }
        this.companyName = type === 'phone' ? '' : this.multipleSelection[0].companyName
        this.$refs[type].show = true
        this.ruleFormPhone.phone = ''
        this.getReviewed()
      }
    },
    settingSubmit(type, form) {
      var params = {
        id: type === 'phone' ? '' : this.multipleSelection[0].id
      }
      if (type === 'phone') {
        params.telephone = this.ruleFormPhone.phone
        params.phoneType = this.phoneType
      }
      if (type === 'port') {
        params.attendancePort = this.ruleFormPort.attendancePort
      }
      if (type === 'date') {
        params.probation = this.ruleFormDate.probation
      }

      this.$refs[form].validate(valid => {
        if (valid) {
          if (type === 'phone') {
            delete params.id
            updateReminderPhone(params).then(() => {
              this.$message.success('设置成功')
              this.$refs[type].show = false
              this.fetchData('query')
            })
          } else {
            updateSetting(params).then(() => {
              this.$message.success('设置成功')
              this.$refs[type].show = false
              this.fetchData('query')
            })
          }
        } else {
          return false
        }
      })
    },
    approvalClick(type) {
      if (this.onlyOneData()) {
        const { state } = this.multipleSelection[0]
        if (state === '已通过' || state === '未通过') {
          this.$message.success('选中记录已经审核, 不可重复审核')
          return
        }
        this.approvalStatus = type
        this.approval.approvalDesc = ''
        this.approval.sendMessage = false
        this.$refs.approval.show = true
      }
    },
    approvalSubmit() {
      this.$refs.approvalForm.validate(valid => {
        if (valid) {
          const id = this.multipleSelection[0].id
          const params = {
            ...this.approval,
            id,
            approvalUserName: getSessionStorage('userName')
          }
          if (this.approvalStatus) {
            delete params.sendMessage
            auditApproval(params, id).then(() => {
              this.$message.success('审核完成')
              this.fetchData('query')
              this.$refs.approval.show = false
            })
          } else {
            auditNotApproval(params, id).then(() => {
              this.$message.success('审核完成')
              this.$refs.approval.show = false
              this.fetchData('query')
            })
          }
        } else {
          return false
        }
      })
    },
    getReviewed() {
      getOperationsta({ phoneType: this.phoneType }).then(({ data }) => {
        this.ruleFormPhone.phone = data
      })
    },
    seeFile(creditCode) {
      fileDownLoad(creditCode).then(res => {
        exportExcel(res, '营业执照.png')
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
