<template>
  <div class="clear-dialog">
    <drag-dialog ref="dialog" :title="title" width="45%" :is-show.sync="isShow">
      <template #default>
        <el-form
          ref="ruleForm"
          v-loading="loading"
          :label-position="labelPosition"
          label-width="80px"
          :model="ruleForm"
          :rules="rules"
        >
          <el-form-item label="合同金额" prop="money">
            {{ contractMoney }}
            <span v-if="hasAgreement">(含补充协议金额{{ extendMonety }})</span>
          </el-form-item>

          <div class="wapper">
            <el-form-item label="结算金额" prop="settlementAmount">
              <amount-input
                v-model="ruleForm.settlementAmount"
                placeholder="请输入结算金额"
                @blur="amountInputBlur('settlementAmount')"
              >
                <template slot="append">元</template>
              </amount-input>
            </el-form-item>

            <el-form-item label="结算日期" prop="date">
              <el-date-picker
                v-model="ruleForm.settlementDate"
                align="right"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择结算日期"
              />
            </el-form-item>
          </div>

          <el-form-item label="结算书" prop="book">
            <el-upload
              :file-list="settlementBookList"
              :action="actionUrl"
              :on-success="(response, file, fileList) => {onUploadPrefix(response,file,fileList)}"
              :data="uploadData"
              :headers="uploadHeaders"
              :on-remove="(file, fileList) => {handleRemove(file, fileList, 'settlementBookList', {name: '结算书', record: true, children: true, formName: 'editContent' })}"
              :before-upload="beforeUpload50M"
              :on-error="fileError"
              :on-progress="uploadProgress"
              :on-preview="previewFile"
            >
              <el-button type="primary"><i class="iconfont icon-chuanshu_shangchuan" /> 上传附件</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item class="row-label" label="备注">
            <el-input v-model="ruleForm.remark" type="textarea" placeholder="请输入备注" :rows="3" :maxlength="255" />
          </el-form-item>
        </el-form>
      </template>

      <template #footer>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onConfirm">确 定</el-button>
        </span>
      </template>
    </drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import upload from '@core/mixins/upload'
import { countContractAmount, countSubContractAmount, settleMainContract, sonContractSettle } from '@core/api/contractManage/contractmanager'
import { toDecimal, validateRulePrice } from '@core/utils/validate'
import { formatMoney } from '@core/utils'

export default {
  components: {
    DragDialog
  },
  mixins: [upload],
  props: {
    show: Boolean,
    type: {
      type: String,
      default: 'main'
    },
    // 当前行Id
    id: {
      type: Number,
      required: true
    },
    // 下载用Id
    downLoadId: {
      type: Number,
      required: true
    },
    // 结算日期
    countDate: {
      type: String,
      default: ''
    },
    // 备注
    market: {
      type: String,
      default: ''
    },
    // 结算金额
    amount: {
      type: [Number, String],
      default: ''
    },
    isReturn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const checkMoney = (rule, value, callback) => {
      if (!validateRulePrice(rule, value, callback)) {
        callback(new Error('只能输入大于0的金额'))
      } else if (Number(value) > 9999999999.99) {
        callback(new Error('只能输入小于等于9999999999.99的金额'))
      } else {
        callback()
      }
      const reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
      if (!reg.test(value)) callback(new Error('金额必须大于0，允许两位小数'))
      else callback()
    }
    const checkBook = (rule, value, callback) => {
      if (!this.settlementBookList || this.settlementBookList.length === 0) callback(new Error('请上传结算书'))
      else callback()
    }
    return {
      loading: false,
      title: '结算',
      contractAmount: '', // 合同金额
      extendAmount: '', // 补充协议金额
      fileList: [],
      ruleForm: {
        settlementAmount: '',
        settlementDate: '',
        remark: ''
      },
      settlementBookList: [],
      rules: {
        settlementAmount: [
          { required: true, message: '请输入结算金额', trigger: 'blur' },
          { validator: checkMoney, trigger: 'blur' }
        ],
        book: [{ required: true, validator: checkBook, trigger: 'blur' }]
      }
    }
  },
  computed: {
    contractMoney() {
      return `${formatMoney(this.contractAmount)}元`
    },
    extendMonety() {
      return `${formatMoney(this.extendAmount)}元`
    },
    isShow: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    }
  },
  async created() {
    this.loading = true
    this.uploadData.typeCode = 'settlementBook'
    this.uploadData.businessDataId = this.downLoadId
    const fetchListArray = [
      this.fetchLoadAmount
    ]
    if (this.isReturn) {
      this.ruleForm.settlementDate = this.countDate
      this.ruleForm.remark = this.market
      this.ruleForm.settlementAmount = this.amount
      fetchListArray.push(this.fetchFileList)
    }
    Promise.all(fetchListArray.map((func) => { func() })).then(() => {
      this.loading = false
    })
  },
  methods: {
    amountInputBlur(key) {
      if (this.ruleForm[key]) {
        this.ruleForm[key] = toDecimal(this.ruleForm[key], 2)
      }
    },
    onUploadPrefix(response, file, fileList) {
      this.$refs['ruleForm'].clearValidate('book')
      this.uploadMoreSuccess(fileList, 'settlementBookList', { name: '结算书', record: true })
    },
    // 大于0
    validtorMoney(rule, value, callback) {
      if (!validateRulePrice(rule, value, callback)) {
        callback(new Error('只能输入大于0的金额'))
      } else {
        callback()
      }
    },
    async fetchLoadAmount() {
      const map = {
        'sub': countSubContractAmount,
        'main': countContractAmount
      }
      const { data: { amount, subAmount, hasAgreement }} = await map[this.type](this.id)
      this.contractAmount = amount
      this.extendAmount = subAmount
      this.hasAgreement = hasAgreement
    },
    async fetchFileList() {
      // 首先请求金额金额
      const data = await this.getFileLoad()
      this.settlementBookList = data.map(file => {
        file.name = file.fileName
        file.url = file.fileUrl
        return file
      })
    },
    getPlaceHolder(title) {
      return `请输入${title}`
    },
    onCancle() {
      this.isShow = false
    },
    getParams() {
      return {
        Loading: true,
        contractId: this.id,
        settlementAmount: this.ruleForm.settlementAmount,
        settlementDate: this.ruleForm.settlementDate,
        remark: this.ruleForm.remark
      }
    },
    async onConfirmDialog() {
      const params = this.getParams()
      if (this.type === 'main') {
        await settleMainContract(params)
      } else if (this.type === 'sub') {
        await sonContractSettle(params)
      }
    },
    onConfirm() {
      this.$refs['ruleForm'].validate(async boolean => {
        if (boolean) {
          await this.onConfirmDialog()
          this.$emit('referTable')
          this.isShow = false
        }
      })
    }
  }
}
</script>

<style lang="less">
.clear-dialog {
  .wapper {
    display: flex;
    justify-content: space-between;
    > .el-form-item{
      flex:1;
       .el-date-editor{
        width:100%;
      }
    }
  }
}
</style>
