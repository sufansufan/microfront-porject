<template>
  <div class="prepaid-VAT">
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>月份</span>
          <el-date-picker v-model="value3" type="month" placeholder="选择年" />
        </div>
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
          <span>项目名称</span>
          <el-input />
        </div>
        <div class="fill-name">
          <span>缴税地区</span>
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
            <el-button type="primary" @click="addrow"><i class="iconfont icon-xinzeng1-copy" />新增预缴项目</el-button>
            <el-button type="primary"><i class="iconfont icon-icon7-copy" /> 删除预缴项目</el-button>
            <el-button type="primary"><i class="iconfont icon-daochu-copy" /> 导出</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="index" label="归属单位" align="center" />
        <el-table-column prop="index" label="项目信息" align="center">
          <el-table-column prop="index" label="合同编号" align="center" />
          <el-table-column prop="index" label="项目名称" align="center">
            <template slot-scope="scope">
              <div class="table-click-color" @click="view()">{{ scope.row.number }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="index" label="合同金额" align="center" />
          <el-table-column prop="index" label="结算金额" align="center" />

        </el-table-column>
        <el-table-column prop="index" label="开票信息" align="center">
          <el-table-column prop="index" label="本月开票金额（含税销售额）" align="center" />
          <el-table-column prop="index" label="本月开票无税金额（不含税销售额）" align="center" />

          <el-table-column prop="index" label="本月开票税金（应缴增值税）" align="center" />
        </el-table-column>
        <el-table-column prop="number" label="预缴信息" width="140" align="center">
          <el-table-column prop="number" label="本月可扣除分包额" width="140" align="center" />
          <el-table-column prop="number" label="本月已预缴增值税" width="140" align="center" />
          <el-table-column prop="number" label="本月已预缴附加税" width="140" align="center" />
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
    <div class="form-top">
      <el-form :rules="rules" :model="ruleform" label-width="130px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="开票金额合计:">
              <el-input v-model="ruleform.number" placeholder="请输入" disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开票无税金额合计:">
              <el-input v-model="ruleform.number" disabled="true" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开票税金合计:">
              <el-input v-model="ruleform.number" disabled="true" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="可扣除分包额合计:">
              <el-input v-model="ruleform.number" placeholder="" disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="已预缴增值税合计:" disabled="true">
              <el-input v-model="ruleform.number" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="已预缴附加税合计:" disabled="true">
              <el-input v-model="ruleform.number" placeholder="请输入" disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <drag-dialog ref="dialog" title="新增预缴项目" width="50%" height="60%">
      <add-prepaidproject />
    </drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import AddPrepaidproject from './components/addprepaidproject'
import pagination from '@core/mixins/pagination'
export default {
  components: {
    DragDialog,
    AddPrepaidproject
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
    addrow() {
      this.$refs.dialog.show = true
    },
    view() {
      this.$router.push({
        name: 'browsesalestax'
      })
    }
  }
}
</script>

<style lang="less">
	.prepaid-VAT {
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
