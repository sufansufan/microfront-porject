<template>
  <div class="shopping-classification">
    <div class="enterprise-title">
      <div v-for="(item,index) in list" :key="index" :class="Inindex==item.id?'active':'title-item'" @click="change(item)">
        <span>{{ item.title }}</span>
        <i class="desc" />
      </div>
      <div class="title-item">
        <el-input v-model="input" placeholder="￥最低价" />
        <span style="margin:0 2px;">-</span>
        <el-input v-model="input" placeholder="￥最高价" />
      </div>
      <div class="title-item">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <div class="enterprise-table">
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="id" fixed label="序号" width="50" align="center" />
        <el-table-column prop="name" label="产品信息" align="center">
          <el-table-column prop="rule" label="产品名称" width="100" align="center">
            <template slot-scope="scope">
              <div class="table-click-color" @click="changeTab()">
                <img src="../../../../../static/platform/star.png" alt="">
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
        <el-table-column prop="name" label="操作" align="center" width="120" fixed="right">
          <template>
            <div class="change">
              <img src="http://a2.att.hudong.com/36/48/19300001357258133412489354717.jpg" alt="采购" @click="setUpShow('采购数量')">
              <img src="http://a2.att.hudong.com/36/48/19300001357258133412489354717.jpg" alt="放入购物车" @click="setUpShow('加入购物车数量')">
              <img src="http://a2.att.hudong.com/36/48/19300001357258133412489354717.jpg" alt="加入对比列表" @click="open('succse')">
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
    <drag-dialog ref="dialog" :title="title" width="35%" height="70%">
      <div v-if="title==='采购数量'">
        <el-form :rules="rules" :model="ruleform" label-width="0" class="dictionary-form">
          <el-form-item label="" prop="number" class="ful-points">
            <el-input-number v-model="num" :min="1" :max="10" label="描述文字" @change="handleChange" />
          </el-form-item>
          <el-form-item label="" prop="number" class="ful-points">
            <el-select v-model="value" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div style="width:100%;margin-top:20px;text-align:right;">
          <el-button type="primary" icon="el-icon-set-up">确认</el-button>
        </div>
      </div>
      <div v-if="title==='加入购物车数量'">
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
import DragDialog from '@frames/dashboard/components/Dialog'
export default {
  name: 'ShoppingClassification',
  components: { DragDialog },
  data() {
    return {
      select: '1',
      num: 1,
      input3: '',
      value: [],
      options: [],
      count: 30,
      title: '采购数量',
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
      Inindex: 1,
      list: [
        { id: 1, title: '销量' },
        { id: 2, title: '产品名称' },
        { id: 3, title: '合约价' },
        { id: 4, title: '市场价' },
        { id: 5, title: '品牌' },
        { id: 6, title: '产品分类' },
        { id: 7, title: '报价日期' }
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
    change(val) {
      this.Inindex = val.id
    },
    changeTab() {
      this.$router.push('/shoppingMall/enterpriseMall/materialName')
    },
    setUpShow(val) {
      this.title = val
      this.$refs.dialog.show = true
    },
    open(val) {
      if (val === 'succse') {
        this.$message({
          message: '加入对比列表成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: '此产品已在对比列表中，不可重复添加！',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .shopping-classification {
    padding: 0px 10px;
    .enterprise-title {
      height: 38px;
      margin: 10px 0px;
      font-size: 0;
      border: 1px solid #ddd;
      background: #f5f5f5;
      display: flex;
      .title-item {
        cursor: pointer;
        padding: 0 10px;
        text-decoration: none;
        border-right: 1px solid #ddd;
        background: #f5f5f5;
        display: flex;
        align-items: center;
        span {
          color: #333;
          font-size: 14px;
        }
        .desc {
          width: 12px;
          height: 12px;
          margin-left: 4px;
          background: url('../../../../../static/platform/up.png') no-repeat top left;
          background-size: 100% 100%;
        }

      }
      .active {
        cursor: pointer;
        padding: 0 10px;
        text-decoration: none;
        border-right: 1px solid #ddd;
        display: flex;
        align-items: center;
        background: #fff;
        span {
          color: #e64340;
          font: 400 12px/38px '微软雅黑';
        }
        .desc {
          width: 12px;
          height: 12px;
          margin-left: 4px;
          background: url('../../../../../static/platform/up-active.png') no-repeat top left;
          background-size: 100% 100%;
        }
      }
    }
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
        display: flex;
        align-items: center;
        justify-content: space-between;
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
  }
</style>
