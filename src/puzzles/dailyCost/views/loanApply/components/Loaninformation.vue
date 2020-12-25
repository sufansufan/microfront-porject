// 借款信息
<template>
  <div class="loanin-formation">
    <div class="title">
      <crumb-box>
        <div>借款信息</div>
      </crumb-box>
    </div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="借款单号">
            <el-input v-model="ruleForm.applicant" :disabled="disable" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="借款人">
            <el-input
              v-model="ruleForm.applicationTime"
              value-format="yyyy-MM-dd"
              :disabled="disable"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="所属组织"
            prop="name"
          >
            <el-select
              v-model="ruleForm.region"
              style="width: 100%"
              placeholder="请选择申请类别"
              :disabled="disable"
            >
              <el-option
                label="区域一"
                value="shanghai"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="是否项目借款"
            prop="region"
          >
            <el-select
              v-model="ruleForm.region"
              style="width: 100%"
              placeholder="请选择申请类别"
              :disabled="disable"
            >
              <el-option
                label="区域一"
                value="shanghai"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="项目名称"
            prop="name"
          >
            <el-select
              v-model="ruleForm.region"
              style="width: 100%"
              placeholder="请选择申请类别"
              :disabled="disable"
            >
              <el-option
                label="区域一"
                value="shanghai"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="归属单位"
            prop="region"
          >
            <el-input v-model="ruleForm.applicant" :disabled="disable" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="借款金额"
            prop="name"
          >
            <el-input v-model="ruleForm.applicant" :disabled="disable" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="借款类型"
            prop="region"
          >
            <el-select
              v-model="ruleForm.region"
              style="width: 100%"
              placeholder="请选择申请类别"
              :disabled="disable"
            >
              <el-option
                label="区域一"
                value="shanghai"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="借款对象"
            prop="name"
          >
            <el-select
              v-model="ruleForm.region"
              style="width: 100%"
              placeholder="请选择申请类别"
              :disabled="disable"
            >
              <el-option
                label="区域一"
                value="shanghai"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="用款日期"
            prop="region"
          >
            <el-input v-model="ruleForm.applicant" :disabled="disable" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="借款用途"
            prop="region"
          >
            <el-input
              v-model="ruleForm.region"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              :disabled="disable"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="支付方式"
            prop="region"
          >
            <el-select
              v-model="ruleForm.region"
              style="width: 100%"
              placeholder="请选择申请类别"
              :disabled="disable"
            >
              <el-option
                label="区域一"
                value="shanghai"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="收款账户名称"
            prop="region"
          >
            <el-input v-model="ruleForm.applicant" :disabled="disable" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="收款账号"
            prop="region"
          >
            <el-input v-model="ruleForm.applicant" :disabled="disable" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="开户行"
            prop="region"
          >
            <el-input v-model="ruleForm.applicant" :disabled="disable" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="附件"
            prop="region"
          />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="申请时间"
            prop="region"
          >
            <el-input v-model="ruleForm.applicant" :disabled="disable" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="title">
      <crumb-box>
        <div>确认信息</div>
      </crumb-box>
    </div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="付款金额">
            <el-input v-model="ruleForm.applicant" :disabled="disable" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="付款人">
            <el-input
              v-model="ruleForm.applicationTime"
              value-format="yyyy-MM-dd"
              :disabled="disable"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="付款日期">
            <el-input v-model="ruleForm.applicant" :disabled="disable" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预计还款日期">
            <el-input
              v-model="ruleForm.applicationTime"
              value-format="yyyy-MM-dd"
              :disabled="disable"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="支票号">
            <el-input v-model="ruleForm.applicant" :disabled="disable" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支票银行名称">
            <el-input
              v-model="ruleForm.applicationTime"
              value-format="yyyy-MM-dd"
              :disabled="disable"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="付款账户类型"
            prop="name"
          >
            <el-select
              v-model="ruleForm.region"
              style="width: 100%"
              placeholder="请选择申请类别"
              :disabled="disable"
            >
              <el-option
                label="区域一"
                value="shanghai"
              />
            </el-select>

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="付款账户"
            prop="region"
          >
            <el-input
              v-model="ruleForm.applicationTime"
              value-format="yyyy-MM-dd"
              :disabled="disable"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="备注"
            prop="name"
          >
            <el-input
              v-model="ruleForm.applicationTime"
              type="textarea"
              value-format="yyyy-MM-dd"
              :disabled="disable"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="确认人"
            prop="region"
          >
            <el-input v-model="ruleForm.applicant" :disabled="disable" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="确认时间"
            prop="name"
          >
            <el-input v-model="ruleForm.applicant" :disabled="disable" />

          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

  </div>
</template>

<script>
import CrumbBox from '@frames/dashboard/components/CrumbBox'
export default {
  components: { CrumbBox },
  props: {
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ruleForm: {
        region: ''
      }

    }
  }
}
</script>

<style>
</style>
