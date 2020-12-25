<template>
  <div class="enginner-enginner-contract">
    <!-- 工程合同补充协议主页面 -->
    <extend-book
      v-if="mainPage"
      ref="mainTable"
      :table-data="tableData"
      :table-options="tableOptions"
      :extend-btn-list="extendBtnList"
      type="engineer"
      :loading="loading"
      :total="total"
      @handlerClickBtn="handlerClickBtn"
      @clickRow="clickCurrentRow"
      @fetchData="fetchData"
    />
    <!-- 新增/修改页面 -->
    <!-- 合同ID -->
    <div v-if="infoPage">
      <extend-info
        :options="editRow"
        :info-type="infoType"
        :contract-id="contractId"
        @onBack="onBack"
      />
    </div>
    <!-- 版本查看页面 -->
    <div v-if="versionPage">
      <version-check
        :info="editRow"
        :contract-id="contractId"
        @lookVersion="lookVersion"
        @onBack="onBack"
      />
    </div>
  </div>
</template>

<script>
import ExtendBook from '../../../components/extendBook/index'
import VersionCheck from './version'
import extendInfo from './info.vue'
import {
  getSupplyList
} from '@core/api/contractManage/contractmanager'
export default {
  name: 'EnginnerExtend',
  components: {
    ExtendBook,
    VersionCheck,
    extendInfo
  },
  data() {
    return {
      loading: false,
      /*
        pageType
        0 显示主页面 main
        1 显示新增修改/页面 info
        2 显示版本查看页面 detail
      */
      pageType: 'main',
      columns: [],
      editRow: null,
      total: 0,
      tableData: [],
      /*
        区分使用infoPage 是新增 修改 or 查看
        0 新增 add
        1 修改 edit
        2 查看 detail
        3 版本协议中进行查看协议 额外显示流程图和修改记录 versionLook
      */
      infoType: 'add',
      tableOptions: {
        maxHeight: 'calc( 100% - 350px)',
        defaultSort: {
          prop: 'contractNumber',
          order: 'descending'
        }
      },
      extendBtnList: [
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
          power: 'officeAgree:edition',
          icon: 'icon-banbenchakan'
        }],
        [{
          type: 'back',
          label: '撤销',
          icon: 'icon-chexiao',
          valid: true,
          power: 'officeAgree:revoke'
        }]
      ]
    }
  },
  computed: {
    // 补充协议归属合同ID
    contractId() {
      return this.$route.query.id
    },
    mainPage() {
      return this.pageType === 'main'
    },
    // 详情页面
    infoPage() {
      return this.pageType === 'info'
    },
    // 版本查看页面
    versionPage() {
      return this.pageType === 'detail'
    }
  },
  methods: {
    handlerClickBtn({ type, row }) {
      // 当前选中数据
      this.editRow = null
      this[`${type}Extend`](row)
    },
    // add 新增逻辑
    addExtend() {
      this.infoType = 'add'
      this.pageType = 'info'
    },
    // edit 修改逻辑
    editExtend(row) {
      this.editRow = row
      this.infoType = 'edit'
      this.pageType = 'info'
    },
    // detail 版本查看list逻辑
    lookExtend(row) {
      this.editRow = row
      this.pageType = 'detail'
    },
    // 版本查看中的补充协议展示
    lookVersion({ type, value, row }) {
      this.editRow = row
      this.pageType = 'info' // / 打开查看页面
      this.infoType = 'versionLook' // 查看专用
    },
    // 某一行被点击时 也就是查看
    clickCurrentRow({ prop, value, row }) {
      // 点击的是协议名称
      this[`${prop}Click`](value, row)
    },
    // 点击查看name
    nameClick(value, row) {
      this.editRow = row
      this.pageType = 'info'
      this.infoType = 'detail'
    },
    async fetchData(params) {
      this.loading = true
      params['contractId'] = this.contractId
      const { data: { content, total }} = await getSupplyList(params)
      this.tableData = content
      this.total = total
      this.loading = false
    },
    // 新增/修改点击返回按钮
    onBack() {
      this.pageType = 'main'
    }
  }
}
</script>

<style lang="less">
.enginner-enginner-contract {
  .el-table__body-wrapper {
    max-height: calc(100vh - 400px);
  }
}
</style>
