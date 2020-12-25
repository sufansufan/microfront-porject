<template>
  <div class="essential-information">
    <el-form
      label-width="130px"
      :rules="rules"
      :model="ruleform"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="采购单号"
            prop="rolename"
          >
            <el-input
              v-model="ruleform.rolename"
              :disabled="true"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="项目名称"
            prop="rolename"
          >
            <el-select
              v-model="ruleform.roletype"
              placeholder="请选择"
              style="width:100%"
              :disabled="true"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="是否项目自采"
            prop="rolename"
          >
            <el-select
              v-model="ruleform.roletype"
              placeholder="请选择"
              style="width:100%"
              :disabled="true"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="项目经理"
            prop="roletype"
          >
            <el-input
              v-model="ruleform.rolename"
              :disabled="true"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="供应商"
            prop="roletype"
          >
            <el-input
              v-model="ruleform.rolename"
              :disabled="true"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="供应商联系人"
            prop="roletype"
          >
            <el-input
              v-model="ruleform.rolename"
              :disabled="true"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="供应商联系方式"
            prop="range"
          >
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="材料款（元）"
            prop="range"
          >
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
              :disabled="true"
            />

          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="总运费（元）"
            prop="range"
          >
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="其他费用（元）"
            prop="type"
          >
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="付款方式"
            prop="type"
          >
            <el-select
              v-model="ruleform.roletype"
              placeholder="请选择"
              style="width:100%"
              :disabled="true"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="预付款比例（%）"
            prop="type"
          >
            <el-input-number
              v-model="num"
              :min="1"
              :max="10"
              label="描述文字"
              :disabled="true"
              style="width:100%"
              @change="handleChange"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="总金额（元）"
            prop="remark"
          >
            <el-input
              v-model="ruleform.remark"
              placeholder="请输入"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="是否已签合同"
            prop="remark"
          >
            <el-select
              v-model="ruleform.roletype"
              placeholder="请选择"
              style="width:100%"
              :disabled="true"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="合同编号"
            prop="remark"
          >
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="收货地址"
            prop="remark"
          >
            <el-select
              v-model="ruleform.roletype"
              placeholder="请选择"
              style="width:100%"
              :disabled="true"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item
            label="详细地址"
            prop="remark"
          >
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
              :disabled="true"
            />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="附件"
            prop="remark"
          >
            <span style="color:#0a4c8a">010101010</span>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="申请人"
            prop="remark"
          >
            <el-input
              v-model="ruleform.remark"
              placeholder="请输入"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="申请人联系方式"
            prop="remark"
          >
            <el-input
              v-model="ruleform.remark"
              placeholder="请输入"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="申请日期"
            prop="remark"
          >
            <el-date-picker
              v-model="ruleform.remark"
              type="date"
              style="width:100%"
              :disabled="true"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
          <el-rol :span="24">
            <el-form-item
              label="备注"
              prop="remark"
            >
              <el-input
                v-model="ruleform.remark"
                placeholder="请输入"
                :disabled="true"
                type="textarea"
              />
            </el-form-item>
          </el-rol>
        </el-row>

    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 1,
      ruleform: {
        rolename: '',
        roletype: '',
        range: '',
        type: '',
        application: '',
        remark: ''
      },
      rules: {
        rolename: [
          {
            required: true,
            message: '请填写'
          }
        ],
        roletype: [
          {
            required: true,
            message: '请选择'
          }
        ],
        range: [
          {
            required: true,
            message: '请选择'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择'
          }
        ],
        application: [
          {
            required: true,
            message: '请填写'
          }
        ]
      }
    }
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
    view() {}
  }
}
</script>

<style lang="less">

</style>
