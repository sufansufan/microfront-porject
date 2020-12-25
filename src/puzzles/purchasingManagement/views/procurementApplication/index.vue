<template>
  <div class="procurement-application">
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>项目归属</span>
          <el-select v-model="value" placeholder="请选择" class="fill-line">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
          <span>采购单号</span>
          <el-input v-model="input" placeholder="请输入" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>项目名称</span>
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
          <span>供应商</span>
          <el-input v-model="input" placeholder="请输入" class="fill-line" />
        </div>

        <div class="fill-name">
          <span>申请日期</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="起始日期"
            end-placeholder="截止日期"
          />
        </div>
        <div class="fill-name">
          <span>状态</span>
          <div style="flex:1;display: flex;justify-content: space-around;">
            <el-input-number v-model="num" controls-position="right" :min="1" :max="10" @change="handleChange" />
            <span>至</span>
            <el-input-number v-model="num" controls-position="right" :min="1" :max="10" @change="handleChange" />
          </div>
        </div>
        <div class="fill-name">
          <span>审批状态</span>
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
          <span>审批结果</span>
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
          <span>采购单状态</span>
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
          <span>是否已签合同</span>
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
          <span>合同编号</span>
          <el-input v-model="input" placeholder="请输入" class="fill-line" />
        </div>
        <div style="margin-right:0;">
          <div>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
          </div>
        </div>
      </div>
      <div style="margin-bottom:10px;">
        <el-button-group>
          <el-button type="primary"><i class="iconfont icon-xinzeng1-copy" />新增</el-button>
          <el-button type="primary" @click="modifyReplication"><i class="iconfont icon-xiugai-copy" />  修改</el-button>
          <el-button type="primary"><i class="iconfont icon-icon7-copy" /> 删除</el-button>
          <el-button type="primary" @click="modifyReplication">复制</el-button>
        </el-button-group>
        <el-button-group>
          <el-button type="primary">提交审批</el-button>
          <el-button type="primary">撤销订单</el-button>
          <el-button type="primary">用款申请</el-button>
        </el-button-group>
      </div>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column type="selection" width="40" fixed align="center" />
        <el-table-column prop="id" label="序号" width="50" fixed align="center" />
        <el-table-column prop="name" label="采购单号" width="120" fixed align="center" sortable>
          <template slot-scope="scope">
            <div class="link-a" @click="changeTab()">{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="项目名称" align="center" sortable />
        <el-table-column prop="name" label="供应商" align="center" />
        <el-table-column prop="rule" label="采购人" width="100" align="center" />
        <el-table-column prop="name" label="申请日期" align="center" width="100" sortable />
        <el-table-column prop="rule" label="金额" align="right" header-align="center" sortable />
        <el-table-column prop="rule" label="已付金额" align="right" header-align="center" sortable />
        <el-table-column prop="rule" label="未付金额" align="right" header-align="center" sortable />
        <el-table-column prop="avaApprovalState" label="审批状态" align="center" width="100" sortable>
          <template slot-scope="scope">
            <div v-if="scope.row.avaApprovalState==='审批中'" class="link-a">{{ scope.row.avaApprovalState }}</div>
            <div v-if="scope.row.avaApprovalState==='草稿'" @click="changeTab()">{{ scope.row.avaApprovalState }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="审批结果" align="center" width="100" />
        <el-table-column prop="name" label="审批完成时间" align="center" width="120" sortable />
        <el-table-column prop="name" label="采购单状态" align="center" width="100" />
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
  name: 'ProcurementApplication',
  components: { },
  data() {
    return {
      count: 30,
      ruleform: {
        number: 111
      },
      num: 1,
      tableData: [
        {
          id: '1',
          number: '01',
          name: '组织缺少负责人',
          servicename: '服务名称',
          serviceurl: '服务路径',
          rule: '触发规则',
          avaApprovalState: '草稿'
        },
        {
          id: '2',
          number: '02',
          name: '组织缺少负责人',
          servicename: '服务名称',
          serviceurl: '服务路径',
          rule: '触发规则',
          avaApprovalState: '审批中'
        }
      ]
    }
  },
  methods: {
    changeTab() {
      this.$router.push('/purchasingManagement/procurementApplication/purchaseOrder')
    },
    handleChange() {

    },
    modifyReplication() {
      this.$router.push('/purchasingManagement/procurementApplication/modifyReplication')
    }
  }
}
</script>

<style lang="less" scoped>
  .procurement-application {
    .search>.select>.fill-name {
			width: 30%;
			margin-right: 5px;

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
   .link-a {
      color:@primary;
      cursor: pointer;
      text-decoration: underline;
    }
    .form-top{
      margin-top: 20px;
    }
    .el-input-number--small {
      width: 48%;
    }
  }
</style>
<style>
  .el-input.is-disabled .el-input__inner {
    background-color: #FFF!important;
    color: #606266!important;
  }
  .el-textarea.is-disabled .el-textarea__inner {
    background-color: #FFF!important;
    color: #606266!important;
  }

</style>
