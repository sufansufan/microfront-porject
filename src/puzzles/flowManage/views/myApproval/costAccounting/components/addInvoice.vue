<template>
  <div class="add-invoice">
    <el-form
      :rules="rules"
      :model="ruleform"
      label-width="140px"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="发票编号"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="报销科目"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="报销金额  (元)"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="收票日期"
            prop="number"
          >
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="开票日期"
            prop="number"
          >
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="发票类型"
            prop="number"
          >
            <el-select
              v-model="number"
              placeholder="请选择申请类别"
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
        <el-col :span="8">
          <el-form-item
            label="发票金额  (元)"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="开票税率  (%)"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="发票税金  (元)"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="发票无税金额  (元)"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="发票代码"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="销方纳税人识别号"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="开票单位">
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="名称"
            prop="name"
          >
            <el-input
              v-model="ruleform.name"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="接口地址"
            prop="serviceurl"
          >
            <el-input
              v-model="ruleform.serviceurl"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="备注"
            prop="remark"
          >
            <el-input
              v-model="ruleform.remark"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="附件">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button
                size="small"
                type="primary"
              >点击上传</el-button>
              <div
                slot="tip"
                class="el-upload__tip"
              >单个附件请不要超过20M</div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item class="btnadd">
            <el-button type="primary">保存</el-button>
            <el-button type="primary">保存并新增</el-button>
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
        { label: '定时', value: 'timing' },
        { label: '即时', value: 'timedImmediate' }
      ],
      downTime: '',
      ruleform: {
        number: '',
        available: false,
        name: '',
        serviceurl: '',
        servicerule: '',
        remark: ''
      },
      rules: {
        number: [{ required: true, message: '请填写' }],
        available: [{ required: true, message: '请填写' }],
        name: [{ required: true, message: '请填写' }],
        serviceurl: [{ required: true, message: '请填写' }],
        servicerule: [{ required: true, message: '请填写' }]
      }
    }
  }
}
</script>

<style lang="less">
.add-invoice {
  .btnadd {
    width: 100%;
    text-align: right;
  }
  .el-date-editor.el-input {
    width: 100%;
  }
}
</style>
