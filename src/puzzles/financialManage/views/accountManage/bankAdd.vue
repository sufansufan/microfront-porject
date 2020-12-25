<template>
  <div class="bank-add">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="160px" class="rule-form-flex">
      <el-form-item label="银行(开户行名称)" prop="bankName" class="one-half">
        <el-input v-model.trim="ruleForm.bankName" clearable :maxlength="50" :placeholder="getPlaceHolder('银行(开户行名称)')" />
      </el-form-item>

      <el-form-item label="账户类型" prop="accountType" class="one-half">
        <jdy-select
          v-model="ruleForm.accountType"
          :holder="getPlaceHolder('账户类型',1)"
          :select-data="constant.BankAccountType"
          :select-options="{value:'code',label:'name'}"
        />
      </el-form-item>

      <el-form-item label="银行账号" prop="bankNumber" class="one-half">
        <el-input v-model.trim="ruleForm.bankNumber" clearable :placeholder="getPlaceHolder('银行账号')" />
      </el-form-item>

      <el-form-item label="开户行地址" prop="bankAddress" class="one-half">
        <el-input v-model.trim="ruleForm.bankAddress" clearable :maxlength="50" :placeholder="getPlaceHolder('开户行地址')" />
      </el-form-item>

      <el-form-item label="归属单位" class="one-half">
        <div class="external-list">
          <el-select
            v-model="searchExternal.attribution"
            placeholder="请选择项目归属"
            style="width:30%"
            clearable
            @change="handlerChangeProject"
          >
            <el-option
              v-for="item in ContractAttributionList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
          <jdy-select
            v-model="searchExternal.company"
            value-key="name"
            placeholder="请选择归属单位"
            style="width:70%"
            :disabled="disabledCompany"
            :select-data="companyList"
            @change="companyChange"
          />
          <!-- <el-option
              v-for="item in companyList"
              :key="item.code"
              :label="item.name"
              :value="{id:item.code,neme:item.name}"
            />
          </jdy-select> -->
        </div>
      </el-form-item>

      <el-form-item label="开户日期" required class="one-half">
        <el-col :span="11">
          <el-form-item prop="openAccountDate">
            <el-date-picker v-model="ruleForm.openAccountDate" type="date" :placeholder="getPlaceHolder('开户日期',1)" style="width: 100%;" clearable />
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="负责人" prop="chargePersonId" class="one-half">
        <!-- <div class="external-list"> -->
        <!-- <el-cascader
            v-model="ruleForm.person"
            style="width: 30%"
            placeholder="请选择经办组织"
            clearable
            filterable
            :options="constant.orgList"
            :props="{ expandTrigger: 'hover', value: 'id', label: 'orgName', children: 'children' }"
          /> -->
        <jdy-select
          v-model="ruleForm.chargePersonName"
          value-key="id"
          placeholder="请选择负责人"
          :select-data="constant.orgPersonList"
          :select-options="{value:'id',label:'name'}"
          @change="chargeSelect"
        />
        <!-- </div> -->
      </el-form-item>

      <el-form-item label="联系电话" prop="telephone" class="one-half">
        <el-input v-model.trim="ruleForm.telephone" clearable :maxlength="11" :placeholder="getPlaceHolder('联系电话')" />
      </el-form-item>

      <el-form-item label="备注" prop="remark" class="one-width">
        <el-input v-model.trim="ruleForm.remark" type="textarea" clearable :maxlength="255" :placeholder="getPlaceHolder('备注')" />
      </el-form-item>

      <el-form-item label="录入人" prop="recorder" class="one-half">
        <el-input v-model.trim="searchExternal.recorder" clearable :placeholder="getPlaceHolder('录入人')" disabled />
      </el-form-item>
    </el-form>

    <div class="btn-box">
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      <el-button @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>
<script>
import { getSessionStorage } from '@core/utils/auth'
import { validateLength, validatePhone } from '@core/utils/validate'
import { getOrganizationByBelongList } from '@core/api/organization'
import { addBankaccount, getDetailBankaccount, putBankaccount } from '@core/api/financialManage/capitalaccountmanager'
import { mapGetters } from 'vuex'
export default {
  name: 'BankAdd',
  data() {
    const validPhone = (rule, value, callback) => {
      if (!validatePhone(value)) {
        callback(new Error('请输入正确的电话'))
      } else {
        callback()
      }
    }
    return {
      searchExternal: {
        attribution: '', // 账户归属
        belongOrgId: '', // 归属单位
        recorder: ''
      },
      companyList: [],
      optimisticLock: '',
      ruleForm: {
        bankName: '',
        accountType: '',
        bankNumber: '',
        bankAddress: '',
        organizationId: '',
        organizationName: '',
        openAccountDate: '',
        chargePersonId: '',
        chargePersonName: '',
        telephone: '',
        remark: ''
      },
      rules: {
        bankName: [
          {
            required: true,
            message: this.getPlaceHolder('银行(开户行名称)'),
            trigger: 'blur'
          },
          validateLength(0, 50)
        ],
        accountType: [
          {
            required: true,
            message: this.getPlaceHolder('账户类型', 1),
            trigger: 'change'
          }
        ],
        bankNumber: [
          {
            required: true,
            message: this.getPlaceHolder('银行账号'),
            trigger: 'change'
          }
        ],
        // organizationId: [
        //   {
        //     required: true,
        //     message: this.getPlaceHolder('归属单位'),
        //     trigger: 'change'
        //   }
        // ],
        bankAddress: [
          {
            required: true,
            message: this.getPlaceHolder('开户行地址'),
            trigger: 'change'
          },
          validateLength(0, 50)
        ],
        openAccountDate: [
          {
            required: true,
            message: this.getPlaceHolder('开户日期', 1),
            trigger: 'change'
          }
        ],
        chargePersonName: [
          {
            required: true,
            message: this.getPlaceHolder('负责人', 1),
            trigger: 'change'
          }
        ],
        telephone: [
          { required: true, validator: validPhone, trigger: 'blur' }
        ],
        remark: [validateLength(0, 255)]
      }
    }
  },
  computed: {
    ...mapGetters(['constant']),
    disabledCompany() {
      return !this.searchExternal.attribution
    },
    // 合同归属List
    ContractAttributionList() {
      return this.constant.ContractAttribution
    }
  },
  created() {
    this.searchExternal.recorder = getSessionStorage('userName')
    const orgListParams = {
      parentPath: getSessionStorage('orgId'),
      del: '0',
      state: 'ok'
    }

    this.$store.dispatch('getConstant', [
      'BankAccountState',
      'ContractAttribution', // 合同归属
      { type: 'orgList', params: orgListParams },
      { type: 'orgPersonList', params: getSessionStorage('orgId') }
    ]).then(() => {
    })

    if (this.$route.query.id) {
      this.detailBankaccount(this.$route.query.id)
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$route.query.id && this.$route.query.type === 'edit') {
            putBankaccount({
              ...this.ruleForm,
              optimisticLock: this.optimisticLock },
            this.$route.query.id
            ).then(({ data }) => {
              this.$router.go(-1)
            })
          } else {
            addBankaccount(this.ruleForm).then(({ data }) => {
              this.$router.go(-1)
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    detailBankaccount(id) {
      getDetailBankaccount(id).then(({ data }) => {
        this.ruleForm.bankName = data.bankName
        this.ruleForm.bankAddress = data.bankAddress
        this.ruleForm.accountType = data.accountType
        this.ruleForm.bankNumber = data.bankNumber
        this.ruleForm.organizationId = data.organizationId
        this.ruleForm.organizationName = data.organizationName
        this.searchExternal.company = data.organizationName
        this.ruleForm.chargePersonId = data.chargePersonId
        this.ruleForm.chargePersonName = data.chargePersonName
        this.ruleForm.telephone = data.telephone
        this.ruleForm.openAccountDate = data.openAccountDate
        this.ruleForm.remark = data.remark
        this.optimisticLock = data.optimisticLock
      })
    },
    companyChange(value) {
      this.ruleForm.organizationId = value.code
      this.ruleForm.organizationName = value.name
    },
    chargeSelect(value) {
      this.ruleForm.chargePersonId = value.id
      this.ruleForm.chargePersonName = value.name
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    async handlerChangeProject(val) {
      if (val) {
        this.$set(this.searchExternal, 'company', '')
        const { data } = await getOrganizationByBelongList(val)
        this.companyList = data.map(i => ({ code: i.id, name: i.orgName }))
      } else {
        return
      }
    },
    getPlaceHolder(title, type = 0) {
      const typeMap = ['请输入', '请选择']
      return `${typeMap[type]}${title}`
    }
  }
}
</script>
<style lang="less" scoped>
.bank-add{
  height: calc(100vh - 130px);
  overflow-y: auto;
  padding: 10px;
  .external-list{
    display: flex;
  }
  .btn-box{
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
