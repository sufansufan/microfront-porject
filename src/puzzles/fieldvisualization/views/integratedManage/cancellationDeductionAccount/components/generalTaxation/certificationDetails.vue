// 认证明细
<template>
  <div class="certification-details">
    <div class="search">
      <div class="btn">
        <div>
          <el-button-group>
            <el-button type="primary" @click="changeShow"><i class="iconfont icon-daochu-copy" /> 导出</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="id" label="序号" width="50" align="center" />
        <el-table-column prop="name" label="合同编号" align="center" />
        <el-table-column prop="name" label="工程名称" align="center" />
        <el-table-column prop="name" label="认证日期" align="center" />
        <el-table-column prop="name" label="收票日期" align="center" />
        <el-table-column prop="name" label="开票日期" align="center" />
        <el-table-column prop="name" label="发票编号" align="center" />
        <el-table-column prop="name" label="发票金额" align="center" />
        <el-table-column prop="name" label="发票无税金额" align="center" />
        <el-table-column prop="name" label="税率" align="center" />
        <el-table-column prop="name" label="发票税金" align="center" />
        <el-table-column prop="name" label="发票归类" align="center" />
        <el-table-column prop="name" label="合同编号(子)" align="center" />
        <el-table-column prop="rule" label="合同名称" align="center" header-align="center" />
        <el-table-column prop="rule" label="是否进项转出" align="center" header-align="center" />
        <el-table-column prop="rule" label="转出日期" align="center" header-align="center" />
        <el-table-column prop="rule" label="备注" align="center" header-align="center" />
        <el-table-column prop="name" label="状态" align="center" header-align="center">
          <template slot-scope="scope">
            <div class="link-a" @click="changeShow">{{ scope.row.name }}</div>
          </template>
        </el-table-column>
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
    <drag-dialog ref="dialog" title="进项转出" width="60%" height="80%">
      <el-form :rules="rules" :model="ruleform" label-width="150px" class="dictionary-anther">
        <el-form-item label="工程名称">
          <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="认证日期">
          <el-date-picker v-model="value1" disabled type="date" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="开票日期">
          <el-date-picker v-model="value1" disabled type="date" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="发票编号">
          <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="发票金额（元）">
          <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="发票无税金额（元）">
          <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="税率">
          <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="发票税金（元）">
          <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="发票代码">
          <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="销方纳税人识别号">
          <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="进项转出税额（元）" prop="region">
          <el-input v-model="ruleform.region" disabled="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="进项转出日期" prop="region">
          <el-date-picker v-model="ruleform.region" type="date" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="转出原因" prop="remark" class="full-item">
          <el-input v-model="ruleform.remark" type="textarea" :rows="2" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="录入人员">
          <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="录入时间">
          <el-date-picker v-model="value1" type="date" placeholder="选择日期" />
        </el-form-item>
        <div class="btnadd">
          <el-button type="primary">确定</el-button>
        </div>
      </el-form>
    </drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
export default {
  components: { DragDialog },
  data() {
    return {
      count: 30,
      ruleform: {
        number: 111,
        region: ''
      },
      rules: {
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      },
      tableData: [
        {
          id: '1',
          number: '01',
          name: '组织缺少负责人',
          servicename: '服务名称',
          serviceurl: '服务路径',
          rule: '触发规则',
          available: '是否可用'
        },
        {
          id: '2',
          number: '02',
          name: '组织缺少负责人',
          servicename: '服务名称',
          serviceurl: '服务路径',
          rule: '触发规则',
          available: '是否可用'
        }
      ]
    }
  },
  methods: {
    changeTab() {
      this.$router.push('/financialManage/integratedManage/cancellationDeductionAccount')
    },
    changeShow() {
      this.$refs.dialog.show = true
    }
  }
}
</script>

<style lang="less" scope>
  .certification-details {
    .search>.select>.fill-name {
			width: 22%;
			margin-right: 5px;

			.fill-line {
				width: 100%;
			}

			span {
				text-align: right;

			}
    }
    .btnadd {
      width: 100%;
      text-align: right;
    }
    .dictionary-anther {
      display: flex;
      flex-wrap: wrap;
      .el-form-item {
        width: 50%;
        .el-form-item__content {
          display: flex;
          .is-disabled {
            width: 100%;
          }
          .el-select {
            width: 100%;
          }
          .el-date-editor {
            width: 100%;
          }
        }
      }
      .full-item {
        width: 100%;
      }
    }
   .link-a {
      color:@primary;
      cursor: pointer;
      text-decoration: underline;
    }

  }
</style>
