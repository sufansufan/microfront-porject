<template>
  <div class="cash-account">
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>账户名称：</span>
          <el-input
            v-model="input"
            placeholder="请输入"
            class="fill-line"
          />
        </div>
        <div class="fill-name">
          <span>归属单位：</span>
          <el-select
            v-model="value"
            placeholder="请选择"
            class="fill-line"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              class="fill-line"
            />
          </el-select>
        </div>
        <div class="fill-name">
          <span>负责人：</span>
          <el-input
            v-model="input"
            placeholder="请输入"
            class="fill-line"
          />
        </div>
        <div>
          <div>
            <el-button
              type="primary"
              icon="el-icon-search"
            >查询</el-button>
          </div>
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button-group>
            <el-button type="primary" @click="changeTab('cashAdd')"><i class="iconfont icon-xinzeng1-copy" /> 新增</el-button>
            <el-button type="primary"><i class="iconfont icon-xiugai-copy" /> 修改</el-button>
            <el-button type="primary"><i class="iconfont icon-icon7-copy" /> 删除</el-button>
          </el-button-group>
        </div>
        <div>
          <el-button type="primary" @click="changeTab('transfer')">转账</el-button>
        </div>
      </div>

    </div>
    <div>
      <el-table
        :data="tableData"
        row-key="id"
        border
        default-expand-all
      >
        <el-table-column
          type="selection"
          width="40"
        />
        <el-table-column
          prop="id"
          label="序号"
          width="50"
          align="center"
        />
        <el-table-column
          prop="name"
          label="账户名称"
          sortable
          align="center"
        >
          <template slot-scope="scope">
            <div
              class="link-a"
              @click="changeTab('cashDeposit')"
            >{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="归属单位"
          align="center"
        />
        <el-table-column
          prop="servicename"
          label="当前余额"
          align="right"
        />
        <el-table-column
          prop="serviceurl"
          label="支出合计"
          align="right"
        />
        <el-table-column
          prop="rule"
          label="收款合计"
          sortable
          align="right"
        />
        <el-table-column
          prop="available"
          label="备注"
          align="center"
        />
        <el-table-column
          prop="rule"
          label="负责人"
          align="center"
        />
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
    <div class="form-top">
      <el-form
        :rules="rules"
        :model="ruleform"
        label-width="140px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="当前余额汇总:"
            >
              <el-input
                v-model="ruleform.number"
                placeholder="请输入"
                disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="支出合计汇总:"
            >
              <el-input
                v-model="ruleform.number"
                disabled="true"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="收款合计汇总:"
            >
              <el-input
                v-model="ruleform.number"
                disabled="true"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  components: { },
  data() {
    return {
      count: 30,
      ruleform: {
        number: 111
      },
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
  },
  methods: {
    changeTab(status) {
      this.$emit('changeTabBank', 'cashActive', status)
    }
  }
}
</script>

<style lang="less">
  .cash-account {
   .link-a {
      color:@primary;
      cursor: pointer;
    }
    .form-top {
      margin-top: 20px;
    }
    .search>.select>.fill-name {
			width: 22%;
			margin-right: 5px;

			.fill-line {
				width: 100%;
			}

			span {
				min-width: 85px;
				text-align: right;

			}
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
