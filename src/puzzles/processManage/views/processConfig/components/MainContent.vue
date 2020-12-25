<template>
  <div class="main-content">
    <div class="search">
      <search-bar :select-list="selectList" :btn-list="btnList" :search="search" @changeSearch="changeSearch" />
    </div>
    <div class="table">
      <el-table
        ref="tableRef"
        v-loading="loading"
        :data="tableData"
        row-key="id"
        border
        :default-sort="{
          prop: 'state',
          order: 'descending'
        }"
        max-height="calc(100vh - 350px)"
        @sort-change="sortTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="40" />
        <el-table-column type="index" width="48" label="序号" align="center" />
        <el-table-column prop="registerId" label="审批类型" sortable="custom" align="center" width="160" show-overflow-tooltip>
          <template slot-scope="scope">
            <span
              class="table-click-color one-ellipsis"
              @click="lookView(scope)"
            >{{ scope.row.registerName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="useRange" label="适用范围" align="center" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.isCommonUse ? '通用' : scope.row.useRangeName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="organizationName" label="归属单位" align="center" sortable="custom" show-overflow-tooltip />
        <el-table-column prop="isFreeFlow" label="是否循序适用自由流程" align="center" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.isFreeFlow ? '是':'否' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态" align="center" sortable="custom">
          <template slot-scope="scope">
            <span>
              {{ scope.row.stateName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="说明" align="center" show-overflow-tooltip />
        <el-table-column prop="updateDate" label="最后修改时间" align="center" sortable="custom" show-overflow-tooltip />
      </el-table>
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
    <drag-dialog ref="dialog" :title="dialogTitel" width="60%">
      <div v-if="exportHide" class="exportPro">
        <el-form ref="ruleForm" :key="key" :model="ruleForm" label-width="100px" class="info-form">
          <el-form-item v-if="multipleSelection.length === 0" label="导出范围" prop="range">
            <span slot="label"><span class="custom-form-label">*</span>导出范围</span>
            <el-radio-group v-model="ruleForm.range">
              <el-radio :label="1">全部</el-radio> <br>
              <el-radio :label="2" style="margin-top:10px">最后修改日期</el-radio>
            </el-radio-group>
            <div v-if="ruleForm.range === 2">
              <div>
                <el-date-picker
                  v-model="ruleForm.dateRange"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </div>
              <p class="text">(平台将导出数据的最后修改时间位于此时间段内的dml脚本)</p>
            </div>
          </el-form-item>
          <el-form-item label="脚本类型" prop="type">
            <span slot="label"><span class="custom-form-label">*</span>脚本类型</span>
            <el-checkbox-group v-model="dmlCheck">
              <el-checkbox label="delete">删除脚本</el-checkbox>
              <el-checkbox label="insert">插入脚本</el-checkbox>
              <el-checkbox label="update">更新脚本</el-checkbox>
            </el-checkbox-group>
            <p class="text">(平台将导出勾选类型的dml脚本)</p>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" @click="exportSub">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-else class="copy">
        <el-form ref="copyForm" :key="key" :model="copyForm" :rules="rules" label-width="160px" class="ruleForm">
          <el-form-item label="审批类型" prop="registerId">
            <el-cascader
              v-model="copyForm.registerId"
              filterable
              disabled
              placeholder="请选择审批类型"
              clearable
              :options="registerType"
              :props="{ expandTrigger: 'hover', value: 'id', label: 'name', children: 'businessFlowRegisters' }"
            />
          </el-form-item>
          <el-form-item label="是否通用" prop="isCommonUse">
            <el-switch v-model="copyForm.isCommonUse" />
          </el-form-item>
          <el-form-item v-if="!copyForm.isCommonUse" label="适用范围" prop="useRange">
            <el-select v-model="copyForm.useRange" multiple clearable placeholder="请选择适用范围">
              <el-option
                v-for="item in constant.useRange"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="copyForm.organizationId" label="归属单位" prop="organizationId">
            <el-select v-model="copyForm.organizationId" clearable placeholder="请选择归属单位">
              <el-option
                v-for="item in organizationList"
                :key="item.id"
                :label="item.orgName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="是否允许使用自由流程" prop="isFreeFlow">
            <el-switch v-model="copyForm.isFreeFlow" /><br>
            <span>自由流程指由每个环节的执行人确定是否存在下一环节以及下一环节由谁来执行;</span>
          </el-form-item>
          <el-form-item label="附件" prop="annex">
            <el-upload
              :file-list="fileList"
              :action="actionUrl"
              :on-success="fileSuccess"
              :data="uploadData"
              :headers="uploadHeaders"
              :on-remove="handleRemove"
              :before-upload="beforeUpload50M"
              :disabled="disabled"
              :on-error="fileError"
              :on-progress="uploadProgress"
            >
              <el-button type="primary" :disabled="disabled">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="说明" prop="remark">
            <el-input v-model.trim="copyForm.remark" type="textarea" :rows="3" :maxlength="255" placeholder="请输入说明" clearable />
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" @click="submit">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </drag-dialog>
  </div>

</template>
<script>
import pagination from '@core/mixins/pagination'
import DragDialog from '@frames/dashboard/components/Dialog'
import table from '@core/mixins/table'
import search from '@core/mixins/search'
import upload from '@core/mixins/upload'
import SearchBar from '@frames/dashboard/components/SearchBar'
import { getConfig, getTree, exportConfig, delConfig, cancelRelease, restoreDefault, copyDefault, copyCustom } from '@core/api/processManage/workflowmanager'
import { getAttributionUnit } from '@core/api/organization'
import { validateLength } from '@core/utils/validate'
import { exportExcel } from '@core/utils'
import { mapGetters } from 'vuex'

import { handlerSearchBar, getUuid } from '@core/utils'
export default {
  name: 'MainContent',
  components: {
    SearchBar,
    DragDialog
  },
  mixins: [pagination, table, search, upload],
  data() {
    return {
      tableData: [],
      fileList: [],
      loading: false,
      count: null,
      selectList: [
        {
          value: 'registerId',
          searchType: 'cascader',
          name: '审批类型',
          selectData: [],
          selectOption: {
            expandTrigger: 'hover',
            value: 'id',
            label: 'name',
            children: 'businessFlowRegisters'
          }
        },
        {
          value: 'useRange',
          searchType: 'select',
          name: '适用范围',
          selectData: [],
          selectOption: {
            value: 'code',
            label: 'name'
          }
        },
        {
          value: 'organizationId',
          searchType: 'select',
          name: '归属单位',
          selectData: [],
          selectOption: {
            value: 'id',
            label: 'orgName'
          }
        },
        {
          value: 'state',
          searchType: 'select',
          name: '状态',
          selectOption: {
            value: 'code',
            label: 'name'
          },
          selectData: []
        }
      ],
      btnList: [
        {
          children: [
            { name: '新增', power: 'processconfig:add', on: () => { this.orgJump('add') }, icon: 'icon-xinzeng1-copy' },
            { name: '修改', power: 'processconfig:edit', on: () => { this.orgJump('edit') }, icon: 'icon-xiugai-copy' },
            { name: '复制', power: 'processconfig:copy', on: () => { this.orgJump('copy') }, icon: 'icon-fuzhi' },
            { name: '删除', power: 'processconfig:delete', on: () => { this.deleteData() }, icon: 'icon-icon7-copy' }
          ]
        },
        {
          children: [
            { name: '自定义配置', power: 'processconfig:config', on: () => { this.customize() }, icon: 'icon-peizhi' },
            { name: '恢复默认配置', power: 'processconfig:reset', on: () => { this.orgJump('restore') }, icon: 'icon-huifupeizhi' }
          ]
        },
        {
          children: [
            { name: '取消发布', power: 'processconfig:cancel', on: () => { this.orgJump('cancel') }, icon: 'icon-quxiaofabu' },
            { name: '导出脚本', power: 'processconfig:export', on: () => { this.exportPro() }, icon: 'icon-daochu-copy' }
          ]
        }
      ],
      ruleForm: {
        range: 1,
        dateRange: []
      },
      range: '',
      dmlCheck: [],
      dialogTitel: '导出脚本',
      exportHide: false,
      linkList: [],
      copyForm: {
        registerId: '',
        isCommonUse: false,
        useRange: [],
        isFreeFlow: false,
        remark: '',
        organizationId: ''
      },
      rules: {
        registerId: [{ required: true, message: '请选择审批类型', trigger: 'change' }],
        useRange: [{ required: true, message: '请选择适用范围', trigger: 'change' }],
        organizationId: [{ required: true, message: '请选择归属单位', trigger: 'change' }],
        remark: validateLength(0, 255)
      },
      multipleSelection: [],
      orgListData: [],
      organizationList: [],
      registerType: []
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  activated() {
    this.$store.dispatch('getConstant', ['useRange', 'flowConfigState']).then(() => {
      this.fetchData()
      this.selectList = handlerSearchBar(this.selectList, [1], [this.constant.useRange])
      this.selectList = handlerSearchBar(this.selectList, [3], [this.constant.flowConfigState])
    })
  },
  created() {
    this.getApproveType()
    this.getOrgList()
    this.uploadData.typeCode = 'processConfig'
  },
  methods: {
    orgJump(type) {
      switch (type) {
        case 'add':
          this.$router.push({ name: 'processAdd', query: { type: 'add' }})
          break
        case 'edit':
          if (this.multipleSelection.length === 1) {
            if (this.multipleSelection[0].organizationId) {
              this.$message.warning('请选择归属单位为空的一条数据')
            } else {
              const { id } = this.multipleSelection[0]
              this.$router.push({ name: 'processEdit', query: { type: 'edit', id: id }})
            }
          } else {
            this.$message.warning('请选择一条数据')
          }
          break
        case 'restore':
          if (this.multipleSelection.length === 1) {
            if (this.multipleSelection[0].organizationId) {
              this.$confirm('请确认是否恢复默认设置', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                restoreDefault(this.multipleSelection[0].id).then(({ data }) => {
                  this.$message.success('恢复默认配置成功')
                  this.fetchData()
                })
              })
            } else {
              this.$message.warning('请选择归属单位非空的数据')
            }
          } else {
            this.$message.warning('请选择一条数据')
          }
          break
        case 'copy':
          this.dialogTitel = '复制'
          if (this.multipleSelection.length === 1) {
            this.$refs.dialog.show = true
            this.exportHide = false
            this.copyDeatils()
            this.uploadData.businessDataId = getUuid()
          } else {
            this.$message.warning('请选择一条数据')
          }
          break
        case 'cancel':
          if (this.multipleSelection.length === 1) {
            if (this.multipleSelection[0].state === '01') {
              this.$message.warning('请选择一条已发布数据')
            } else {
              cancelRelease(this.multipleSelection[0].id).then(({ data }) => {
                this.$message.success('取消发布成功')
                this.fetchData()
              })
            }
          } else {
            this.$message.warning('请选择一条数据')
          }
          break
        default:
          break
      }
    },
    // 点击查看
    lookView(scope) {
      if (scope.row.organizationName) {
        this.$router.push({ name: 'custom', query: { type: 'view', id: scope.row.id, category: 'edit' }})
      } else {
        this.$router.push({ name: 'processEdit', query: { type: 'view', id: scope.row.id }})
      }
    },
    // 复制基本信息
    copyDeatils() {
      const { registerId, isCommonUse, useRange, isFreeFlow, remark, organizationId } = this.multipleSelection[0]
      this.copyForm = {
        registerId,
        isCommonUse,
        useRange,
        isFreeFlow,
        remark,
        organizationId
      }
    },
    deleteData() {
      if (this.multipleSelection.length === 1) {
        this.$confirm('请确认是否要删除这些数据，一旦删除将无法恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delConfig(this.multipleSelection[0].id).then(({ data }) => {
            this.$message.success('删除成功')
            this.fetchData()
          })
        })
          .catch(() => {})
      } else {
        this.$message.warning('请选择一条数据')
      }
    },
    exportPro() {
      this.exportHide = true
      this.dialogTitel = '导出脚本'
      this.dmlCheck = []
      this.ruleForm.range = 1
      this.$refs.dialog.show = true
    },
    fetchData(type) {
      this.multipleSelection = []
      this.loading = true
      this.queryCopy(type)
      const { page, size, sortData } = this
      const params = {
        page: page - 1,
        size,
        propertyName: 'state',
        ascending: false,
        ...this.search,
        ...sortData
      }
      params.registerId = params.registerId[params.registerId.length - 1]

      getConfig(params).then(({ data }) => {
        this.loading = false
        const { content, total } = data
        this.tableData = content
        this.tableData.map(item => {
          item.useRange = item.useRange.split(',')
          item.useRangeName = ''
          this.constant.useRange.forEach(e => {
            item.useRange.forEach(eUse => {
              if (eUse === e.code) {
                item.useRangeName += e.name
                item.useRangeName += '/'
              }
            })
          })
          if (!item.isCommonUse) {
            item.useRangeName = item.useRangeName.substr(0, item.useRangeName.length - 1)
          }
          this.constant.flowConfigState.forEach(e => {
            if (item.state === e.code) {
              item.stateName = e.name
            }
          })
          return item
        })
        this.count = total
      })
    },
    // 自定义配置
    customize() {
      if (this.multipleSelection.length === 1) {
        const { id } = this.multipleSelection[0]
        if (this.multipleSelection[0].organizationId) {
          this.$router.push({ name: 'custom', query: { type: 'customize', id: id, category: 'edit' }})
        } else {
          this.$router.push({ name: 'custom', query: { type: 'customize', id: id, category: 'add' }})
        }
      } else {
        this.$message.warning('请选择一条数据')
      }
    },
    // 获取归属单位
    getOrgList() {
      getAttributionUnit().then(({ data }) => {
        this.selectList = handlerSearchBar(this.selectList, [2], [data])

        this.organizationList = data
      })
    },
    // 获取审批类型
    getApproveType() {
      getTree().then(({ data }) => {
        const list = JSON.parse(JSON.stringify(data))
        list.map(item => {
          item.id = item.applicationId
          return
        })
        this.selectList = handlerSearchBar(this.selectList, [0], [list])

        this.registerType = list
      })
    },
    // 上传成功
    fileSuccess(response, file, fileList) {
      this.fileList = fileList
      this.uploadLoading.close()
    },
    // 复制基本信息
    submit() {
      const params = {
        Loading: true,
        ...this.copyForm,
        id: this.uploadData.businessDataId,
        copyFlowConfigid: this.multipleSelection[0].id
      }
      params.useRange = Array.isArray(params.useRange) ? params.useRange.join(',') : params.useRange
      this.$refs.copyForm.validate(valid => {
        if (valid) {
          if (this.multipleSelection[0].organizationId) {
            copyCustom(params).then(({ data }) => {
              this.$message.success('复制成功')
              this.$store.commit('SET_CONFIGBASEINFO', { ...data })
              this.$refs.dialog.show = false
              this.$router.push({ name: 'processEdit', query: { type: 'copy', id: data.id }})
            })
          } else {
            copyDefault(params).then(({ data }) => {
              this.$message.success('复制成功')
              this.$store.commit('SET_CONFIGBASEINFO', { ...data })
              this.$refs.dialog.show = false
              this.$router.push({ name: 'processEdit', query: { type: 'copy', id: data.id }})
            })
          }
        }
      })
    },
    // 导出脚本
    exportSub() {
      const params = {
        ids: [],
        isAll: this.ruleForm.range,
        sqlType: this.dmlCheck,
        updateDate: {
          after: this.ruleForm.dateRange[0],
          before: this.ruleForm.dateRange[1]
        }
      }
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach(item => {
          params.ids.push(item.id)
        })
      }
      if (this.dmlCheck.length === 0) {
        this.$message.warning('请选择脚本类型')
        return
      }
      exportConfig(params).then(res => {
        var nameStr = '流程配置的'
        if (params.sqlType.length !== 0) {
          params.sqlType.forEach(item => {
            switch (item) {
              case 'delete':
                nameStr += '删除'
                break
              case 'insert':
                nameStr += '插入'
                break
              case 'update':
                nameStr += '更新'
                break
            }
          })
        }
        nameStr = nameStr + '脚本'
        if (res) {
          exportExcel(res, nameStr + '.sql')
          this.$refs.dialog.show = false
        } else {
          this.$message.warning('当前导出内容')
        }
      })
    }
  }

}
</script>
<style lang="less" scoped>
.main-content {
  padding: 10px;
  .radio {
    display: flex;
    align-items: center;
    .el-date-editor{
      width:160px;
      margin:0 10px;
    }
  }
  .text {
    color:#ccc;
    font-size:12px;
  }
  .btn-submit {
    float: right;
  }
  .copy {
    .ruleForm{
      display: flex;
			flex-wrap: wrap;
			&>.el-form-item {
				width: 100%;
      }
      &>.el-form-item:nth-child(1) ,
      &>.el-form-item:nth-child(2) {
        width: 50%;
      }
      &>.el-form-item:last-child{
        width: 100%;
      }
			.el-date-editor.el-input,
			.el-date-editor.el-input__inner,
			.el-select {
				width: 100%;
      }
      .el-select:nth-child(3) {
				width: 100%;
      }

    }
  }
  .btn {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
<style lang='less'>
.main-content {
  .el-table__body-wrapper {
    max-height: calc(100vh - 400px);
  }
}
</style>
