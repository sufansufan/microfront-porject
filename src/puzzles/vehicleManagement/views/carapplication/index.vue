<template>
  <div class="car-application">
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>申请单号</span>
          <el-input
            v-model="input"
            class="fill-line"
            placeholder="请输入"
          />
        </div>
        <div class="fill-name">
          <span>用车人</span>
          <el-input
            v-model="input"
            class="fill-line"
            placeholder="请输入"
          />
        </div>
        <div class="fill-name">
          <span>日期</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div class="fill-name">
          <span>所属组织</span>
          <el-select
            v-model="value"
            class="fill-line"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="fill-name">
          <span>目的地</span>
          <el-input
            v-model="input"
            class="fill-line"
            placeholder="请输入"
          />
        </div>
        <div class="fill-name">
          <span>状态</span>
          <el-select
            v-model="value"
            placeholder="请选择"
            class="fill-line"
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
          <div>
            <el-button
              type="primary"
              icon="el-icon-search"
            >查询</el-button>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-bottom:10px;">
      <div>
        <el-button-group>
          <el-button type="primary" @click="$router.push({name:'newcar'})"><i class="iconfont icon-xinzeng1-copy" /> 新增</el-button>
          <el-button type="primary"><i class="iconfont icon-xiugai-copy" /> 修改</el-button>
          <el-button type="primary"><i class="iconfont icon-icon7-copy" /> 删除</el-button>
          <el-button type="primary">撤销</el-button>
        </el-button-group>
      </div>

    </div>
    <div>
      <el-table
        :data="tableData"
        row-key="id"
        border
        default-expand-all
      >
        <el-table-column
          type="selection"
          width="40"
        />
        <el-table-column
          prop="index"
          label="序号"
          width="50"
          align="center"
        />
        <el-table-column
          prop="applicationtype"
          label="申请单号"
          align="center"
          sortable
        >
          <template slot-scope="scope">
            <div
              class="table-click-color"
              @click="$router.push({ name: 'vehiclerinformation' })"
            >{{ scope.row.type }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="type"
          align="center"
          label="用车人"
          sortable
        />

        <el-table-column
          prop="category"
          label="所属组织"
          align="center"
          sortable
        />
        <el-table-column
          prop="downtime"
          label="用车时间"
          sortable
          align="center"
        />
        <el-table-column
          prop="rate"
          label="预计返还时间"
          align="center"
        />
        <el-table-column
          prop="task"
          label="乘车人数"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="目的地"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="录入人"
          align="center"
        />
        <el-table-column
          prop="vestingunit"
          label="录入时间"
          align="center"
          sortable
        />
        <el-table-column
          prop="state"
          label="状态"
          align="center"
          sortable
        >
          <template slot-scope="scope">
            <div
              class="state"
              @click="$refs.dialog.show = true"
            >{{ scope.row.state }}</div>
          </template>
        </el-table-column>
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
    <drag-dialog
      ref="dialog"
      title="审批步骤"
      width="50%"
    >
      <process direction="vertical" />
    </drag-dialog>
  </div>

</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import Process from '@frames/dashboard/components/Process'
import pagination from '@core/mixins/pagination'
export default {
  components: { DragDialog, Process },
  mixins: [pagination],
  data() {
    return {
      count: 30,
      value1: '',
      tableData: [
        {
          index: '1',
          number: '借款申请',
          type: '借款审批',
          approvalType: 'reimbursementApproval',
          category: '定时',
          downtime: '提前1月',
          rate: '一次',
          task: '否',
          vestingunit: '审批中',
          receiver: '行政专员，办公室主任',
          available: '是',
          name: '资质（资质编号）将于有效期到期，请处理相关事宜！',
          deploy: '是',
          state: '已审批',
          updatetime: '2020.01.01'
        }
      ],
      options: [
        {
          value: 1,
          label: '借款申请'
        },
        {
          value: 2,
          label: '还款申请'
        },
        {
          value: 3,
          label: '报销申请'
        },
        {
          value: 4,
          label: '扣款申请'
        }
      ]
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.car-application{
   padding:20px;
  height: calc(100vh - 120px);
  overflow-y: scroll;
   .search>.select>.fill-name{
    width:29%;
    .fill-line{
      width:100%;
    }
  }
  .state{
    cursor: pointer;
  }
}
</style>
