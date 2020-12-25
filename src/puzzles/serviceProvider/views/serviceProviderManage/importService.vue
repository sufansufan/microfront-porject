<template>
  <div class="import-service">
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
      说明：导入的文件必须是excel文件且只处理文件中的第一分页，且要按照以下表格的顺序填写（内容不包括序号列），字段不符合校验规范时，红色字体显示。所有字段都正常显示方可确定导入；点击“导入文件”按钮可重新导入
    </div>
    <div>
      <el-table v-loading="loading" :data="tableList" row-key="id" border>
        <el-table-column type="index" width="48" label="序号" align="center" />
        <el-table-column prop="companyNumber" label="企业编号" align="left" header-align="center">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.warning.companyNumber" class="item" effect="dark" placement="top-start">
              <span slot="content">异常原因<br>{{ scope.row.warning.companyNumber }}</span>
              <span style="color:red">{{ scope.row.companyNumber }}</span>
            </el-tooltip>
            <span v-else>{{ scope.row.companyNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="companyName" label="企业名称" align="center" width="180">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.warning.companyName" class="item" effect="dark" placement="top-start">
              <span slot="content">异常原因<br>{{ scope.row.warning.companyName }}</span>
              <span style="color:red">{{ scope.row.companyName }}</span>
            </el-tooltip>
            <span v-else>{{ scope.row.companyName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="informationCode" label="统一社会信用代码" align="center" width="140">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.warning.informationCode" class="item" effect="dark" placement="top-start">
              <span slot="content">异常原因<br>{{ scope.row.warning.informationCode }}</span>
              <span style="color:red">{{ scope.row.informationCode }}</span>
            </el-tooltip>
            <span v-else>{{ scope.row.informationCode }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="contacts" label="联系人" align="center">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.warning.contacts" class="item" effect="dark" placement="top-start">
              <span slot="content">异常原因<br>{{ scope.row.warning.contacts }}</span>
              <span style="color:red">{{ scope.row.contacts }}</span>
            </el-tooltip>
            <span v-else>{{ scope.row.contacts }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mobilePhone" label="手机号" align="center" width="180">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.warning.mobilePhone" class="item" effect="dark" placement="top-start">
              <span slot="content">异常原因<br>{{ scope.row.warning.mobilePhone }}</span>
              <span style="color:red">{{ scope.row.mobilePhone }}</span>
            </el-tooltip>
            <span v-else>{{ scope.row.mobilePhone }}</span>
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
import { checkExcel, importService } from '@core/api/serviceProvider/serviceCompany'
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
    this.actionUrl = checkExcel
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
        e.warning = { companyNumber: '', companyName: '', informationCode: '', contacts: '', mobilePhone: '' }
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
      } else {
        this.wranList = []
      }
    },
    submit() {
      if (this.tableList.length === 0 || this.wranList.length !== 0) {
        this.$message.warning('导入字段信息不能为空或红色异常')
        this.loading = false
        return
      }
      importService(this.tableList).then(({ data }) => {
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
          if (itemE[0].companyNumber === itemT.companyNumber && itemE[0].companyName === itemT.companyName && itemE[0].informationCode === itemT.informationCode && itemE[0].contacts === itemT.contacts && itemE[0].mobilePhone === itemT.mobilePhone) {
            itemE.forEach((e, i) => {
              if (i !== 0) {
                itemT.warning[e.messageTemplate] = e.message
              }
            })
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.import-service {
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
