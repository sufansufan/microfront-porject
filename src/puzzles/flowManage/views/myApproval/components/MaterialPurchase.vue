<template>
  <div class="material-purchase">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
    >
      <el-form-item label="材料款（元）：">
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入报销单号"
          :disabled="true"
          style="width:15%"
        />
      </el-form-item>
    </el-form>
    <div class="table">
      <el-table
        :data="tableData"
        row-key="id"
        border
        default-expand-all
      >

        <el-table-column
          prop="index"
          label="序号"
          width="50"
          align="center"
        />
        <el-table-column
          prop="applicationtype"
          label="分部工姓名"
          align="center"
          width="150"
        />
        <el-table-column
          prop="category"
          label="材料编号"
          align="center"
        />

        <el-table-column
          prop="type"
          align="center"
          label="材料名称"
          width="200"
        >
          <template slot-scope="scope">
            <div
              class="table-click-color"
              @click="$emit('changeTabConent', 'materialname', 'details')"
            >
              <img
                src="../../../../../../static/platform/star.png"
                alt=""
              >
              <span>{{ scope.row.type }}</span>
            </div>

          </template>
        </el-table-column>
        <el-table-column
          prop="downtime"
          label="规格型号"
          align="center"
        />
        <el-table-column
          prop="rate"
          label="特殊要求"
          align="center"
          width="150"
        />
        <el-table-column
          prop="task"
          label="单位"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="品牌"
          align="center"
          width="150"
        />
        <el-table-column
          prop="vestingunit"
          label="市场价"
          align="center"
          width="150"
        />
        <el-table-column
          prop="vestingunit"
          label="单位"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="已采购数量"
          align="center"
          width="150"
        />
        <el-table-column
          prop="vestingunit"
          label="本次采购数量"
          align="center"
          width="150"
        />
        <el-table-column
          prop="vestingunit"
          label="本单发货数量"
          align="center"
          width="150"
        />
        <el-table-column
          prop="vestingunit"
          label="本单收货数量"
          align="center"
          width="150"
        />
        <el-table-column
          prop="vestingunit"
          label="金额"
          align="center"
          width="60"
        />
        <el-table-column
          prop="vestingunit"
          label="申请到场时间"
          align="center"
          width="150"
        />
        <el-table-column
          prop="vestingunit"
          label="备注"
          align="center"
        />
         
        
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      ruleForm: {
        name: '',
        value: ''
      },
      tableData: [
        {
          index: '1',
          number: '借款申请',
          type: '借款审批',
          approvalType: 'reimbursementApproval',
          category: '定时',
          downtime: '提前1月',
          rate: '一次',
          task: '否',
          vestingunit: '第一分公司',
          receiver: '行政专员，办公室主任',
          available: '是',
          name: '资质（资质编号）将于有效期到期，请处理相关事宜！',
          deploy: '是',
          updatetime: '2020.01.01'
        }
      ]
    }
  },
 
}
</script>

<style lang="less">
.material-purchase {
  .table {
    .table-click-color {
      display: flex;
      justify-content: center;
      img {
        margin-top: 3px;
        margin-right: 4px;
        width: 15px;
        height: 15px;
      }
    }
  }
}
</style>
