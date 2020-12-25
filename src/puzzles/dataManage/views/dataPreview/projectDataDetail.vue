<template>
  <div class="project-data-detail">
    <div class="btn">
      <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
      <div> <strong>xxxxxxxx工程</strong> </div>
      <div />
    </div>
    <el-tabs v-model="activeName" type="card">
      <template v-if="tabShow.project">
        <el-tab-pane label="资料概况" name="first">
          <div class="tab-content">
            <data-survey />
          </div>
        </el-tab-pane>
      </template>
      <el-tab-pane label="浏览资料" name="second">
        <div class="tab-content">
          <browse-data />
        </div>
      </el-tab-pane>
      <el-tab-pane label="更新记录" name="third">
        <div class="tab-content">
          <update-record />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DataSurvey from '../components/DataSurvey'
import BrowseData from '../components/BrowseData'
import UpdateRecord from '../components/UpdateRecord'
export default {
  name: 'ProjectDataDetail',
  components: {
    UpdateRecord,
    BrowseData,
    DataSurvey
  },
  data() {
    return {
      activeName: 'first',
      tabShow: {
        project: true,
        labor: true
      }
    }
  },
  watch: {
    '$route.query': {
      handler() {
        const { type } = this.$route.query
        this.activeName = type === 'project' ? 'second' : 'first'
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
    .project-data-detail {
        padding: 10px;
        .btn {
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            & strong {
                font-size: 20px;
            }
        }
        .tab-content {
            overflow-y: auto;
            height: calc(100vh - 222px);
            padding-right: 10px;
        }
    }
</style>
