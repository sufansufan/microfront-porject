<template>
  <div class="field-problems">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="发出问题" name="first">
        <div class="tabs-content">
          <Problem ref="problem" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="收到问题" name="second">
        <Problem ref="problem">
          <div slot="button">
            <el-button type="primary" icon="el-icon-document">现场问题配置</el-button>
          </div>
        </Problem>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Problem from './components/issueproblem'
export default {
  components: {
    Problem

  },
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>

<style lang='less'>
.field-problems{
	padding: 20px;
  height: calc(100vh - 120px);
  overflow-y: scroll;
}

</style>
