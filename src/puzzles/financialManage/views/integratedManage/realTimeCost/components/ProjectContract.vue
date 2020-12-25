<!--工程保险合同-->
<template>
  <div class="project-contract">
    <div class="search">
      <search-bar :select-list="selectList" :btn-list="btnList" :search="search" @changeSearch="changeSearch" />
    </div>
    <div class="table">
      <comm-table
        ref="commTable"
        :single-selected="true"
        :columns="columns"
        :data="tableData"
        :count="count"
      />
    </div>
    <div class="total">
      <el-form ref="form" :model="form" label-width="170px" :rules="formRules" class="rule-form-flex four-width">
        <el-form-item label="合同金额(保费)合计">
          <el-input v-model.trim="form.name" disabled />
        </el-form-item>
        <el-form-item label="保险金(万元)合计">
          <el-input v-model.trim="form.name" disabled />
        </el-form-item>
        <el-form-item label="付款金额合计">
          <el-input v-model.trim="form.name" disabled />
        </el-form-item>
        <el-form-item label="未付金额合计">
          <el-input v-model.trim="form.name" disabled />
        </el-form-item>

        <el-form-item label="收票金额合计">
          <el-input v-model.trim="form.name" disabled />
        </el-form-item>
        <el-form-item label="收票未付金额合计">
          <el-input v-model.trim="form.name" disabled />
        </el-form-item>
        <el-form-item label="未收票已付款金额合计">
          <el-input v-model.trim="form.name" disabled />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import project from '../searchTableData/project'
import search from '@core/mixins/search'
export default {
  name: 'ProjectContract',
  mixins: [project, search],
  data() {
    return {
      form: {
        name: ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
.project-contract {
  margin: 10px 0;
  .total {
    margin: 10px 0;
  }
}
</style>
