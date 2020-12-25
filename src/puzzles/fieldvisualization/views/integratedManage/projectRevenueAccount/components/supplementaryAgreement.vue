// 补充协议
<template>
  <div class="supplementary-agreement">
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>协议编号</span>
          <el-input v-model="input" placeholder="请输入" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>协议状态</span>
          <el-select v-model="value" placeholder="请选择" class="fill-line">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="fill-name">
          <span>协议归档日期</span>
          <el-date-picker
            v-model="value2"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          />
        </div>
        <div class="fill-name">
          <span>协议金额</span>
          <el-input v-model="input" placeholder="请输入" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>审批状态</span>
          <el-select v-model="value" placeholder="请选择" class="fill-line">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="fill-name">
          <span>审批结果</span>
          <el-select v-model="value" placeholder="请选择" class="fill-line">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
        </div>
      </div>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column type="selection" width="40" />
        <el-table-column prop="id" label="序号" width="50" align="center" />
        <el-table-column prop="name" label="协议编号" sortable align="center" />
        <el-table-column prop="name" label="协议状态" sortable align="center" />
        <el-table-column prop="name" label="协议名称" sortable align="center" />
        <el-table-column prop="name" label="协议金额" sortable align="center" />
        <el-table-column prop="name" label="签订日期" sortable align="center" />
        <el-table-column prop="name" label="归档日期" sortable align="center" />
        <el-table-column prop="name" label="建筑面积(m²)" align="center" />
        <el-table-column prop="name" label="审核状态" sortable align="center" />
        <el-table-column prop="name" label="审核结果" sortable align="center" />
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
        <el-form-item label="付款日期">
          <el-date-picker v-model="value1" type="date" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="付款方式">
          <el-select v-model="number" placeholder="请选择">
            <el-option label="区域一" value="shanghai" />
          </el-select>
        </el-form-item>
        <el-form-item label="付款金额">
          <el-input v-model="ruleform.read" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="支票号">
          <el-input v-model="ruleform.read" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="是否保证金">
          <el-select v-model="number" placeholder="请选择">
            <el-option label="区域一" value="shanghai" />
          </el-select>
        </el-form-item>
        <el-form-item label="领款人">
          <el-input v-model="ruleform.read" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="付款类型" class="pay-type">
          <el-select v-model="number" placeholder="请选择">
            <el-option label="区域一" value="shanghai" />
          </el-select>
        </el-form-item>
        <el-form-item label="合同编号">
          <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="合同名称">
          <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
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
          <el-input v-model="ruleform.remark" type="textarea" :rows="2" placeholder="请输入内容" />
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
  name: 'ProjectRevenueAccount',
  components: { DragDialog },
  data() {
    return {
      count: 30,
      value1: '',
      ruleform: {
        number: 111,
        read: '只读'
      },
      title: '新增',
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
  .supplementary-agreement {
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

			margin-right: 5px;

			.fill-line {
				width: 100%;
			}

			span {
				text-align: right;
        min-width: 85px!important;
			}
    }

   .link-a {
      color:@primary;
      cursor: pointer;
    }

  }
</style>
