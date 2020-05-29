<template>
  <div class="import-org">
    <div>
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
      >
        <el-button size="small" type="primary">导入文件</el-button>
      </el-upload>
    </div>
    <div class="explain">
      说明：导入的文件必须是excel文件，且要按照以下表格的顺序排列，格式不正确时，红色字体显示。所有字段都正常显示方可确定导入；点击“导入文件”按钮可重新导入
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border>
        <el-table-column type="index" width="50" label="序号" align="center" />
        <el-table-column prop="address" label="组织名称" align="center" />
        <el-table-column prop="name" label="组织编号" align="center" />
        <el-table-column prop="name" label="组织类别" align="center" />
        <el-table-column prop="name" label="上级组织" align="center" />
        <el-table-column prop="name" label="上级组织编号" align="center" />
        <el-table-column prop="name" label="顺序号" align="center" />
        <el-table-column prop="name" label="成立日期" align="center" />
      </el-table>
    </div>
    <div class="btn">
      <el-button type="primary">保存</el-button>
      <el-button @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.import-org {
  padding: 10px;
  height: calc(100vh - 140px);
  overflow-y: auto;
  .explain {
    margin: 10px 0px;
  }
  .btn {
    display: flex;
    justify-content: center;
    margin: 30px 0px;
  }
}
</style>
