<template>
  <div class="advanced-query">
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>合同编号</span>
          <el-input placeholder="请输入合同编号" />
        </div>
        <div class="fill-name">
          <span>工程名称</span>
          <el-select v-model="value" placeholder="请选择工程">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="fill-name">
          <span>项目类型</span>
          <el-select v-model="value" placeholder="请选择项目类型">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="fill-name">
          <span>是否结清</span>
          <el-select v-model="value" placeholder="请选择是否结清">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="fill-name">
          <span>工程状态</span>
          <el-select v-model="value" placeholder="请选择工程状态">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="fill-name">
          <span>建设单位</span>
          <el-input placeholder="请输入建设单位" />
        </div>
        <div class="fill-name">
          <span>项目归属</span>
          <el-select v-model="value" placeholder="请选择项目归属">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="fill-name">
          <span>归属单位</span>
          <el-select v-model="value" placeholder="请选择归属单位">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="fill-name">
          <span>合同金额（元）</span>
          <el-select v-model="value" placeholder="请输入起始合同金额">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="fill-name">
          <span>截止合同金额</span>
          <el-select v-model="value" placeholder="请输入截止合同金额">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="fill-name">
          <span>项目年份</span>
          <el-date-picker
            v-model="value3"
            type="year"
            placeholder="选择年"
          />
        </div>
        <div class="fill-name">
          <span>建造师</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="btn">
          <el-button type="primary" icon="el-icon-search">查询</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  data() {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.advanced-query{
  .search{
    .select{
      .fill-name{
        width:47%;
        span{
          min-width:100px;
          text-align: right
        }

      }
    }
  }
  .btn{
    width:100%;
    display:flex;
    justify-content: flex-end;
    .el-button{
      margin-right:35px;

    }
  }
}

</style>
