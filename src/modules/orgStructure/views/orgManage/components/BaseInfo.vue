<template>
  <div class="base-info">
    <el-form ref="ruleForm" :model="ruleForm" label-width="160px" :rules="rules" class="ruleForm">
      <div :class="companyType === '1' ? 'companyType' : 'companydefault'">
        <div>
          <el-form-item label="组织编号" prop="orgNumber">
            <el-input v-model="ruleForm.orgNumber" :disabled="disabled" placeholder="请输入组织编号" />
          </el-form-item>
          <el-form-item label="组织名称" prop="orgName">
            <el-input v-model="ruleForm.orgName" :disabled="disabled" placeholder="请输入组织名称" />
          </el-form-item>
          <el-form-item label="简称" prop="simpleName">
            <el-input v-model="ruleForm.simpleName" :disabled="disabled" placeholder="请输入简称" />
          </el-form-item>
          <el-form-item label="组织类别" prop="orgType">
            <el-select v-model="ruleForm.orgType" :disabled="disabled" placeholder="请选择组织类别">
              <el-option
                v-for="item in constant.orgType"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="上级组织" prop="parentId">
            <el-cascader v-model="ruleForm.parentId" placeholder="请选择上级组织" :options="topOrganization" :props="defaultProps" :disabled="disabled" clearable style="width:100%" @change="change" />

          </el-form-item>
          <el-form-item label="顺序号" prop="sequenceNumber">
            <el-input v-model="ruleForm.sequenceNumber" :disabled="disabled" placeholder="请输入顺序号" />
          </el-form-item>
        </div>
        <template v-if="companyType === '1'">
          <div class="upload-frame">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
              <div slot="tip" class="tip-color">建议上传200X200px的图片，大小不能超过2M</div>
            </el-upload>
          </div>
        </template>
      </div>
      <el-form-item label="是否是法人单位" prop="isLegalEntity">
        <el-select v-model="ruleForm.isLegalEntity" :disabled="disabled" placeholder="请选择是否是法人单位">
          <el-option
            v-for="item in constant.isLegalEntity"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="法定代表人" prop="legalPersonName">
        <el-input v-model="ruleForm.legalPersonName" :disabled="disabled" placeholder="请输入法定代表人" />
      </el-form-item>
      <el-form-item label="主营业务" prop="mainBusiness">
        <el-select v-model="ruleForm.mainBusiness" :disabled="disabled" placeholder="请选择主营业务">
          <el-option
            v-for="item in constant.mainBusiness"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="统一社会信用代码" prop="creditCode">
        <el-input v-model="ruleForm.creditCode" :disabled="disabled" placeholder="请输入统一社会信用代码" />
      </el-form-item>
      <el-form-item label="注册资本" prop="registeredCapital">
        <el-input v-model="ruleForm.registeredCapital" :disabled="disabled" placeholder="请输入注册资本" />
      </el-form-item>
      <el-form-item label="注册地" prop="registeredPlace">
        <el-select v-model="ruleForm.registeredPlace" :disabled="disabled" placeholder="请选择注册地">
          <el-option
            v-for="item in constant.nativePlace"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="成立日期" prop="establishmentDate">
        <el-date-picker
          v-model="ruleForm.establishmentDate"
          :disabled="disabled"
          placeholder="请选择成立日期"
          type="date"
        />
      </el-form-item>
      <el-form-item label="联系电话" prop="telephone">
        <el-input v-model="ruleForm.telephone" :disabled="disabled" placeholder="请输入联系电话" />
      </el-form-item>
      <el-form-item label="办公地址" prop="officeAddress">
        <el-input v-model="ruleForm.officeAddress" :disabled="disabled" placeholder="请输入办公地址" />
      </el-form-item>
      <el-form-item label="企业性质" prop="unitNature">
        <el-select v-model="ruleForm.unitNature" :disabled="disabled" placeholder="请选择企业性质">
          <el-option
            v-for="item in constant.enterpriseNature"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="纳税人类型" prop="taxpayerType">
        <el-select v-model="ruleForm.taxpayerType" :disabled="disabled" placeholder="请选择纳税人类型">
          <el-option
            v-for="item in constant.taxpayerType"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="经营模式" prop="managementModel">
        <el-select v-model="ruleForm.managementModel" :disabled="disabled" placeholder="请选择经营模式">
          <el-option
            v-for="item in constant.managementModel"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否提供加工/定制服务" prop="isMachining">
        <el-select v-model="ruleForm.isMachining" :disabled="disabled" placeholder="请选择是否提供加工/定制服务">
          <el-option
            v-for="item in constant.isMachining"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="主营产品分类-1" class="full-width" prop="mainProducts">
        <el-select v-model="ruleForm.mainProducts" :disabled="disabled" placeholder="请选择主营产品分类-1">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工艺说明" class="full-width" prop="processDescription">
        <el-input v-model="ruleForm.processDescription" type="textarea" :rows="3" :disabled="disabled" placeholder="请输入工艺说明" />
      </el-form-item>
      <el-form-item label="组织简介" class="full-width" prop="orgProfile">
        <el-input v-model="ruleForm.orgProfile" type="textarea" :rows="3" :disabled="disabled" placeholder="请输入组织简介" />
      </el-form-item>
      <el-form-item label="附件" class="full-width">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
        >
          <el-button type="primary">点击上传</el-button>
          <div slot="tip" class="tip-color">单个附件请不超过2M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="备注" class="full-width" prop="remark">
        <el-input v-model="ruleForm.remark" type="textarea" :rows="3" :disabled="disabled" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import upload from '@core/mixins/upload'
import { saveOrganization, editOrganization, detailsOrg, getOrgTree } from '@core/api/organization'
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
    },
    personnelId: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      optionsoptions: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'orgName',
        value: 'id'
      },

      ruleForm: {
        orgNumber: '',
        orgName: '',
        simpleName: '',
        orgType: '',
        parentId: [],
        sequenceNumber: '',
        isLegalEntity: '',
        legalPersonName: '',
        mainBusiness: '',
        creditCode: '',
        registeredCapital: '',
        registeredPlace: '',
        establishmentDate: '',
        telephone: '',
        officeAddress: '',
        unitNature: '',
        taxpayerType: '',
        managementModel: '',
        isMachining: '',
        mainProducts: '',
        processDescription: '',
        orgProfile: '',
        remark: ''

      },
      rules: {
        orgName: [{
          required: true,
          message: '请输入组织名称 ',
          trigger: 'blur'
        }],
        orgType: [{
          required: true,
          message: '请选择组织类别 ',
          trigger: 'change'
        }],
        parentId: [{
          required: true,
          message: '请选择上级组织 ',
          trigger: 'change'
        }],
        sequenceNumber: [{
          required: true,
          message: '请输入顺序号 ',
          trigger: 'blur'
        }],
        isLegalEntity: [{
          required: true,
          message: '请选择是否法人单位 ',
          trigger: 'change'
        }],
        legalPersonName: [{
          required: true,
          message: '请输入法定代表人 ',
          trigger: 'blur'
        }],
        creditCode: [{
          required: true,
          message: '请输入统一社会信用代码 ',
          trigger: 'blur'
        }],
        registeredCapital: [{
          required: true,
          message: '请输入注册资本 ',
          trigger: 'blur'
        }],
        registeredPlace: [{
          required: true,
          message: '请选择注册地',
          trigger: 'change'
        }],
        establishmentDate: [{
          required: true,
          message: '请选择成立日期',
          trigger: 'change'
        }],
        officeAddress: [{
          required: true,
          message: '请输入办公地址',
          trigger: 'blur'
        }],
        unitNature: [{
          required: true,
          message: '请选择企业性质',
          trigger: 'change'
        }],
        managementModel: [{
          required: true,
          message: '请选择经营模式',
          trigger: 'change'
        }],
        isMachining: [{
          required: true,
          message: '请选择是否提供加工/定制服务',
          trigger: 'change'
        }],
        mainProducts: [{
          required: true,
          message: '请选择主营产品分类',
          trigger: 'change'
        }]

      },
      topOrganization: [],
      options: [
        {
          label: '总公司',
          value: 1
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['organizationState', 'isLegalEntity', 'mainBusiness', 'nativePlace', 'orgType', 'mainBusiness', 'enterpriseNature', 'taxpayerType', 'managementModel', 'isMachining']).then(() => {
      if (this.personnelId) {
        this.fetchData()
      }
    })
    this.getTree()
  },
  methods: {
    fetchData() {
      this.loading = true
      detailsOrg(this.personnelId).then(({ data }) => {
        this.ruleForm = data
        this.loading = false
      })
    },

    getTree() {
      getOrgTree().then(({ data }) => {
        this.topOrganization = data
      })
    },
    change(val) {
      console.log(val, '11111')
    },
    addOrEdit() {
      return new Promise((resolve, inject) => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.loading = true
            const { parentId } = this.ruleForm
            const params = {
              ...this.ruleForm,
              parentId: parentId.length ? parentId[parentId.length - 1] : '',
              parentPath: parentId.toString()
            }
            this.loading = true
            if (this.personnelId) {
              editOrganization(params, this.personnelId).then(() => {
                this.$message.success('修改成功!')
                resolve()
              })
            } else {
              saveOrganization(params).then(({ data: { id }}) => {
                this.$message.success('保存成功!')
                resolve(id)
              })
            }
            this.loading = false
          } else {
            console.log('error submit!!')
            inject()
            return false
          }
        })
      })
    }

  }
}
</script>

<style lang="less" scoped>
.base-info {
  .ruleForm {
    display: flex;
    flex-wrap: wrap;
    & > .el-form-item  {
      width: 33.33%;
    }
    .companyType {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      & > div {
        &:first-child {
          width: 66.66%;
          display: flex;
          flex-wrap: wrap;
          .el-form-item  {
            width: 50%;
          }
        }
        &:last-child {
          width: 33.33%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .companydefault {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
       & > div {
        &:first-child {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          .el-form-item  {
            width: 33.33%;
          }
        }
      }
    }
    .el-select, .el-input {
      width: 100%;
    }
    .full-width {
      width: 100%;
    }
  }
}
</style>
