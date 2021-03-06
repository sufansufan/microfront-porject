<template>
  <div class="cash-detail-list">
    <div>
      <crumb-box>
        <span class="crumb-text">
          明细列表
        </span>
      </crumb-box>
      <div class="back-search-box">
        <search-bar :select-list="selectList" :search="search" :btn-list="btnList" @changeSearch="changeSearch" />
      </div>
      <comm-table
        ref="commTable"
        :single-selected="true"
        :columns="columns"
        :data="tableData"
        :count="total"
        :loading="loading"
      />
    </div>
    <div class="dialog">
      <drag-dialog ref="dialog" :title="dialogTitle.title" width="60%">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="160px" class="rule-form-flex">
          <el-form-item label="明细类型" prop="type" class="one-half">
            <jdy-select
              v-model="ruleForm.type"
              holder="请选择明细类型"
              :select-data="constant.DetailType"
              :select-options="{value:'code',label:'name'}"
            />
          </el-form-item>

          <el-form-item label="财务类别" prop="classIdArr" class="one-half">
            <jdy-select
              v-model="ruleForm.classIdArr"
              holder="请选择财务类别"
              :select-data="financeClassName"
              :is-cascader="true"
              :select-options="{value:'id',label:'name',children:'childrens'}"
            />
          </el-form-item>

          <el-form-item label="发生日期" required class="one-half" prop="happenDate">
            <el-date-picker v-model="ruleForm.happenDate" type="date" placeholder="请选择发生日期" style="width: 100%;" clearable />
          </el-form-item>

          <el-form-item label="发生金额" prop="money" class="one-half">
            <amount-input
              v-model.trim="ruleForm.money"
              placeholder="请输入发生金额"
              @blur="moneyFormat('money')"
            />
          </el-form-item>

          <el-form-item label="摘要" prop="summary" class="one-width">
            <el-input v-model.trim="ruleForm.summary" type="textarea" maxlength="255" clearable placeholder="请输入摘要" />
          </el-form-item>

          <el-form-item label="备注" prop="remark" class="one-width">
            <el-input v-model.trim="ruleForm.remark" type="textarea" maxlength="255" clearable placeholder="请输入备注" />
          </el-form-item>

          <el-form-item label="录入人" prop="name1" class="one-half">
            <el-input v-model.trim="useName" clearable placeholder="请输入录入人" disabled />
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button v-if="dialogTitle.type==='add'" type="primary" @click="submitForm('ruleForm','once')">保存</el-button>
          <el-button v-if="dialogTitle.type==='add'" type="primary" @click="submitForm('ruleForm','many')">保存并继续添加</el-button>
          <el-button v-if="dialogTitle.type==='edit'" type="primary" @click="submitForm('ruleForm','edit')">保存</el-button>
        </div>
      </drag-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSessionStorage } from '@core/utils/auth'
import { toDecimal } from '@core/utils/validate'
import searchTableData from '../searchTableData/cashDetailList'
import search from '@/core/mixins/search'
import { cashaccountdetailList, addCashaccountdetai, editCashDetai } from '@core/api/financialManage/capitalaccountmanager'
import { getLeftTree } from '@core/api/financialManage/financeclassmanager'
import {
  codeChangeName,
  parseTime,
  handlerSearchBar
} from '@core/utils'
export default {
  name: 'CashDetailList',
  components: {},
  directives: {
    'functSize': {
      bind(el, pinding) {
        el.style.fontSize = parseInt(pinding.value) + 'px'
      }
    }
  },
  mixins: [searchTableData, search],
  props: {
    detailData: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      ruleForm: {
        type: '',
        classIdArr: [],
        happenDate: '',
        money: '',
        remark: '',
        summary: ''
      },
      useName: '',
      rules: {
        type: [
          { required: true, message: '请选择明细类型', trigger: 'change' }
        ],
        classIdArr: [
          { type: 'array', required: true, message: '请选择财务类别', trigger: 'blur' }
        ],
        happenDate: [
          { required: true, message: '请选择发生日期', trigger: 'change' }
        ],
        money: [
          { required: true, message: '请输入发生金额', trigger: 'blur' }
        ]
      },
      dialogTitle: '',
      total: 0
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.useName = getSessionStorage('userName')
    this.$store.dispatch('getConstant', [
      'AccountManageSourceType', // 来源
      'DetailType', // 明细类型
      { type: 'orgPersonList', params: getSessionStorage('orgId') }
    ]).then(() => {
      getLeftTree({}).then(({ data }) => {
        this.removeEmptyChildren(data)
        this.financeClassName = data
        this.selectList = handlerSearchBar(
          this.selectList,
          [0, 1, 2, 3, 4],
          [
            this.constant.AccountManageSourceType,
            data,
            this.constant.DetailType,
            this.constant.SettlementType,
            this.constant.PayType
          ])
      })
    })
    if (this.$route.query.id) {
      this.cashAccountId = this.$route.query.id
    }
    this.fetchData()
  },
  mounted() {
  },
  methods: {
    fetchData(type) {
      this.loading = true
      this.queryCopy(type)
      const { page, size, search } = this
      const { dates, financeClassIdArr } = search
      const datearr = dates || []

      const params = {
        page: page - 1 || 0,
        size: size || 10,
        happenDate: {
          after: datearr[0] || '',
          before: datearr[1] || ''
        },
        financeClassId: financeClassIdArr[financeClassIdArr.length - 1] || '',
        ...search
      }
      delete params.dates
      delete params.financeClassIdArr
      cashaccountdetailList(params, this.$route.query.id).then(({ data }) => {
        const { content, total } = data
        content.forEach(item => {
          item.sourceName = codeChangeName(this.constant.AccountManageSourceType, item.source) // 来源
          item.typeName = codeChangeName(this.constant.DetailType, item.type) // 明细类型
          item.happenDateStr = parseTime(item.happenDate, 'y-m-d') // 发生日期
          item.createDateStr = parseTime(item.createDate) // 录入时间
        })
        this.total = total
        this.tableData = content
        this.loading = false
      }).catch(e => {
      })
    },
    submitForm(formName, type) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          const { classIdArr } = this.ruleForm
          this.ruleForm.financeClassId = classIdArr[classIdArr.length - 1]
          delete this.ruleForm.classIdArr
          if (type === 'once') {
            addCashaccountdetai({ ...this.ruleForm, cashAccountId: this.cashAccountId }).then(({ data }) => {
              this.fetchData()
              this.$refs.dialog.show = false
            })
          } else if (type === 'many') {
            addCashaccountdetai({ ...this.ruleForm, cashAccountId: this.cashAccountId }).then(({ data }) => {
              this.fetchData()
              this.$refs[formName].resetFields()
            })
          } else if (type === 'edit') {
            editCashDetai(this.dialogTitle.id, { ...this.ruleForm, cashAccountId: this.cashAccountId, optimisticLock: this.optimisticLock }).then(({ data }) => {
              this.fetchData()
              this.$refs.dialog.show = false
              this.$refs[formName].resetFields()
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    moneyFormat(key) { // 金额格式化
      if (this.ruleForm[key]) {
        this.ruleForm[key] = toDecimal(this.ruleForm[key], 2)
      }
    },
    removeEmptyChildren(node) {
      node.forEach(item => {
        if ('childrens' in item && item.childrens.length === 0) {
          delete item.childrens
        } else if ('childrens' in item && item.childrens.length) {
          this.removeEmptyChildren(item.childrens)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.cash-detail-list {
  .crumb-text {
    width: 100%;
    text-align: center;
  }
  .back-search-box {
    margin-top: 10px;
  }
}
</style>
