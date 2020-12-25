<template>
  <div class="patch-record">
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <el-row>
          <el-col :span="20">
            <div>当前考勤方案：【主测日志公司员工考勤】 【一天一班：08:30 ~ 17:30 （休息：12:00 ~ 13:00）】</div>
          </el-col>
          <el-col :span="4">
            <el-date-picker
              v-model="atDate"
              type="date"
              placeholder="选择月份"
              :picker-options="datePickerOptions"
              :clearable="false"
              :editable="false"
              value-format="yyyy-MM-dd"
              @change="changeAtDate"
            />
          </el-col>
        </el-row>
      </div>
      <div>
        <el-tabs
          v-model="activeName"
          type="card"
          @tab-click="handleClick"
        >
          <el-tab-pane
            label="打卡记录"
            name="first"
          >
            <record-center />
          </el-tab-pane>
          <el-tab-pane
            label="考勤记录"
            name="second"
          >
            <attendance-center />
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import RecordCenter from './components/RecordCenter'
import AttendanceCenter from './components/AttendanceCenter'
import { parseTime } from './../../../../core/utils/index.js'
export default {
  name: 'PatchRecord',
  components: {
    RecordCenter,
    AttendanceCenter
  },
  data() {
    return {
      atDate: '',
      activeName: 'first',
      datePickerOptions: {
        disabledDate(time) {
          return time > parseTime(time, 'y-m-d')
        }
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style >
</style>
