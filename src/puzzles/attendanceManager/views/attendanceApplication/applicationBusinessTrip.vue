<template>
  <div class="application-business-trip">
    <el-form :rules="rules" :model="ruleform" label-width="150px" class="dictionary-form">
      <el-form-item label="申请人" class="there-points">
        <el-input v-model="ruleform.number" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="申请日期" class="there-points">
        <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间" />
      </el-form-item>

      <el-form-item label="出差地点" prop="name" class="full-item">
        <div class="add-can" style="margin-bottom:15px;">
          <el-button type="primary" @click="addParameter(tableData.length)">添加明细</el-button>

        </div>
        <div>
          <div>
            <el-table
              :data="tableData"
              row-key="id"
              border
              default-expand-all
            >
              <el-table-column

                prop="number"
                label="出差地点"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.parameter" />
                </template>
              </el-table-column>
              <el-table-column
                prop="name"

                label="开始时间"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.name" />
                </template>
              </el-table-column>
              <el-table-column
                prop="servicename"
                label="结束时间"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.explain" />
                </template>
              </el-table-column>
              <el-table-column
                prop="servicename"
                label="时长"
                align="center"
              />
              <el-table-column
                prop="serviceurl"
                label="操作"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button
                    type="danger"
                    @click="deleteIndex(scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>

          </div>
        </div>
      </el-form-item>

      <el-form-item label="出差事由" prop="remark" class="full-item">
        <el-input v-model="ruleform.remark" type="textarea" :rows="2" placeholder="请填写请假事由" />
      </el-form-item>
      <el-form-item label="附件" class="full-item">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="handleChange"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">上传附件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="审批人" class="there-points">
        <process />
      </el-form-item>
      <el-form-item class="full-item btntask">
        <el-button type="primary">确定</el-button>
        <el-button class="cancel-btn" @click="$router.push('/attendanceManager/attendanceApplication')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Process from '@frames/dashboard/components/Process'
export default {
  components: { Process },
  data() {
    return {
      activeName: 'first',
      count: 30,
      isActive: true,
      num: 1,
      value1: '2020-02-04',
      ruleform: {
        number: 111,
        available: false,
        name: '',
        serviceurl: '',
        servicerule: '',
        remark: '',
        money: ''
      },
      rules: {
        number: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        remark: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      tableData: [
        {
          id: '1',
          parameter: '', // 参数
          name: '', // 名称
          explain: '' // 说明
        }
      ]

    }
  },
  methods: {
    addParameter(val) {
      const item = {
        id: val + 1,
        parameter: '', // 参数
        name: '', // 名称
        explain: '' // 说明
      }
      this.tableData.push(item)
    },
    deleteIndex(val) {
      this.tableData.splice(val, 1)
    }
  }
}
</script>

<style lang="less" scoped>
  .application-business-trip {
    padding: 20px;
    overflow-y: scroll;
    height: calc(100% - 140px);
    .dictionary-form {
      display: flex;
      flex-wrap: wrap;
      .full-item {
        width: 100%;
        .el-form-item__content {
          display: flex;

          .el-select {
            width: 100%;
          }
        }
      }
      .el-input {
        width: 100%;
      }
      .there-points {
        width: 50%;
        .el-form-item__content {
          display: flex;

          .el-select {
            width: 100%;
          }
        }
      }
      .anther {
        width: 50%;
        .el-form-item__content {
          display: flex;
          .el-select {
            width: 50%!important;
          }
          .num {
            width: 50%;
            display: flex;
            align-items: center;
            span {
              margin: 0 6px;
            }
            .el-input-number {
              flex: 1;
            }
          }
        }
        .add-can {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 15px;
        }

      }
      .btntask {
        width: 100%;
        text-align: center;
      }
    }
  }
</style>
