<template>
  <div class="config-add">
    <jdy-steps :action="action">
      <jdy-step title="基本信息" />
      <jdy-step title="流程设计" />
    </jdy-steps>
    <keep-alive>
      <template v-if="action===0">
        <base-info ref="baseInfo" :base-info-data="baseInfoData" />
      </template>
      <template v-if="action===1">
        <process-design ref="processDesign" :key="processDesignKey" :process-design-data="processDesignData" />
      </template>
    </keep-alive>
    <div class="steps-action">
      <el-button type="primary" @click="saveAndNext('save')">保存</el-button>
      <template v-if="action===0">
        <el-button type="primary" @click="saveAndNext('down')"> 下一步</el-button>
      </template>
      <template v-if="action===1">
        <el-button type="primary" @click="validateData">校验</el-button>
        <el-button type="primary" @click="config('reduce')">上一步</el-button>
        <el-button type="primary" @click="release">发布</el-button>
      </template>
      <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>
<script>
import BaseInfo from './components/BaseInfo'
import { getConfigId } from '@core/api/processManage/workflowmanager'
import ProcessDesign from './components/ProcessDesign'
export default {
  name: 'ConfigAdd',
  components: {
    BaseInfo,
    ProcessDesign
  },
  data() {
    return {
      action: 0,
      baseInfoData: {},
      processDesignData: {},
      processDesignKey: ''
    }
  },
  created() {
    if (this.$route.query.type === 'customize') {
      this.getDetail(this.$route.query.id)
    }
  },
  methods: {
    config(type) {
      switch (type) {
        case 'down':
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
      if (this.action === 0) {
        if (this.$route.query.type === 'customize') {
          this.$refs.baseInfo.customSub().then((data) => {
            if (type === 'down') {
              this.config('down')
            }
            this.$refs.baseInfo.submitStatus = data
          })
        } else {
          this.$refs.baseInfo.saveSub().then((data) => {
            if (type === 'down') {
              this.config('down')
            }
            this.$refs.baseInfo.submitStatus = data
          })
        }
      } else {
        this.$refs.processDesign.saveRelease('save')
      }
    },
    release() {
      this.$refs.processDesign.saveRelease('release')
    },
    validateData() {
      this.$refs.processDesign.saveRelease('validate')
    },
    // 获取默认配置
    // 获取基本信息
    getDetail(id) {
      getConfigId(id).then(({ data }) => {
        const { registerId, isCommonUse, useRange, isFreeFlow, remark, registerName, originTemplate, defaultConfigId, organizationId, id } = data
        this.baseInfoData = {
          registerId,
          isCommonUse,
          useRange: useRange.split(','),
          isFreeFlow,
          remark,
          defaultConfigId,
          organizationId,
          id
        }
        this.name = registerName
        if (originTemplate) {
          this.processDesignData = JSON.parse(originTemplate)
          this.processDesignKey = new Date().getTime()
        }
      })
    }
  }
}
</script>
<style lang="less">
.config-add {
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
