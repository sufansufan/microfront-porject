<template>
  <div class="site-acceptance">
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
          <span>验收单号</span>
          <el-input v-model="input" placeholder="请输入" class="fill-line" />
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
          <span>发货日期</span>
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
          <el-select v-model="value" placeholder="请选择" class="fill-line">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div style="margin-right:0;">
          <div>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
          </div>
        </div>
      </div>
      <div style="margin-bottom:10px;">
        <el-button-group>
          <el-button type="primary">验收</el-button>
          <el-button type="primary" @click="changeShow">上传验收文件</el-button>
          <el-button type="primary">撤销</el-button>
        </el-button-group>
      </div>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column type="selection" width="40" fixed align="center" />
        <el-table-column prop="id" label="序号" width="50" fixed align="center" />
        <el-table-column prop="name" label="验收单号" width="120" fixed align="center" sortable>
          <template slot-scope="scope">
            <div class="link-a" @click="changeTab('acceptance')">{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="采购单号" width="120" fixed align="center" sortable>
          <template slot-scope="scope">
            <div class="link-a" @click="changeTab('purchase')">{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="项目名称" width="100" align="center" sortable />
        <el-table-column prop="name" label="供应商" align="center" />
        <el-table-column prop="name" label="发货日期" align="center" width="100" sortable />
        <el-table-column prop="number" label="供应单" align="center">
          <template slot-scope="scope">
            <div class="link-a" @click="changeTab('supply')">{{ scope.row.number }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="rule" label="验货资料" width="100" align="center">
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
              <div slot="reference" class="fujian">
                <img src="http://a4.att.hudong.com/21/09/01200000026352136359091694357.jpg" alt="">
                <span>{{ scope.row.rule }}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="rule" label="预计到货时间" width="120" align="right" header-align="center" sortable />
        <el-table-column prop="rule" label="验收地点" align="center" header-align="center" />
        <el-table-column prop="rule" label="负责人" align="center" header-align="center" />
        <el-table-column prop="rule" label="验收完成时间" width="120" align="center" header-align="center" />
        <el-table-column prop="avaApprovalState" label="状态" align="center" width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.avaApprovalState==='已确认验收'" class="link-a">{{ scope.row.avaApprovalState }}</div>
            <div v-if="scope.row.avaApprovalState==='待验收'" @click="changeTab()">{{ scope.row.avaApprovalState }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="验收结果" align="center" width="100" />
        <el-table-column prop="rule" label="验收文件" align="center" width="100">
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
              <div slot="reference" class="fujian">
                <img src="http://a4.att.hudong.com/21/09/01200000026352136359091694357.jpg" alt="">
                <span>{{ scope.row.rule }}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="上传人" align="center" width="100" />
        <el-table-column prop="name" label="上传日期" align="center" sortable width="100" />
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
    <drag-dialog ref="dialog" title="订单详情" width="55%" height="70%">
      <div class="form-border">
        <el-form :rules="rules" :model="ruleform" label-width="150px" class="dictionary-form">
          <el-form-item label="附件" prop="number" class="full-item">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">上传附件</el-button>
              <div slot="tip" class="el-upload__tip">单个附件请不要超过20M</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="上传日期" prop="number" class="there-points">
            <el-date-picker v-model="value" type="date" placeholder="选择日期" />
          </el-form-item>
          <el-form-item label="上传人" class="there-points">
            <el-input v-model="ruleform.number" disabled placeholder="请输入" />
          </el-form-item>
          <el-form-item label="备注" class="full-item">
            <el-input v-model="ruleform.remark" type="textarea" :rows="2" placeholder="请输入内容" />
          </el-form-item>
        </el-form>
        <div class="sub">
          <el-button type="primary">确定</el-button>
        </div>
      </div>
    </drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
export default {
  name: 'SiteAcceptance',
  components: { DragDialog },
  data() {
    return {
      count: 30,
      value: '2020-12-12',
      ruleform: {
        number: 111,
        available: false,
        name: '',
        serviceurl: '',
        servicerule: '',
        remark: '',
        money: ''
      },
      rules: {
        number: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        remark: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      num: 1,
      gridData: [
        { id: 1, img: '', size: '325k' }
      ],
      tableData: [
        {
          id: '1',
          number: '47835834',
          name: '组织缺少负责人',
          servicename: '服务名称',
          serviceurl: '服务路径',
          rule: '查看附件',
          avaApprovalState: '已确认验收'
        },
        {
          id: '2',
          number: '47835834',
          name: '组织缺少负责人',
          servicename: '服务名称',
          serviceurl: '服务路径',
          rule: '查看附件',
          avaApprovalState: '待验收'
        }
      ]
    }
  },
  methods: {
    changeTab(val) {
      if (val === 'acceptance') {
        this.$router.push('/purchasingManagement/siteAcceptance/siteAcceptanceNumber')
      } else if (val === 'purchase') {
        this.$router.push('/purchasingManagement/siteAcceptance/sitePurchaseOrder')
      } else if (val === 'supply') {
        this.$router.push('/purchasingManagement/siteAcceptance/siteSupplyOrder')
      }
    },
    handleChange() {

    },
    changeShow() {
      this.$refs.dialog.show = true
    }
  }
}
</script>

<style lang="less" scoped>
  .site-acceptance {
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
    .fujian {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      img {
        width: 16px;
        height: 16px;
        margin-right: 4px;
      }
      span {
        color:@primary;
        text-decoration: underline;
      }
    }
    .dictionary-form {
      display: flex;
      flex-wrap: wrap;
      .full-item {
        width: 100%;
      }
      .there-points {
        width: 50%;
        .el-form-item__content {
          display: flex;
          .is-disabled {
            width: 100%;
          }

        }
      }
    }
    .sub {
      width: 100%;
      text-align: right;
      margin: 10px 0;
    }
  }
</style>
