<template>
  <div class="new-car">
    <el-form
      label-width="120px"
      :rules="rules"
      :model="ruleform"
    >
      <el-row>
        <el-col :span="12">
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
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="用车人"
            prop="rolename"
          >
            <el-select
              v-model="ruleform.rolename"
              placeholder="请选择"
              style="width:100%"
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
        <el-col :span="12">
          <el-form-item
            label="所属组织"
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
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="用车时间"
            prop="range"
          >
            <el-date-picker
              v-model="ruleform.roletype"
              type="datetime"
              style="width:100%"
              placeholder="选择日期时间"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="目的地"
            prop="range"
          >
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
            />

          </el-form-item>
        </el-col>

      </el-row>
      <el-row>

        <el-col :span="12">
          <el-form-item
            label="预计返回时间"
            prop="range"
          >
            <el-date-picker
              v-model="ruleform.roletype"
              style="width:100%"
              type="datetime"
              placeholder="选择日期时间"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="乘车人数"
            prop="range"
          >
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
            />

          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="用车事由"
            prop="range"
          >
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
              type="textarea"
            />

          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="录入人"
            prop="remark"
          >
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="录入时间"
            prop="remark"
          >
            <el-date-picker
              v-model="ruleform.rolename"
              style="width:100%"
              type="datetime"
              :disabled="true"
              placeholder="选择日期时间"
            />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="审批人"
            prop="remark"
          >
            <process style="text-align:left" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="width:100%;text-align:center">
      <el-button type="primary">
        提交
      </el-button>
      <el-button type="primary">
        保存
      </el-button>
      <el-button class="cancel-btn" @click="$router.go(-1)">
        取消
      </el-button>
    </div>

  </div>
</template>

<script>
import Process from '@frames/dashboard/components/Process'

export default {
  components: { Process },
  data() {
    return {
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

  }
}
</script>

<style lang="less">
.new-car {
  height: calc(100vh - 160px);
  overflow-y: auto;
  padding: 10px;
}
</style>
