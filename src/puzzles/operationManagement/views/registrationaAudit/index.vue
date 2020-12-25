<template>
  <div class="registrationa-audit">
    <div class="search">
      <div class="select">
        <div class="fill-name">
          <span>企业编号</span>
          <el-input v-model="input" placeholder="请输入" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>企业名称</span>
          <el-input v-model="input" placeholder="请输入" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>注册日期</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="起始日期"
            end-placeholder="截止日期"
          />
        </div>
        <div class="fill-name">
          <span>信用代码</span>
          <el-input v-model="input" placeholder="请输入" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>联系人</span>
          <el-input v-model="input" placeholder="请输入" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>手机号</span>
          <el-input v-model="input" placeholder="请输入" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>身份证</span>
          <el-input v-model="input" placeholder="请输入" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>状态</span>
          <el-select v-model="value" placeholder="请选择状态" class="fill-line">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="fill-name">
          <span>所在地</span>
          <el-select v-model="value" placeholder="请选择所在地" class="fill-line">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="fill-name">
          <span>公司类型</span>
          <el-select v-model="value" placeholder="请选择公司类型" class="fill-line">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="fill-name">
          <span>审核人</span>
          <el-input v-model="input" placeholder="请输入" class="fill-line" />
        </div>
        <div class="fill-name">
          <span>审核日期</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="起始日期"
            end-placeholder="截止日期"
          />
        </div>
        <div style="margin-right:0;">
          <div>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
          </div>
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button-group>
            <el-button type="primary" @click="passClick('1')">审核通过</el-button>
            <el-button type="primary" @click="passClick('2')">不通过</el-button>
          </el-button-group>
        </div>
        <div>
          <el-button-group>
            <el-button type="primary" @click="changeShow">设置注册提醒手机号码</el-button>
            <el-button type="primary" @click="setUpShow">设置考勤端口</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column type="selection" width="40" fixed align="center" />
        <el-table-column prop="id" label="序号" width="50" fixed align="center" />
        <el-table-column prop="serviceurl" label="状态" width="120" align="center" sortable>
          <template slot-scope="scope">
            <el-button type="warning" plain>{{ scope.row.serviceurl }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="企业编号" width="120" align="center" sortable />
        <el-table-column prop="id" label="企业名称" align="center" sortable />
        <el-table-column prop="name" label="统一社会信用管理" align="center" sortable />
        <el-table-column prop="name" label="公司类型" align="center" width="100" sortable />
        <el-table-column prop="id" label="联系人" align="center" sortable />
        <el-table-column prop="name" label="手机号码" align="center" sortable />
        <el-table-column prop="name" label="管理密码" align="center" width="100" />
        <el-table-column prop="id" label="身份证" align="center" sortable />
        <el-table-column prop="name" label="所在地" align="center" sortable />
        <el-table-column prop="name" label="邮箱" align="center" width="100" />
        <el-table-column prop="rule" label="营业执照" width="100" align="center">
          <template slot-scope="scope">
            <div class="fujian">
              <img src="http://a4.att.hudong.com/21/09/01200000026352136359091694357.jpg" alt="">
              <span>{{ scope.row.rule }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="rule" label="法人身份证" width="100" align="center">
          <template slot-scope="scope">
            <div class="fujian">
              <img src="http://a4.att.hudong.com/21/09/01200000026352136359091694357.jpg" alt="">
              <span>{{ scope.row.rule }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="rule" label="注册时间" align="right" header-align="center" sortable />
        <el-table-column prop="rule" label="注册IP地址" align="center" />
        <el-table-column prop="rule" label="审核人" align="center" sortable />
        <el-table-column prop="rule" label="审核时间" align="center" sortable />
        <el-table-column prop="name" label="审核说明" align="center" width="100" />

        <el-table-column prop="name" label="部署时间" align="center" width="100" />
        <el-table-column prop="name" label="考勤机端口" align="center" width="100" />
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
    <drag-dialog ref="dialog" :title="title" width="60%" height="70%">
      <div v-if="title==='设置注册提醒人员手机号码'">
        <div style="font-size: 12px;line-height: 36px;margin-top: 16px;">请输入要接收提醒的手机号码，多个手机号以英文逗号隔开</div>
        <el-input type="textarea" :rows="4" placeholder="请输入内容" />
        <div style="width:100%;margin-top:20px;text-align:right;"><el-button type="primary" icon="el-icon-set-up">确认</el-button></div>
      </div>
      <div v-if="title==='设置考勤端口'">
        <el-form :rules="rules" :model="ruleform" label-width="150px" class="dictionary-form">
          <el-form-item label="当前企业" prop="number" class="there-points">
            <el-input v-model="ruleform.number" disabled placeholder="请输入" />
          </el-form-item>
          <el-form-item label="考勤端口" prop="number" class="there-points">
            <el-input v-model="ruleform.number" disabled placeholder="请输入" />
          </el-form-item>
        </el-form>
      </div>
      <div v-if="title==='企业注册审核'&&active===true">
        <el-form :rules="rules" :model="ruleform" label-width="150px" class="dictionary-form">
          <el-form-item label="审核说明" prop="number" class="ful-points">
            <el-input v-model="ruleform.number" type="textarea" :rows="4" placeholder="请输入内容" />
          </el-form-item>
        </el-form>
        <div style="width:100%;margin-top:20px;text-align:right;">
          <el-button class="cancel-btn">取消</el-button>
          <el-button type="primary" icon="el-icon-set-up">确认</el-button>
        </div>
      </div>
      <div v-if="title==='企业注册审核'&&active===false">
        <el-form :rules="rules" :model="ruleform" label-width="150px" class="dictionary-form">
          <el-form-item label="审核说明" prop="money" class="ful-points">
            <el-input v-model="ruleform.money" type="textarea" :rows="4" placeholder="请输入内容" />
          </el-form-item>
          <el-form-item label="" prop="" class="ful-points">
            <el-checkbox v-model="checked">发送短信通知注册人</el-checkbox>
          </el-form-item>

        </el-form>
        <div style="width:100%;margin-top:20px;text-align:right;">
          <el-button class="cancel-btn">取消</el-button>
          <el-button type="primary" icon="el-icon-set-up">确认</el-button>
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
      checked: true,
      ruleform: {
        number: 111,
        available: false,
        name: '',
        serviceurl: '',
        servicerule: '',
        remark: '',
        money: '111'
      },
      rules: {
        money: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      title: '设置注册提醒人员手机号码',
      num: 1,
      tableData: [
        {
          id: '1',
          number: '47835834',
          name: '组织缺少负责人',
          servicename: '服务名称',
          serviceurl: '未审核',
          rule: '查看',
          avaApprovalState: '已确认验收'
        },
        {
          id: '2',
          number: '47835834',
          name: '组织缺少负责人',
          servicename: '服务名称',
          serviceurl: '未审核',
          rule: '查看',
          avaApprovalState: '待验收'
        }
      ],
      active: true
    }
  },
  methods: {
    changeShow() {
      this.title = '设置注册提醒人员手机号码'
      this.$refs.dialog.show = true
    },
    setUpShow() {
      this.title = '设置考勤端口'
      this.$refs.dialog.show = true
    },
    passClick(val) {
      if (val === '1') {
        this.title = '企业注册审核'
        this.active = true
        this.$refs.dialog.show = true
      } else {
        this.active = false
        this.title = '企业注册审核'
        this.$refs.dialog.show = true
      }
    },
    handleChange() {

    }
  }
}
</script>

<style lang="less" scoped>
  .registrationa-audit {
    padding:20px;
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
