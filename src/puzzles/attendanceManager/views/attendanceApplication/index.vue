<template>
  <div class="attendance-application">
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>申请日期</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="选择起始日期"
            end-placeholder="选择截止日期"
          />
        </div>
        <div class="fill-name">
          <span>完成日期</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="选择起始日期"
            end-placeholder="选择截止日期"
          />
        </div>
        <div class="fill-name">
          <span>供应商编号</span>
          <el-input v-model="input" placeholder="请输入" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>部门</span>
          <el-select v-model="value" placeholder="请选择" class="fill-line">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div class="fill-name">
          <span>员工</span>
          <el-select v-model="value" placeholder="请选择" class="fill-line">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="fill-name">
          <span>申请类型</span>
          <el-select v-model="value" placeholder="请选择" class="fill-line">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
        <div class="fill-name">
          <span>结果</span>
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
      <div class="btn">
        <el-button-group>
          <el-button type="primary" @click="setUpShow">新增</el-button>
          <el-button type="primary">撤销</el-button>
        </el-button-group>
      </div>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="id" label="序号" width="50" fixed align="center" />
        <el-table-column prop="id" label="状态" align="center" width="180" />
        <el-table-column prop="id" label="申请类别" align="center" width="180" />
        <el-table-column prop="name" label="摘要" width="220" align="center" sortable>
          <template slot-scope="scope">
            <div class="table-click-color">
              <span>请假类别</span>
              <span>起止时间</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="时长" width="100" align="center" />
        <el-table-column prop="name" label="其他信息" align="center" width="180" />
        <el-table-column prop="rule" label="申请人" width="200" align="center" />
        <el-table-column prop="rule" label="申请时间" align="center" width="200" />
        <el-table-column prop="rule" label="完成时间" width="180" align="center" />
        <el-table-column prop="name" label="结果" align="center" width="180" />

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
    <drag-dialog ref="dialog" title="选择申请类型" width="50%">
      <div>
        <el-button @click="applicationType('请假申请')">请假申请</el-button>
        <el-button @click="applicationType('外出申请')">外出申请</el-button>
        <el-button @click="applicationType('补卡申请')">补卡申请</el-button>
        <el-button @click="applicationType('出差申请')">出差申请</el-button>
        <el-button @click="applicationType('加班申请')">加班申请</el-button>
      </div>
    </drag-dialog>
  </div>
</template>
<script>
import pagination from '@core/mixins/pagination'
import DragDialog from '@frames/dashboard/components/Dialog'
export default {
  name: 'AttendanceApplication',
  components: { DragDialog },
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
    setUpShow() {
      this.$refs.dialog.show = true
    },
    applicationType(val) {
      this.$refs.dialog.show = false
      if (val === '请假申请') {
        this.$router.push('/attendanceManager/attendanceApplication/leaveRequest')
      } else if (val === '外出申请') {
        this.$router.push('/attendanceManager/attendanceApplication/outgoingApplication')
      } else if (val === '补卡申请') {
        this.$router.push('/attendanceManager/attendanceApplication/supplementaryCardApplication')
      } else if (val === '出差申请') {
        this.$router.push('/attendanceManager/attendanceApplication/applicationBusinessTrip')
      } else if (val === '加班申请') {
        this.$router.push('/attendanceManager/attendanceApplication/overtimeApplication')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .attendance-application {
    padding: 20px;
    min-height: 1000px;
    overflow-y: scroll;
    .table-click-color {
      text-decoration: none;
    }
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
