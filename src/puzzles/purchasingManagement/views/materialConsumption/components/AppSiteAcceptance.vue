<template>
  <div class="app-site-acceptance">
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="id" label="序号" width="50" align="center" fixed />
        <el-table-column prop="number" label="验收单号" width="120" sortable align="center" fixed>
          <template slot-scope="scope">
            <div class="link-a" @click="changeTab('information')">{{ scope.row.number }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="rule" label="采购单号" width="100" align="center" sortable header-align="center" />
        <el-table-column prop="name" label="供应商" align="center" width="100" sortable />
        <el-table-column prop="rule" label="发货日期" align="center" sortable header-align="center" width="100" />
        <el-table-column prop="number" label="供货单" width="120" sortable align="center">
          <template slot-scope="scope">
            <div class="link-a" @click="changeTab('supply')">{{ scope.row.number }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="验货资料" width="120" sortable align="center">
          <template slot-scope="scope">
            <el-popover
              placement="bottom"
              width="400"
              trigger="click"
            >
              <el-table :data="gridData" row-key="id" border default-expand-all>
                <el-table-column property="img" label="文件名称">
                  <template>
                    <div class="link-a">11111.png</div>
                  </template>
                </el-table-column>
                <el-table-column property="size" label="文件大小" />
              </el-table>
              <div slot="reference" class="enclosure"><img src="http://a4.att.hudong.com/21/09/01200000026352136359091694357.jpg" alt=""><span>查看附件</span></div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="预计到货时间" align="center" width="120" sortable />
        <el-table-column prop="name" label="验收地点" align="center" header-align="center" />
        <el-table-column prop="name" label="负责人" align="center" width="100" />
        <el-table-column prop="rule" label="验收完成时间" align="center" header-align="center" width="120" sortable />
        <el-table-column prop="name" label="状态" align="center" />
        <el-table-column prop="name" label="验收结果" align="center" />
        <el-table-column prop="name" label="验收文件" align="center" header-align="center" />
        <el-table-column prop="name" label="上传人" align="center" />
        <el-table-column prop="name" label="上传日期" align="center" width="100" sortable header-align="center" />
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
      count: 30,
      ruleform: {
        number: 111
      },
      gridData: [
        { id: 1, img: '', size: '325k' }
      ],
      tableData: [
        {
          id: '1',
          name: '组织缺少负责人',
          servicename: '服务名称',
          serviceurl: '服务路径',
          rule: '触发规则',
          available: '是否可用',
          number: '32894738274'
        },
        {
          id: '2',
          name: '组织缺少负责人',
          servicename: '服务名称',
          serviceurl: '服务路径',
          rule: '触发规则',
          available: '是否可用',
          number: '32894738274'
        }
      ]
    }
  },
  methods: {
    changeTab(status) {
      this.$emit('changeTabConent', 'site', status)
    }
  }
}
</script>

<style lang="less" scoped>
  .app-site-acceptance {
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
      min-width: 80px;
    }
   .link-a {
      color:@primary;
      cursor: pointer;
      text-decoration: underline;
    }
    .form-top{
      margin-top: 20px;
    }
    .enclosure {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 19px;
        height: 19px;
        margin-right: 4px;
      }
      span {
        color:@primary;
        cursor: pointer;
        text-decoration: underline;
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
