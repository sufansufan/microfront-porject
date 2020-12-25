<template>
  <div class="cash-add">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="160px" class="rule-form-flex">
      <el-form-item label="账户名称" prop="name" class="one-half">
        <el-input v-model.trim="ruleForm.name" :maxlength="50" clearable placeholder="请输入账户名称" />
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
            holder="请选择归属单位"
            style="width:70%"
            value-key="name"
            :disabled="disabledCompany"
            :select-data="companyList"
            @change="companyChange"
          />
        </div>
      </el-form-item>

      <el-form-item label="负责人" prop="chargePersonName" class="one-half">
        <jdy-select
          v-model="ruleForm.chargePersonName"
          value-key="id"
          holder="请选择负责人"
          :select-data="constant.orgPersonList"
          :select-options="{value:'id',label:'name'}"
          @change="chargeSelect"
        />
      </el-form-item>

      <el-form-item label="联系电话" prop="telephone" class="one-half">
        <el-input v-model.trim="ruleForm.telephone" :maxlength="11" clearable placeholder="请输入联系电话" />
      </el-form-item>

      <el-form-item label="备注" prop="remark" class="one-width">
        <el-input v-model.trim="ruleForm.remark" type="textarea" :maxlength="255" clearable placeholder="请输入备注" />
      </el-form-item>

      <el-form-item label="录入人" class="one-half">
        <el-input v-model.trim="searchExternal.recorder" disabled />
      </el-form-item>
    </el-form>

    <div class="btn-box">
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      <el-button @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>
<script>

import { getOrganizationByBelongList } from '@core/api/organization'
import { validateLength, validatePhone } from '@core/utils/validate'
import { getSessionStorage } from '@core/utils/auth'
import { mapGetters } from 'vuex'
import {
  addCash,
  detailCash,
  editCash
} from '@core/api/financialManage/capitalaccountmanager'
export default {
  name: 'CashAdd',
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
        name: '',
        organizationName: '',
        organizationId: '',
        chargePersonName: '',
        chargePersonId: '',
        telephone: '',
        remark: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入账户名称', trigger: 'blur' },
          validateLength(0, 50)
        ],
        // belongOrgId: [
        //   { required: true, message: '请选择归属单位', trigger: 'bluer' }
        // ],
        chargePersonName: [
          { required: true, message: '请选择负责人', trigger: 'bluer' }
        ],
        telephone: [
          { required: true, message: '请输入联系电话', trigger: 'bluer' },
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
    if (this.$route.query.id) {
      this.getdetailCash(this.$route.query.id)
    }
    this.searchExternal.recorder = getSessionStorage('userName')
    this.$store.dispatch('getConstant', [
      'BankAccountState',
      'ContractAttribution',
      { type: 'orgPersonList', params: getSessionStorage('orgId') }
    ])
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$route.query.id && this.$route.query.type === 'edit') {
            editCash({
              ...this.ruleForm,
              optimisticLock: this.optimisticLock },
            this.$route.query.id
            ).then(({ data }) => {
              console.log(data)
              this.$router.go(-1)
            })
          } else {
            addCash(this.ruleForm).then(({ data }) => {
              console.log(data)
              this.$router.go(-1)
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
    getdetailCash(id) {
      detailCash(id).then(({ data }) => {
        this.ruleForm.name = data.name
        this.ruleForm.organizationId = data.organizationId
        this.ruleForm.organizationName = data.organizationName
        this.searchExternal.company = data.organizationName
        this.ruleForm.chargePersonId = data.chargePersonId
        this.ruleForm.chargePersonName = data.chargePersonName
        this.ruleForm.remark = data.remark
        this.ruleForm.telephone = data.telephone
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
    }
  }
}
</script>
<style lang="less" scoped>
.cash-add{
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
