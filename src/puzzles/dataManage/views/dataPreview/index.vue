<template>
  <div class="data-preview">
    <div class="search">
      <div class="select">
        <div>
          <span>合同编号</span>
          <el-input
            v-model="input"
            placeholder="请输入合同编号"
            class="fill-name"
          />
        </div>
        <div>
          <span>工程名称</span>
          <el-select
            v-model="value"
            placeholder="请选择工程"
            class="fill-name"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <span>建设单位</span>
          <el-input
            v-model="input"
            placeholder="请输入建设单位"
            class="fill-name"
          />
        </div>
        <div>
          <span>项目归属</span>
          <el-select
            v-model="value"
            placeholder="请选择"
            class="fill-name"
            style="width: 120px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-model="value"
            placeholder="请选择组织名称"
            class="fill-name"
            style="width: 320px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <span>工程建造师</span>
          <el-select
            v-model="value"
            placeholder="请选择工程建造师"
            class="fill-name"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div style="margin-right:0;">
          <el-button
            type="primary"
            icon="el-icon-search"
          >查询</el-button>
        </div>
      </div>
    </div>
    <div style="margin-right:0;">
      <el-button
        type="primary"
        icon="el-icon-search"
      >下载资料客户端</el-button>
    </div>
    <div>
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
          width="50"
        />
        <el-table-column
          prop="number"
          label="合同编号"
          header-align="center"
          align="center"
          sortable
        />
        <el-table-column
          prop="name"
          label="工程名称"
          header-align="center"
          align="center"
          sortable
        >
          <template slot-scope="scope">
            <div
              class="table-click-color"
              @click="projectClick('detail')"
            >{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="belong"
          label="归属单位"
          header-align="center"
          align="center"
          sortable
        />
        <el-table-column
          prop="state"
          label="项目经理"
          header-align="center"
          align="center"
          sortable
          width="100"
        />
        <el-table-column
          prop="buildBelong"
          label="建设单位"
          header-align="center"
          align="center"
          sortable
        />
        <el-table-column
          prop="state"
          label="工程状态"
          header-align="center"
          align="center"
          sortable
          width="100"
        />
        <el-table-column
          prop="constructor"
          label="工程建造师"
          header-align="center"
          align="center"
          sortable
          width="110"
        />
        <el-table-column
          prop="endTime"
          label="竣工日期"
          header-align="center"
          align="center"
          sortable
          width="110"
        />
        <el-table-column
          prop="totalTime"
          label="日历日期"
          header-align="center"
          align="center"
          sortable
          width="110"
        />
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
  name: 'Index',
  mixins: [pagination],
  data() {
    return {
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
    projectClick(type) {
      if (type === 'detail') {
        this.$router.push({ name: 'projectDataDetail' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .data-preview {
    padding: 20px;
    .fill-name {
      width: 440px;
    }
    .ascription {
      margin-right: 2px;
    }
  }
</style>
