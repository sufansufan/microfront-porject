<template>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    label-width="150px"
    class="rule-form-flex"
  >
    <el-form-item label="合同编号">
      <el-input
        v-model="ruleForm.contractNumber"
        readonly
        :placeholder="getPlaceHolder('合同编号')"
        :disabled="true"
        clearable
      />
    </el-form-item>
    <el-form-item label="合同归属">
      <jdy-select
        v-model="ruleForm.attribution"
        :disabled="true"
        holder="合同归属"
        :select-data="constant.ContractAttribution"
      />
    </el-form-item>
    <el-form-item label="归属单位">
      <!-- <jdy-select
        v-model="ruleForm.belongOrgId"
        :disabled="true"
        holder="归属单位"
        :select-data="belongOrgList"
        :select-options="{value: 'id', label: 'orgName'}"
      /> -->
      <el-input
        v-model="ruleForm.belongOrgName"
        :disabled="true"
        :placeholder="getPlaceHolder('归属单位')"
        clearable
      />
    </el-form-item>
    <el-form-item label="合同类型">
      <el-select
        v-model="ruleForm.type"
        :disabled="true"
        :placeholder="getPlaceHolder('合同类型')"
        clearable
      >
        <el-option
          v-for="(item, index) in ['工程合同']"
          :key="index"
          :label="item"
          value="01"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="合同类别">
      <el-select
        v-model="ruleForm.category"
        clearable
        :disabled="true"
        :placeholder="getPlaceHolder('合同类别', 1)"
      >
        <el-option
          v-for="item in constant.ContractCategory"
          :key="item.code"
          :value="item.code"
          :label="item.name"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="签订日期">
      <el-date-picker
        v-model="ruleForm.signDate"
        :disabled="true"
        type="date"
        clearable
        :placeholder="getPlaceHolder('签订日期', 1)"
      />
    </el-form-item>
    <component :is="currentCmp.name" ref="componentRef" :disabled="disabled" />
    <slot />
  </el-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getOrganizationByBelongList } from '@core/api/organization'
export default {
  components: {
    EngineerInfo: () => import('./EngineerInfo')
  },
  inject: ['getRuleForm'],
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      childrenFormData: {},
      ruleForm: {
        contractNumber: '',
        attribution: '',
        belongOrgId: '',
        type: '01',
        category: '',
        signDate: ''
      },
      belongOrgList: []
    }
  },
  computed: {
    ...mapGetters(['constant']),
    currentCmp() {
      const componentsList = [
        { type: '01', name: 'EngineerInfo' }
      ]
      return componentsList.find(item => item.type === this.ruleForm.type) || { type: '01', name: 'EngineerInfo' }
    }
  },
  async created() {
    await this.getConstant(['ContractAttribution', 'ContractCategory'])
    this.$nextTick(async() => {
      const { attribution } = await this.getRuleForm()
      await this.fetchBelongOrgList(attribution).then(async() => {
        this.ruleForm = await this.getRuleForm()
      })
    })
  },
  methods: {
    ...mapActions(['getConstant']),
    getPlaceHolder(title, type = 0) {
      const typeMap = ['请输入', '请选择']
      return `${typeMap[type]}${title}`
    },
    // 获取子数据
    getChildData() {
      const childData = this.$refs['childForm'].getData()
      return childData
    },
    // 获取数据
    fetchBelongOrgList(val) {
      return new Promise((resolve, reject) => {
        getOrganizationByBelongList(val).then(({ data }) => {
          this.belongOrgList = data
          resolve()
        })
      })
    },
    submit() {
      let obj = {}
      const componentValidate = this.$refs['componentRef'].validateRuleForm()
      this.$refs['ruleForm'].validate((valid) => {
        if (valid && componentValidate) {
          obj = {
            ...this.ruleForm,
            ...this.$refs['componentRef'].ruleForm
          }
        }
      })
      return obj
    }
  }
}
</script>

<style lang="less" scoped>
.project-form {
  max-height: calc(100vh - 180px);
  overflow-y: auto;
  .rule-form-wapper(180);
}
</style>
