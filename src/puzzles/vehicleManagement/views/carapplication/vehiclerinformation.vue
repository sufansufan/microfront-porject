<template>
  <div class="vehicler-information">
    <div style="margin-bottom:10px;">
      <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="用车信息"
        name="first"
      >
        <el-form
          :rules="rules"
          :model="ruleform"
          label-width="130px"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="申请单号">
                <el-input
                  v-model="ruleform.read"
                  placeholder="请输入"
                  disabled="true"
                />
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="用车人"
                prop="number"
              >
                <el-input
                  v-model="ruleform.read"
                  placeholder="请输入"
                  disabled="true"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="所属组织"
                prop="number"
              >
                <el-input
                  v-model="ruleform.read"
                  placeholder="请输入"
                  disabled="true"
                />
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="用车时间"
                prop="number"
              >
                <el-date-picker
                  v-model="value1"
                  type="datetime"
                  placeholder="选择日期时间"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="目的地"
                prop="number"
              >
                <el-input
                  v-model="ruleform.read"
                  placeholder="请输入"
                  disabled="true"
                />
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="预计返还时间"
                prop="number"
              >
                <el-date-picker
                  v-model="value1"
                  type="datetime"
                  placeholder="选择日期时间"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="乘车人数"
                prop="number"
              >
                <el-input
                  v-model="ruleform.read"
                  placeholder="请输入"
                  disabled="true"
                />
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="用车事由"
                prop="number"
              >
                <el-input
                  v-model="ruleform.read"
                  type="textarea"
                  placeholder="请输入"
                  disabled="true"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="录入人"
                prop="number"
              >
                <el-input
                  v-model="ruleform.read"
                  placeholder="请输入"
                  disabled="true"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="录入时间"
                prop="number"
              >
                <el-date-picker
                  v-model="value1"
                  type="datetime"
                  placeholder="选择日期时间"
                />
              </el-form-item>
            </el-col>

          </el-row>

        </el-form>

      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      ruleform: {
        number: '',
        available: false,
        name: '',
        read: '只读',
        serviceurl: '',
        servicerule: '',
        remark: ''
      },
      rules: {
        number: [
          {
            required: true,
            message: '请填写'
          }
        ],
        available: [
          {
            required: true,
            message: '请填写'
          }
        ],
        name: [
          {
            required: true,
            message: '请填写'
          }
        ],
        serviceurl: [
          {
            required: true,
            message: '请填写'
          }
        ],
        servicerule: [
          {
            required: true,
            message: '请填写'
          }
        ]
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style lang="less" scoped>
.vehicler-information {
  padding: 20px;
  height: calc(100vh - 120px);
  overflow-y: scroll;
  .el-select,
  .el-date-editor {
    width: 100%;
  }
}
</style>
