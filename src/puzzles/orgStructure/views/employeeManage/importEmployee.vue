<template>
  <div class="import-employee">
    <div>
      <el-upload
        :action="actionUrl"
        :on-success="handleSuccess"
        :show-file-list="false"
        :data="uploadData"
        :headers="uploadHeaders"
        :before-upload="beforeAvatarUpload"
      >
        <el-button size="small" type="primary"><i class="iconfont icon-daoru-copy" /> 导入文件</el-button>
      </el-upload>
    </div>
    <div class="explain">
      说明：导入的文件必须是excel文件，且要按照以下表格的顺序排列，格式不正确时，红色字体显示。所有字段都正常显示方可确定导入；点击“导入文件”按钮可重新导入
    </div>
    <div>
      <el-table :data="tableList" row-key="id" border>
        <el-table-column type="index" width="48" label="序号" align="center" />
        <el-table-column prop="jobNumber" label="工号" align="center" width="120">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.warning.jobNumber" class="item" effect="dark" placement="top-start">
              <span slot="content">异常原因<br>{{ scope.row.warning.jobNumber }}</span>
              <span style="color:red">{{ scope.row.jobNumber }}</span>
            </el-tooltip>
            <span v-else>{{ scope.row.jobNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" align="center" width="80">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.warning.name" class="item" effect="dark" placement="top-start">
              <span slot="content">异常原因<br>{{ scope.row.warning.name }}</span>
              <span style="color:red">{{ scope.row.name }}</span>
            </el-tooltip>
            <span v-else>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="telephone" label="手机" align="center" width="120">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.warning.telephone" class="item" effect="dark" placement="top-start">
              <span slot="content">异常原因<br>{{ scope.row.warning.telephone }}</span>
              <span style="color:red">{{ scope.row.telephone }}</span>
            </el-tooltip>
            <span v-else>{{ scope.row.telephone }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="idNumber" label="身份证号" align="center">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.warning.idNumber" class="item" effect="dark" placement="top-start">
              <span slot="content">异常原因<br>{{ scope.row.warning.idNumber }}</span>
              <span style="color:red">{{ scope.row.idNumber }}</span>
            </el-tooltip>
            <span v-else>{{ scope.row.idNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="joinDate" label="入职日期" align="center" width="140">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.warning.joinDate" class="item" effect="dark" placement="top-start">
              <span slot="content">异常原因<br>{{ scope.row.warning.joinDate }}</span>
              <span style="color:red">{{ scope.row.joinDate }}</span>
            </el-tooltip>
            <span v-else>{{ scope.row.joinDate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="employeeStatus" label="状态" align="center" width="80">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.warning.employeeStatus" class="item" effect="dark" placement="top-start">
              <span slot="content">异常原因<br>{{ scope.row.warning.employeeStatus }}</span>
              <span style="color:red">{{ scope.row.employeeStatus }}</span>
            </el-tooltip>
            <span v-else>{{ scope.row.employeeStatus }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="btn">
      <el-button type="primary" @click="submit">确定</el-button>
      <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>

<script>
import { employeeImportVai, employeeImport } from '@core/api/personnel'
import upload from '@core/mixins/upload'
export default {
  mixins: [upload],
  data() {
    return {
      tableList: [],
      wranList: [],
      loading: false
    }
  },
  created() {
    this.uploadData = {}
    this.actionUrl = employeeImportVai
  },
  methods: {
    beforeAvatarUpload(file) {
      this.loading = true
      const fileName = file.name
      const pos = fileName.lastIndexOf('.')
      const lastName = fileName.substring(pos, fileName.length)
      if (!/\.(xls|xlsx)$/.test(lastName.toLowerCase())) {
        this.$message.warning('只能上传Excel类型的文件')
        this.loading = false
      }
    },
    handleSuccess(res, file) {
      this.wranList = []
      this.loading = false
      const { errorMap, list } = res.data
      this.tableList = list
      this.tableList.forEach(e => {
        e.warning = { jobNumber: '', name: '', telephone: '', idNumber: '', joinDate: '', employeeStatus: '' }
      })
      if (errorMap) {
        const errorList = Object.keys(errorMap)
        const newErrorList = []
        errorList.forEach(item => {
          var itemStr = item.substring(item.indexOf('(') + 1, item.lastIndexOf(')')).split(',')
          var itemObj = {}
          itemStr.forEach(e => {
            var key = e.split('=')[0].trim()
            var value = e.split('=')[1]
            itemObj[key] = value
          })
          newErrorList.push(itemObj)
        })
        this.wranList = newErrorList
        this.errorInfoShow(errorMap, newErrorList)
      }
    },
    // 错误信息处理unshift
    errorInfoShow(errorMap, wranList) {
      // 将错误信息存在errorList
      const tableData = this.tableList
      var errorList = []
      for (const key in errorMap) {
        errorList.push(errorMap[key])
      }
      errorList.forEach((item, index) => {
        item.unshift(wranList[index])
      })
      // 将errorList 和 表格数据进行比对  将错误信息和表格数进行匹配
      errorList.forEach((itemE, index) => {
        for (const key in itemE[0]) {
          if (itemE[0][key] === 'null') {
            itemE[0][key] = ''
          }
        }
        tableData.forEach((itemT, indexs) => {
          if (itemE[0].jobNumber === itemT.jobNumber && itemE[0].name === itemT.name && itemE[0].telephone === itemT.telephone && itemE[0].idNumber === itemT.idNumber && itemE[0].employeeStatus === itemT.employeeStatus) {
            itemE.forEach((e, i) => {
              if (i !== 0) {
                itemT.warning[e.messageTemplate] = e.message
              }
            })
          }
        })
      })
    },
    submit() {
      if (this.wranList.length !== 0 || this.tableList.length === 0) {
        this.$message.warning('导入字段信息不能为空或红色异常')
        this.loading = false
        return
      }
      employeeImport(this.tableList).then(({ data }) => {
        this.tableList = []
        this.$message.success('导入成功')
        this.$router.go(-1)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.import-employee {
  padding: 10px;
  height: calc(100vh - 140px);
  overflow-y: auto;
  .explain {
    margin: 10px 0px;
  }
  .btn {
    display: flex;
    justify-content: center;
    margin: 30px 0px;
  }
}
</style>
