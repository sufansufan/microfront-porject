<template>
  <div class="view-applications">
    <div style="margin-bottom:10px;">
      <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
    <el-form
      :rules="rules"
      :model="ruleform"
      label-width="150px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请单号">
            <el-input
              v-model="ruleform.read"
              disabled="true"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请时间">
            <el-date-picker
              v-model="ruleform.read"
              disabled="true"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="申请部门"
            prop="number"
          >
            <el-input
              v-model="ruleform.read"
              disabled="true"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="申请人"
            prop="number"
          >
            <el-input
              v-model="ruleform.read"
              disabled="true"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="开具单位"
            prop="number"
          >
            <el-select
              v-model="value"
              placeholder="请选择"
              disabled="true"
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
          <el-form-item label="联系电话">
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
            label="类型"
            prop="number"
          >
            <el-select
              v-model="value"
              placeholder="请选择"
              disabled="true"
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
            label="派出人员"
            prop="number"
          >
            <el-select
              v-model="value"
              placeholder="请选择派出人员"
              disabled="true"
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
            label="人员数量"
            disabled="true"
          >
            <el-input
              v-model="ruleform.read"
              placeholder="请输入人员数量"
            />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="前往单位"
            prop="number"
          >
            <el-input
              v-model="ruleform.read"
              disabled="true"
              placeholder="请输入前往单位"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="处理事项"
            prop="number"
          >
            <el-input
              v-model="ruleform.read"
              disabled="true"
              placeholder="请输入处理事项"
            />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="附件"
            prop="number"
          >
            <span>
              西安呼哈建筑装饰工程有限公司(2019)介第004号.doc</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="备注"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              disabled="true"
              type="textarea"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item
            label="文件正文"
            prop="number"
          >
            <span>
              西安呼哈建筑装饰工程有限公司(2019)介第004号.doc</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      number: '',
      options: [
        {
          label: '定时',
          value: 'timing'
        },
        {
          label: '即时',
          value: 'timedImmediate'
        }
      ],
      downTime: '',
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
  }
}
</script>

<style lang="less">
.view-applications {
  height: calc(100vh - 160px);
  overflow-y: auto;
  padding: 20px;
  .el-textarea,
  .el-date-editor,
  .el-select {
    width: 100%;
  }
  .btnadd {
    width: 100%;
    text-align: center;
  }
}
</style>
