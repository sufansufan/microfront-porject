<template>
  <div class="release-management">
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>供应商编号</span>
          <el-input v-model="input" placeholder="请输入" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>供应商名称</span>
          <el-input v-model="input" placeholder="请输入" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>合作协议</span>
          <el-input v-model="input" placeholder="请输入" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>发布时间</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="选择起始日期"
            end-placeholder="选择截止日期"
          />
        </div>
        <div class="fill-name">
          <span>状态</span>
          <el-select v-model="value" placeholder="请选择" class="fill-line">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div style="margin-right:0;margin-left:6px;">
          <div>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column type="selection" align="center" width="40" />
        <el-table-column prop="id" label="序号" width="50" fixed align="center" />
        <el-table-column prop="id" label="供应商编号" align="center" width="180" />
        <el-table-column prop="name" label="供应商名称" width="220" align="center" sortable>
          <template slot-scope="scope">
            <div class="table-click-color" @click="changeTab()">{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="联系人电话" width="100" align="center" />
        <el-table-column prop="name" label="联系人" align="center" width="180" />
        <el-table-column prop="rule" label="发布说明" width="200" align="center" />
        <el-table-column prop="rule" label="合作协议" align="center" width="200" />
        <el-table-column prop="rule" label="发布时间" width="180" align="center" />
        <el-table-column prop="name" label="审批时间" align="center" width="180" />
        <el-table-column prop="rule" label="状态" align="center" width="180" sortable />
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
export default {
  name: 'ReleaseManagement',
  mixins: [pagination],
  data() {
    return {
      input3: '',
      value: [],
      options: [],
      count: 30,
      tableData: [
        {
          id: 1,
          number: '1555546545231',
          name: '666验证地区只有一级采购申请',
          belong: '张清-分公司',
          state: '施工中',
          buildBelong: '123',
          constructor: '杜路易',
          address: '北京市北京市门头沟区',
          buildArea: '123',
          startTime: '2020-01-15',
          endTime: '2020-01-21',
          totalTime: '100天'
        },
        {
          id: 2,
          number: '1555546545231',
          name: '666验证地区只有一级采购申请',
          belong: '张清-分公司',
          state: '施工中',
          buildBelong: '123',
          constructor: '杜路易',
          address: '北京市北京市门头沟区',
          buildArea: '123',
          startTime: '2020-01-15',
          endTime: '2020-01-21',
          totalTime: '100天'
        },
        {
          id: 3,
          number: '1555546545231',
          name: '666验证地区只有一级采购申请',
          belong: '张清-分公司',
          state: '施工中',
          buildBelong: '123',
          constructor: '杜路易',
          address: '北京市北京市门头沟区',
          buildArea: '123',
          startTime: '2020-01-15',
          endTime: '2020-01-21',
          totalTime: '100天'
        }
      ]
    }
  },
  methods: {
    changeTab() {
      this.$router.push('/productManagementSupply/releaseManagement/supplierName')
    }
  }
}
</script>

<style lang="less" scoped>
  .release-management {
    padding: 20px;
    .search>.select>.fill-name {
          width: 33.3%;
          margin-right: 0;
          .fill-line {
            width: 100%;
          }

          span {
            text-align: right;

          }
        }
        .search > .select > div > span {
          min-width: 90px;
        }
        .el-input__inner {
          width: 100%;
        }
  }
</style>
