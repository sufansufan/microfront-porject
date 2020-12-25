<template>
  <div class="project-details">
    <div class="details-text">
      <div class="button">
        <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
      </div>
      <div class="title">标题</div>
    </div>
    <el-form
      label-width="170px"
      :rules="rules"
      :model="ruleform"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="合同金额（元）"
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
            label="结算金额（元）"
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
            label="项目归属"
            prop="rolename"
          >
            <div class="search">
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
              <el-select
                v-model="ruleform.roletype"
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

          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div>
      <el-table
        :data="tableData"
        row-key="id"
        border
        default-expand-all
      >
        <el-table-column
          prop="typename"
          align="center"
          sortable
          label="各项成本概念"
        />
        <el-table-column
          prop="category"
          label="合同金额"
          sortable
          align="center"
        />
        <el-table-column
          prop="typename"
          align="center"
          label="结算金额"
        />
        <el-table-column
          prop="category"
          label="收票金额"
          align="center"
        >
          <template slot-scope="scope">
            <div
              class="table-click-color"
              @click="changetab('collect')"
            >{{ scope.row.category }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="typename"
          align="center"
          label="付款金额"
        >
          <template slot-scope="scope">
            <div
              class="table-click-color"
              @click="changetab('payment')"
            >{{ scope.row.typename }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="category"
          label="未付金额"
          align="center"
        />
      </el-table>
    </div>
    <contract-list />

    <drag-dialog
      ref="collect"
      title="收票明细"
      width="70%"
      height="60%"
    >
      <total-collection />
    </drag-dialog>
    <drag-dialog
      ref="payment"
      title="付款明细"
      width="70%"
      height="60%"
    >
      <total-payment />
    </drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import TotalCollection from './components/totalcollection'
import TotalPayment from './components/totalpayment'
import ContractList from './contractlist'

export default {
  components: { DragDialog, TotalCollection, TotalPayment, ContractList },
  data() {
    return {
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
      if (status === 'collect') {
        this.$refs.collect.show = true
      } else {
        this.$refs.payment.show = true
      }
    }
  }
}
</script>

<style lang="less">
.project-details {
  height: calc(100vh - 160px);
  overflow-y: auto;
  // padding: 20px;
  .details-text {
    display: flex;
    margin-bottom: 20px;
    .button {
      width: 3%;
    }
    .title {
      flex: 1;
      text-align: center;
      color: #333;
      font-size: 18px;
      font-weight: bolder;
    }
  }
  .el-form {
    .search{
      display:flex;
      .fill-name {
      width: 40%;
    }
    .fill-line{
      flex:1;
    }

    }

  }
}
</style>
