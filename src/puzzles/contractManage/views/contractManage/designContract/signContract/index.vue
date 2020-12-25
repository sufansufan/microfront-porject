<template>
  <div class="design-sign-contract">
    <!-- 主页面 -->
    <extend-book
      v-if="mainPage"
      :loading="loading"
      :table-data="tableData"
      type="deSign"
      :total="total"
      :table-options="tableOptions"
      :extend-btn-list="extendBtnList"
      @handlerClickBtn="handlerClickBtn"
      @clickRow="clickCurrentRow"
      @fetchData="fetchData"
    />
    <!-- 新增/修改页面 -->
    <div v-if="infoPage">
      <extend-info :options="editRow" :info-type="infoType" :contract-id="contractId" @onBack="onBack" />
    </div>
    <!-- 版本查看页面 -->
    <div v-if="versionPage">
      <extend-version :contract-id="contractId" :info="editRow" @onBack="onBack" @lookVersion="lookVersion" />
    </div>
  </div>
</template>

<script>
import ExtendBook from '../../../components/extendBook/index'
// 详情页面
import ExtendInfo from './info'
// 版本查看table
import ExtendVersion from './version'
import {
  getSupplyList
} from '@core/api/contractManage/contractmanager'
export default {
  name: 'SignExtend',
  components: {
    ExtendBook,
    ExtendInfo,
    ExtendVersion
  },
  data() {
    return {
      loading: false,
      total: 0,
      tableOptions: {
        maxHeight: 'calc(100% - 400px)',
        defaultSort: {
          order: 'descending',
          prop: 'contractNumber'
        }
      },
      tableData: [],
      // 当前选中行
      editRow: null,
      /*
        pageType
        0 显示主页面 main
        1 显示新增修改/页面 info
        2 显示版本查看页面 version
      */
      pageType: 'main',
      /*
        infoType
        0 表示新建 add
        1 表示修改页面 edit
        2 表示查看 detail
        3 版本查看中进行查看协议 修改的基础上额外显示流程图和修改记录 versionLook
      */
      infoType: 'add',
      extendBtnList: [
        [{
          type: 'add',
          label: '新增',
          valid: false,
          power: 'designAgree:add',
          icon: 'icon-xinzeng1-copy'
        },
        {
          type: 'edit',
          label: '修改',
          valid: true,
          power: 'designAgree:edit',
          icon: 'icon-xiugai-copy'
        },
        {
          type: 'del',
          label: '删除',
          valid: true,
          icon: 'icon-icon7-copy',
          power: 'designAgree:delete'
        },
        {
          type: 'look',
          label: '版本查看',
          valid: true,
          icon: 'icon-banbenchakan',
          power: 'designAgree:edition'
        }],
        [{
          type: 'back',
          label: '撤销',
          icon: 'icon-chexiao',
          valid: true,
          power: 'designAgree:revoke'
        }]
      ]
      // currentId 代表当前补充协议Id
    }
  },
  computed: {
    // 设计合同补充协议 直接取当前设计合同的Id
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
      return this.pageType === 'versionDetail'
    }
  },
  methods: {
    handlerClickBtn({ type, row }) {
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
    // // del 删除逻辑
    // delExtend(row) {
    //   console.log(row, '删除')
    // },
    // look 版本查看list逻辑
    lookExtend(row) {
      this.editRow = row
      this.pageType = 'versionDetail'
    },
    // 点击表格内部元素
    clickCurrentRow({ prop, value, row }) {
      this[`${prop}Click`](value, row)
    },
    // 点击table查看协议
    nameClick(value, row) {
      this.editRow = row
      this.pageType = 'info'
      this.infoType = 'detail'
    },
    // 版本查看中点击协议进入查看页面 版本查看详情
    // 额外显示流程图和补充信息
    lookVersion({ type, value, row }) {
      this.editRow = row
      this.pageType = 'info'
      this.infoType = 'versionLook'
    },
    // 新增/修改点击返回按钮
    onBack() {
      this.pageType = 'main'
    },
    async fetchData(params) {
      this.loading = true
      params['contractId'] = this.contractId
      const { data: { content, total }} = await getSupplyList(params)
      this.tableData = content
      this.total = total
      this.loading = false
    }
  }
}
</script>

<style lang="less">
.design-sign-contract {
  .el-table__body-wrapper {
    max-height: calc(100vh - 400px);
  }
}
</style>
