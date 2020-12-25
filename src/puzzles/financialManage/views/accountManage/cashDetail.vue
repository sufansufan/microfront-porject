<template>
  <div class="bank-detail">
    <div class="from-box">
      <div class="from-title">
        <el-button type="info" icon="iconfont icon-fanhui-copy" @click="$router.go(-1)">返回</el-button>
        <p>{{ formInline.name }}</p>
      </div>
      <el-form ref="ruleForm" :key="key" :model="ruleForm" label-width="160px" class="rule-form-flex four-width">
        <el-form-item label="开户日期">
          <el-date-picker
            v-model="formInline.createDate"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd h:m:s"
            value-format="yyyy-MM-dd h:m:s"
            disabled
          />
        </el-form-item>

        <el-form-item label="当前余额">
          <el-input
            v-model.trim="formInline.currentBalance"
            disabled
          />
        </el-form-item>

        <el-form-item label="支出合计">
          <el-input
            v-model.trim="formInline.expendTotal"
            disabled
          />
        </el-form-item>

        <el-form-item label="收入合计">
          <el-input
            v-model.trim="formInline.incomeTotal"
            disabled
          />
        </el-form-item>

        <template v-if="transitionShow">
          <el-form-item label="负责人">
            <jdy-select
              v-model="formInline.chargePersonId"
              holder="请选择负责人"
              :select-data="constant.orgPersonList"
              :select-options="{value:'id',label:'name'}"
              disabled
            />
          </el-form-item>

          <el-form-item label="联系电话">
            <el-input
              v-model.trim="formInline.telephone"
              disabled
            />
          </el-form-item>

          <el-form-item label="状态">
            <jdy-select
              v-model="formInline.state"
              holder="请选择负责人"
              :select-data="constant.BankAccountState"
              :select-options="{value:'code',label:'name'}"
              disabled
            />
          </el-form-item>

          <el-form-item label="备注" class="one-width" style="width:100%">
            <el-input v-model.trim="formInline.remark" type="textarea" disabled />
          </el-form-item>

          <el-form-item label="录入人" prop="userName">
            <el-input
              v-model.trim="userName"
              disabled
            />
          </el-form-item>

          <el-form-item label="最后一次操作时间">
            <el-date-picker
              v-model="formInline.lastOperateDate"
              type="datetime"
              placeholder="选择日期时间"
              disabled
            />
          </el-form-item>
        </template>
      </el-form>
      <div class="showBtn">
        <el-button type="text" class="btn" @click="transitionShow = !transitionShow">{{ transitionShow?'收起':'展开' }}</el-button>
      </div>
    </div>
    <cash-detail-list :detail-data="detailData" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getSessionStorage } from '@core/utils/auth'
import { detailCash } from '@core/api/financialManage/capitalaccountmanager'
import CashDetailList from './components/CashDetailList'
export default {
  name: 'MainContent',
  components: {
    CashDetailList
  },
  data() {
    return {
      transitionShow: true,
      searchExternal: {
        attribution: '', // 账户归属
        belongOrgId: '' // 归属单位
      },
      userName: '',
      formInline: {},
      detailData: {}
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    if (this.$route.query.id) {
      this.userName = getSessionStorage('userName')
      this.getdetailCash(this.$route.query.id)
    }
    this.$store.dispatch('getConstant', [
      'BankAccountState',
      { type: 'orgPersonList', params: getSessionStorage('orgId') }
    ]).then(() => {})
  },
  methods: {
    getdetailCash(id) {
      detailCash(id).then(({ data }) => {
        this.formInline = data
        this.detailData.name = data.name
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
