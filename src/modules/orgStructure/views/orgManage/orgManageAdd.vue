<template>
  <div class="org-manage-add">
    <jdy-steps :action="action">
      <jdy-step title="基本信息" />
      <jdy-step title="资质信息" />
    </jdy-steps>
    <template v-if="action===0">
      <base-info ref="baseInfo" :disabled="false" :personnel-id="personnelId" />
    </template>
    <template v-if="action===1">
      <qualification-info :disabled="false" />
    </template>
    <div class="steps-action">
      <template v-if="action===0">
        <el-button type="primary" @click="saveAndNext('save')">保存</el-button>
        <el-button type="primary" @click="saveAndNext('down')">下一步</el-button>
      </template>
      <template v-if="action===1">
        <el-button type="primary" @click="config('reduce')">上一步</el-button>
        <el-button type="primary">完成</el-button>
      </template>
      <el-button @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>

<script>

import BaseInfo from './components/BaseInfo'
import QualificationInfo from './components/QualificationInfo'
export default {
  name: 'OrgManageAdd',
  components: {
    BaseInfo,
    QualificationInfo
  },
  data() {
    return {
      action: 0,
      personnelId: ''
    }
  },
  methods: {
    config(type) {
      switch (type) {
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
          this.action += 1
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.org-manage-add {
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
