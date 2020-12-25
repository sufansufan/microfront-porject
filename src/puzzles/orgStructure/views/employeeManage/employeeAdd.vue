<template>
  <div class="employee-add">
    <jdy-steps :action="action">
      <jdy-step title="基本信息" />
      <jdy-step title="任职信息" />
      <jdy-step title="合同信息" />
      <jdy-step title="持证信息" />
    </jdy-steps>
    <keep-alive>
      <template v-if="action===0">
        <base-info ref="baseInfo" :disabled="disabled" :personnel-id="personnelId" />
      </template>
      <template v-if="action===1">
        <post-info ref="postInfo" :disabled="disabled" :personnel-id="personnelId" />
      </template>
      <template v-if="action===2">
        <contract-info ref="contractInfo" :disabled="disabled" :personnel-id="personnelId" />
      </template>
      <template v-if="action===3">
        <card-info ref="cardInfo" :disabled="disabled" :personnel-id="personnelId" />
      </template>
    </keep-alive>
    <div class="steps-action">
      <template v-if="action===0">
        <el-button
          type="primary"
          @click="saveAndNext('down')"
        > 下一步</el-button>
        <el-button
          type="primary"
          @click="saveAndNext('save')"
        >保存</el-button>
      </template>
      <template v-if="action===1 || action===2">
        <el-button type="primary" @click="config('reduce')">上一步</el-button>
        <el-button type="primary" @click="config('add')">下一步</el-button>
      </template>
      <template v-if="action===3">
        <el-button type="primary" @click="config('reduce')">上一步</el-button>
        <el-button type="primary" @click="$router.go(-1)">完成</el-button>
      </template>
      <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>

<script>
import BaseInfo from './components/BaseInfo'
import PostInfo from './components/PostInfo'
import ContractInfo from './components/ContractInfo'
import CardInfo from './components/CardInfo'
export default {
  components: {
    BaseInfo,
    PostInfo,
    ContractInfo,
    CardInfo
  },
  data() {
    return {
      action: 0,
      disabled: false,
      personnelId: '',
      actionIndex: 0
    }
  },
  created() {
    this.disabled = false
  },
  methods: {
    config(type) {
      if (type === 'add') {
        if (this.action === 1 && !this.$refs.postInfo.tableData.length) {
          this.$message.warning('请添加任职信息')
          return
        }
        if (this.action === 2) {
          if (!this.$refs.contractInfo.tableData.length) {
            this.$message.warning('至少要存在一条正常状态的合同信息')
            return
          }
          const list = this.$refs.contractInfo.tableData
          const someState = list.some(item => item.stateName === '正常')
          if (!someState) {
            this.$message.warning('请添加正常状态的合同信息')
            return
          }
        }
      }
      switch (type) {
        case 'add':
          this.action += 1
          break
        case 'reduce':
          this.action -= 1
          break
        default:
          break
      }
    },
    saveAndNext(type) {
      this.$refs.baseInfo.addOrEdit().then(res => {
        this.personnelId = res
        if (type === 'down') {
          this.config('add')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.employee-add {
  padding: 10px;
  height: calc(100vh - 140px);
  overflow-y: auto;
  .steps-action {
    display: flex;
    justify-content: center;
    margin: 30px auto;
  }
}
</style>
