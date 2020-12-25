<template>
  <div class="essential-information">
    <el-form label-width="135px" :rules="rules" :model="ruleform">
      <el-row>
        <el-col :span="8">
          <el-form-item label="供货单号" prop="rolename">
            <el-input v-model="ruleform.rolename" :disabled="true" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="订单号" prop="rolename">
            <el-input v-model="ruleform.rolename" :disabled="true" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="购买企业" prop="rolename">
            <el-input v-model="ruleform.rolename" :disabled="true" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="收货人" prop="roletype">
            <el-input v-model="ruleform.rolename" :disabled="true" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收货人联系方式" prop="roletype">
            <el-input v-model="ruleform.rolename" :disabled="true" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发货方式" prop="roletype">
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
          <el-form-item label="预计到货时间" prop="range">
            <el-input v-model="ruleform.rolename" :disabled="true" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="发货材料款（元）" prop="range">
            <el-input v-model="ruleform.rolename" :disabled="true" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="收货地址" prop="type">
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
          <el-form-item label="详细地址" prop="type">
            <el-input v-model="ruleform.rolename" :disabled="true" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="验证资料" prop="remark">
            <span style="color:#0a4c8a">134533333223</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="送货人" prop="remark">
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="送货人联系方式" prop="remark">
            <el-input v-model="ruleform.rolename" placeholder="请输入" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发货日期" prop="remark">
            <el-date-picker
              style="width：100%"
              v-model="ruleform.rolename"
              type="date"
              :disabled="true"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
              type="textarea"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
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
        rolename: "",
        roletype: "",
        range: "",
        type: "",
        application: "",
        remark: ""
      },
      rules: {
        rolename: [
          {
            required: true,
            message: "请填写"
          }
        ],
        roletype: [
          {
            required: true,
            message: "请选择"
          }
        ],
        range: [
          {
            required: true,
            message: "请选择"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择"
          }
        ],
        application: [
          {
            required: true,
            message: "请填写"
          }
        ]
      }
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    view() {}
  }
};
</script>

<style lang="less">
</style>
