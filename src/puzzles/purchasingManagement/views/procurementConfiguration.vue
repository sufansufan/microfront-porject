<template>
  <div class="procurement-configuration">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="dictionary-form" label-width="130px">
      <el-form-item label="自采岗位" prop="type" class="full-item">
        <el-select v-model="value" multiple placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <div style="color: rgb(153, 153, 153);font-size:14px;">说明：员工任职岗位中含有该岗位，采购时则可以选购所有产品。</div>
      </el-form-item>
    </el-form>
    <div class="sub">
      <el-button type="primary">保存</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ProcurementConfiguration',
  components: { },
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: [],
      ruleForm: {
        type: []
      },
      rules: {
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ]
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
  .procurement-configuration {
    .dictionary-form {
      display: flex;
      flex-wrap: wrap;
      .full-item {
        width: 100%;
        .el-form-item__content {
          display: flex;
          .el-select {
            width: 100%;
          }
        }
      }
    }
    .sub {
      width: 100%;
      text-align: center;
      margin: 15px 0;
    }
  }
</style>
