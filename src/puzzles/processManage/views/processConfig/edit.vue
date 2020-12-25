<template>
  <div class="process-edit">
    <div class="title">
      {{ name }}
    </div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="基本信息" name="baseInfo">
        <base-info ref="baseInfo" :base-info-data="baseInfoData" />
      </el-tab-pane>
      <el-tab-pane label="流程设计" name="processDesign">
        <process-design ref="processDesign" :key="processDesignKey" :process-design-data="processDesignData" />
      </el-tab-pane>
    </el-tabs>
    <div v-if="btnDis !== 'view'" class="btn">
      <template>
        <el-button type="primary" @click="save">保存</el-button>
      </template>
      <template v-if="activeName === 'processDesign'">
        <el-button type="primary" @click="validateData">校验</el-button>
        <el-button type="primary" @click="release">发布</el-button>
      </template>
      <el-button @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>
<script>
import BaseInfo from './components/BaseInfo'
import ProcessDesign from './components/ProcessDesign'
import { getConfigId } from '@core/api/processManage/workflowmanager'
export default {
  name: 'ProcessEdit',
  components: {
    BaseInfo,
    ProcessDesign
  },

  data() {
    return {
      activeName: this.$route.query.type === 'copy' ? 'processDesign' : 'baseInfo',
      name: '',
      baseInfoData: {},
      processDesignData: {},
      processDesignKey: ''
    }
  },
  computed: {
    btnDis() {
      return this.$route.query.type
    }
  },
  created() {
    this.getDetail(this.$route.query.id)
  },
  methods: {
    save() {
      if (this.activeName === 'baseInfo') {
        this.$refs.baseInfo.saveSub()
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
    // 获取基本信息
    getDetail(id) {
      // this.$refs.baseInfo.loading = true
      getConfigId(id).then(({ data }) => {
        this.$store.commit('SET_CONFIGBASEINFO', { ...data })
        const { registerId, isCommonUse, useRange, isFreeFlow, remark, registerName, originTemplate, organizationId, defaultConfigId, id } = data
        this.baseInfoData = {
          registerId,
          isCommonUse,
          useRange: useRange ? useRange.split(',') : [],
          isFreeFlow,
          remark,
          organizationId,
          defaultConfigId,
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
<style lang="less" scoped>
.process-edit {
  padding: 10px;
  height: calc(100vh - 140px);
  overflow-y: auto;
   .title {
      text-align: center;
      font-size:16px;
      font-weight: 700;
      color:#000;
      font-style: normal;
    }
    .btn {
      display: flex;
      justify-content: center;
      margin: 30px 0px;
    }
}
</style>
