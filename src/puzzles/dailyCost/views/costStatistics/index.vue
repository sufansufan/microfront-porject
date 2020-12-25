<template>
  <div class="cost-statistics">
    <div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="组织统计" name="first">
          <template>
            <organizational-statistics />
          </template>
        </el-tab-pane>
        <el-tab-pane
          label="项目统计"
          name="second"
        >
          <template>
            <project-statistics />
          </template>
        </el-tab-pane>
        <el-tab-pane
          label="员工统计"
          name="three"
        >
          <template>
            <staff-statistics />
          </template>
        </el-tab-pane>
        <el-tab-pane
          label="科目统计"
          name="four"
        >
          <template>
            <subject-statistics />
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import OrganizationalStatistics from './components/organizationalStatistics'
import ProjectStatistics from './components/projectStatistics'
import StaffStatistics from './components/staffStatistics'
import SubjectStatistics from './components/subjectStatistics'

export default {
  components: {
    OrganizationalStatistics,
    ProjectStatistics,
    StaffStatistics,
    SubjectStatistics
  },
  data() {
    return {
      activeName: 'first',
      type: 0,
      urgentStatus: 'default',
      systemStatus: 'default',
      dailyStatus: 'default',
      dispatchStatus: 'default',
      dictionaryStatus: 'default'
    }
  },
  methods: {
    handleClick(tab, event) {
      this.urgentStatus = 'default'
      this.systemStatus = 'default'
      this.dailyStatus = 'default'
      this.dispatchStatus = 'default'
      this.dictionaryStatus = 'default'
    },
    getType(val) {
      this.type = val
    },
    changeTabConent(type, status) {
      switch (type) {
        case 'dictionary':
          this.dictionaryStatus = status
          break
        case 'urgent':
          this.urgentStatus = status
          break
        case 'system':
          this.systemStatus = status
          break
        case 'daily':
          this.dailyStatus = status
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cost-statistics {
  padding: 20px;
}
</style>
