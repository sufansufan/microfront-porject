<template>
  <div class="resorce-add">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="resorce-form" label-width="100px">
      <el-form-item label="分类编码" prop="classNumber">
        <el-input v-model.trim="ruleForm.classNumber" :maxlength="20" :disabled="disabled" placeholder="请输入分类编码" />
      </el-form-item>
      <el-form-item label="分类名称" prop="className">
        <el-input v-model.trim="ruleForm.className" :maxlength="20" :disabled="disabled" placeholder="请输入分类名称" />
      </el-form-item>
      <el-form-item label="上级分类" prop="classType">
        <el-cascader
          v-model="ruleForm.classType"
          placeholder="请选择上级分类"
          filterable
          :options="treeData"
          :props="{ multiple: false, checkStrictly: true ,value: 'id', label: 'name', children: 'childrens',}"
          clearable
        />
      </el-form-item>
      <el-form-item label="状态" prop="classState">
        <el-select v-model="ruleForm.classState" disabled="false" placeholder="请选择上级分类" @change="getClassState">
          <el-option v-for="item in constant.productClassState" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="说明" class="all-width row-label" prop="classRemark">
        <el-input v-model.trim="ruleForm.classRemark" type="textarea" :maxlength="255" :rows="3" clearable :disabled="disabled" placeholder="请输入说明" />
      </el-form-item>
    </el-form>
    <div class="submit-div">
      <el-button type="primary" @click="save()">保存</el-button>
      <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>

<script>
import { addProductclass, getTwoLeveTree } from '@core/api/productClassification'
import upload from '@core/mixins/upload'
import { validateLength, validateCodeNum } from '@core/utils/validate'
import { treeChildrenEmpty } from '@core/utils'

import { mapGetters } from 'vuex'
export default {
  mixins: [upload],
  data() {
    var validateIsCodeNum = (rule, value, callback) => {
      if (validateCodeNum(value)) {
        callback()
      } else {
        callback('编码仅包含数字，字母')
      }
      // 可能会用到
      // this.isOnlyOne().then(isOnlyOne => {
      //   if (this.isOnlyOne()) {
      //     callback()
      //   } else {
      //     callback('编码要唯一')
      //   }
      // })
    }
    return {
      ruleForm: {
        classNumber: '',
        className: '',
        classType: [],
        parentId: '',
        classState: '01',
        classRemark: ''
      },
      rules: {
        classNumber: [{ required: true, message: '请输入分类编码 ', trigger: 'blur' },
          validateLength(0, 20),
          { required: true, validator: validateIsCodeNum, trigger: 'blur' }],
        className: [{ required: true, message: '请输入分类名称 ', trigger: 'blur' }, validateLength(0, 20)]
      },
      treeData: []
    }
  },

  computed: {
    ...mapGetters(['constant'])
  },
  watch: {
    personnelId: {
      handler(value) {
      }
    },
    'ruleForm.classNumber': {
      handler: function(value) {
      }
    }

  },
  created() {
    this.$store.dispatch('getConstant', ['productClassState']).then(() => {})
    this.getTree()
  },
  methods: {
    save() {
      this.$refs['ruleForm'].validate((valid) => {
        if (!valid) {
          return false
        } else {
          const params = {
            classNumber: this.ruleForm.classNumber,
            id: '',
            name: this.ruleForm.className,
            parentId: [...this.ruleForm.classType].pop(),
            parentName: this.ruleForm.parentId,
            remark: this.ruleForm.classRemark,
            state: this.ruleForm.classState
          }
          addProductclass(params).then(({ data }) => {
            this.$message.success('保存成功!')
            this.$router.go(-1)
          })
        }
      })
    },
    getTree() {
      getTwoLeveTree({}).then(({ data }) => {
        this.treeData = treeChildrenEmpty(data, 'childrens')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.resorce-add {
  padding: 5px 10px;
  .resorce-form {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      /*margin-bottom: 10px;*/
      width: 50%;
    }
    .el-cascader, .el-select, .all-width{
      width:100%
    }

  }
}

.submit-div{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px
}
</style>
