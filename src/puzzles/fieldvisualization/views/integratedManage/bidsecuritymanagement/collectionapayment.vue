
<template>
  <div class="collection-apayment">
    <div style="margin-bottom:20px;">
      <el-button class="back-btn" @click="$router.go(-1)"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
    <el-form label-width="90px" :rules="rules" :model="ruleform">
      <el-row>
        <el-col :span="24">
          <el-form-item label="项目名称" prop="rolename">
            <el-input v-model="ruleform.rolename" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="项目类型" prop="roletype">
            <el-select v-model="ruleform.roletype" placeholder="请选择" class="fill-name">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目归属" prop="roletype">
            <el-select v-model="ruleform.roletype" placeholder="请选择" class="fill-name">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="归属单位" prop="range">
            <el-input v-model="ruleform.rolename" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="招标单位" prop="type">
            <el-input v-model="ruleform.rolename" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="收招标公司未退金额" prop="remark">
            <el-input v-model="ruleform.remark" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收保证金未投金额" prop="remark">
            <el-input v-model="ruleform.remark" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="search">
      <div class="btn">
        <div>
          <el-button-group>
            <el-button type="primary" @click="addrow"><i class="iconfont icon-xinzeng1-copy" />新增</el-button>
            <el-button type="primary">修改</el-button>
            <el-button type="primary">删除</el-button>
            <el-button type="primary">审阅</el-button>
            <el-button type="primary">报销审阅</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <div>
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="index" label="序号" width="50" align="center" />
        <el-table-column prop="typename" align="center" label="收付款类型" />
        <el-table-column prop="category" label="收付款方式" align="center" />
        <el-table-column prop="downtime" label="金额(元)" align="center" />
        <el-table-column prop="downtime" label="收付款日期" align="center" width="150" />
        <el-table-column prop="rate" label="状态" align="center" />
      </el-table>
    </div>
    <drag-dialog ref="dialog" title="新增收付款" width="50%" height="60%">
      <add-collectionpayment />
    </drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import AddCollectionpayment from './components/addcollectionpayment'

export default {
  components: { DragDialog, AddCollectionpayment },
  data() {
    return {
      ruleform: {
        rolename: '',
        roletype: '',
        range: '',
        type: '',
        application: '',
        remark: ''
      },
      rules: {
        rolename: [{
          required: true,
          message: '请填写'
        }],
        roletype: [{
          required: true,
          message: '请选择'
        }],
        range: [{
          required: true,
          message: '请选择'
        }],
        type: [{
          required: true,
          message: '请选择'
        }],
        application: [{
          required: true,
          message: '请填写'
        }]
      },
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
      }]
    }
  },
  methods: {
    addrow() {
      this.$refs.dialog.show = true
    }
  }
}
</script>

<style lang="less">
	.collection-apayment {
		.fill-name {
			width: 100%;
		}
	}
</style>
