<template>
  <div class="bidsecurity-management">
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>项目归属</span>
          <el-select v-model="value" class="fill-first" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="fill-name">
          <span>招标单位</span>
          <el-input />
        </div>
        <div class="fill-name">
          <span>项目名称</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="fill-name">
          <span>是否结清</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div>
          <div>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
          </div>
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button-group>
            <el-button type="primary" @click="addrow"><i class="iconfont icon-xinzeng1-copy" />新增</el-button>
            <el-button type="primary"><i class="iconfont icon-xiugai-copy" /> 修改</el-button>
            <el-button type="primary"><i class="iconfont icon-icon7-copy" /> 删除</el-button>
            <el-button type="primary" @click="changetab('collectionapayment')">收付款记录</el-button>
            <el-button type="primary" @click="changetab('settle')">结清</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="index" label="序号" width="50" align="center" />
        <el-table-column prop="number" label="项目名称" width="140" sortable align="center">
          <template slot-scope="scope">
            <div class="table-click-color" @click="changetab('browse')">{{ scope.row.number }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="typename" align="center" label="归属单位" />
        <el-table-column prop="category" label="招标单位" align="center" />
        <el-table-column prop="downtime" label="甲方（单位:元）" align="center">
          <el-table-column prop="downtime" label="付款金额" align="center" width="150" />
          <el-table-column prop="rate" label="收款金额" align="center" />
          <el-table-column prop="rate" label="收招标公司未退金额" align="center" />
        </el-table-column>
        <el-table-column prop="typename" align="center" label="分公司/项目部（单位:元）">
          <el-table-column prop="category" label="收款金额" align="center" />
          <el-table-column prop="downtime" label="付款金额" align="center" width="150" />
          <el-table-column prop="rate" label="收保证金未投金额" align="center" />
        </el-table-column>
        <el-table-column prop="task" label="状态" align="center" />
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
      <el-form :rules="rules" :model="ruleform" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="甲方付款金额合计:">
              <el-input v-model="ruleform.number" placeholder="请输入" disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="甲方收款金额合计:">
              <el-input v-model="ruleform.number" disabled="true" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="甲方收招标公司未退金合计">
              <el-input v-model="ruleform.number" disabled="true" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="分公司/项目部付款金额合计:">
              <el-input v-model="ruleform.number" placeholder="" disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分公司/项目部收款金额合计:" disabled="true">
              <el-input v-model="ruleform.number" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分公司/项目部收保证金未投金合计:" disabled="true">
              <el-input v-model="ruleform.number" placeholder="请输入" disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <drag-dialog ref="dialog" title="新增项目" width="50%" height="60%">
      <add-project />
    </drag-dialog>

  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import AddProject from './components/addproject'
import pagination from '@core/mixins/pagination'
export default {
  components: {
    DragDialog,
    AddProject
  },
  mixins: [pagination],
  data() {
    return {
      count: 30,
      value3: '',
      options: [],
      tableData: [{
        index: '1',
        number: '02',
        category: '定时',
        typename: '公司资质即将到期',
        downtime: '是',
        rate: '路由',
        task: '路有参数',
        vestingunit: '资质名称，资质到期时间',
        finish: '是',
        updatetime: '2020.01.01'
      }],
      ruleform: {
        number: ''
      }

    }
  },
  methods: {
    changetab(status) {
      if (status === 'collectionapayment') {
        this.$router.push({
          name: 'collectionapayment'
        })
      } else if (status === 'settle') {
        this.$router.push({
          name: 'settle'
        })
      } else {
        this.$router.push({
          name: 'collectionapayment'
        })
        // 浏览页与收付款页面相似,区别在于收付款按钮,需要做判断
        // this.$router.push({
        // 	name: 'browse'
        // })
      }
    },
    addrow() {
      this.$refs.dialog.show = true
    }
  }
}
</script>

<style lang="less">
	.bidsecurity-management {
		.search {
			.select {
				.fill-name {
					width: 22%;

					.el-select,
					.el-date-editor {
						width: 100%;
					}

					.fill-first {
						width: 40%;
						margin-right: 2px;
					}
				}

			}
		}

		.form-top {
			margin-top: 20px;

			.el-form-item {
				margin-right: 10px;
			}
		}

	}
</style>
