<template>
  <div class="record-detail">
    <div class="go-back">
      <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" />  返回</el-button>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        row-key="id"
        border
        default-expand-all
      >
        <el-table-column
          type="index"
          label="序号"
          header-align="center"
          align="center"
          width="80"
        />
        <el-table-column
          prop="name"
          label="姓名"
          header-align="center"
          align="center"
          sortable
        />
        <el-table-column
          prop="duration"
          label="阅读时长"
          header-align="center"
          align="center"
          sortable
        />
        <el-table-column
          prop="time"
          label="时间"
          header-align="center"
          align="center"
          sortable
        />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecordDetail'
}
</script>

<style lang="less" scoped>
    .record-detail {
        padding: 20px;
        .table {
            padding-top: 20px;
        }
    }
</style>
