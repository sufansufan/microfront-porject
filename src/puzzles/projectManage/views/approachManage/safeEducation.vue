<template>
  <div class="safe-education">
    <jdy-title-name :title="getTitle" />
    <el-tabs
      v-model="activeName"
      type="card"
      class="one-card-tabs"
      @tab-click="handleClick"
    >
      <template v-for="item in tabList">
        <el-tab-pane
          :key="item.name"
          :label="item.label"
          :name="item.name"
        >
          <div class="tab-content">
            <component :is="tabComName ? tabComName : item.name" :tab-com-type="tabComType" :row-data="rowData" @changeTabCom="changeTabCom" />
          </div>
        </el-tab-pane>
      </template>
      <el-tab-pane name="last">
        <span slot="label"><i class="iconfont icon-fanhui-copy" /> 返回</span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSessionStorage } from '@core/utils/auth'
export default {
  name: 'SafeEducation',
  components: {
    EducationTrain: () => import('./components/EducationTrain'),
    BuildPerson: () => import('./components/BuildPerson'),
    EducationTrainAdd: () => import('./components/EducationTrainAdd'),
    BuildPersonInfo: () => import('./components/BuildPersonInfo')
  },
  data() {
    return {
      tabList: [
        { name: 'EducationTrain', label: '教育培训记录' },
        { name: 'BuildPerson', label: '施工人员' }
      ],
      activeName: 'EducationTrain',
      tabComName: '',
      tabComType: '',
      rowData: {}
    }
  },
  computed: {
    ...mapGetters(['approachProjectInfo', 'constant']),
    getTitle() {
      return getSessionStorage('belongOrgName')
    }
  },
  methods: {
    changeTabCom({ name, type, rowData }) {
      this.tabComName = name
      this.tabComType = type
      this.rowData = rowData
    },
    handleClick(tab) {
      if (tab.name === 'last') {
        this.$router.go(-1)
      } else {
        this.tabComName = tab.name
      }
    }

  }
}
</script>

<style lang="less" scoped>
.safe-education {
  padding: 10px;
}
</style>
