<template>
  <div class="buildperson-edit">
    <jdy-title-name :title="getTitle" />
    <el-tabs v-model="activeName" type="card" class="one-card-tabs" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="baseInfo">
        <base-info ref="baseInfo" :disabled="false" :personnel-id="personnelId" :optimistic-lock="optimisticLock" :row-date="rowDate" :type-page="typePage" />
      </el-tab-pane>
      <el-tab-pane label="持证信息" name="certificateInfo">
        <certificate-info :disabled="false" :personnel-id="personnelId" @certificateData="certificateData" />
      </el-tab-pane>
    </el-tabs>
    <div class="btn">
      <template v-if="activeName === 'baseInfo'">
        <el-button type="primary" @click="updateInfo">保存</el-button>
      </template>
      <template v-if="activeName === 'certificateInfo'">
        <el-button type="primary" @click="onCancel('finish')">完成</el-button>
      </template>
      <el-button class="cancel-btn" @click="onCancel">取消</el-button>
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
      activeName: 'baseInfo',
      personnelId: this.rowDate.id,
      optimisticLock: '',
      tableData: []
    }
  },
  computed: {
    getTitle() {
      return this.rowDate.name + '(' + this.rowDate.attendanceNumber + ')'
    }
  },
  methods: {
    certificateData(data) {
      this.tableData = data
    },
    updateInfo() {
      this.$refs.baseInfo.addOrEdit().then(res => {
        this.optimisticLock = res.optimisticLock
      })
    },
    onCancel(type) {
      if (type === 'finish') {
        if (this.rowDate.workType[0] === 's' && this.tableData.length === 0) {
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
.buildperson-edit {
  padding: 10px;
  height: calc(100vh - 140px);
  overflow-y: auto;
  .btn {
    display: flex;
    justify-content: center;
    margin: 30px 0px;
  }
}
</style>
