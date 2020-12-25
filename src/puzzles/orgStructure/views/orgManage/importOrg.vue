<template>
  <div class="import-org">
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
      <el-table v-loading="loading" :data="tableList" row-key="id" border>
        <el-table-column type="index" width="48" label="序号" align="center" />
        <el-table-column prop="orgName" label="组织名称" align="left" header-align="center">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.warning.orgName" class="item" effect="dark" placement="top-start">
              <span slot="content">异常原因<br>{{ scope.row.warning.orgName }}</span>
              <span style="color:red">{{ scope.row.orgName }}</span>
            </el-tooltip>
            <span v-else>{{ scope.row.orgName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orgNumber" label="组织编号" align="center" width="180">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.warning.orgNumber" class="item" effect="dark" placement="top-start">
              <span slot="content">异常原因<br>{{ scope.row.warning.orgNumber }}</span>
              <span style="color:red">{{ scope.row.orgNumber }}</span>
            </el-tooltip>
            <span v-else>{{ scope.row.orgNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orgType" label="组织类别" align="center" width="140">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.warning.orgType" class="item" effect="dark" placement="top-start">
              <span slot="content">异常原因<br>{{ scope.row.warning.orgType }}</span>
              <span style="color:red">{{ scope.row.orgType }}</span>
            </el-tooltip>
            <span v-else>{{ scope.row.orgType }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="leaderOrganization" label="上级组织" align="center">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.warning.leaderOrganization" class="item" effect="dark" placement="top-start">
              <span slot="content">异常原因<br>{{ scope.row.warning.leaderOrganization }}</span>
              <span style="color:red">{{ scope.row.leaderOrganization }}</span>
            </el-tooltip>
            <span v-else>{{ scope.row.leaderOrganization }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="leaderNumber" label="上级组织编号" align="center" width="180">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.warning.leaderNumber" class="item" effect="dark" placement="top-start">
              <span slot="content">异常原因<br>{{ scope.row.warning.leaderNumber }}</span>
              <span style="color:red">{{ scope.row.leaderNumber }}</span>
            </el-tooltip>
            <span v-else>{{ scope.row.leaderNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sequenceNumber" label="顺序号" align="center" width="180">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.warning.sequenceNumber" class="item" effect="dark" placement="top-start">
              <span slot="content">异常原因<br>{{ scope.row.warning.sequenceNumber }}</span>
              <span style="color:red">{{ scope.row.sequenceNumber }}</span>
            </el-tooltip>
            <span v-else>{{ scope.row.sequenceNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="establishmentDate" label="成立日期" align="center" width="140">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.warning.establishmentDate" class="item" effect="dark" placement="top-start">
              <span slot="content">异常原因<br>{{ scope.row.warning.establishmentDate }}</span>
              <span style="color:red">{{ scope.row.establishmentDate }}</span>
            </el-tooltip>
            <span v-else>{{ scope.row.establishmentDate }}</span>
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
import { orgImportVai, orgImport } from '@core/api/organization'
import upload from '@core/mixins/upload'
export default {
  mixins: [upload],
  data() {
    return {
      tableList: [],
      loading: false,
      wranList: []
    }
  },
  created() {
    this.uploadData = {}
    this.actionUrl = orgImportVai
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
      this.loading = false
      const { errorMap, list } = res.data
      this.tableList = list
      this.tableList.forEach(e => {
        e.warning = { orgName: '', orgNumber: '', orgType: '', leaderOrganization: '', leaderNumber: '', sequenceNumber: '', establishmentDate: '' }
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
    submit() {
      console.log(this.wranList)
      if (this.tableList.length === 0 || this.wranList.length !== 0) {
        this.$message.warning('导入字段信息不能为空或红色异常')
        this.loading = false
        return
      }
      orgImport(this.tableList).then(({ data }) => {
        this.tableList = []
        this.$message.success('导入成功')
        this.$router.go(-1)
      })
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
        tableData.forEach((itemT, indexs) => {
          if (itemE[0].orgName === itemT.orgName && itemE[0].orgNumber === itemT.orgNumber && itemE[0].orgType === itemT.orgType && itemE[0].leaderOrganization === itemT.leaderOrganization && itemE[0].leaderNumber === itemT.leaderNumber && itemE[0].sequenceNumber === itemT.sequenceNumber) {
            itemE.forEach((e, i) => {
              if (i !== 0) {
                itemT.warning[e.messageTemplate] = e.message
              }
            })
          }
        })
      })
      console.log(errorList)
      console.log(tableData)
    }
  }
}
</script>

<style lang="less" scoped>
.import-org {
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
