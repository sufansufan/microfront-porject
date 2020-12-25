<template>
  <div class="total-collection">
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>开票单位</span>
          <el-input v-model="input" placeholder="请输入" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>开票日期</span>
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期"
          />
        </div>
        <div class="fill-name">
          <span>是否审核</span>
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
          <span>发票编号</span>
          <el-input v-model="input" placeholder="请输入" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>发票金额</span>
          <el-input v-model="input" placeholder="请输入" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>备注</span>
          <el-input v-model="input" placeholder="请输入" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>发票归类</span>
          <el-select v-model="value" placeholder="请选择" class="fill-line">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <div>
            <el-button-group>
              <el-button type="primary" icon="el-icon-search">查询</el-button>
              <el-button type="primary"><i class="iconfont icon-daochu-copy" /> 导出</el-button>
            </el-button-group>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="id" label="" width="50" align="center" />
        <el-table-column prop="name" label="状态" align="center" sortable />
        <el-table-column prop="name" label="收票日期" align="center" sortable width="100" />
        <el-table-column prop="name" label="开票日期" align="center" sortable width="100" />
        <el-table-column prop="id" label="发票类型" align="center" sortable width="100" />
        <el-table-column prop="name" label="开票税率" align="center" sortable width="100" />
        <el-table-column prop="name" label="发票编号" align="center" sortable width="100" />
        <el-table-column prop="rule" label="发票归类" align="center" header-align="center" width="100" sortable />
        <el-table-column prop="rule" label="发票金额" align="right" header-align="center" />
        <el-table-column prop="rule" label="发票付款余额" width="100" align="right" header-align="center" />
        <el-table-column prop="rule" label="票据张数" align="right" header-align="center" />
        <el-table-column prop="rule" label="发票无税金额" align="right" header-align="center" />
        <el-table-column prop="rule" label="发票税金" align="right" header-align="center" sortable width="100" />
        <el-table-column prop="rule" label="是否认证" align="center" header-align="center" sortable width="100" />
        <el-table-column prop="rule" label="是否进项转出" align="center" header-align="center" sortable />
        <el-table-column prop="rule" label="发票代码" align="center" header-align="center" />
        <el-table-column prop="rule" label="销方纳税人识别号" align="center" header-align="center" />
        <el-table-column prop="rule" label="合同编号" align="center" header-align="center" sortable width="100" />
        <el-table-column prop="rule" label="合同名称" align="center" header-align="center" sortable width="100" />
        <el-table-column prop="rule" label="开票单位" align="center" header-align="center" />
        <el-table-column prop="rule" label="录入人" align="center" header-align="center" />
        <el-table-column prop="rule" label="录入时间" align="center" header-align="center" sortable width="100" />
        <el-table-column prop="rule" label="来源" align="center" header-align="center" />
        <el-table-column prop="rule" label="备注" align="center" header-align="center" />
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
export default {
  components: { },
  data() {
    return {
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
      ]
    }
  }
}
</script>

<style lang="less" scope>
.total-collection {
    .search>.select>.fill-name {
			width: 24%;
			margin-right: 5px;
			.fill-line {
				width: 100%;
			}
			span {
				text-align: right;
			}
    }
  .dictionary-form {
      display: flex;
      flex-wrap: wrap;
      .el-form-item {
        width: 50%;
        .el-form-item__content {
          display: flex;
          .is-disabled {
            width: 100%;
          }
          .el-select {
            width: 100%;
          }
          .el-date-editor {
            width: 100%;
          }
        }
      }
      .pay-type {
        margin-right: 50%;
      }
      .full-item {
        width: 100%;
        .btn-anther {
          margin-left: 6px;
        }
      }
    }
  }
</style>
