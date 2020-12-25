<template>
  <div class="unit-summary">
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>项目归属</span>
          <el-select
            v-model="value"
            class="fill-first"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-model="value"

            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
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
          <el-select
            v-model="value"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="fill-name">
          <span>建设单位</span>
          <el-select
            v-model="value"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="fill-name">
          <span>工程状态</span>
          <el-select
            v-model="value"
            placeholder="请选择"
          >
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
            <el-button type="primary">打印</el-button>
            <el-button type="primary"><i class="iconfont icon-daochu-copy" /> 导出</el-button>
          </el-button-group>
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
          prop="index"
          label="序号"
          width="50"
          align="center"
        />
        <el-table-column
          prop="number"
          label="项目归属单位"
          width="140"
          sortable
          align="center"
        >
          <template slot-scope="scope">
            <div
              class="table-click-color"
              @click="view(scope.row)"
            >{{ scope.row.number }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="typename"
          align="center"
          label="项目款"
        >
          <el-table-column
            prop="category"
            label="余额"
            sortable
            align="center"
          />
          <el-table-column
            prop="downtime"
            label="申请余额"
            align="center"
            width="150"
          />
          <el-table-column
            prop="rate"
            label="批准金额"
            align="center"
          />
        </el-table-column>
        <el-table-column
          prop="typename"
          align="center"
          label="项目保证金"
        >
          <el-table-column
            prop="category"
            label="金额"
            sortable
            align="center"
          />
          <el-table-column
            prop="downtime"
            label="申请金额"
            align="center"
            width="150"
          />
          <el-table-column
            prop="rate"
            label="批准金额"
            align="center"
          />
        </el-table-column>
        <el-table-column
          prop="typename"
          align="center"
          label="质保/保函/押金"
        >
          <el-table-column
            prop="task"
            label="金额"
            sortable
            align="center"
            width="200"
          />
          <el-table-column
            prop="finish"
            label="申请金额"
            align="center"
            width="200"
          />
          <el-table-column
            prop="vestingunit"
            label="批准金额"
            align="center"
            width="200"
          />
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
      <el-form
        :rules="rules"
        :model="ruleform"
        label-width="120px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="项目款余额合计:"
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
              label="保证金金额合计:"
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
              label="质保/保函/押金余额合计:"
            >
              <el-input
                v-model="ruleform.number"
                disabled="true"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="项目款申请合计:"
            >
              <el-input
                v-model="ruleform.number"
                placeholder=""
                disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="保证金申请合计:"
              disabled="true"
            >
              <el-input
                v-model="ruleform.number"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="质保/保函/押金申请合计:"
              disabled="true"
            >
              <el-input
                v-model="ruleform.number"
                placeholder="请输入"
                disabled="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="项目款批准合计:"
            >
              <el-input
                v-model="ruleform.number"
                placeholder=""
                disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="保证金批准合计:"
              disabled="true"
            >
              <el-input
                v-model="ruleform.number"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="质保/保函/押金批准合计:"
              disabled="true"
            >
              <el-input
                v-model="ruleform.number"
                placeholder="请输入"
                disabled="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import pagination from '@core/mixins/pagination'
export default {
  components: {

  },
  mixins: [pagination],
  data() {
    return {
      count: 30,
      value3: '',
      options: [],
      tableData: [
        {
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
        }
      ],
      ruleform: {
        number: ''
      }

    }
  },
  methods: {
    view() {
      this.$router.push({ name: 'attributiondetails' })
    }
  }
}
</script>

<style lang="less">
.unit-summary{
  //   height: calc(100vh - 160px);
	// overflow-y: auto;
  // padding: 20px;
  .search{
    .select{
      .fill-name{
        width:31%;
        .el-select,.el-date-editor{
          width:100%;
        }
        .fill-first{
          width:40%;
          margin-right:2px;
        }
      }

    }
  }
  .form-top{
    margin-top:20px;
    .el-form-item{
      margin-right:10px;
    }
  }

}
</style>
