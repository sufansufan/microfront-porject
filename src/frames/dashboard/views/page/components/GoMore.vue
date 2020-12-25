<template>
  <div class="go-more">
    <div>
      <el-table
        :data="tableData"
        border
        align="center"
        :header-cell-style="headClass"
        @selection-change="handleSelectionChange"
      >

        <el-table-column
          type="index"
          label="序号"
          width="48"
          align="center"
        />
        <el-table-column
          prop="news"
          label="打卡时间"
          width="160"
        />
        <el-table-column
          prop="type"
          label="打卡地址"
          align="center"
          width="320"
        />

      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      activeName: 'second'

    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="less" scoped>
.go-notify {
  padding: 10px;

}
</style>
