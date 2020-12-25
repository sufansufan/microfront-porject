<template>
  <div class="resorce-add">
    <el-form ref="ruleForm" :model="ruleForm" class="resorce-form" label-width="100px">
      <el-form-item label="分类编号" prop="classNumber">
        <el-input v-model.trim="ruleForm.classNumber" :maxlength="20" :disabled="disabled" placeholder="请输入分类编号" />
      </el-form-item>
      <el-form-item label="分类名称" prop="className">
        <el-input v-model.trim="ruleForm.className" :maxlength="20" :disabled="disabled" placeholder="请输入分类名称" />
      </el-form-item>
      <el-form-item label="上级分类" prop="classType">
        <el-input v-model.trim="ruleForm.parentPathName" :maxlength="20" :disabled="disabled" placeholder="" />
      </el-form-item>
      <el-form-item label="状态" prop="classState">
        <el-select v-model="ruleForm.classState" :disabled="disabled " placeholder="请选择上级分类" @change="getClassState">
          <el-option v-for="item in constant.productClassState" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="说明" class="all-width row-label" prop="classRemark">
        <el-input v-model.trim="ruleForm.classRemark" type="textarea" :maxlength="255" :rows="3" clearable :disabled="disabled" placeholder="请输入说明" />
      </el-form-item>
      <el-form-item v-if="islastLevel" label="分类属性" class="all-width" prop="classRemark">
        <el-button v-if="!disabled" size="mini" type="primary" @click="dialogVisible = true">添加属性</el-button>
        <div :class="disabled?'submit-div2':'submit-div'">
          <div style="width: 100% ">
            <el-table
              ref="tableRef"
              v-loading="loading"
              :data=" ruleForm.productClassPropertys"
              row-key="id"
              border
              max-height="calc(100vh - 300px)"
              @sort-change="sortTable"
              @select="handleSelectionSingleChange"
            >
              <el-table-column prop="name" label="属性名称" align="center" width="160" />
              <el-table-column prop="content" label="属性内容" align="center" :show-overflow-tooltip="true" />
            </el-table>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <div v-if="!disabled" class="submit-div">
      <el-button type="primary" @click="saveProductAttribute">保存</el-button>
      <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>

<script>
import { getLeftTree, getOne } from '@core/api/productClassification'
import upload from '@core/mixins/upload'
import { mapGetters } from 'vuex'
export default {
  mixins: [upload],
  props: {
    disabled: {
      default: true,
      type: Boolean
    },
    companyType: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      content: [],
      attributeForm: {
        content: '',
        id: '',
        name: '',
        productClassId: '',
        sortNumber: ''
      },
      ruleForm: {
        classNumber: '',
        className: '',
        classType: '',
        parentId: '',
        classState: '',
        classRemark: '',
        parentPathName: '',
        id: '',
        productClassPropertys: []
      },
      loading: false,
      dialogVisible: false,
      routeType: '',
      islastLevel: false
    }
  },

  computed: {
    ...mapGetters(['constant'])
  },
  watch: {},
  created() {
    this.$store.dispatch('getConstant', ['productClassState']).then(() => {})
    this.routeType = this.$route.query.type
    this.islastLevel = this.$route.query.islastLevel
    const id = this.$route.query.id
    this.getOneForID(id)
    // this.getTree1()
  },
  methods: {
    getOneForID(id) {
      this.loading = true
      getOne(id).then(({ data }) => {
        this.ruleForm.classNumber = data.classNumber
        this.ruleForm.className = data.name
        this.ruleForm.classType = data.classNumber
        this.ruleForm.parentId = data.parentId
        this.ruleForm.classState = data.state
        this.ruleForm.classRemark = data.remark
        this.ruleForm.parentPathName = data.parentPathName
        this.ruleForm.id = data.id
        this.ruleForm.productClassPropertys = data.productClassPropertys
        this.loading = false
      })
    },
    getTree1() {
      getLeftTree({}).then(({ data }) => {
        this.treeData = data
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
        margin-bottom: 10px;
        width: 50%;
      }
      .el-select, .all-width{
        width:100%
      }
      .el-cascader, .all-width{
        width:100%
      }
    }
  }

  .submit-div{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px
  }

  .submit-div2{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
