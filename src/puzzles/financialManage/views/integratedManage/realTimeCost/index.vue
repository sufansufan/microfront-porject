<!--实时成本统计-->
<template>
  <div class="real-time-cost">
    <search-bar :select-list="selectList" :btn-list="btnList" :search="search" @changeSearch="changeSearch">
      <div slot="searchBar0" class="external-list">
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
  </div>
</template>

<script>
import searchTableData from './searchTableData'
import { mapGetters } from 'vuex'
import search from '@core/mixins/search'
export default {
  name: 'RealTimeCost',
  mixins: [searchTableData, search],
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
  },
  computed: {
    ...mapGetters(['constant'])
  }
}
</script>

<style lang="scss" scoped>

</style>
