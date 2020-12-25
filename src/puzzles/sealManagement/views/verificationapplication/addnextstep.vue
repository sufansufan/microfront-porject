<template>
  <div class="add-nextstep">
    <div
      class="btn"
    >
      <el-button type="primary" @click="addDetail"><i class="iconfont icon-xinzeng1-copy" />新增</el-button>
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
        label="印证名称"
        sortable
        header-align="center"
        width="250"
      >
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.subject"
            placeholder="请选择印证名称"
            style="width: 100%"
          >
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
        label="使用方式"
        header-align="center"
        width="200"
      >
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.subject"
            placeholder="请选择"
            style="width: 100%"
          >
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
        label="用印次数"
        width="150"
      >
        <template slot-scope="scope">
          <div>
            <el-input-number
              v-model="scope.row.num"
              :min="1"
              :max="100"
              label="描述文字"
              :disabled="disable"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="使用说明"
        header-align="center"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.desc"
            placeholder="请输入使用说明"
          />
        </template>
      </el-table-column>
      <template>
        <el-table-column
          label="预计归还时间"
          header-align="center"
          width="200"
        >
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.time"
              type="datetime"
              placeholder="选择日期时间"
            />
          </template>
        </el-table-column>
      </template>

    </el-table>
    <el-form :model="ruleform" label-width="60px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="审批人:">
            <span>夏利</span>
          </el-form-item>
          <p style="color:red;">平台找不到您发起此流程后的相关审批人（上级领导）无法发起流程，找不到项目经理请联系工程部，找不到其他岗位或人员请联系人力资源部！</p>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item class="btnadd">
            <el-button
              type="primary"
              @click="$router.go(-1)"
            >上一步</el-button>
            <el-button type="primary">提交</el-button>
            <el-button type="primary">保存</el-button>
            <el-button class="cancel-btn" @click="$router.go(-2)">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleform: {
        read: ''

      },
      tableData: [
        {
          subject: '',
          money: '',
          num: '',
          desc: '',
          time: ''
        },
        {
          subject: '',
          money: '',
          num: '',
          desc: '',
          time: ''
        }
      ],
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
      this.tableData.push({
        subject: '',
        money: '',
        num: '',
        desc: '',
        time: ''
      })
    },
    deleteDetail(index) {
      this.tableData.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.add-nextstep {
  height: calc(100vh - 160px);
  overflow-y: auto;
  padding: 20px;
  .btn {
    margin-bottom: 20px;
  }
  .el-table{
    margin-bottom:20px;
  }
  .btnadd {
    width: 100%;
    margin-top:10px;
    text-align: center;
  }
  .el-form-item{
    margin-bottom:0;
  }
}
</style>
