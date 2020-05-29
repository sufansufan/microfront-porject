<template>
  <div class="qualifications-info">
    <div v-if="!disabled">
      <el-button type="primary" @click="$refs.dialog.show=true">添加</el-button>
    </div>
    <el-table ref="multipleTable" :data="tableData" row-key="id" border>
      <el-table-column type="index" width="50" label="序号" align="center" />
      <el-table-column prop="date" label="公司名称" align="center" />
      <el-table-column prop="address" label="分类" align="center" />
      <el-table-column prop="name" label="类别" align="center" width="150" />
      <el-table-column prop="name" label="证书编号" align="center" />
      <el-table-column prop="name" label="名称/范围" align="center" width="200" />
      <el-table-column prop="name" label="发证日期" align="center" />
      <el-table-column prop="name" label="有效截止日期" align="center" />
      <el-table-column prop="name" label="发证机关" align="center" width="200" />
      <el-table-column prop="name" label="上次有效截止日期" align="center" width="150" />
      <el-table-column prop="name" label="证书状态" align="center" />
      <el-table-column prop="name" label="附件" align="center" width="100" />
      <el-table-column v-if="!disabled" prop="name" label="操作" align="center" width="150">
        <template>
          <el-button type="primary">修改</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <drag-dialog ref="dialog" title="新增资质" width="50%">
      222
      <template slot="footer">
        <el-button type="primary">确定</el-button>
      </template>
    </drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
export default {
  name: 'Qualifications',
  components: {
    DragDialog
  },
  props: {
    disabled: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      tableData: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市'
      }]
    }
  }
}
</script>

<style lang="less" scoped>
.qualifications-info {
  & > div {
    &:first-child {
      margin-bottom: 10px;
    }
  }
}
</style>
