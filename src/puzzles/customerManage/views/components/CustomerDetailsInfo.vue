<template>
  <div class="customer-info-box">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="110px" class="info-form">
      <el-form-item label="编号" prop="companyNumber">
        <el-input v-model="ruleForm.companyNumber" placeholder="请输入编号" disabled />
      </el-form-item>
      <el-form-item label="企业名称" prop="companyName">
        <el-input v-model="ruleForm.companyName" placeholder="请输入企业名称" disabled />

      </el-form-item>
      <el-form-item label="简称" prop="simpleName">
        <el-input v-model="ruleForm.simpleName" disabled />
      </el-form-item>
      <el-form-item label="统一信用代码" prop="creditCode">
        <el-input v-model="ruleForm.creditCode" disabled />
      </el-form-item>
      <el-form-item label="所在地" prop="companyAddress">
        <el-cascader
          v-model="ruleForm.companyAddress"
          placeholder="请选择所在地"
          clearable
          disabled
          :options="constant.nativePlace"
          :props="{ expandTrigger: 'hover', value: 'id', label: 'zh', children: 'children', checkStrictly: true }"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="详细地址" prop="detailedAddress">
        <el-input v-model="ruleForm.detailedAddress" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="企业性质">
        <el-select v-model="ruleForm.unitNature" placeholder="请选择企业性质" clearable :disabled="disabled">
          <el-option
            v-for="item in constant.enterpriseNature"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="注册资本">
        <el-input v-model="ruleForm.registeredCapital" :disabled="disabled" placeholder="请输入注册资本" />
      </el-form-item>
      <el-form-item label="成立日期" prop="establishmentDate">
        <el-date-picker
          v-model="ruleForm.establishmentDate"
          type="date"
          placeholder="选择成立日期"
          :disabled="disabled"
        />
      </el-form-item>
      <el-form-item label="法人代表">
        <el-input v-model="ruleForm.legalPersonName" :disabled="disabled" placeholder="请输入法人代表" />
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="ruleForm.contactPersontelephone" disabled placeholder="请输入联系电话" />
      </el-form-item>
      <el-form-item label="公司类型">
        <el-select v-model="ruleForm.unitType" placeholder="请选择公司类型" clearable :disabled="disabled">
          <el-option
            v-for="item in constant.mainBusiness"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="企业规模">
        <el-input v-model="ruleForm.enterpriseScale" :disabled="disabled" placeholder="请输入企业规模" />
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="ruleForm.contactPerson" :disabled="disabled" placeholder="请输入联系人" />
      </el-form-item>
      <el-form-item label="联系人电话">
        <el-input v-model="ruleForm.contactPersontelephone" :disabled="disabled" placeholder="请输入联系人电话" />
      </el-form-item>
      <el-form-item label="E-mail" prop="email">
        <el-input v-model="ruleForm.email" disabled placeholder="请输入E-mail" />
      </el-form-item>
      <el-form-item label="网页主页">
        <el-input v-model="ruleForm.websiteHomePage" :disabled="disabled" placeholder="请输入网页主页" />
      </el-form-item>
      <el-form-item label="传真">
        <el-input v-model="ruleForm.fax" :disabled="disabled" placeholder="请输入传真" />
      </el-form-item>
      <el-form-item label="级别" prop="level">
        <el-select v-model="ruleForm.level" placeholder="请选择级别" clearable :disabled="disabled">
          <el-option
            v-for="item in constant.CustomerLevel"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="来源" prop="source">
        <el-select v-model="ruleForm.source" placeholder="请选择来源" clearable :disabled="disabled">
          <el-option
            v-for="item in constant.source"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所有人" prop="owner">
        <el-select v-if="pageType === 'jxs'" v-model="ruleForm.owner" placeholder="请选择所有人" clearable :disabled="disabled">
          <el-option
            v-for="item in allPersonnel"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-input v-if="pageType === 'jdy'" v-model="ruleForm.ownerName" :disabled="disabled" placeholder="请输入所有人" />
      </el-form-item>
      <el-form-item label="企业简介" class="full-width">
        <el-input v-model="ruleForm.companyProfiles" type="textarea" :rows="3" :disabled="disabled" placeholder="请输入企业简介" />
      </el-form-item>
      <el-form-item label="备注" class="full-width">
        <el-input v-model="ruleForm.remark" type="textarea" :rows="3" :disabled="disabled" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
    <div v-show="!disabled" class="btn">
      <el-button type="primary" @click="submit">保存</el-button>
      <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>

<script>
import { updateCompanyInfo } from '@core/api/operationManage/company'
import { getCompanyInfo } from '@core/api/operationManage/platformCompany'
import { mapGetters } from 'vuex'
import { getPersonnelsByOrgId } from '@core/api/personnel'
import { getSessionStorage } from '@core/utils/auth'
import { codeChangeName } from '@core/utils'
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ruleForm: {
        companyNumber: '',
        companyName: '',
        simpleName: '',
        creditCode: '',
        companyAddress: '',
        detailedAddress: '',
        unitNature: '',
        registeredCapital: '',
        establishmentDate: '',
        legalPersonName: '',
        contactPersontelephone: '',
        unitType: '',
        enterpriseScale: '',
        contactPerson: '',
        email: '',
        websiteHomePage: '',
        fax: '',
        level: '',
        source: '',
        companyProfiles: '',
        remark: '',
        ownerName: ''
      },
      rules: {
        companyNumber: [{ required: true, message: '请输入编号', trigger: 'blur' }],
        companyName: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
        simpleName: [{ required: true, message: '请输入简称', trigger: 'blur' }],
        creditCode: [{ required: true, message: '请输入统一信用代码', trigger: 'blur' }],
        companyAddress: [{ required: true, message: '请选择所在地', trigger: 'change' }],
        detailedAddress: [{ required: true, message: '请选择所在地', trigger: 'blur' }],
        establishmentDate: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
        email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
        level: [{ required: true, message: '请选择级别', trigger: 'change' }],
        source: [{ required: true, message: '请输入编号', trigger: 'blur' }],
        owner: [{ required: true, message: '请选择所有人', trigger: 'blur' }]
      },
      allPersonnel: [],
      pageType: ''
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['enterpriseNature', 'nativePlace', 'source', 'CustomerLevel', 'mainBusiness'])
    const { id, page } = this.$route.query
    this.pageType = page
    this.getInfo(id)
    this.getAllpersonnel(getSessionStorage('orgId'))
  },
  methods: {
    getInfo(id) {
      getCompanyInfo(id).then(({ data }) => {
        const { companyNumber, companyName, simpleName, creditCode, companyAddress, companyAddressName, detailedAddress, unitNature, registeredCapital, establishmentDate, legalPersonName, contactPersontelephone, unitType, enterpriseScale, contactPerson, email, websiteHomePage, fax, level, source, companyProfiles, remark, ownerName, owner } = data
        this.ruleForm = { companyNumber, companyName, simpleName, creditCode, companyAddress: companyAddress.split(','), companyAddressName, detailedAddress, unitNature, registeredCapital, establishmentDate, legalPersonName, contactPersontelephone, unitType, enterpriseScale, contactPerson, email, websiteHomePage, fax, level, source, companyProfiles, remark, ownerName, owner }
        const params = {
          companyName,
          contactPerson,
          contactPersontelephone
        }
        this.$store.commit('SET_CUSTOMERBASEINFO', params)
      })
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const { id } = this.$route.query
          const { companyAddress, owner } = this.ruleForm
          const params = {
            ...this.ruleForm,
            companyAddress: companyAddress.toString(),
            ownerName: codeChangeName(this.allPersonnel, owner, 'id')
          }
          updateCompanyInfo(params, id).then(res => {
            this.$message.success('修改成功')
            this.$router.go(-1)
          })
        } else {
          return false
        }
      })
    },
    getAllpersonnel(id) {
      getPersonnelsByOrgId(id).then(({ data }) => {
        this.allPersonnel = data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.customer-info-box {
  .info-form {
    display: flex;
    flex-wrap: wrap;
    & > .el-form-item {
      width: 33.33%;
      .el-input, .el-select {
        width: 100%;
      }
      &.full-width {
        width: 100%;
      }
    }
  }
  .btn {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
}
</style>
