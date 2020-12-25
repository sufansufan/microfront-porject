<template>
  <div class="view-approved">
    <div style="margin-bottom:10px;">
      <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
    <el-form
      label-width="140px"
      :rules="rules"
      :model="ruleform"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="申请单号"
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
            label="项目编号"
            prop="rolename"
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
            label="工程状态"
            prop="roletype"
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
            label="项目归属"
            prop="roletype"
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
            label="归属单位"
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
            label="供应商"
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
            label="采购订单"
            prop="range"
          >
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
              :disabled="true"
              style="width:85%"
            />
            <el-button type="text" style="padding-left:10px;" @click="$refs.dialog.show = true">查看</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="采购总金额"
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
            label="已付金额"
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
            label="剩余未付金额"
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
            label="本次申请付款"
            prop="type"
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
            label="付款方式"
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
            label="支票号"
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
            label="要求付款时间"
            prop="remark"
          >
            <el-date-picker
              v-model="ruleform.remark"
              type="date"
              placeholder="选择日期"
              style="width:100%"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="是否预付款"
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
            label="是否已开发票"
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

      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="付款类别"
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

      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="付款说明"
            prop="remark"
          >
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
              type="textarea"
              :disabled="true"
            />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="账户名称"
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
            label="收款账号"
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
            label="开户行"
            prop="rolename"
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
            label="发票编号"
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
            label="销方纳税人识别号"
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
            label="发票代码"
            prop="rolename"
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
            label="收票日期"
            prop="rolename"
          >
            <el-date-picker
              v-model="ruleform.remark"
              type="date"
              placeholder="选择日期"
              style="width:100%"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="开票日期"
            prop="rolename"
          >
            <el-date-picker
              v-model="ruleform.remark"
              type="date"
              placeholder="选择日期"
              style="width:100%"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="发票类型"
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
            label="发票金额"
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
            label="发票税率(%)"
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
            label="发票无税金额"
            prop="rolename"
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
            label="发票税金"
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
            label="发票归类"
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
            label="票据张数"
            prop="rolename"
          >
            <el-input-number
              v-model="num"
              :min="1"
              :max="10"
              label="描述文字"
              :disabled="true"
              @change="handleChange"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-row :span="24">
          <el-form-item
            label="附件"
            prop="rolename"
          />
        </el-row>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="备注"
            prop="rolename"
          >
            <el-input
              v-model="ruleform.rolename"
              :disabled="true"
              placeholder="请输入"
              type="textarea"
            />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="申请人"
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
            label="申请时间"
            prop="rolename"
          >
            <el-date-picker
              v-model="ruleform.remark"
              type="date"
              placeholder="选择日期"
              style="width:100%"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <div class="step">
      <process direction="vertical" />
    </div>
    <drag-dialog ref="dialog" title="订单详情" width="90%">
      <view-order />
    </drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import Process from '@frames/dashboard/components/Process'
import ViewOrder from './components/ViewOrder'
export default {
  components: { Process, DragDialog, ViewOrder },
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
    view() {

    }
  }
}
</script>

<style lang="less">
.view-approved {
  height: calc(100vh - 160px);
  overflow-y: auto;
  padding: 10px;
}
</style>
