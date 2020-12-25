<template>
  <div class="supplier-name">
    <div style="margin:10px 0;">
      <el-button class="back-btn" @click="backGo()"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
    <div class="form-border">
      <el-form :rules="rules" :model="ruleform" label-width="150px" class="dictionary-form">
        <el-form-item label="供应商编号" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="供应商名称" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>

        <el-form-item label="联系人电话" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="联系人" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>

        <el-form-item label="合作协议" prop="number" class="there-points" style="margin-right:40%;">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>

        <el-form-item label="发布说明" prop="remark" class="full-item">
          <el-input v-model="ruleform.remark" type="textarea" :rows="3" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="企业审批意见" prop="remark" class="full-item">
          <el-input v-model="ruleform.remark" type="textarea" :rows="3" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="供应商名称" prop="number" class="there-points">
          <el-date-picker
            v-model="value1"
            type="date"
            disabled
            placeholder="选择日期"
          />
        </el-form-item>
      </el-form>
      <div>
        <el-table :data="tableData" row-key="id" border default-expand-all>
          <el-table-column prop="id" label="序号" width="50" fixed align="center" />
          <el-table-column prop="id" label="产品ID" align="center" width="180" />
          <el-table-column prop="name" label="产品编号" width="220" align="center" sortable />
          <el-table-column prop="id" label="产品名称" width="100" align="center" />
          <el-table-column prop="name" label="品牌" align="center" width="100" />
          <el-table-column prop="rule" label="单位" width="100" align="center" />
          <el-table-column prop="rule" label="产品分类" align="center" width="100" />
          <el-table-column prop="rule" label="产品属性" width="100" align="center" />
          <el-table-column prop="name" label="市场价" align="center" width="100" />
          <el-table-column prop="rule" label="合约价" align="center" width="180">
            <template slot-scope="scope">
              <el-input v-model="scope.row.rule" placeholder="请输入内容" :disabled="true" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="报价时间" align="center" width="100" />
          <el-table-column prop="rule" label="报价有效期止" align="center" width="180">
            <template slot-scope="scope">
              <el-date-picker
                v-model="value1"
                disabled
                type="date"
                placeholder="选择日期"
              />
            </template>
          </el-table-column>
        </el-table>

      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: { },
  data() {
    return {
      value1: '2020-02-02',
      ruleform: {
        number: 111,
        available: false,
        name: '',
        serviceurl: '',
        servicerule: '',
        remark: '',
        money: ''
      },
      rules: {

      },
      tableData: [
        {
          id: 1,
          number: '1555546545231',
          name: '666验证地区只有一级采购申请',
          belong: '张清-分公司',
          state: '施工中',
          buildBelong: '123',
          constructor: '杜路易',
          address: '北京市北京市门头沟区',
          buildArea: '123',
          startTime: '2020-01-15',
          endTime: '2020-01-21',
          totalTime: '100天'
        },
        {
          id: 2,
          number: '1555546545231',
          name: '666验证地区只有一级采购申请',
          belong: '张清-分公司',
          state: '施工中',
          buildBelong: '123',
          constructor: '杜路易',
          address: '北京市北京市门头沟区',
          buildArea: '123',
          startTime: '2020-01-15',
          endTime: '2020-01-21',
          totalTime: '100天'
        },
        {
          id: 3,
          number: '1555546545231',
          name: '666验证地区只有一级采购申请',
          belong: '张清-分公司',
          state: '施工中',
          buildBelong: '123',
          constructor: '杜路易',
          address: '北京市北京市门头沟区',
          buildArea: '123',
          startTime: '2020-01-15',
          endTime: '2020-01-21',
          totalTime: '100天'
        }
      ]
    }
  },
  methods: {
    backGo() {
      this.$router.push('/productManagementSupply/releaseManagement')
    }
  }
}
</script>

<style lang="less" scoped>
  .supplier-name {
    padding: 20px;
    overflow-y: scroll;
    height: calc(100% - 140px);
    .dictionary-form {
      display: flex;
      flex-wrap: wrap;
      .full-item {
        width: 100%;
      }
      .there-points {
        width: 33.3%;
        .el-form-item__content {
          display: flex;
          .is-disabled {
            width: 100%;
          }
          .el-select {
            width: 100%;
          }
        }
      }
    }
  }
</style>
