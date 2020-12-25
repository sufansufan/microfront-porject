<template>
  <div class="sign-acontract">
    <div>
      <el-table
        ref="multipleTable"
        v-loading="loading"
        default-expand-all
        :data="tableData"
        row-key="id"
        border
        @sort-change="sortTable"
      >
        <el-table-column type="index" width="48" label="序号" align="center" />
        <el-table-column prop="qualificationTypequalificationType" label="合同编号" align="center" />
        <el-table-column prop="qualificationType" label="合同状态" align="center" />
        <el-table-column prop="qualificationType" label="工程名称" align="center" width="320"/>
        <el-table-column prop="qualificationType" label="合同名称" align="center" width="320">
          <template slot-scope="scope">
            <div class="table-click-color" @click="updateData('details',scope.row)">{{ scope.row.qualificationType }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="qualificationType" label="合同类型" align="center" />
        <el-table-column prop="qualificationType" label="合同金额" align="center" />
        <el-table-column prop="qualificationType" label="签订日期" align="center" />
        <el-table-column prop="qualificationType" label="归档日期" align="center" />
        <el-table-column prop="qualificationType" label="联系人" align="center" />
        <el-table-column prop="qualificationType" label="联系电话" align="center" width="160" />
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-show="count"
        :page-sizes="pageSizes"
        :page-size="size"
        :total="count"
        :current-page="page"
        :layout="pageLayout"
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script>

import table from '@core/mixins/table'
import { mapGetters } from 'vuex'
import pagination from '@core/mixins/pagination'
import { addCertificate, addQualifications, updateOgCertificate, updateQualification, getQuaCer,
  delQualification, getQualification } from '@core/api/qualification'
export default {
  name: 'Qualifications',
  components: {},
  mixins: [table, pagination],
  props: {
    disabled: {
      default: true,
      type: Boolean
    },
    personnelId: {
      default: '',
      type: String
    },
    orgName: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      count: 0,
      disableds: true,
      ruleForm: {
        type: '',
        number: '',
        manageRange: '',
        qualificationType: [],
        lastStartDate: '',
        lastEndDate: '',
        startDate: '',
        endDate: '',
        unitName: '',
        annualSurvey: '',
        annualSurveyMonth: '',
        remark: '',
        organizationId: ''
      },
      rules: {
        type: [{ required: true, message: '请选择分类' }],
        number: [{ required: true, message: '请输入证书编号' }],
        qualificationType: [{ required: true, message: '请选择' }],
        manageRange: [{ required: true, message: '请选择经营范围' }],
        startDate: [{ required: true, message: '请选择发证日期' }],
        endDate: [{ required: true, message: '请选择有效截止日期' }],
        annualSurvey: [{ required: true, message: '请选择年检频率' }],
        annualSurveyMonth: [{ required: true, message: '请选择年检月份' }]
      },
      tableData: [],
      addOrEditType: '',
      editId: '',
      title: '',
      rowId: ''
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store
      .dispatch('getConstant', ['orgBusinessType', 'orgQualifications', 'inspectionFrequency',
        'businessScope', 'orgCertType'
      ]).then(() => {
        if (this.personnelId) {
          this.fetchData()
        }
      })
  },
  methods: {
    getDetails() {
      getQualification(this.rowId).then(({
        data
      }) => {
        this.editId = data.id
        const { type, number, manageRange, qualificationType, lastStartDate, lastEndDate, startDate,
          endDate, unitName, annualSurvey, annualSurveyMonth, remark } = data
        this.ruleForm = {
          type,
          number,
          manageRange,
          qualificationType: type === 'org_certificate' ? qualificationType : qualificationType.split(','),
          lastStartDate,
          lastEndDate,
          startDate,
          endDate,
          unitName,
          annualSurvey,
          annualSurveyMonth,
          remark
        }
      })
    },
    updateData(type, row) {
      this.addOrEditType = type
      this.rowId = row.id
      if (type === 'edit') {
        this.disableds = false
        this.title = '修改资质'
        this.getDetails()
      } else if (type === 'add') {
        this.disableds = false
        this.title = '新增资质'
        this.ruleForm = { ...this.deepRuleForm }
      } else {
        this.disableds = true
        this.title = '查看证书信息'
        this.getDetails()
      }
      this.key += 1
      this.$refs.dialog.show = true
    },
    fetchData(sortData) {
      const { propertyName, ascending } = sortData || {}
      const params = {
        propertyName,
        ascending
      }
      this.loading = true
      getQuaCer(params, this.personnelId).then(({
        data
      }) => {
        this.loading = false
        this.tableData = data
      })
    },
    deleteData(id) {
      this.$confirm('确认要删除选中的资质/证书？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delQualification(id).then(res => {
          this.$message.success('删除成功!')
          this.fetchData()
        })
      }).catch(() => {
        this.$message.info('已取消')
      })
    },
    saveOrUpdateData() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          var params = {
            Loading: true,
            ...this.ruleForm,
            qualificationType: this.ruleForm.qualificationType.toString(),
            organizationId: this.personnelId
          }
          console.log(params, '22')
          var id = this.editId
          if (this.addOrEditType === 'add') {
            if (this.ruleForm.type === 'org_certificate') {
              addCertificate(params).then(res => {
                this.$refs.dialog.show = false
                this.fetchData()
                this.$message.success('新增证书成功')
              })
            } else if (this.ruleForm.type === 'org_qualification') {
              addQualifications(params).then(res => {
                this.$refs.dialog.show = false
                this.fetchData()
                this.$message.success('新增资质成功')
              })
            }
          } else if (this.addOrEditType === 'edit') {
            params = {
              ...params,
              id

            }
            if (this.ruleForm.type === 'org_certificate') {
              updateOgCertificate(params).then(res => {
                this.$refs.dialog.show = false
                this.fetchData()
                this.$message.success('修改证书成功')
              })
            } else if (this.ruleForm.type === 'org_qualification') {
              updateQualification(params).then(res => {
                this.$refs.dialog.show = false
                this.fetchData()
                this.$message.success('修改资质成功')
              })
            }
          } else {
            this.$refs.dialog.show = false
          }
        } else {
          return
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
	.sign-acontract {
		&>div {
			&:first-child {
				margin-bottom: 10px;
			}
		}

		.ruleForm {
			display: flex;
			flex-wrap: wrap;

			&>.el-form-item {
				width: 50%;
			}

			.el-date-editor.el-input,
			.el-date-editor.el-input__inner,
			.el-select {
				width: 100%;
			}
		}
	}
</style>
