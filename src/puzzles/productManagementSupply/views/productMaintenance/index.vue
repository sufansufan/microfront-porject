<template>
  <div class="product-maintenance">
    <div class="product-top">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
      <div class="top-right">
        <div class="search">
          <div class="select">
            <div class="fill-name">
              <span>产品ID</span>
              <el-input v-model="input" placeholder="请输入" class="fill-line" />
            </div>
            <div class="fill-name">
              <span>产品名称</span>
              <el-input v-model="input" placeholder="请输入" class="fill-line" />
            </div>
            <div class="fill-name">
              <span>产品分类</span>
              <el-select v-model="value" placeholder="请选择" class="fill-line">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div class="fill-name">
              <span>品牌</span>
              <el-input v-model="input" placeholder="请输入" class="fill-line" />
            </div>

            <div class="fill-name">
              <span>规格型号</span>
              <el-input v-model="input" placeholder="请输入" class="fill-line" />
            </div>
            <div class="fill-name" style="width:50%;">
              <span>报价时间</span>
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="选择起始日期"
                end-placeholder="选择截止日期"
              />
            </div>
            <div class="fill-name">
              <span>供应商编号</span>
              <el-input v-model="input" placeholder="请输入" class="fill-line" />
            </div>

            <div class="fill-name">
              <span>供应商名称</span>
              <el-input v-model="input" placeholder="请输入" class="fill-line" />
            </div>
            <div class="fill-name" style="width:50%;">
              <span>报价有效期止</span>
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="选择起始日期"
                end-placeholder="选择截止日期"
              />
            </div>

            <div class="fill-name">
              <span>合作协议</span>
              <el-input v-model="input" placeholder="请输入" class="fill-line" />
            </div>
            <div style="margin-right:0;">
              <div>
                <el-button type="primary" icon="el-icon-search">查询</el-button>
              </div>
            </div>
          </div>
        </div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="已发布产品" name="first">
            <product-maintenance-right />
          </el-tab-pane>
          <el-tab-pane label="已下架产品" name="second">
            <product-maintenance-right />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import ProductMaintenanceRight from './components/ProductMaintenanceRight'

export default {
  name: 'ProductMaintenance',
  components: { ProductMaintenanceRight },
  data() {
    return {
      select: '1',
      productsState: 'default',
      activeName: 'first',
      input3: '',
      value: [],
      options: [],
      deliveryState: 'default',
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick(data) {
    }
  }
}
</script>

<style lang="less" scoped>
  .product-maintenance {
    height: calc(100% - 60px);
    .product-top {
      display: flex;
      height: 100%;
      .el-tree {
        width: 180px;
        background: #eef1f6;
        height: 100%;
      }
      .top-right {
        padding: 10px;
        flex: 1;
        min-width: 100px;
        .search>.select>.fill-name {
          width: 25%;
          margin-right: 0;
          .fill-line {
            width: 100%;
          }

          span {
            text-align: right;

          }
        }
        .search > .select > div > span {
          min-width: 90px;
        }
        .el-input__inner {
          width: 100%;
        }
      }
    }
  }
</style>
