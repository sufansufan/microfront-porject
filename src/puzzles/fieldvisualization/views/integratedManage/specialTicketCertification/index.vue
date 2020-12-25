<template>
  <div class="special-ticket-certification">
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>发票编号</span>
          <el-input v-model="input" placeholder="请输入" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>开票日期</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div class="fill-name">
          <span>是否认证</span>
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
        <div class="fill-name">
          <span>认证日期</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div class="fill-name">
          <span>开票单位</span>
          <el-input v-model="input" placeholder="请输入" class="fill-line" />
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button-group>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
            <el-button type="primary" icon="el-icon-upload"><i class="iconfont icon-daochu-copy" /> 导出</el-button>
          </el-button-group>
        </div>
        <div>
          <el-button type="primary">批量认证</el-button>
        </div>
      </div>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%;">
        <el-table-column prop="ids" label="序号" width="50" align="center" />
        <el-table-column prop="name" label="开票日期" sortable width="100">
          <template slot-scope="scope">
            <div class="link-a" @click="changeBox(scope.row.name)">{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="amount1" label="开票税率" align="right" header-align="center" />
        <el-table-column prop="amount2" label="发票编号" align="center" header-align="center" />
        <el-table-column prop="amount3" label="发票归类" align="center" header-align="center" />
        <el-table-column prop="amount1" label="收票日期" align="center" header-align="center" />
        <el-table-column prop="amount1" label="发票金额" align="right" header-align="center" />
        <el-table-column prop="amount2" label="票据张数" align="center" header-align="center" />
        <el-table-column prop="amount3" label="发票税金" align="right" header-align="center" />
        <el-table-column prop="amount1" label="开票单位" align="center" header-align="center" />
        <el-table-column prop="amount1" label="合同编号" align="center" header-align="center" />
        <el-table-column prop="amount2" label="合同名称" align="center" header-align="center" />
        <el-table-column prop="amount3" label="是否认证" align="center" sortable header-align="center" width="100" />
        <el-table-column prop="amount1" label="认证日期" align="center" header-align="center" />
        <el-table-column prop="amount1" label="是否进项转出" align="center" header-align="center" />
        <el-table-column prop="amount1" label="转出日期" align="center" header-align="center" />
        <el-table-column prop="amount2" label="是否抵扣" align="center" header-align="center" />
        <el-table-column prop="amount3" label="抵扣日期" align="center" header-align="center" />
        <el-table-column prop="operation" label="操作" align="center" header-align="center">
          <template slot-scope="scope">
            <div class="link-a" @click="changeBox(scope.row.operation)">{{ scope.row.operation }}</div>
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
    <drag-dialog ref="dialog" :title="title" width="70%" height="80%">
      <el-form v-if="isBox" :rules="rules" :model="ruleform" label-width="130px" class="dictionary-form">
        <el-form-item label="收票日期">
          <el-date-picker v-model="value1" type="date" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="开票日期">
          <el-date-picker v-model="value1" type="date" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="发票编号">
          <el-input v-model="ruleform.read" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="发票归类">
          <el-select v-model="number" placeholder="请选择">
            <el-option label="区域一" value="shanghai" />
          </el-select>
        </el-form-item>
        <el-form-item label="发票金额（元）">
          <el-input v-model="ruleform.read" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="发票无税金额（元）">
          <el-input v-model="ruleform.read" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="发票税率（%）">
          <el-input v-model="ruleform.read" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="发票税金（元）">
          <el-input v-model="ruleform.read" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="发票代码">
          <el-input v-model="ruleform.read" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="销方纳税人识别号">
          <el-input v-model="ruleform.read" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="认证日期">
          <el-date-picker v-model="value1" type="date" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="开票单位">
          <el-input v-model="ruleform.read" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="认证说明" prop="remark" class="full-item">
          <el-input v-model="ruleform.remark" type="textarea" :rows="2" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="录入人员">
          <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="录入时间">
          <el-date-picker v-model="value1" disabled type="date" placeholder="选择日期" />
        </el-form-item>
      </el-form>
      <el-form v-if="!isBox" :rules="rules" :model="ruleform" label-width="130px" class="dictionary-form">
        <el-form-item label="收票日期">
          <el-date-picker v-model="value1" type="date" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="开票日期">
          <el-date-picker v-model="value1" type="date" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="发票编号">
          <el-input v-model="ruleform.read" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="发票归类">
          <el-select v-model="number" placeholder="请选择">
            <el-option label="区域一" value="shanghai" />
          </el-select>
        </el-form-item>
        <el-form-item label="发票金额（元）">
          <el-input v-model="ruleform.read" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="发票无税金额（元）">
          <el-input v-model="ruleform.read" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="发票税率（%）">
          <el-input v-model="ruleform.read" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="发票税金（元）">
          <el-input v-model="ruleform.read" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="发票代码">
          <el-input v-model="ruleform.read" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="销方纳税人识别号">
          <el-input v-model="ruleform.read" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="认证日期" prop="name">
          <el-date-picker v-model="ruleform.name" type="date" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="开票单位">
          <el-input v-model="ruleform.read" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="认证说明" class="full-item">
          <el-input v-model="ruleform.remark" type="textarea" :rows="2" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="录入人员">
          <el-input v-model="ruleform.read" disabled="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="录入时间">
          <el-date-picker v-model="value1" disabled type="date" placeholder="选择日期" />
        </el-form-item>
        <div class="btnadd">
          <el-button type="primary" icon="el-icon-set-up">确定</el-button>
        </div>
      </el-form>
    </drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
export default {
  components: { DragDialog },
  data() {
    return {
      count: 30,
      title: '浏览页面',
      isBox: true,
      ruleform: {
        number: 111,
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      tableData: [{
        ids: '1',
        id: '12987122',
        name: '一般计税',
        amount1: '234',
        amount2: '3.2',
        amount3: 10,
        operation: '认证'
      }, {
        ids: '2',
        id: '12987123',
        name: '简易计税',
        amount1: '165',
        amount2: '4.43',
        amount3: 12,
        operation: '认证'
      }, {
        ids: '3',
        id: '12987124',
        name: '一般计税',
        amount1: '324',
        amount2: '1.9',
        amount3: 9,
        operation: '认证'
      }, {
        ids: '4',
        id: '12987125',
        name: '一般计税',
        amount1: '621',
        amount2: '2.2',
        amount3: 17,
        operation: '认证'
      }]
    }
  },
  methods: {
    changeBox(val) {
      if (val === '认证') {
        this.title = '认证页面'
        this.isBox = false
      } else {
        this.title = '浏览页面'
        this.isBox = true
      }
      this.$refs.dialog.show = true
    }
  }
}
</script>

<style lang="less" scope>
  .special-ticket-certification {
    .search>.select{
      .fill-name {
        width: 30%;
        .fill-line {
          width: 100%;
        }
        span {
          text-align: right;
        }
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
      .full-item {
        width: 100%;
      }
    }
    .btnadd {
      width: 100%;
      text-align: right;
    }
   .link-a {
      color:@primary;
      cursor: pointer;
    }
    .form-top{
      margin-top: 20px;
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
