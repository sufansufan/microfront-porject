<template>
  <div class="cash-of-deposit">
    <div class="search">
      <div class="btn">
        <div>
          <el-button-group>
            <el-button class="back-btn" @click="changeTab('default')"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <div class="form-border">
      <el-form
        :rules="rules"
        :model="ruleform"
        label-width="150px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="账号名称"
              prop="number"
            >
              <el-input
                v-model="ruleform.number"
                disabled
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="归属单位"
              prop="number"
            >
              <el-input
                v-model="ruleform.number"
                disabled
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="负责人"
              prop="number"
            >
              <el-input
                v-model="ruleform.number"
                disabled="true"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="当前余额"
              prop="number"
            >
              <el-input
                v-model="ruleform.number"
                disabled
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="支出合计"
              prop="number"
            >
              <el-input
                v-model="ruleform.number"
                disabled
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="收款合计"
              prop="number"
            >
              <el-input
                v-model="ruleform.number"
                disabled="true"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="备注信息"
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
      </el-form>
    </div>
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>明细类型：</span>
          <el-select
            v-model="value"
            placeholder="请选择"
            class="fill-line"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="fill-name">
          <span>单据号：</span>
          <el-input
            v-model="input"
            placeholder="请输入"
            class="fill-line"
          />
        </div>
        <div>
          <span style="text-align:right;">发生日期：</span>
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
          <span>摘要：</span>
          <el-input
            v-model="input"
            placeholder="请输入"
            class="fill-line"
          />
        </div>
        <div class="fill-name">
          <span>支付方式：</span>
          <el-select
            v-model="value"
            placeholder="请选择"
            class="fill-line"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="fill-name">
          <span>类别：</span>
          <el-select
            v-model="value"
            placeholder="请选择"
            class="fill-line"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="fill-name">
          <span>备注：</span>
          <el-input
            v-model="input"
            placeholder="请输入"
            class="fill-line"
          />
        </div>
        <div>
          <div>
            <el-button
              type="primary"
              icon="el-icon-search"
            >查询</el-button>
          </div>
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button-group>
            <el-button
              type="primary"
              @click="changeShow()"
            >新建</el-button>
            <el-button type="primary">删除</el-button>
          </el-button-group>
        </div>
      </div>
    </div>

    <div>
      <el-table
        :data="tableData"
        row-key="id"
        border
        default-expand-all
      >
        <el-table-column
          prop="id"
          label="序号"
          width="50"
          align="center"
        />
        <el-table-column
          prop="name"
          label="来源"
          sortable
          align="center"
        />
        <el-table-column
          prop="name"
          label="发生日期"
          align="center"
        />
        <el-table-column
          prop="servicename"
          label="明细类型"
          align="center"
        />
        <el-table-column
          prop="serviceurl"
          label="单据号"
          align="center"
        />
        <el-table-column
          prop="rule"
          label="摘要"
          align="center"
        />
        <el-table-column
          prop="rule"
          label="类别"
          align="center"
        />
        <el-table-column
          prop="available"
          label="收入金额"
          align="right"
        />
        <el-table-column
          prop="rule"
          label="支出金额"
          align="right"
        />
        <el-table-column
          prop="available"
          label="余额"
          align="right"
        />
        <el-table-column
          prop="available"
          label="支付方式"
          align="center"
        />
        <el-table-column
          prop="available"
          label="备注"
          align="center"
        />
        <el-table-column
          prop="available"
          label="录入人"
          align="center"
        />
        <el-table-column
          prop="available"
          label="录入时间"
          align="center"
        />
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
    <drag-dialog
      ref="dialog"
      title="新增明细"
      width="70%"
      height="80%"
    >
      <add-cash-detailed />
    </drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import AddCashDetailed from './addCashDetailed'
export default {
  components: { DragDialog, AddCashDetailed },
  data() {
    return {
      count: 30,
      ruleform: {
        number: 111,
        available: false,
        name: '',
        serviceurl: '',
        servicerule: '',
        remark: ''
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
    changeTab(status) {
      this.$emit('changeTabBank', 'cashActive', status)
    },
    changeShow(status) {
      this.$refs.dialog.show = true
    }
  }
}
</script>

<style lang="less">
  .cash-of-deposit {
   .link-a {
      color:@primary;
      cursor: pointer;
    }
    .form-top {
      margin-top: 20px;
    }
    .form-border {
      margin-bottom: 20px;
      border-bottom: 1px solid #ddd;
    }
    .pagination {
      margin-bottom: 100px;
    }
    .search>.select>.fill-name {
			width: 22%;
			margin-right: 5px;

			.fill-line {
				width: 100%;
			}

			span {
				min-width: 70px;
				text-align: right;

			}
		}
  }
</style>
<style>
  .el-input.is-disabled .el-input__inner {
    background-color: #FFF!important;
    color: #606266!important;
  }
  .el-textarea.is-disabled .el-textarea__inner {
    background-color: #FFF!important;
    color: #606266!important;
  }
</style>
