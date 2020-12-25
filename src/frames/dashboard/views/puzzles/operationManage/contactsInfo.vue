<template>
  <div class="contacts-info">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="contacts-form">
      <el-form-item label="联系人姓名" prop="personName">
        <el-input v-model="ruleForm.personName" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="手机" prop="telphone">
        <el-input v-model="ruleForm.telphone" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="ruleForm.sex" placeholder="请选择性别" clearable :disabled="disabled">
          <el-option
            v-for="item in constant.gender"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="ruleForm.role" placeholder="请选择角色" clearable :disabled="disabled">
          <el-option
            v-for="item in constant.OsContactPersonRole"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="办公电话" prop="officePhone">
        <el-input v-model="ruleForm.officePhone" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="所属客户" prop="companyId">
        <el-select v-model="ruleForm.companyId" placeholder="请选择所属客户" clearable :disabled="disabled">
          <el-option
            v-for="item in customerList"
            :key="item.id"
            :label="item.companyName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="职务">
        <el-input v-model="ruleForm.duty" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="电子邮件" prop="email">
        <el-input v-model="ruleForm.email" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker
          v-model="ruleForm.birtday"
          type="date"
          placeholder="选择日期"
          :disabled="disabled"
        />
      </el-form-item>
      <el-form-item label="所属部门">
        <el-input v-model="ruleForm.belongOrgName" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="所有人" prop="ownerName">
        <!-- <el-input v-model="ruleForm.ownerName" disabled /> -->
        <el-select v-if="pageType === 'jxs'" v-model="ruleForm.belongPersonId" placeholder="请选择所有人" clearable :disabled="disabled">
          <el-option
            v-for="item in allPersonnel"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-input v-if="pageType === 'jdy'" v-model="ruleForm.belongPersonName" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="备注" class="full-width">
        <el-input v-model="ruleForm.remark" type="textarea" :rows="3" :disabled="disabled" />
      </el-form-item>
    </el-form>
    <div class="footer-btn">
      <el-button v-show="!disabled" type="primary" @click="submit">保存</el-button>
      <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>

<script>
import { contactAdd, contactUpDate, contactOneData } from '@core/api/operationManage/contactPerson'
import { getCustomerList } from '@core/api/operationManage/market'
import { mapGetters } from 'vuex'
import { validatePhone } from '@core/utils/validate'
import { getPersonnelsByOrgId } from '@core/api/personnel'
import { getSessionStorage } from '@core/utils/auth'
import { codeChangeName } from '@core/utils'
export default {
  props: {
    disabled: {
      default: false,
      type: Boolean
    }
  },

  data() {
    var validPhone = (rule, value, callback) => {
      if (!validatePhone(value)) {
        callback(new Error('请输入正确的电话'))
      } else {
        callback()
      }
    }
    return {
      customerList: [],
      effectiveList: [],
      ruleForm: {
        personName: '',
        telphone: '',
        sex: '',
        role: '',
        officePhone: '',
        companyId: '',
        duty: '',
        email: '',
        birtday: '',
        remark: '',
        id: '',
        ownerName: '',
        owner: ''
      },
      rules: {
        personName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        telphone: [{ required: true, validator: validPhone, trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        officePhone: [{ required: true, validator: validPhone, trigger: 'blur' }],
        companyId: [{ required: true, message: '请选择所属客户', trigger: 'change' }],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
        // ownerName: [{ required: true, message: '请输入所用人', trigger: 'blur' }]
      },
      allPersonnel: [],
      pageType: ''
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.fetchCustomerList()
    this.$store.dispatch('getConstant', ['gender', 'OsContactPersonRole'])
    const { id, companyId, page } = this.$route.query
    this.pageType = page
    this.ruleForm.companyId = companyId
    if (id) {
      this.fetchDetails(id)
    }
    this.getAllpersonnel(getSessionStorage('orgId'))
  },
  methods: {
    fetchCustomerList() {
      getCustomerList({}).then(({ data }) => {
        this.customerList = data
      })
    },
    fetchDetails(id) {
      contactOneData(id).then(({ data }) => {
        this.ruleForm = data
      })
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const { id, belongPersonId } = this.ruleForm
          const params = {
            ...this.ruleForm,
            belongPersonName: codeChangeName(this.allPersonnel, belongPersonId, 'id')
          }
          delete params.id
          if (id) {
            contactUpDate(params, id).then(res => {
              this.$message.success('修改成功')
              this.$router.go(-1)
            })
          } else {
            contactAdd(params).then(res => {
              this.$message.success('新增成功')
              this.$router.go(-1)
            })
          }
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
.contacts-info {
  padding: 10px;
  height: calc(100vh - 140px);
  .contacts-form {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      width: 33.33%;
      &.full-width {
        width: 100%;
      }
    }
    .el-input, .el-select {
      width: 100%;
    }
  }
  .footer-btn {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
}

</style>
