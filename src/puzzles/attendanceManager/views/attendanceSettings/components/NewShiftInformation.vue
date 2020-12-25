<template>
  <div class="new-shift-information">
    <el-form label-width="110px" :rules="rules" :model="ruleform">
      <el-form-item label="班次名称" prop="rolename">
        <el-input v-model="ruleform.rolename" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="备注" prop="rolename">
        <el-input v-model="ruleform.rolename" type="textarea" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="班制" prop="roletype">
        <el-radio-group v-model="radio" @change="setChange">
          <el-radio label="1">一天一班</el-radio>
          <el-radio label="2">一天两班</el-radio>
          <el-radio label="3">打卡时段设置</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="setActive ==1 && setActive !== null">
        <el-form-item label="班段设置" prop="route">
          <el-time-select
            v-model="startTime"
            placeholder="上班时间"
            :picker-options="{
              start: '09:00',
              step: '00:15',
              end: '18:00'
            }"
          />
          <el-time-select
            v-model="endTime"
            placeholder="下班时间"
            :picker-options="{
              start: '09:00',
              step: '00:15',
              end: '18:00',
              minTime: startTime
            }"
          />
        </el-form-item>
        <el-form-item label="休息时间设置" prop="route">
          <el-time-select
            v-model="startTime"
            placeholder="休息开始时间"
            :picker-options="{
              start: '09:00',
              step: '00:15',
              end: '18:00'
            }"
          />
          <el-time-select
            v-model="endTime"
            placeholder="休息结束时间"
            :picker-options="{
              start: '09:00',
              step: '00:15',
              end: '18:00',
              minTime: startTime
            }"
          />
        </el-form-item>
      </template>
      <template v-if="setActive ==2 && setActive !== null">
        <el-form-item label="第一次" prop="route">
          <el-time-select
            v-model="startTime"
            placeholder="上班时间"
            :picker-options="{
              start: '09:00',
              step: '00:15',
              end: '18:00'
            }"
          />
          <el-time-select
            v-model="endTime"
            placeholder="下班时间"
            :picker-options="{
              start: '09:00',
              step: '00:15',
              end: '18:00',
              minTime: startTime
            }"
          />
        </el-form-item>
        <el-form-item label="第二次" prop="route">
          <el-time-select
            v-model="startTime"
            placeholder="上班时间"
            :picker-options="{
              start: '09:00',
              step: '00:15',
              end: '18:00'
            }"
          />
          <el-time-select
            v-model="endTime"
            placeholder="下班时间"
            :picker-options="{
              start: '09:00',
              step: '00:15',
              end: '18:00',
              minTime: startTime
            }"
          />
        </el-form-item>
      </template>
      <template v-if="setActive ==3 && setActive !== null">
        <el-form-item>
          <el-table
            :data="tableData"
            row-key="id"
            border
            default-expand-all
            :span-method="objectSpanMethod"
          >
            <el-table-column prop="id" label="班段" width="180" align="center" />
            <el-table-column prop="name" label="类型" align="center" />
            <el-table-column prop="amount1" label="上下班时间" align="center">
              <template>
                <el-time-select
                  v-model="value"
                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                  }"
                  placeholder="选择时间"
                />
              </template>
            </el-table-column>
            <el-table-column prop="amount2" label="允许打卡时段" align="center">
              <el-time-select
                v-model="startTime"
                placeholder="未设置"
                style="width:130px;"
                :picker-options="{
                  start: '09:00',
                  step: '00:15',
                  end: '18:00'
                }"
              />
              <el-time-select
                v-model="endTime"
                style="width:130px;"
                placeholder="未设置"
                :picker-options="{
                  start: '09:00',
                  step: '00:15',
                  end: '18:00',
                  minTime: startTime
                }"
              />
            </el-table-column>
          </el-table>
        </el-form-item>
      </template>

      <el-form-item label="工时统计" prop="range">
        <p style="color:#ccc">合计工作时长8小时0分钟</p>
        <el-radio-group v-model="radio">
          <el-radio label="1">按打卡时间计算</el-radio>
          <el-radio label="2">按班次时段计算</el-radio>
        </el-radio-group>
        <p style="color:#ccc">若缺卡则不计入工时</p>
      </el-form-item>

      <el-form-item label="工时累计" prop="range">
        <p>
          每次上下班时间间隔时间不低于
          <el-input-number
            v-model="num"
            :min="1"
            :max="20"
            label="描述文字"
            style="display:inline-block"
          />分钟，否则不计入工时
        </p>
      </el-form-item>
      <el-form-item label="人性化班次" prop="range">
        <span class="fill-min">允许迟到分钟数</span>
        <el-input v-model="ruleform.num" placeholder="请输入" style="width:10%;" />
      </el-form-item>
      <el-form-item prop="range">
        <span class="fill-min">允许早退分钟数</span>
        <el-input v-model="ruleform.num" placeholder="请输入" style="width:10%;" />
      </el-form-item>
      <el-form-item prop="range">
        <span class="fill-min">旷工(迟到)分钟数</span>
        <el-input v-model="ruleform.num" placeholder="请输入" style="width:10%;" />
      </el-form-item>
      <el-form-item prop="range">
        <span class="fill-min">旷工(早退)分钟数</span>
        <el-input v-model="ruleform.num" placeholder="请输入" style="width:10%;" />
      </el-form-item>
    </el-form>
    <div style="text-align:center;">
      <el-button type="primary">保存</el-button>
      <el-button class="cancel-btn" @click="$emit('changeTabConent', 'shifts', 'default')">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startTime: '',
      endTime: '',
      radio: '',
      num: 20,
      value: '',
      checkList: [],
      ruleform: {
        rolename: '',
        roletype: '',
        range: '',
        type: '',
        application: '',
        remark: '',
        num: 10
      },
      rules: {
        rolename: [
          {
            required: true,
            message: '请填写'
          }
        ],
        roletype: [
          {
            required: true,
            message: '请选择'
          }
        ],
        range: [
          {
            required: true,
            message: '请选择'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择'
          }
        ],
        application: [
          {
            required: true,
            message: '请填写'
          }
        ]
      },
      tableData: [
        {
          id: '第一次',
          name: '上班',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        },
        {
          id: '1111',
          name: '下班',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        },
        {
          id: '第二次',
          name: '上班',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        },
        {
          id: '12987122',
          name: '下班',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }
      ],
      setActive: null
    }
  },
  methods: {
    setChange(val) {
      this.setActive = val
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>

<style lang="less">
.new-shift-information {
  .fill-min {
    display: inline-block;
    width: 120px;
    text-align: right;
  }
}
</style>
