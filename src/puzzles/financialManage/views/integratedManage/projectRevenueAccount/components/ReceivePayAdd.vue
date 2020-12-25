<template>
  <div class="receive-pay-add">
    <el-form ref="form" v-loading="loading" :model="form" label-width="170px" :rules="formRules" class="rule-form-flex">
      <el-form-item label="收款日期" prop="paymentDate">
        <el-date-picker
          v-model="form.paymentDate"
          type="date"
          placeholder="请选择收款日期"
          clearable
          :disabled="compomentType === 'related'"
        />
      </el-form-item>
      <el-form-item label="收款金额" prop="amountReceived">
        <amount-input
          v-model="form.amountReceived"
          placeholder="请输入收款金额"
          :disabled="compomentType === 'related'"
          @blur="amountBlur('amountReceived')"
        >
          <template slot="append">元</template>
        </amount-input>
      </el-form-item>
      <el-form-item label="收款人" prop="payee">
        <jdy-select
          v-model="form.payee"
          holder="收款人"
          :select-data="payeeList"
          :select-options="{value:'id',label:'name'}"
          :disabled="compomentType === 'related'"
        />
      </el-form-item>

      <el-form-item label="支付方式" prop="paymentMethod">
        <jdy-select
          v-model="form.paymentMethod"
          holder="支付方式"
          :select-data="constant.PayType"
          :select-options="{value:'code',label:'name'}"
          :disabled="compomentType === 'related'"
        />
      </el-form-item>
      <el-form-item label="收款账户类型" prop="receivingAccountType">
        <jdy-select
          v-model="form.receivingAccountType"
          holder="收款账户类型"
          :select-data="constant.TransferType"
          :select-options="{value:'code',label:'name'}"
          :disabled="compomentType === 'related'"
        />
      </el-form-item>
      <el-form-item label="收款账户" prop="receivingAccountId	">
        <div class="search-input">
          <el-input v-model.trim="form.receivingAccountId	" clearable :disabled="compomentType === 'related'" />
          <el-button type="primary" icon="iconfont icon-search-copy" :disabled="compomentType === 'related'" @click="selectAccount" />
        </div>
      </el-form-item>

      <el-form-item label="收款计划" prop="collectionPlan">
        <jdy-select
          v-model="form.collectionPlan"
          holder="收款计划"
          :select-data="option"
          :select-options="{value:'id',label:'name'}"
          :disabled="compomentType === 'related'"
        />
      </el-form-item>
      <el-form-item label="收款类型" prop="collectionType">
        <jdy-select
          v-model="form.collectionType"
          holder="收款类型"
          :select-data="constant.financeInvoiceType"
          :select-options="{value:'id',label:'name'}"
          :disabled="compomentType === 'related'"
        />
      </el-form-item>
      <el-form-item label="收款类别" prop="collectionCategory">
        <jdy-select
          v-model="form.collectionCategory"
          holder="收款类别"
          :select-data="constant.collectionCategory"
          :select-options="{value:'code',label:'name'}"
          :disabled="compomentType === 'related'"
        />
      </el-form-item>

      <el-form-item v-if="form.paymentMethod === '02'" label="支票号" prop="chequeNumber">
        <el-input v-model.trim="form.chequeNumber	" :disabled="compomentType === 'related'" />
      </el-form-item>

      <el-form-item v-if="form.paymentMethod === '02'" label="支票银行名称" prop="chequeBankName">
        <el-input v-model.trim="form.chequeBankName	" :disabled="compomentType === 'related'" />
      </el-form-item>

      <el-form-item label="对应发票" class="one-width">
        <el-transfer
          v-model="form.addBillingReceiveDtos"
          :titles="invoiceTitle"
          :data="invoiceList"
          :button-texts="['移除', '选择']"
        />
      </el-form-item>

      <el-form-item label="摘要" class="one-width row-label">
        <el-input v-model.trim="form.summary" :disabled="compomentType === 'related'" type="textarea" :rows="3" placeholder="请输入备注" :maxlength="255" />
      </el-form-item>
      <el-form-item label="备注" class="one-width row-label">
        <el-input v-model.trim="form.remark" :disabled="compomentType === 'related'" type="textarea" :rows="3" placeholder="请输入备注" :maxlength="255" />
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button type="primary" @click="submit">确认</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
    <drag-dialog ref="dialog" title="选择转入银行账户" width="60%">
      <search-bar :select-list="selectList" :search="search" :btn-list="btnList" :column="3" @changeSearch="changeSearch">
        <div slot="searchBar0" class="external-list" label-width="100px">
          <span>归属单位</span>
          <el-select
            v-model="searchExternal.attribution"
            placeholder="请选择项目归属"
            style="width:30%"
            clearable
            @change="handlerChangeProject"
          >
            <el-option
              v-for="item in ContractAttributionList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
          <jdy-select
            v-model="searchExternal.belongOrgId"
            placeholder="请选择归属单位"
            style="width:70%"
            :disabled="disabledCompany"
            :select-data="companyList"
            @change="companyChange"
          />
        </div>
      </search-bar>
      <comm-table
        ref="commTable"
        :single-selected="true"
        :columns="columns"
        :data="tableData"
        :loading="loading"
        :count="total"
      />
      <div class="dialog-show-btn">
        <el-button type="primary" @click="onCkick">确定</el-button>
      </div>
    </drag-dialog>
  </div>
</template>
<script>
import upload from '@core/mixins/upload'
import { getOrganizationByBelongList } from '@core/api/organization'
import { bankaccountList } from '@core/api/financialManage/capitalaccountmanager'
import search from '@/core/mixins/search'
import { mapGetters } from 'vuex'
import { formatMoney } from '@core/utils'
import { billingNopage, receiveAdd, receiveEdit, getReceiveDetail, relationInvoice } from '@core/api/financialManage/projectfinancemanager'
import { validateLength, toDecimal } from '@core/utils/validate'
import { getPersonnelsByOrgId } from '@core/api/personnel'
import { getSessionStorage } from '@core/utils/auth'
export default {
  name: 'ReceivePayAdd',
  mixins: [upload, search],
  props: {
    compomentId: {
      type: String,
      default: ''
    },
    compomentType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      option: [],
      invoiceList: [],
      payeeList: [],
      invoiceTitle: ['未选发票', '已选发票'],
      form: {
        paymentDate: Date.now(),
        amountReceived: '',
        payee: '',
        paymentMethod: '',
        receivingAccountType: '',
        receivingAccountId: '',
        collectionPlan: '',
        collectionType: 'f9b10a0b543544dda6a7ac5e068fd7a1',
        collectionCategory: '',
        chequeBankName: '',
        chequeNumber: '',
        remark: '',
        summary: '',
        addBillingReceiveDtos: []
      },
      formRules: {
        paymentDate: [{ required: true, message: '请选择开票日期', trigger: 'change' }],
        amountReceived: [{ required: true, message: '请输入收款金额', trigger: 'blur' }, validateLength(0, 20)],
        payee: [{ required: true, message: '请选择收款人', trigger: 'change' }],
        paymentMethod: [{ required: true, message: '请选择支付方式', trigger: 'change' }],
        collectionType: [{ required: false, message: '请选择收款类型', trigger: 'change' }],
        collectionCategory: [{ required: true, message: '请选择收款类别', trigger: 'change' }],
        chequeNumber: [{ required: true, message: '请输入支票号', trigger: 'blur' }, validateLength(0, 20)],
        chequeBankName: [{ required: true, message: '请输入支票银行名称', trigger: 'blur' }, validateLength(0, 50)],
        remark: [validateLength(0, 255)],
        summary: [validateLength(0, 255)]
      },
      receiveId: '',
      loading: false,
      total: 0,
      companyList: [],
      searchExternal: {
        attribution: '', // 账户归属
        belongOrgId: '' // 归属单位
      },
      tableData: [],
      selectList: [
        {
          value: 'bankNumber',
          searchType: 'input',
          name: '银行账号'
        },
        {
          value: 'bankName',
          searchType: 'select',
          name: '银行(开户行名称)',
          selectData: []
        }
      ],
      btnList: [
      ],
      columns: [
        {
          type: 'selection',
          single: true
        },
        {
          label: '序号',
          index: true
        },
        {
          label: '银行(开户行名称)',
          prop: 'bankName',
          showTooltip: true
        },
        {
          label: '银行账号',
          prop: 'bankNumber',
          showTooltip: true
        },
        {
          label: '归属单位',
          prop: 'organizationName',
          showTooltip: true
        },
        {
          label: '当前余额',
          prop: 'currentBalance',
          showTooltip: true
        },
        {
          label: '开户行地址',
          prop: 'bankAddress',
          showTooltip: true
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['constant']),
    disabledCompany() {
      return !this.searchExternal.attribution
    },
    // 合同归属List
    ContractAttributionList() {
      return this.constant.ContractAttribution
    },
    // 合同ID
    contractId() {
      return this.$route.query.id
    }
  },
  watch: {
    compomentId: {
      handler(val) {
        if (val) {
          this.loading = true
          this.getDetails()
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.$store.dispatch('getConstant', ['financeInvoiceType', 'PayType', 'TransferType', 'collectionCategory', 'ContractAttribution'])
    this.getInvoiceList()
    this.getReceivePayPerson()
  },
  methods: {
    cancel() {
      this.$emit('changeComName', 'InvoicingAdd', 'cancel')
    },
    amountBlur(key) {
      this.form[key] = toDecimal(this.form[key], 2)
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const params = {
            contractId: this.contractId,
            ...this.form
          }
          if (this.receiveId) {
            if (this.compomentType === 'related') {
              relationInvoice(params, this.receiveId).then(({ data }) => {
                this.$message.success('关联发票成功')
                this.cancel()
              })
            } else {
              receiveEdit(params, this.receiveId).then(({ data }) => {
                this.$message.success('修改成功')
                this.cancel()
              })
            }
          } else {
            receiveAdd(params).then(({ data }) => {
              this.$message.success('新增成功')
              this.cancel()
            })
          }
        }
      })
    },
    getDetails() {
      getReceiveDetail(this.compomentId).then(({ data }) => {
        const { paymentDate, amountReceived, payee, paymentMethod, receivingAccountType, receivingAccountId, collectionPlan, collectionType, collectionCategory, chequeBankName, chequeNumber, remark, summary, id } = data
        this.receiveId = id
        this.form = {
          paymentDate,
          amountReceived,
          payee,
          paymentMethod,
          receivingAccountType,
          receivingAccountId,
          collectionPlan,
          collectionType,
          collectionCategory,
          chequeBankName,
          chequeNumber,
          remark,
          summary
        }
        this.loading = false
      })
    },
    // 获取对应发票
    getInvoiceList() {
      this.invoiceList = []
      billingNopage({}).then(({ data }) => {
        data.map(item => {
          const balance = item.balanceReceived === null || '' ? '0.00' : formatMoney(item.balanceReceived)
          const list = {
            key: item.id,
            label: item.invoiceNumber + ' / 金额 ￥' + formatMoney(item.invoiceAmount) + ' / 发票金额 ￥' + balance
          }
          this.invoiceList.push(list)
        })
      })
    },
    // 获取收款人
    getReceivePayPerson() {
      getPersonnelsByOrgId(getSessionStorage('orgId')).then(({ data }) => {
        this.payeeList = data
      })
    },
    selectAccount() {
      if (this.form.receivingAccountType === '') {
        this.$message.warning('请选择银行账户类型')
        return
      }
      this.$refs.dialog.show = true
      this.fetchData()
    },
    fetchData(type) {
      this.loading = true
      this.queryCopy(type)
      const { page, size, search } = this
      const params = {
        page: page - 1 || 0,
        size: size || 5,
        state: this.form.receivingAccountType,
        orgType: this.searchExternal.attribution,
        organizationId: this.searchExternal.belongOrgId,
        ...search
      }

      bankaccountList(params).then(({ data }) => {
        const { page: { content, total }, sum } = data
        this.total = total
        this.tableData = content
        this.loading = false
        this.sumData = sum
      }).catch(e => {
      })
    },
    async handlerChangeProject(val) {
      if (val) {
        this.$set(this.searchExternal, 'company', '')
        const { data } = await getOrganizationByBelongList(val)
        this.companyList = data.map(i => ({ code: i.id, name: i.orgName }))
      } else {
        return
      }
    },
    onCkick() {
      const { onlyOneData } = this.$refs.commTable
      if (!onlyOneData()) return
      const { bankNumber } = this.$refs.commTable.multipleSelection[0]
      this.form.receivingAccountId = bankNumber
      this.$refs.dialog.show = false
    }
  }
}
</script>
<style lang="less" scoped>
.receive-pay-add {
  padding: 10px 0;
   .btn {
     width: 100%;
     display: flex;
     justify-content: center;
     margin-top: 10px;
   }
   .search-input {
      display: flex;
      justify-content: space-between;
    }
}

</style>
<style lang="less" >
.el-transfer {
  height: 150px;
  display: flex;
  justify-content: space-between;
  .el-transfer-panel {
    width: 40%;
    height: 150px;
  }
  .el-transfer__buttons {
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .el-transfer__button {
      width: 80px;
      margin-left: 0;
    }
  }
  .el-transfer-panel__body,.el-transfer-panel__list {
    height: 110px;
  }
  .el-transfer-panel__item {
    display: block  !important;
  }
}
</style>
