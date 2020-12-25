<template>
  <div class="enterprise-import">
    <div>
      <el-upload
        :action="actionUrl"
        :on-success="handleSuccess"
        :show-file-list="false"
        :data="uploadData"
        :headers="uploadHeaders"
        :before-upload="beforeAvatarUpload"
      >
        <el-button size="small" type="primary" @click="imports"><i class="iconfont icon-daoru-copy" /> 导入文件</el-button>
      </el-upload>
    </div>
    <div class="explain">
      说明：导入的文件必须是excel文件，且要按照以下表格的顺序排列，格式不正确时，红色字体显示。所有字段都正常显示方可确定导入；点击“导入文件”按钮可重新导入
    </div>
    <div>
      <el-table v-loading="loading" :data="tableList" row-key="id" border>
        <el-table-column type="index" width="48" label="序号" align="center" />
        <el-table-column prop="name" label="企业名称" align="left" header-align="center">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.warning.name" class="item" effect="dark" placement="top-start">
              <span slot="content">异常原因<br>{{ scope.row.warning.name }}</span>
              <span style="color:red">{{ scope.row.name }}</span>
            </el-tooltip>
            <span v-else>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="companyChildTypeName" label="企业类型" align="center" width="100">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.warning.companyChildTypeName" class="item" effect="dark" placement="top-start">
              <span slot="content">异常原因<br>{{ scope.row.warning.companyChildTypeName }}</span>
              <span style="color:red">{{ scope.row.companyChildTypeName }}</span>
            </el-tooltip>
            <span v-else>{{ scope.row.companyChildTypeName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="belongOrganizationName" label="归属单位" align="center" width="250">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.warning.belongOrganizationName" class="item" effect="dark" placement="top-start">
              <span slot="content">异常原因<br>{{ scope.row.warning.belongOrganizationName }}</span>
              <span style="color:red">{{ scope.row.belongOrganizationName }}</span>
            </el-tooltip>
            <span v-else>{{ scope.row.belongOrganizationName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="informationCode" label="统一社会信用代码" align="center" width="220">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.warning.informationCode" class="item" effect="dark" placement="top-start">
              <span slot="content">异常原因<br>{{ scope.row.warning.informationCode }}</span>
              <span style="color:red">{{ scope.row.informationCode }}</span>
            </el-tooltip>
            <span v-else>{{ scope.row.informationCode }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="contacts" label="联系人" align="center" width="100">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.warning.contacts" class="item" effect="dark" placement="top-start">
              <span slot="content">异常原因<br>{{ scope.row.warning.contacts }}</span>
              <span style="color:red">{{ scope.row.contacts }}</span>
            </el-tooltip>
            <span v-else>{{ scope.row.contacts }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="contactPhone" label="联系电话" align="center" width="100">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.warning.contactPhone" class="item" effect="dark" placement="top-start">
              <span slot="content">异常原因<br>{{ scope.row.warning.contactPhone }}</span>
              <span style="color:red">{{ scope.row.contactPhone }}</span>
            </el-tooltip>
            <span v-else>{{ scope.row.contactPhone }}</span>
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
import { checkExcel, importExcel } from '@core/api/cooperativeEnterprise/companyinfo'
import upload from '@core/mixins/upload'
export default {
  name: 'EnterpriseImport',
  mixins: [upload],
  data() {
    return {
      loading: false,
      code: this.$route.query.code,
      tableList: [],
      wranList: []
    }
  },
  created() {
    this.uploadData = {
      companyType: this.code[0],
      companyChildType: this.code[1],
      belongOrganizationId: this.$route.query.organizationId,
      belongOrganizationName: this.$route.query.orgName
    }
    this.actionUrl = checkExcel
  },
  methods: {
    beforeAvatarUpload(file) {
      this.loading = true
      const fileName = file.name
      const pos = fileName.lastIndexOf('.')
      const lastName = fileName.substring(pos, fileName.length)
      if (!/\.(xls|xlsx)$/.test(lastName.toLowerCase())) {
        this.$message.error('上传文件格式不正确，请上传xls或者xlsx格式')
        this.loading = false
      }
    },
    handleSuccess(res, file) {
      this.wranList = []
      this.loading = false
      const { errorMap, list } = res.data
      this.tableList = list
      this.tableList.forEach(e => {
        e.warning = { name: '', companyChildTypeName: '', belongOrganizationName: '', informationCode: '', contacts: '', contactPhone: '' }
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
      if (this.wranList.length !== 0 || this.tableList.length === 0) {
        this.$message.warning('导入字段信息不能为空或红色异常')
        return
      }
      importExcel().then(({ data }) => {
        this.$message.success('导入成功')
        this.tableList = []
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
        for (const key in itemE[0]) {
          if (itemE[0][key] === 'null') {
            itemE[0][key] = ''
          }
        }
        tableData.forEach((itemT, indexs) => {
          if (itemE[0].name === itemT.name && itemE[0].companyChildTypeName === itemT.companyChildTypeName && itemE[0].belongOrganizationName === itemT.belongOrganizationName && itemE[0].informationCode === itemT.informationCode && itemE[0].contacts === itemT.contacts && itemE[0].contactPhone === itemT.contactPhone) {
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
.enterprise-import {
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
