<template>
  <div class="video-conferencing">
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>会议编号</span>
          <el-input v-model="input" class="fill-line" placeholder="请输入会议编号" />
        </div>
        <div class="fill-name">
          <span>会议主题</span>
          <el-input v-model="input" class="fill-line" placeholder="请输入会议主题" />
        </div>
        <div class="fill-name">
          <span>会议类型</span>
          <el-select v-model="value" class="fill-line" placeholder="请选择会议类型">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="fill-name">
          <span style="min-width:90px">参会方负责人</span>
          <el-select v-model="value" class="fill-line" placeholder="请输入或选择人员名称">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="fill-name">
          <span>发起日期</span>
          <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div class="fill-name">
          <span>发起人</span>
          <el-select v-model="value" class="fill-line" placeholder="请输入或选择人员名称">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="fill-name">
          <span>状态</span>
          <el-select v-model="value" class="fill-line" placeholder="请选择会议状态">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div>
          <div>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="btn">
      <div>
        <el-button-group>
          <el-button type="primary" @click="$router.push({name:'newMeeting'})"> <i class="iconfont icon-xinzeng1-copy" /> 新增</el-button>
          <el-button type="primary"><i class="iconfont icon-xiugai-copy" /> 修改</el-button>
          <el-button type="primary">复制</el-button>
          <el-button type="primary"><i class="iconfont icon-icon7-copy" /> 删除</el-button>
        </el-button-group>
        <el-button-group>
          <el-button type="primary">发布</el-button>
          <el-button class="cancel-btn">取消</el-button>
        </el-button-group>
      </div>

    </div>

    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column type="selection" width="40" />
        <el-table-column prop="index" label="序号" width="50" align="center" />
        <el-table-column prop="type" label="会议编号" align="center" sortable>
          <template slot-scope="scope">
            <div class="table-click-color" @click="$router.push({name:'viewMeeting'})">{{ scope.row.type }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="type" align="center" label="会议主题" sortable />
        <el-table-column prop="category" label="会议类型" align="center" sortable />
        <el-table-column prop="downtime" label="计划开始时间" sortable align="center" />
        <el-table-column prop="rate" label="预计结束时间" sortable align="center" />
        <el-table-column prop="vestingunit" label="参会方数量" align="center" sortable />
        <el-table-column prop="downtime" label="发起人" sortable align="center" />
        <el-table-column prop="rate" label="发起时间" sortable align="center" />
        <el-table-column prop="vestingunit" label="状态" sortable align="center" />
        <el-table-column prop="vestingunit" label="操作" align="center" />
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
import pagination from '@core/mixins/pagination'
export default {
  mixins: [pagination],
  data() {
    return {
      count: 30,
      value1: '',
      tableData: [{
        index: '1',
        number: '借款申请',
        type: '借款审批',
        approvalType: 'reimbursementApproval',
        category: '定时',
        downtime: '提前1月',
        rate: '一次',
        task: '否',
        vestingunit: '第一分公司',
        receiver: '行政专员，办公室主任',
        available: '是',
        name: '资质（资质编号）将于有效期到期，请处理相关事宜！',
        deploy: '是',
        updatetime: '2020.01.01'
      }],
      options: [{
        value: 1,
        label: '借款申请'
      },
      {
        value: 2,
        label: '还款申请'
      },
      {
        value: 3,
        label: '报销申请'
      },
      {
        value: 4,
        label: '扣款申请'
      }
      ]
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
	.video-conferencing {
		padding: 20px;
		height: calc(100vh - 120px);
		overflow-y: scroll;
		.search>.select>.fill-name {
			width:23%;
			.fill-line {
				width: 100%;
      }

    }
    .btn{
      margin-bottom:10px;
    }
	}
</style>
