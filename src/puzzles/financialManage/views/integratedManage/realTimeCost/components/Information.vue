<template>
  <div class="information">
    <div class="information-name">
      <span>工程名称（成本会计：王会计）</span>
    </div>
    <search-bar :select-list="selectList" :btn-list="btnList" @changeSearch="changeSearch">
      <div slot="searchBar3" class="external-list">
        <span>项目归属</span>
        <el-select
          v-model="searchExternal.attribution"
          placeholder="请选择项目归属"
          style="width: 190px"
          clearable
        >
          <el-option
            v-for="item in option"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
        <el-select
          v-model="searchExternal.company"
          clearable
          placeholder="请选择归属单位"
        >
          <el-option
            v-for="item in companyList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </div>
    </search-bar>
    <comm-table
      ref="commTable"
      :single-selected="true"
      :columns="columns"
      :data="tableData"
      :count="count"
    />
    <drag-dialog ref="dialog" title="付款明细" width="50%" />
  </div>
</template>
<script>
import information from '../searchTableData/information'
export default {
  name: 'Information',
  mixins: [
    information
  ],
  data() {
    return {
      searchExternal: {
        attribution: '', // 项目归属
        company: '' // 项目归属单位
      },
      options: [
        { code: '2', name: 'name' }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.information {
  margin-bottom: 10px;
  .information-name {
    display: flex;
    justify-content: center;
    font-size: 16px;
    font-weight: 700;
    margin: 10px 0;
  }
}
</style>
