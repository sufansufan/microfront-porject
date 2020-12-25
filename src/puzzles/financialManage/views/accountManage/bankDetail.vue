<template>
  <div class="bank-detail">
    <div class="from-box">
      <div class="from-title">
        <el-button type="info" icon="iconfont icon-fanhui-copy" @click="$router.go(-1)">返回</el-button>
        <p>{{ sumData.bankName }}</p>
      </div>
      <el-form ref="ruleForm" :key="key" :model="ruleForm" label-width="160px" class="rule-form-flex four-width">
        <el-form-item label="银行账号">
          <el-input
            v-model.trim="sumData.bankNumber"
            disabled
          />
        </el-form-item>

        <el-form-item label="开户行地址">
          <el-input
            v-model.trim="sumData.bankAddress"
            disabled
          />
        </el-form-item>

        <el-form-item label="归属单位">
          <div class="external-list">
            <el-select
              v-model="searchExternal.attribution"
              placeholder=""
              style="width: 30%"
              clearable
              disabled
              @change="handlerChangeProject"
            >
              <el-option
                v-for="item in ContractAttributionList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
            <el-select
              v-model="sumData.organizationName"
              disabled
              clearable
              style="width: 70%"
            >
              <el-option
                v-for="item in companyList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </div>
        </el-form-item>

        <el-form-item label="账户类型">
          <jdy-select
            v-model="sumData.accountType"
            :select-data="constant.BankAccountType"
            :select-options="{value:'code',label:'name'}"
          />
        </el-form-item>

        <el-form-item label="开户日期">
          <el-date-picker
            v-model="sumData.openAccountDate"
            type="date"
            format="yyyy-MM-dd h:m:s"
            value-format="yyyy-MM-dd h:m:s"
            disabled
          />
        </el-form-item>

        <el-form-item label="当前余额">
          <el-input
            v-model.trim="sumData.currentBalance"
            disabled
          />
        </el-form-item>

        <el-form-item label="可用余额">
          <el-input
            v-model.trim="sumData.availableBalance"
            disabled
          />
        </el-form-item>

        <el-form-item label="账上余额">
          <el-input
            v-model.trim="sumData.accounBalance"
            disabled
          />
        </el-form-item>

        <el-form-item label="支出合计">
          <el-input
            v-model.trim="sumData.expendTotal"
            disabled
          />
        </el-form-item>

        <el-form-item label="收入合计">
          <el-input
            v-model.trim="sumData.incomeTotal"
            disabled
          />
        </el-form-item>

        <el-form-item label="支出延期">
          <el-input
            v-model.trim="sumData.expendDelay"
            disabled
          />
        </el-form-item>

        <el-form-item label="收款未到">
          <el-input
            v-model.trim="sumData.collectionNotReceived"
            disabled
          />
        </el-form-item>
        <template v-if="transitionShow">
          <el-form-item label="负责人">
            <jdy-select
              v-model="sumData.chargePersonId"
              placeholder="请选择负责人"
              disabled
              :select-data="constant.orgPersonList"
              :select-options="{value:'id',label:'name'}"
            />
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input
              v-model.trim="sumData.telephone"
              disabled
            />
          </el-form-item>

          <el-form-item label="状态">
            <jdy-select
              v-model="sumData.state"
              :select-data="constant.BankAccountState"
              :select-options="{value:'code',label:'name'}"
            />
          </el-form-item>

          <el-form-item label="备注" class="one-width" style="width:100%">
            <el-input v-model.trim="sumData.remark" type="textarea" clearable disabled />
          </el-form-item>

          <el-form-item label="录入人">
            <el-input
              v-model.trim="recorder"
              disabled
            />
          </el-form-item>

          <el-form-item label="最后一次操作时间">
            <el-date-picker
              v-model="sumData.lastOperateDate"
              type="date"
              disabled
            />
          </el-form-item>
        </template>
      </el-form>
      <div class="showBtn">
        <el-button type="text" class="btn" @click="transitionShow = !transitionShow">{{ transitionShow?'收起':'展开' }}</el-button>
      </div>
    </div>
    <bank-detail-list :detail-data="detailData" />
  </div>
</template>
<script>
import { getSessionStorage } from '@core/utils/auth'
import { mapGetters } from 'vuex'
import BankDetailList from './components/BankDetailList'
import { getDetailBankaccount } from '@core/api/financialManage/capitalaccountmanager'
export default {
  name: 'MainContent',
  components: {
    BankDetailList
  },
  data() {
    return {
      recorder: '',
      transitionShow: true,
      searchExternal: {
        attribution: '', // 账户归属
        belongOrgId: '' // 归属单位
      },
      sumData: {},
      detailData: {}
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    if (this.$route.query.id) {
      this.recorder = getSessionStorage('userName')
      this.detailBankaccount(this.$route.query.id)
    }
    this.$store.dispatch('getConstant', [
      'BankAccountState',
      'BankAccountType',
      'ContractAttribution', // 合同归属
      { type: 'orgPersonList', params: getSessionStorage('orgId') }
    ]).then(() => { })
  },
  methods: {
    detailBankaccount(id) {
      getDetailBankaccount(id).then(({ data }) => {
        this.sumData = data
        this.detailData.bankName = data.bankName
        this.detailData.state = data.state
      })
    }
  }
}
</script>
<style lang="less" scoped>
.bank-detail {
  height: calc(100vh - 130px);
  overflow-y: auto;
  padding: 10px;
  .external-list{
    display: flex;
  }
  .from-title {
    display: flex;
    height: 50px;
    align-items: center;
    p{
      flex: 1;
      text-align: center;
      font-size: 18px;
    }
  }
  .showBtn{
    display: flex;
    justify-content: flex-end;
    .btn{
      font-size: 16px;
    }
  }
}
</style>
