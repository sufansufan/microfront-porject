// 收款明细
<template>
  <div class="invoice-details">
    <div class="search">
      <div class="btn">
        <div>
          <el-button-group>
            <el-button type="primary" @click="changeShow"><i class="iconfont icon-xinzeng1-copy" />新增</el-button>
            <el-button type="primary"><i class="iconfont icon-icon7-copy" /> 删除</el-button>
            <el-button type="primary">审核</el-button>
            <el-button type="primary">撤销审核</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column type="selection" width="40" />
        <el-table-column prop="id" label="序号" width="50" align="center" />
        <el-table-column prop="name" label="收款日期" align="center" />
        <el-table-column prop="name" label="收款方式" align="center" />
        <el-table-column prop="id" label="收款金额" align="center" />
        <el-table-column prop="rule" label="支票号" align="center" header-align="center" />
        <el-table-column prop="rule" label="发票编号" align="center" header-align="center" />
        <el-table-column prop="rule" label="备注" width="120" align="center" header-align="center" />
        <el-table-column prop="rule" label="状态" align="center" header-align="center" />
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
    <drag-dialog ref="dialog" title="新增" width="70%" height="80%">
      <el-form :rules="rules" :model="ruleform" label-width="150px" class="dictionary-form">
        <el-form-item label="收款日期">
          <el-date-picker v-model="value1" type="date" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="收款方式">
          <el-select v-model="number" placeholder="请选择">
            <el-option label="区域一" value="shanghai" />
          </el-select>
        </el-form-item>
        <el-form-item label="收款金额">
          <el-input v-model="ruleform.read" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="支票号">
          <el-input v-model="ruleform.read" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="对应发票" prop="remark" class="full-item ">
          <el-input v-model="ruleform.remark" type="textarea" :rows="5" placeholder="请输入内容" />
          <div class="btn-anther">
            <div>
              <el-button type="primary">添加发票</el-button>
            </div>
            <div style="margin-top:6px;">
              <el-button type="danger">删除发票</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="备注" prop="remark" class="full-item">
          <el-input v-model="ruleform.remark" type="textarea" :rows="2" placeholder="请输入提示" />
        </el-form-item>
        <el-form-item label="录入人员">
          <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="录入时间">
          <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
        </el-form-item>
        <div class="btnadd">
          <el-button type="primary">提交</el-button>
          <el-button class="cancel-btn">取消</el-button>
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
        number: 111
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
      this.$router.push('/financialManage/integratedManage/projectRevenueAccount/projectName')
    },
    changeShow() {
      this.$refs.dialog.show = true
    }
  }
}
</script>

<style lang="less" scope>
  .invoice-details {
    .btnadd {
      width: 100%;
      text-align: center;
    }
    .dictionary-form {
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
      .pay-type {
        margin-right: 50%;
      }
      .full-item {
        width: 100%;
        .btn-anther {
          margin-left: 6px;
        }
      }

    }
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
   .link-a {
      color:@primary;
      cursor: pointer;
    }
  }
</style>
