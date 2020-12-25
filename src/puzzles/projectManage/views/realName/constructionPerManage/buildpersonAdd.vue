<template>
  <div class="buildperson-add">
    <jdy-title-name v-if="action===1" :title="getTitle" />
    <jdy-steps :action="action">
      <jdy-step title="基本信息" />
      <jdy-step title="持证信息" />
    </jdy-steps>
    <keep-alive>
      <template v-if="action===0">
        <base-info ref="baseInfo" :disabled="false" :type-page="typePage" :row-date="rowDate" :personnel-id="personnelId" :team-path="teamPath" :optimistic-lock="optimisticLock" />
      </template>
      <template v-if="action===1">
        <certificate-info ref="contractInfo" :personnel-id="personnelId" :disabled="false" @certificateData="certificateData" />
      </template>
    </keep-alive>
    <div class="steps-action">
      <template v-if="action===0">
        <el-button
          type="primary"
          @click="saveAndNext('save')"
        >保存</el-button>
        <el-button
          type="primary"
          @click="saveAndNext('down')"
        > 下一步</el-button>
        <el-button class="cancel-btn" @click="onCancel">取消</el-button>
      </template>
      <template v-if="action===1">
        <el-button type="primary" @click="config('reduce')">上一步</el-button>
        <el-button type="primary" @click="onCancel('finish')">完成</el-button>
        <el-button class="cancel-btn" @click="onCancel">取消</el-button>
      </template>
    </div>
  </div>
</template>

<script>
import BaseInfo from './components/BaseInfo'
import CertificateInfo from '../setConstructionTeam/components/CertificateInfo'
export default {
  components: {
    BaseInfo,
    CertificateInfo
  },
  props: {
    typePage: {
      type: String,
      default: ''
    },
    rowDate: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      action: 0,
      personnelId: '',
      optimisticLock: '',
      workType: '',
      tableData: [],
      teamPath: '',
      getTitle: ''
    }
  },
  methods: {
    certificateData(data) {
      this.tableData = data
    },
    config(type) {
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
        const { name, attendanceNumber, workType, id, constructionTeamPath, optimisticLock } = res
        this.getTitle = name + '(' + attendanceNumber + ')'
        this.workType = workType
        this.personnelId = id
        this.teamPath = constructionTeamPath
        this.optimisticLock = optimisticLock
        if (type === 'down') {
          this.config('add')
        }
      })
    },
    onCancel(type) {
      if (type === 'finish') {
        if (this.workType[0] === 's' && this.tableData.length === 0) {
          this.$message.warning('该施工人员为特殊工种，请添加相关证书信息')
        } else {
          this.$emit('changeTabConent', 'buildPerson')
        }
      } else {
        this.$emit('changeTabConent', 'buildPerson')
      }
    }

  }
}
</script>

<style lang="less" scoped>
.buildperson-add {
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
