<template>
  <div class="add-prepaidproject">
    <el-form label-width="90px" :rules="rules" :model="ruleform">
      <el-row>
        <el-col :span="12">
          <el-form-item label="合同编号" prop="rolename">
            <el-input v-model="ruleform.rolename" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目类型" prop="rolename">
            <el-select v-model="ruleform.roletype" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="项目名称" prop="roletype">
            <el-input v-model="ruleform.rolename" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目归属" prop="roletype">
            <el-select v-model="ruleform.roletype" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="建设单位" prop="range">
            <el-input v-model="ruleform.rolename" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工程状态" prop="range">
            <el-select v-model="ruleform.roletype" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column type="selection" width="40" />
        <el-table-column prop="index" label="序号" width="50" align="center" />
        <el-table-column prop="合同编号" sortable align="center" label="收付款类型" />
        <el-table-column prop="category" sortable label="项目名称" align="center" />
        <el-table-column prop="downtime" label="建设单位" align="center" />
        <el-table-column prop="downtime" label="归属单位" align="center" width="150" />
        <el-table-column prop="rate" label="工程状态" sortable align="center" />
        <el-table-column prop="rate" label="合同金额" sortable align="center" />
        <el-table-column prop="rate" label="结算金额" sortable align="center" />
        <el-table-column prop="rate" label="工程状态" sortable align="center" />
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-show="count"
        :page-sizes="pageSizes"
        :page-size="size"
        :total="count"
        :current-page="page"
        :layout="pageLayout"
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
    <div class="btn">
      <el-button type="primary">确定</el-button>
      <el-button class="cancel-btn">取消</el-button>
    </div>
  </div>
</template>

<script>
import pagination from '@core/mixins/pagination'
export default {
  components: {},
  mixins: [pagination],
  data() {
    return {
      count: 30,
      ruleform: {
        rolename: '',
        roletype: '',
        range: '',
        type: '',
        application: '',
        remark: ''
      },
      rules: {
        rolename: [{
          required: true,
          message: '请填写'
        }],
        roletype: [{
          required: true,
          message: '请选择'
        }],
        range: [{
          required: true,
          message: '请选择'
        }],
        type: [{
          required: true,
          message: '请选择'
        }],
        application: [{
          required: true,
          message: '请填写'
        }]
      },
      tableData: [{
        index: '1',
        number: '02',
        category: '定时',
        typename: '公司资质即将到期',
        downtime: '是',
        rate: '路由',
        task: '路有参数',
        vestingunit: '资质名称，资质到期时间',
        finish: '是',
        updatetime: '2020.01.01'
      }]
    }
  },
  methods: {
    addrow() {
      this.$refs.dialog.show = true
    }
  }
}
</script>

<style lang="less" scoped>
	.add-prepaidproject {
		.el-select,.btn{
			width: 100%;
    }
    .btn{
      text-align: center;
      margin-top:20px;

    }
	}
</style>
