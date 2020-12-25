<template>
  <div class="onthejob-training">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="我的职责" name="first">
        <div class="tab-content">
          <duties />
        </div>
      </el-tab-pane>
      <el-tab-pane label="日常工作" name="second">
        <div class="tab-content">
          <routine />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Duties from "./components/Duties";
import Routine from "./components/Routine";
export default {
  components: {
    Duties,
    Routine
  },
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {}
  }
};
</script>

<style lang="less" scoped>
.onthejob-training {
  padding: 10px;
  .tab-content {
    overflow-y: auto;
    height: calc(100vh - 222px);
    padding-right: 10px;
  }
}
</style>
