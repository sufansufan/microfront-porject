<template>
  <div class="buildperson-details">
    <jdy-title-name :title="getTitle" />
    <el-tabs v-model="activeName" type="card" class="one-card-tabs" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="baseInfo">
        <base-info ref="baseInfo" :disabled="true" :type-page="typePage" :row-date="rowDate" :personnel-id="personnelId" />
      </el-tab-pane>
      <el-tab-pane label="持证信息" name="certificateInfo">
        <certificate-info :disabled="true" :personnel-id="personnelId" />
      </el-tab-pane>
      <el-tab-pane label="进退场记录" name="entryAexitRecords">
        <entry-aexit-records :disabled="true" :personnel-id="personnelId" />
      </el-tab-pane>
      <el-tab-pane name="last">
        <span slot="label"><i class="iconfont icon-fanhui-copy" /> 返回</span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BaseInfo from './components/BaseInfo'
import CertificateInfo from '../setConstructionTeam/components/CertificateInfo'
import EntryAexitRecords from './components/EntryAexitRecords'
import tabs from '@core/mixins/tabs'
export default {
  components: {
    BaseInfo,
    CertificateInfo,
    EntryAexitRecords
  },
  mixins: [tabs],
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
      personnelId: this.rowDate.memberId || this.rowDate.id

    }
  },
  computed: {
    getTitle() {
      return this.rowDate.name + '(' + this.rowDate.attendanceNumber + ')'
    }
  },
  methods: {
    handleClick(tab) {
      console.log(tab)
      if (tab.name === 'last') {
        if (this.typePage === 'personDetails') {
          this.$emit('changeTabConent', 'buildPerson')
        } else if (this.typePage === 'returnPerDetails') {
          this.$emit('changeTabConent', 'returnConfirmation')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.buildperson-details {
  padding: 10px;
  height: calc(100vh - 140px);
  overflow-y: auto;
}
</style>
