<template>
  <div class="distributor-audit">
    <div class="search">
      <div class="select">
        <div>
          <span>企业编号</span>
          <el-input v-model="search.name" placeholder="请输入企业编号" />
        </div>
        <div>
          <span>企业名称</span>
          <el-input v-model="search.name" placeholder="请输入企业名称" />
        </div>
        <div>
          <span>状态</span>
          <el-select v-model="search.name" placeholder="请选择状态" clearable>
            <el-option
              v-for="item in effectiveList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <span>联系人</span>
          <el-input v-model="search.name" placeholder="请输入联系人" />
        </div>
        <div>
          <span>手机号</span>
          <el-input v-model="search.name" placeholder="请输入手机号" />
        </div>
        <div>
          <span>级别</span>
          <el-select v-model="search.name" placeholder="请选择级别" clearable>
            <el-option
              v-for="item in effectiveList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="query">
          <div>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
          </div>
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button-group>
            <el-button type="primary"><i class="iconfont icon-xinzeng1-copy" /> 新增</el-button>
            <el-button type="primary"><i class="iconfont icon-xiugai-copy" /> 修改</el-button>
            <el-button type="primary"><i class="iconfont icon-icon7-copy" /> 删除</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <div>
      <el-table ref="tableRef" v-loading="loading" :data="tableData" row-key="id" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40" />
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="code" label="状态" header-align="center" />
        <el-table-column prop="name" label="企业编号" align="center" />
        <el-table-column prop="name" label="企业名称" align="center" />
        <el-table-column prop="name" label="联系人" align="center" />
        <el-table-column prop="name" label="手机号码" align="center" />
        <el-table-column prop="name" label="所在地" align="center" />
        <el-table-column prop="name" label="部署时间" align="center" />
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-show="count"
        :page-sizes="pageSizes"
        :page-size="size"
        :total="count"
        :current-page="page"
        :layout="pageLayout"
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script>
import pagination from '@core/mixins/pagination'
import table from '@core/mixins/table'
export default {
  mixins: [pagination, table],
  data() {
    return {
      effectiveList: [],
      search: {
        name: ''
      },
      tableData: [{ name: '111' }]
    }
  }
}
</script>

<style lang="less" scoped>
.distributor-audit {

}
</style>
