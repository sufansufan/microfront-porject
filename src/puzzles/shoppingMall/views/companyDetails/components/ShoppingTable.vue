<template>
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
import DragDialog from '@frames/dashboard/components/Dialog'
export default {
  name: 'ShoppingTable',
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
      this.$emit('changeTabConent', 'products', 'details')
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
</style>
