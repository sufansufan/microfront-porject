<template>
  <div class="supplementary-agreement">
    <!-- 主页面 -->
    <extend-book
      v-if="pageType ==='main'"
      :loading="loading"
      :total="tableDataCount"
      :table-data="tableData"
      :extend-btn-list="extendBtnList"
      :table-options="{ 'defaultSort' : {'prop':'contractNumber' ,'order':'descending'}}"
      type="universal"
      @handlerClickBtn="handlerClickBtn"
      @clickRow="clickCurrentRow"
      @fetchData="fetchData"
    />
    <!-- 新增/修改页面 -->
    <div v-if="pageType ==='add'">
      <extend-info ref="supplementary" :options="editRow" :info-type="infoType" @onBack="onBack" />
    </div>
    <!-- 版本查看页面 -->
    <div v-if="pageType ==='version'">
      <version-check
        :info="editRow"
        @lookVersion="lookVersion"
        @onBack="onBack"
      />
    </div>
  </div>
</template>

<script>
import { getSupplyList } from '@core/api/contractManage/contractmanager'
import table from '@core/mixins/table'
import pagination from '@core/mixins/pagination'
import ExtendBook from '../../../components/extendBook/index'
import VersionCheck from './version'
import extendInfo from './add.vue'
import { mapGetters } from 'vuex'
import { getSessionStorage } from '@core/utils/auth'

export default {
  name: 'OfficeSupplementaryAgreementIndex',
  components: {
    ExtendBook,
    VersionCheck,
    extendInfo
  },
  mixins: [pagination, table],
  data() {
    return {
      loading: false,
      /*
        pageType
        0 显示主页面 main
        1 显示新增修改/页面 info
        2 显示版本查看页面 look
      */
      pageType: 'main',
      editRow: null,
      tableData: [],
      tableDataCount: 0,
      /*
          区分使用infoPage 是新增 修改 or 查看
          0 新增 add
          1 修改 update
          2 查看 look
          3 版本协议中进行查看协议 额外显示流程图和修改记录 versionLook
        */
      infoType: 'add',
      extendBtnList: []
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    const orgListParams = {
      parentPath: getSessionStorage('orgId'),
      del: '0',
      state: 'ok'
    }
    this.$store.dispatch('getConstant', [
      'EffectiveState',
      'ContractCategory',
      'BalanceType',
      'contractState',
      'SubContractType',
      'userOrganization',
      'generateNo',
      { type: 'orgList', params: orgListParams }
      // { type: 'orgPersonList', params: getSessionStorage('orgId') }
    ])
    this.getAgreeBtn()
  },
  methods: {
    handlerClickBtn({ type, row }) {
      this.editRow = null
      this[`${type}Extend`](row)
    },
    // add 新增逻辑
    addExtend() {
      this.infoType = 'add'
      this.pageType = 'add'
      this.$nextTick(() => { this.$refs.supplementary.addCreate() })
    },
    // edit 修改逻辑
    editExtend(row) {
      this.editRow = row
      this.infoType = 'edit'
      this.pageType = 'add'
      this.$nextTick(() => { this.$refs.supplementary.updateCreate(row) })
    },
    // 切换到版本列表页面
    lookExtend(row) {
      this.editRow = row
      this.pageType = 'version'
    },
    // 版本查看页面的 详情查看
    lookVersion({ prop, value, row }) {
      this.editRow = row
      this.pageType = 'add' // / 打开查看页面
      this.infoType = 'versionLook' // 查看专用
      this.$nextTick(() => { this.$refs.supplementary.lookCreate(row) })
    },

    // 某一行被点击时 也就是查看
    clickCurrentRow({ prop, value, row }) {
      // 点击的是协议名称
      this[`${prop}Click`](value, row)
    },
    // 点击协议名称 查看详情
    nameClick(value, row) {
      this.editRow = row
      this.pageType = 'add'
      this.infoType = 'details'
      this.$nextTick(() => { this.$refs.supplementary.lookCreate(row) })
    },
    fetchData(param) {
      this.loading = true
      const params = {
        size: this.size,
        page: this.page - 1,
        contractId: this.$route.query.id, // 协议归属合同id
        ...param
      }

      // ascending: false
      // contractId: "b6ee12a9a23b45338d8d8f883e0b596d"
      // page: 0
      // propertyName: "contractNumber"
      getSupplyList(params).then(({ data: { total, content }}) => {
        this.loading = false
        this.tableData = content
        this.tableData.map(item => {
          item.amount = Number(Number(item.amount).toFixed(2)).toLocaleString('zh', { minimumFractionDigits: 2 })
        })
        this.tableDataCount = total
      })
    },
    // 新增/修改点击返回按钮
    onBack() {
      if (this.infoType === 'versionLook' && this.pageType !== 'version') {
        this.pageType = 'version'
      } else {
        this.pageType = 'main'
      }
    },
    getAgreeBtn() {
      if (RegExp(/officeDetail/).exec(this.$route.path)) {
        // 办公类合同补充协议
        this.extendBtnList = [
          [{
            type: 'add',
            label: '新增',
            valid: false,
            power: 'officeAgree:add',
            icon: 'icon-xinzeng1-copy'
          },
          {
            type: 'edit',
            label: '修改',
            valid: true,
            power: 'officeAgree:edit',
            icon: 'icon-xiugai-copy'
          },
          {
            type: 'del',
            label: '删除',
            valid: true,
            icon: 'icon-icon7-copy',
            power: 'officeAgree:delete'
          },
          {
            type: 'look',
            label: '版本查看',
            valid: true,
            icon: 'icon-banbenchakan',
            power: 'officeAgree:edition'
          }],
          [{
            type: 'back',
            label: '撤销',
            icon: 'icon-chexiao',
            valid: true,
            power: 'officeAgree:revoke'
          }]
        ]
      } else {
      // 其它类合同补充协议
        this.extendBtnList = [
          [{
            type: 'add',
            label: '新增',
            valid: false,
            icon: 'icon-xinzeng1-copy',
            power: 'otherContractAgree:add'
          },
          {
            type: 'edit',
            label: '修改',
            valid: true,
            icon: 'icon-xiugai-copy',
            power: 'otherContractAgree:edit'
          },
          {
            type: 'del',
            label: '删除',
            valid: true,
            icon: 'icon-icon7-copy',
            power: 'otherContractAgree:delete'
          },
          {
            type: 'look',
            label: '版本查看',
            valid: true,
            icon: 'icon-banbenchakan',
            power: 'otherContractAgree:edition'
          }],
          [{
            type: 'back',
            label: '撤销',
            icon: 'icon-chexiao',
            valid: true,
            power: 'otherContractAgree:revoke'
          }]
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.supplementary-agreement{

}
</style>
