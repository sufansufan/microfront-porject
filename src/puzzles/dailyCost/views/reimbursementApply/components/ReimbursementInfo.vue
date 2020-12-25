<template>
  <div class="reimbursement-info">
    <div class="title">
      <crumb-box>
        <div>报销信息</div>
      </crumb-box>
    </div>
    <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="info-form">
      <el-form-item label="报销单号">
        <el-input v-model="ruleForm.name" placeholder="请输入报销单号" :disabled="disable" />
      </el-form-item>
      <el-form-item label="报销人">
        <el-input v-model="ruleForm.name" placeholder="请输入报销人" :disabled="disable" />
      </el-form-item>
      <el-form-item label="所属组织">
        <el-select v-model="ruleForm.value" placeholder="请选择所属组织" style="width: 100%" :disabled="disable">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否项目费用">
        <el-select v-model="ruleForm.value" placeholder="请选择是否项目费用" style="width: 100%" :disabled="disable">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-select v-model="ruleForm.value" placeholder="请选择项目名称" style="width: 100%" :disabled="disable">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="归属单位">
        <el-input v-model="ruleForm.name" placeholder="请输入归属单位" :disabled="disable" />
      </el-form-item>
      <el-form-item label="报销明细" class="full-width">
        <detail :disable="disable" />
      </el-form-item>
      <el-form-item label="报销总金额">
        <el-input v-model="ruleForm.name" placeholder="请输入报销总金额" :disabled="disable" />
      </el-form-item>
      <el-form-item label="单据总张数">
        <el-input v-model="ruleForm.name" placeholder="请输入单据总张数" :disabled="disable" />
      </el-form-item>
      <el-form-item label="报销类型">
        <el-select v-model="ruleForm.value" placeholder="请选择报销类型" style="width: 100%" :disabled="disable">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="报销对象">
        <el-select v-model="ruleForm.value" placeholder="请选择报销对象" style="width: 100%" :disabled="disable">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="借款单号">
        <div class="item">
          <el-input v-model="ruleForm.name" placeholder="请输入借款单号" :disabled="disable" />
          <el-button type="primary">查看</el-button>
        </div>
      </el-form-item>
      <el-form-item label="借款金额">
        <el-input v-model="ruleForm.name" placeholder="请输入借款金额" :disabled="disable" />
      </el-form-item>
      <el-form-item label="此次冲抵金额">
        <el-input v-model="ruleForm.name" placeholder="请输入此次冲抵金额" :disabled="disable" />
      </el-form-item>
      <el-form-item label="借款剩余金额">
        <el-input v-model="ruleForm.name" placeholder="请输入借款剩余金额" :disabled="disable" />
      </el-form-item>
      <el-form-item label="应付金额">
        <el-input v-model="ruleForm.name" placeholder="请输入应付金额" :disabled="disable" />
      </el-form-item>
      <el-form-item label="借款用途" class="full-width">
        <el-input v-model="ruleForm.name" placeholder="请输入借款用途" type="textarea" :disabled="disable" />
      </el-form-item>
      <el-form-item label="备注" class="full-width">
        <el-input v-model="ruleForm.name" placeholder="请输入备注" type="textarea" :disabled="disable" />
      </el-form-item>
      <el-form-item label="附件" class="full-width">
        <p>
          123.doc
        </p>
      </el-form-item>
    </el-form>
    <div class="title">
      <crumb-box>
        <div>确认信息</div>
      </crumb-box>
    </div>
    <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="info-form">
      <el-form-item label="付款金额">
        <el-input v-model="ruleForm.name" placeholder="请输入付款金额" :disabled="disable" />
      </el-form-item>
      <el-form-item label="付款日期">
        <el-input v-model="ruleForm.name" placeholder="请输入付款日期" :disabled="disable" />
      </el-form-item>
      <el-form-item label="付款人">
        <el-select v-model="ruleForm.value" placeholder="请选择付款人" style="width: 100%" :disabled="disable">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="付款账户类型">
        <el-select v-model="ruleForm.value" placeholder="请选择付款账户类型" style="width: 100%" :disabled="disable">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="付款账户">
        <el-input v-model="ruleForm.name" placeholder="请输入付款账户" :disabled="disable" />
      </el-form-item>
      <el-form-item label="支票号">
        <el-input v-model="ruleForm.name" placeholder="请输入支票号" :disabled="disable" />
      </el-form-item>
      <el-form-item label="备注" class="full-width">
        <el-input v-model="ruleForm.name" placeholder="请输入备注" type="textarea" :disabled="disable" />
      </el-form-item>
      <el-form-item label="确认人">
        <el-input v-model="ruleForm.name" placeholder="请输入确认人" :disabled="disable" />
      </el-form-item>
      <el-form-item label="确认时间">
        <el-input v-model="ruleForm.name" placeholder="请输入确认时间" :disabled="disable" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Detail from './Detail'
import CrumbBox from '@frames/dashboard/components/CrumbBox'
export default {
  components: {
    Detail,
    CrumbBox
  },
  props: {
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ruleForm: {
        name: '',
        value: ''
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }]
    }
  }
}
</script>

<style lang="less" scoped>
.reimbursement-info {
  .title {
    margin-bottom: 20px;
  }
  .info-form {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      width: 33.33%;
      p {
        text-decoration: underline;
        color: #0a4c8a;
      }
      &.full-width {
        width: 100%;
      }
      .item {
        display: flex;
        & > .el-button {
          margin-left: 10px;
        }
      }
    }
  }

}
</style>
