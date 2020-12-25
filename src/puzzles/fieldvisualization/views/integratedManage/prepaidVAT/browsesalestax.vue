<template>
  <div class="browse-salestax">
    <div style="margin-bottom:20px;">
      <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
    <el-form
      label-width="170px"
      :rules="rules"
      :model="ruleform"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="预缴月份"
            prop="rolename"
          >
            <el-date-picker
              v-model="ruleform.rolename"
              type="month"
              placeholder="选择月"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="归属单位"
            prop="rolename"
          >
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="合同编号"
            prop="rolename"
          >
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item
            label="项目名称"
            prop="roletype"
          >
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="项目计税方式"
            prop="roletype"
          >
            <el-select
              v-model="ruleform.roletype"
              placeholder="请选择"
              class="fill-name"
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
        <el-col :span="8">
          <el-form-item
            label="缴纳地区"
            prop="range"
          >
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="附加税地区"
            prop="range"
          >
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="合同金额"
            prop="range"
          >
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="预缴税率"
            prop="type"
          >
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="地区附加税率(%)"
            prop="type"
          >
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="结算金额"
            prop="type"
          >
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item class="title">
            <div class="text">2017-12<span>开票、收票、预缴情况：</span></div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item
            label="本月开票金额(含税销售额)合计"
            prop="type"
          >
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item
            label="本月开票无税金额(不含税销售额)合计"
            prop="type"
          >
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item
            label="本月开票税金(应缴增值税)"
            prop="type"
          >
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-rol :span="3" style="margin-left:20px;">
          <el-button
            type="primary"
            @click="changetab('month')"
          >查看本月开票记录</el-button>
        </el-rol>

      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item
            label="本月已预缴增值税"
            prop="type"
          >
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item
            label="本月已预缴附加税"
            prop="type"
          >
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item
            label="本月已扣除分包额"
            prop="type"
          >
            <el-input
              v-model="ruleform.rolename"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-rol :span="3" style="margin-left:20px;">
          <el-button
            type="primary"
            @click="changetab('adjusting')"
          >调扣</el-button>
        </el-rol>
      </el-row>
    </el-form>
    <div class="search">
      <div class="btn">
        <div>
          <el-button-group>
            <el-button type="primary" @click="changetab('payment')"><i class="iconfont icon-xinzeng1-copy" /> 新增预缴</el-button>
            <el-button type="primary"><i class="iconfont icon-xiugai-copy" /> 修改</el-button>
            <el-button type="primary"><i class="iconfont icon-icon7-copy" /> 删除</el-button>
            <el-button type="primary">审核</el-button>
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
          prop="index"
          label="序号"
          width="50"
          align="center"
        />
        <el-table-column
          prop="typename"
          align="center"
          sortable
          label="预缴增值税"
        />
        <el-table-column
          prop="category"
          label="预缴税款日期"
          sortable
          align="center"
        />
        <el-table-column
          prop="typename"
          align="center"
          label="预缴税款所在区"
        />
        <el-table-column
          prop="category"
          label="预缴税率"
          align="center"
        />
        <el-table-column
          prop="typename"
          align="center"
          label="完税凭证号"
        />
        <el-table-column
          prop="category"
          label="预缴附加税所在区"
          align="center"
        />
        <el-table-column
          prop="downtime"
          label="附加税率"
          align="center"
        />
        <el-table-column
          prop="downtime"
          label="预缴附加税"
          align="center"
          width="150"
        />
        <el-table-column
          prop="typename"
          align="center"
          label="缴款人"
        />
        <el-table-column
          prop="category"
          label="缴款方式"
          align="center"
        />
        <el-table-column
          prop="downtime"
          label="备注"
          align="center"
        />
        <el-table-column
          prop="rate"
          label="状态"
          align="center"
        />
      </el-table>
    </div>
    <drag-dialog
      ref="month"
      :title="title"
      width="50%"
      height="60%"
    >
      <month-invoicerecordin />
    </drag-dialog>
    <drag-dialog
      ref="adjusting"
      title="调整可扣除分包金额"
      width="50%"
      height="60%"
    >
      <adjusting-button />
    </drag-dialog>
    <drag-dialog
      ref="payment"
      title="新增预缴"
      width="50%"
      height="60%"
    >
      <add-advancepayment />
    </drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import MonthInvoicerecordin from './components/monthinvoicerecordin'
import AdjustingButton from './components/adjustingbutton'
import AddAdvancepayment from './components/addadvancepayment'

export default {
  components: { DragDialog, MonthInvoicerecordin, AdjustingButton, AddAdvancepayment },
  data() {
    return {
      title: '2017年8月开票明细',
      ruleform: {
        rolename: '',
        roletype: '',
        range: '',
        type: '',
        application: '',
        remark: ''
      },
      rules: {
        rolename: [
          {
            required: true,
            message: '请填写'
          }
        ],
        roletype: [
          {
            required: true,
            message: '请选择'
          }
        ],
        range: [
          {
            required: true,
            message: '请选择'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择'
          }
        ],
        application: [
          {
            required: true,
            message: '请填写'
          }
        ]
      },
      tableData: [
        {
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
        }
      ]
    }
  },
  methods: {
    changetab(status) {
      if (status === 'month') {
        this.$refs.month.show = true
      } else if (status === 'adjusting') {
        this.$refs.adjusting.show = true
      } else {
        this.$refs.payment.show = true
      }
    }
  }
}
</script>

<style lang="less">
.browse-salestax {
  .fill-name,
  .el-date-editor {
    width: 100%;
  }
  .title {
    .text {
      margin-left:-170px;
      border-bottom: 1px solid #ccc;
      font-size: 18px;
      color: #333;
    }
  }
  .search {
    margin-top: 20px;
  }
}
</style>
