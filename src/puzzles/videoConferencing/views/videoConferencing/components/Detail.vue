<template>
  <div class="detail">
    <div v-if="!disable" class="btn">
      <el-button type="primary" @click="addDetail">添加参会方</el-button>
    </div>
    <el-table
      :data="tableData"
      row-key="id"
      border
    >
      <el-table-column
        type="index"
        label="序号"
        width="50"
        align="center"
      />
      <el-table-column
        label="参会方名称"
        header-align="center"
        width="250"
      >
        <template slot-scope="scope">
          <el-select v-model="scope.row.subject" placeholder="请选择" style="width:35%" :disabled="disable">
            <el-option
              v-for="item in subjectList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="scope.row.subject" placeholder="请选择" style="width:60%" :disabled="disable">
            <el-option
              v-for="item in subjectList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="参会方负责人"
        header-align="center"
        width="200"
      >
        <template slot-scope="scope">
          <el-select v-model="scope.row.subject" placeholder="请选择" style="width:100%" :disabled="disable">
            <el-option
              v-for="item in subjectList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        label="指定监控点/会议室"
        width="150"
      >
        <template slot-scope="scope">
          <el-select v-model="scope.row.subject" placeholder="请选择" style="width:100%" :disabled="disable">
            <el-option
              v-for="item in subjectList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="要求参会人员"
        header-align="center"
      >
        <template slot-scope="scope">
          <el-select v-model="scope.row.subject" placeholder="请选择" style="width:100%" :disabled="disable">
            <el-option
              v-for="item in subjectList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <template v-if="!disable">
        <el-table-column
          label="操作"
          header-align="center"
          width="80"
        >
          <template slot-scope="scope">
            <el-button type="danger" @click="deleteDetail(scope.$index)">移除</el-button>
          </template>
        </el-table-column>
      </template>

    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableData: [{
        subject: '',
        money: '',
        num: '',
        desc: ''
      }, {
        subject: '',
        money: '',
        num: '',
        desc: ''
      }],
      subjectList: [
        {
          value: '1',
          label: '礼品费'
        },
        {
          value: '2',
          label: '业务招待费'
        },
        {
          value: '3',
          label: '办公设备费'
        }
      ]
    }
  },
  methods: {
    addDetail() {
      if (this.tableData.length === 2) {
        this.$message({
          message: '最多只能添加2个参会方',
          type: 'warning'
        })
      } else {
        this.tableData.push({
          subject: '',
          money: '',
          num: '',
          desc: ''
        })
      }
    },
    deleteDetail(index) {
      this.tableData.splice(index, 1)
    }
  }

}
</script>

<style lang="less" scoped>
.detail {
  .btn {
    margin-bottom: 20px;
  }
}
</style>
