<template>
  <div class="duties">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="董事长（主岗）" name="first">
        <div class="tab-content">
          <major-position />
        </div>
      </el-tab-pane>
      <el-tab-pane label="材料员" name="second">
        <div class="tab-content">
          <material-man />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MajorPosition from "./MajorPosition";
import MaterialMan from "./MaterialMan";
export default {
  components: {
    MajorPosition,
    MaterialMan
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
.duties {
  padding: 10px;
  .tab-content {
    overflow-y: auto;
    height: calc(100vh - 222px);
    padding-right: 10px;
  }
}
</style>
