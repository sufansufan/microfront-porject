<template>
  <div class="attendance-settings">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="班次" name="first">
        <div class="tab-content">
          <template v-if="shifts === 'default'">
            <shifts @changeTabConent="changeTabConent" />
          </template>
          <template v-if="shifts === 'add'">
            <new-shift-information @changeTabConent="changeTabConent" />
          </template>
        </div>
      </el-tab-pane>
      <el-tab-pane label="考勤方案" name="second">
        <div class="tab-content">
          <attendance-plan />
        </div>
      </el-tab-pane>
      <el-tab-pane label="考勤设备" name="third">
        <div class="tab-content">
          <template v-if="equipment === 'default'">
            <attendance-equipment @changeTabConent="changeTabConent" />
          </template>
          <template v-if="equipment === 'add'">
            <new-attendance-machine @changeTabConent="changeTabConent" />
          </template>
          <template v-if="equipment === 'usagerecords'">
            <view-usage-records @changeTabConent="changeTabConent" />
          </template>
          <template v-if="equipment === 'install'">
            <install @changeTabConent="changeTabConent" />
          </template>
          <template v-if="equipment === 'disassemble'">
            <disassemble @changeTabConent="changeTabConent" />
          </template>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Shifts from './components/Shifts'
import AttendancePlan from './components/AttendancePlan'
import AttendanceEquipment from './components/AttendanceEquipment'
import NewShiftInformation from './components/NewShiftInformation'
import NewAttendanceMachine from './components/NewAttendanceMachine'
import ViewUsageRecords from './components/ViewUsageRecords'
import Install from './components/Install'
import Disassemble from './components/Disassemble'

export default {
  components: {
    Shifts,
    AttendancePlan,
    AttendanceEquipment,
    NewShiftInformation,
    NewAttendanceMachine,
    ViewUsageRecords,
    Install,
    Disassemble
  },
  data() {
    return {
      activeName: 'first',
      shifts: 'default',
      equipment: 'default'
    }
  },
  methods: {
    handleClick(tab, event) {
      this.shifts = 'default'
      this.equipment = 'default'
    },
    changeTabConent(type, status) {
      switch (type) {
        case 'shifts':
          this.shifts = status
          break
        case 'equipment':
          this.equipment = status
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.attendance-settings {
  padding: 10px;
  .tab-content {
    overflow-y: auto;
    height: calc(100vh - 262px);
    padding-right: 10px;
  }
}
</style>
