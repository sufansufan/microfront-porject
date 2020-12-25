<template>
  <div class="secret-add">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="200px" class="resorce-form">
      <el-row>
        <el-col :span="24">
          <el-form-item label="企业名称" prop="enterpriseId">
            <el-select
                    v-model="ruleForm.enterpriseId"
                    filterable
                    reserve-keyword
                    clearable
                    placeholder="请输入企业名称"
                    :loading="companyLoading">
              <el-option
                      v-for="item in companyList"
                      :key="item.id"
                      :label="item.companyName"
                      :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="内容" prop="content">
            <el-input type="textarea" v-model.trim="ruleForm.content" :maxlength="30000" placeholder="请输入要加密的内容" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="密钥分割成几份" prop="splitNum">
            <el-input v-model.trim="ruleForm.splitNum" :maxlength="20" placeholder="请输入份数" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="密钥合并所需要的份数" prop="joinNum">
            <el-input v-model.trim="ruleForm.joinNum" :maxlength="20" placeholder="请输入份数" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item class="btnadd">
            <el-button type="primary" @click="submit">保存</el-button>
            <el-button @click="$router.go(-1)">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <drag-dialog ref="dialogSecret" title="密钥生成" width="45%">
      <div v-for="(item,index) in secretList">
        {{item.label}}：<el-input class="text" v-model="item.value" ></el-input>
      </div>
    </drag-dialog>
  </div>
</template>
<script>
  import { addSecret } from '@core/api/auditManageSys/accessSecret'
  import { findAllCompany } from '@core/api/operationManage/company'
  import DragDialog from '@frames/dashboard/components/Dialog'

  export default {
    components: {
      DragDialog
    },
    data() {
      return {
        ruleForm: {
          splitNum: 2,
          joinNum: 2
        },
        menuList: [],
        dialogForm: {
        },
        deepDialogForm: {},
        typeShow: null,
        tableData: [],
        companyList: [],
        companyLoading: false,
        secretList: [],
        rules: {
          enterpriseId: [{ required: true, message: '企业不能为空', trigger: 'blur' }],
          content: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
          splitNum: [{ required: true, message: '请输入份数', trigger: 'blur' }],
          joinNum: [{ required: true, message: '请输入份数', trigger: 'blur' }]
        }
      }
    },
    computed: {
    },
    created() {
      this.companyQuery();
    },
    methods: {
      companyQuery() {
        this.companyLoading = true
        findAllCompany().then(res => {
          this.companyList = res.data
          this.companyLoading = false
        })
      },
      submit() {
        this.$refs.ruleForm.validate(valid => {
          const params = {
            ...this.ruleForm
          }
          const filterList = this.companyList.filter(item => {
            return item.id === this.ruleForm.enterpriseId
          })
          params.enterpriseName = filterList[0].companyName
          if (valid) {
            addSecret(params).then(res => {
              const secretText = res.data.secretText;
              const secretArr = secretText.split(',');
              for ( const i in secretArr) {
                this.secretList.push({
                  label: "第"+(i)+"个密钥",
                  value: secretArr[i]
                })
              }
              console.log(this.secretList)
              this.$message.success('新增成功')
              this.$refs.dialogSecret.show = true
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .secret-add {
    padding: 10px;
    height: calc(100vh - 160px);
    overflow-x: auto;
    .fill-name {
      width: 100%;
    }
    .btnadd {
      width: 100%;
      text-align: center;
    }
    .basicroleBtn {
      margin-bottom: 3px;
    }

  }
</style>
