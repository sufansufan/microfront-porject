<template>
  <div class="products-quotations">
    <div class="enterprise-head">
      <!--  -->
      <div class="head-left">
        <cate-gory />
      </div>
      <div class="head-center">
        <el-input v-model="input3" placeholder="请输入产品名称" style="width: 50vw;" size="medium">
          <el-select slot="prepend" v-model="select" placeholder="请选择" style="width: 100px;">
            <el-option label="产品" value="1" />
            <el-option label="供应商" value="2" />
          </el-select>
          <el-button slot="append" type="primary" style="width: 70px;">搜索</el-button>
        </el-input>
      </div>
      <div class="head-right">
        <el-button type="primary"><i class="iconfont icon-daochu-copy" /> 导出</el-button>
      </div>
    </div>
    <div class="shopping-table">
      <div class="enterprise-table">
        <el-table :data="tableData" row-key="id" border default-expand-all>
          <el-table-column prop="id" fixed label="序号" width="50" align="center" />
          <el-table-column prop="name" label="产品信息" align="center">
            <el-table-column prop="rule" label="产品名称" width="100" align="center">
              <template slot-scope="scope">
                <div class="table-click-color" @click="changeTab()">
                  <img src="../../../../../../static/platform/star.png" alt="">
                  <span>{{ scope.row.rule }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="产品分类" width="120" align="center" />
            <el-table-column prop="name" label="品牌" width="120" align="center" />
            <el-table-column prop="name" label="规格型号" width="120" align="center" />
            <el-table-column prop="name" label="产品属性" width="120" align="center" />
            <el-table-column prop="name" label="单位" width="120" align="center" />
          </el-table-column>
          <el-table-column prop="name" label="报价信息" align="center">
            <el-table-column prop="name" label="市场价" align="right" header-align="center" />
            <el-table-column prop="name" label="合约价" align="right" header-align="center">
              <template slot-scope="scope">
                <div style="color:#e64340;">{{ scope.row.name }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="报价日期" align="center" width="100" />
          </el-table-column>
          <el-table-column prop="name" label="供应商" align="center">
            <el-table-column prop="name" label="公司名称" align="left" header-align="center" />
            <el-table-column prop="name" label="所在地区" align="left" header-align="center" />
            <el-table-column prop="name" label="联系方式" align="left" header-align="center" />
            <el-table-column prop="name" label="销量" align="right" header-align="center" />
          </el-table-column>
          <el-table-column prop="name" label="操作" align="center" width="40" fixed="right">
            <template slot-scope="scope">
              <div class="change">
                <img src="http://a2.att.hudong.com/36/48/19300001357258133412489354717.jpg" alt="采购" @click="setUpShow('采购数量')">
              </div>
            </template>
          </el-table-column>
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
    <drag-dialog ref="dialog" title="采购数量" width="35%" height="70%">
      <div>
        <el-form :rules="rules" :model="ruleform" label-width="0" class="dictionary-form">
          <el-form-item label="" prop="number" class="ful-points">
            <el-input-number v-model="num" :min="1" :max="10" label="描述文字" @change="handleChange" />
          </el-form-item>
        </el-form>
        <div style="width:100%;margin-top:20px;text-align:right;">
          <el-button type="primary" icon="el-icon-set-up">确认</el-button>
        </div>
      </div>
    </drag-dialog>
  </div>
</template>

<script>
import CateGory from './../../enterpriseMall/components/Category'
import DragDialog from '@frames/dashboard/components/Dialog'
export default {
  name: '',
  components: { CateGory, DragDialog },
  data() {
    return {
      select: '1',
      input3: '',
      value: [],
      options: [],
      count: 30,
      tableData: [
        {
          id: '1',
          number: '01',
          name: '组织缺少负责人',
          servicename: '服务名称',
          serviceurl: '服务路径',
          rule: '触发规则',
          available: '是否可用'
        },
        {
          id: '2',
          number: '02',
          name: '组织缺少负责人',
          servicename: '服务名称',
          serviceurl: '服务路径',
          rule: '触发规则',
          available: '是否可用'
        }
      ],
      ruleform: {
        number: 111,
        available: false,
        name: '',
        serviceurl: '',
        servicerule: '',
        remark: '',
        money: '111'
      },
      rules: {}
    }
  },
  methods: {
    changeGo() {
      this.$router.push('/shoppingMall/merchandiseOrder')
    },
    goCart() {
      this.$router.push('/shoppingMall/enterpriseMall/shoppingCart')
    },
    getChange() {
      this.$emit('changeTabConent', 'products', 'details')
    },
    changeTab() {
      this.$emit('changeTabConent', 'products', 'details')
    },
    setUpShow(val) {
      this.title = val
      this.$refs.dialog.show = true
    }

  }
}
</script>

<style lang="less" scoped>
  .products-quotations {
    .enterprise-head {
      width: 100%;
      height: 55px;
      border-bottom: 1px solid #0a4c8a;
      display: flex;
      align-items: center;
      justify-content:space-around;
      margin-bottom: 20px;
      .head-left {
        width: 180px;
        height: 55px;
      }
      .head-center {
        flex: 1;
        padding:0 40px 0 15px;
        display: flex;
        .el-select .el-input {
          width: 130px;
        }
        .el-input__inner {
          color:black;
        }
        .input-with-select {
          border: 2px solid #0a4c8a;
          border-left:1px solid #ccc;
        }
        .el-input-group__prepend {
          border-right:none;
          border-left:1px solid #0a4c8a;
        }
        .input-with-select .el-input-group__prepend {
          background-color: #fff;
        }
        .el-button--primary {
          background-color: #0a4c8a;
          color: #fff;
          border-radius: 0;
        }
        .el-icon-arrow-up:before {
            content: "\e6e1";
            color: black;
        }
      }
      .head-right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .right-list {
          display: flex;
          align-items: center;
          margin-right: 20px;
          img {
            width: 16px;
            height: 16px;
            margin-right: 4px;
          }
          span {
            font: 400 12px/12px '微软雅黑';
            color: #666;
          }
        }
      }
    }
    .shopping-table {
    .enterprise-table {
      .table-click-color {
        display: flex;
        img {
          margin-top: 3px;
          margin-right: 4px;
          width: 15px;
          height: 15px;
        }
      }
      .change {
        text-align: center;
        img {
          width: 16px;
          height: 16px;
        }
      }
    }
    .el-input-group__prepend {
      border: 2px solid #0a4c8a;
      border-right: 0;
      color: #333;
       background-color: #fff;
    }
    .el-input-number--small {
      width: 100%;
    }
  }
  }
</style>

<style lang="less">
.products-quotations {

  .head-center {
    .el-input__inner {
      border: 2px solid #0a4c8a;
      border-left: 1px solid #ccc;
    }
    .el-input-group__append {
      background-color: #0a4c8a;
      color: #fff;
      border: 2px solid #0a4c8a;
    }
    .el-input-group__prepend {
      border: 2px solid #0a4c8a;
      border-right: 0;
      color: #333;
    }
  }
}
</style>
