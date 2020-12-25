<template>
  <div class="category-add">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="160px" class="rule-form-flex">
      <el-form-item label="类别编号" prop="classNumber" class="one-half">
        <el-input v-model.trim="ruleForm.classNumber" clearable :placeholder="getPlaceHolder('类别编号')" @blur="onBlurClassNumber" />
      </el-form-item>

      <el-form-item label="类别名称" prop="name" class="one-half">
        <el-input v-model.trim="ruleForm.name" clearable :placeholder="getPlaceHolder('类别名称')" maxlength="20" @blur="onBlurClassName" />
      </el-form-item>

      <el-form-item label="所属类型" prop="type" class="one-half">
        <el-select v-model="ruleForm.type" clearable :placeholder="getPlaceHolder('所属类型',1)">
          <el-option v-for="item in constant.financeClassType" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>

      <el-form-item label="上级类别" prop="parentId" class="one-half">
        <el-cascader
          v-model="ruleForm.parentId"
          :placeholder="getPlaceHolder('上级类别', 1)"
          clearable
          filterable
          :options="handleOrgList"
          :props="{ value: 'id', label: 'name', children: 'childrens', checkStrictly: true }"
          @change="cascaderChange"
        />
      </el-form-item>

      <el-form-item label="应用业务" class="one-width">
        <el-checkbox-group v-model="ruleForm.businessType">
          <el-checkbox v-for="item in constant.applyBusiness" :key="item.code" :label="item.code" :disabled="checkboxStu">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="备注" prop="remark" class="one-width">
        <el-input v-model.trim="ruleForm.remark" type="textarea" clearable :placeholder="getPlaceHolder('备注')" maxlength="255" />
      </el-form-item>

      <el-form-item class="one-width btn-box">
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { validateLength } from '@core/utils/validate'
import { financeclassAdd, getParentFinanceClass, validate, upClassdata, getClassDetail } from '@core/api/financialManage/financeclassmanager'
export default {
  name: 'CategoryAdd',
  data() {
    return {
      classId: '',
      handleOrgList: [],
      checkboxStu: false,
      ruleForm: {
        classNumber: '',
        type: '',
        name: '',
        parentId: [],
        businessType: [],
        remark: ''
      },
      newParentId: '',
      rules: {
        name: [
          {
            required: true,
            message: this.getPlaceHolder('类别名称'),
            trigger: 'blur'
          },
          validateLength(0, 20)
        ],
        classNumber: [
          {
            required: true,
            message: this.getPlaceHolder('类别编号'),
            trigger: 'blur'
          }
        ],
        parentId: [
          {
            required: true,
            message: this.getPlaceHolder('上级类别', 1),
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.parentFinanceClass()
    this.classId = this.$route.query.id
    this.$store.dispatch('getConstant', ['applyBusiness', 'financeClassType'])
    if (this.$route.query.id) {
      this.classDetail(this.$route.query.id)
      this.checkboxStu = true
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          const data = {
            businessType: (this.ruleForm.businessType.join(',')),
            classNumber: this.ruleForm.classNumber,
            name: this.ruleForm.name,
            // parentId: this.newParentId,
            parentId: this.ruleForm.parentId[this.ruleForm.parentId.length - 1],
            remark: this.ruleForm.remark,
            type: this.ruleForm.type
          }
          if (this.classId) {
            upClassdata(data, this.classId).then(res => {
              this.$router.replace({ path: '/financialManage/categoryManage' })
            })
          } else {
            financeclassAdd(data).then(res => {
              this.$router.go(-1)
            })
          }
        } else {
          return false
        }
      })
    },
    onBlurClassNumber(value) {
      if (this.ruleForm.classNumber) {
        const obj = {
          propNameList: [
            'classNumber'
          ],
          propValueList: [
            this.ruleForm.classNumber
          ]
        }
        if (this.classId) {
          obj.id = this.classId
        }
        validate(obj).then(({ data, message }) => {
          if (!data) {
            this.$message.warning(message || '类别编号已存在请重新输入')
            this.ruleForm.classNumber = ''
          }
        })
      }
    },
    onBlurClassName(value) {
      if (this.ruleForm.name) {
        const obj = {
          propNameList: [
            'name'
          ],
          propValueList: [
            this.ruleForm.name
          ]
        }
        if (this.classId) {
          obj.id = this.classId
        }
        validate(obj).then(({ data, message }) => {
          if (!data) {
            this.$message.warning(message || '类别名称已存在请重新输入')
            this.ruleForm.name = ''
          }
        })
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    getPlaceHolder(title, type = 0) {
      const typeMap = ['请输入', '请选择']
      return `${typeMap[type]}${title}`
    },
    parentFinanceClass() {
      getParentFinanceClass().then(res => {
        this.removeEmptyChildren(res.data)
        this.handleOrgList = res.data
      })
    },
    removeEmptyChildren(node) {
      node.forEach(item => {
        if ('childrens' in item && item.childrens.length === 0) {
          delete item.childrens
        } else if ('childrens' in item && item.childrens.length) {
          this.removeEmptyChildren(item.childrens)
        }
      })
    },
    classDetail(id) {
      getClassDetail(id).then(({ data }) => {
        this.ruleForm.businessType = data.businessType ? data.businessType.split(',') : []
        this.ruleForm.classNumber = data.classNumber
        this.ruleForm.type = data.type
        this.ruleForm.name = data.name
        this.ruleForm.parentId = data.parentPath ? data.parentPath.split(',') : []
        this.ruleForm.remark = data.remark
      })
    }
  }
}
</script>
<style lang="less" scoped>
.category-add {
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
