<!--还款-->
<template>
  <div class="repayment">
    <el-button class="back-btn" type="return" @click="cancel"><i class="iconfont icon-fanhui-copy" />返回</el-button>
    <el-form ref="form" v-loading="formLoading" :model="form" label-width="170px" class="rule-form-flex">
      <el-form-item label="发生日期">
        <el-date-picker
          v-model="form.dateOfOccurrence"
          type="date"
          placeholder="请选择发生日期"
          clearable
          disabled
        />
      </el-form-item>
      <el-form-item label="款项类型">
        <jdy-select
          v-model="form.paymentType	"
          holder="款项类型"
          :select-data="constant.financePaymentType"
          :select-options="{value:'code',label:'name'}"
          disabled
        />
      </el-form-item>
      <el-form-item label="往来款对象">
        <el-input v-model.trim="form.currentPaymentObject" disabled placeholder="请输入往来款对象" clearable />
      </el-form-item>

      <el-form-item label="金额">
        <amount-input
          v-model="form.amount"
          placeholder="请输入金额"
          unit-name="元"
          disabled
          @blur="amountBlur('amount')"
        />
      </el-form-item>
      <el-form-item label="预计归还日期">
        <el-date-picker
          v-model="form.estimatedDate"
          type="date"
          placeholder="请选择预计归还日期"
          clearable
          disabled
        />
      </el-form-item>
      <el-form-item label="计息方式">
        <el-input v-model.trim="form.interestBearingMethod" disabled clearable placeholder="请输入计息方式" />
      </el-form-item>

      <el-form-item label="利息总额">
        <amount-input
          v-model="form.interestTotal"
          placeholder="请输入利息总额"
          unit-name="元"
          disabled
          @blur="amountBlur('interestTotal')"
        />
      </el-form-item>
      <el-form-item label="负责人">
        <el-input v-model.trim="form.chargePersonName" disabled placeholder="请输入负责人" clearable />
      </el-form-item>
      <el-form-item label="支付方式" prop="paymentMethod">
        <jdy-select
          v-model="form.paymentMethod"
          holder="支付方式"
          disabled
          :select-data="constant.PayType"
          :select-options="{value:'code',label:'name'}"
        />
      </el-form-item>

      <el-form-item v-if="form.paymentMethod === '02'" label="支票号">
        <el-input v-model.trim="form.chequeNumber" disabled placeholder="请输入支票号" />
      </el-form-item>
      <el-form-item v-if="form.paymentMethod === '02'" label="支票银行名称">
        <el-input v-model.trim="form.chequeBankName" disabled placeholder="请输入支票银行名称" />
      </el-form-item>

      <el-form-item label="附件" class="one-width">
        <jdy-upload type-code="invoicing" disabled />
      </el-form-item>

      <el-form-item label="备注" class="one-width row-label">
        <el-input v-model.trim="form.remark" type="textarea" disabled :rows="3" placeholder="请输入备注" :maxlength="255" />
      </el-form-item>
      <el-form-item label="还款明细" class="one-width ">
        <search-bar :show-select="false" :btn-list="btnList" :search="search" @changeSearch="changeSearch" />
        <comm-table
          ref="commTable"
          v-loading="loading"
          :single-selected="true"
          :columns="columns"
          :table-options="tableOptions"
          :data="tableData"
          :count="count"
        />
      </el-form-item>
    </el-form>
    <drag-dialog ref="dialog" title="还款" width="60%">
      <el-form ref="repayForm" :model="repayForm" label-width="80px" :rules="repayRules" class="rule-form-flex">
        <el-form-item label="归还日期" class="one-half" prop="returnDate">
          <el-date-picker
            v-model="repayForm.returnDate"
            type="date"
            placeholder="请选择归还日期"
            clearable
          />
        </el-form-item>
        <el-form-item label="还款金额" class="one-half" prop="repaymentAmount">
          <amount-input
            v-model="repayForm.repaymentAmount"
            placeholder="请输入还款金额"
            unit-name="元"
            @blur="amountBlur('repaymentAmount')"
          />
        </el-form-item>
        <el-form-item label="说明" class="one-width row-label">
          <el-input v-model.trim="repayForm.remark" type="textarea" :rows="3" placeholder="请输入说明" :maxlength="200" />
        </el-form-item>
      </el-form>
      <div class="dialog-show-btn">
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </drag-dialog>
  </div>
</template>
<script>
import { repaymentList, repaymentAdd, repaymentDel, getcontactDetail } from '@core/api/financialManage/projectfinancemanager'
import { formatMoney } from '@core/utils'
import { mapGetters } from 'vuex'
import search from '@core/mixins/search'
import { toDecimal } from '@core/utils/validate'
export default {
  name: 'Repayment',
  mixins: [search],
  props: {
    compomentId: {
      type: String,
      default: ''
    }
  },
  data() {
    const validateNumber = (rule, value, callback) => {
      if (parseFloat(value) < 0 || parseFloat(value) > parseFloat(this.repayMoney)) {
        callback('请输入0 到 ' + formatMoney(this.repayMoney))
      } else {
        callback()
      }
    }
    return {
      form: {
        dateOfOccurrence: '',
        paymentType: '',
        currentPaymentObject: '',
        amount: '',
        estimatedDate: '',
        interestBearingMethod: '',
        interestTotal: '',
        paymentMethod: '',
        chequeNumber: '',
        chequeBankName: '',
        remark: ''
      },
      repayForm: {
        returnDate: '',
        repaymentAmount: '',
        remark: ''
      },
      repayRules: {
        returnDate: [{ required: true, message: '请选择归还日期', trigger: 'change' }],
        repaymentAmount: [{ required: true, message: '请输入还款金额', trigger: 'blur' },
          { required: true, validator: validateNumber, trigger: 'blur' }]
      },
      btnList: [
        {
          children: [
            {
              name: '还款',
              power: 'contractInput:edit',
              on: () => {
                this.orgJump('add')
              },
              icon: 'icon-fabu-copy'
            }
          ]
        }
      ],
      columns: [

        {
          label: '序号',
          index: true,
          fixed: 'left'
        },
        {
          label: '归还日期',
          prop: 'returnDate',
          showTooltip: true
        },
        {
          label: '金额',
          prop: 'repaymentAmount',
          showTooltip: true,
          align: 'right'
        },
        {
          label: '说明',
          prop: 'remark',
          showTooltip: true,
          width: 100
        },
        {
          label: '录入人',
          prop: 'createUserName',
          showTooltip: true
        },
        {
          label: '录入时间',
          prop: 'createDate',
          showTooltip: true

        },
        {
          label: '操作',
          prop: 'returnedMoney',
          render: (h, row) => {
            return h('el-button', {
              props: {
                type: 'danger'
              },
              on: {
                click: () => {
                  this.deleteData(row)
                }
              }
            }, '删除')
          }
        }
      ],
      tableOptions: {
        maxHeight: 'calc( 100% - 350px)'
      },
      tableData: [],
      total: 0,
      count: null,
      loading: false,
      formLoading: false,
      repayMoney: ''
    }
  },
  computed: {
    ...mapGetters(['constant']),
    // 合同ID
    contractId() {
      return this.$route.query.id
    }
  },
  watch: {
    compomentId: {
      handler(val) {
        if (val) {
          this.formLoading = true
          this.getDetails()
          this.fetchData()
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.$store.dispatch('getConstant', ['PayType', 'commonYesNo', 'financePaymentType'])
  },

  methods: {
    fetchData(type) {
      this.loading = true
      const params = {
        contactDetailsId: this.compomentId
      }

      repaymentList(params).then(({ data }) => {
        this.tableData = data
        this.loading = false
        this.tableData.map(item => {
          item.repaymentAmount = item.repaymentAmount === null || '' ? '0.00' : formatMoney(item.repaymentAmount)
          return item
        })
      })
    },
    orgJump() {
      getcontactDetail(this.compomentId).then(({ data }) => {
        const { noReturnMoney } = data
        this.repayMoney = noReturnMoney
        this.$nextTick(() => {
          this.$refs.repayForm.resetFields()
        })
        this.$refs.dialog.show = true
      })
    },
    deleteData(row) {
      this.$confirm('请确认是否要删除这些数据，一旦删除将无法恢复！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        repaymentDel(row.id).then(() => {
          this.$message.success('删除成功')
          this.fetchData()
        })
      })
        .catch(() => {})
    },
    repaySubmit() {

    },
    submit() {
      this.$refs.repayForm.validate(vaild => {
        if (vaild) {
          const params = {
            ...this.repayForm,
            contactDetailsId: this.compomentId
          }
          repaymentAdd(params).then(({ data }) => {
            this.$message.success('添加成功')
            this.fetchData()
            this.$refs.dialog.show = false
          })
        }
      })
    },
    cancel() {
      this.$emit('changeComName', 'CurrentPaymentDetails', 'cancel')
    },
    amountBlur(key) {
      this.repayForm[key] = toDecimal(this.repayForm[key], 2)
    },
    getDetails() {
      getcontactDetail(this.compomentId).then(({ data }) => {
        const {
          dateOfOccurrence, paymentType, currentPaymentObject, amount, estimatedDate, interestBearingMethod, interestTotal, paymentMethod, chequeNumber, chequeBankName, remark, id
        } = data
        this.contacttId = id
        this.form = {
          dateOfOccurrence,
          paymentType,
          currentPaymentObject,
          amount: formatMoney(amount),
          estimatedDate,
          interestBearingMethod,
          interestTotal: formatMoney(interestTotal),
          paymentMethod,
          chequeNumber,
          chequeBankName,
          remark
        }
        this.formLoading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.repayment {
  padding: 10px 0;
   .dialog-show-btn {
      display: flex;
      justify-content: flex-end;
      padding-top: 10px;
    }
}
</style>
