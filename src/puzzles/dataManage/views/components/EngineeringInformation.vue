<template>
  <div class="engineering-information">
    <left-to-right-mould>
      <div slot="left">
        <div class="aside-menu">
          <el-menu
            default-active="1-4-1"
            class="el-menu-vertical-demo"
            background-color="#eeeeee"
            text-color="#000"
            active-text-color="#fff"
            router="true"
            @select="handleSelect"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location" />
                <span slot="title">王哲走项目管理流程</span>
              </template>
              <el-menu-item-group>
                <span slot="title">分组一</span>
                <el-menu-item index="1-1">工程信息</el-menu-item>
                <el-menu-item index="1-2">工程信息</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">工程信息</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <span slot="title">工程信息</span>
                <el-menu-item index="1-4-1">工程信息</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu" />
              <span slot="title">王哲走项目管理流程</span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
      <div slot="right">
        <div style="margin:10px 0;">
          <el-button-group>
            <el-button type="primary" @click="addEngineering">新建单位工程</el-button>
          </el-button-group>
        </div>
        <div>
          <el-table :data="tableData" row-key="id" border default-expand-all>
            <el-table-column prop="typename" align="center" label="信息项" sortable />
            <el-table-column prop="typename" align="center" label="内容" sortable />
          </el-table>
        </div>
      </div>
    </left-to-right-mould>
    <div style="text-align:right;margin:10px 0;">
      <el-button type="primary" @click="basicConfiguration">新建单位工程</el-button>
    </div>
    <drag-dialog ref="dialogOne" append="true" title="新建单位工程" width="40%" height="70%">
      <div>
        <el-form label-position="top" label-width="80px" :rules="rules" :model="formLabelAlign">
          <el-form-item label="已创建单位工程">
            <div style="font-size:14px;">王哲_走项目管理流程</div>
          </el-form-item>
          <el-form-item label="新单位工程名称" prop="name">
            <el-input v-model="formLabelAlign.name" type="textarea" rows="3" />
          </el-form-item>
          <el-form-item label="新单位工程编码" prop="name">
            <el-input v-model="formLabelAlign.name" type="textarea" rows="3" />
          </el-form-item>
          <el-form-item label="" prop="name">
            <el-checkbox v-model="checked">单位工程信息与工程信息一致</el-checkbox>
          </el-form-item>
        </el-form>
        <div style="margin:10px 0;text-align:right">
          <el-button type="primary">新建</el-button>
          <el-button>关闭</el-button>
        </div>
      </div>
    </drag-dialog>
  </div>
</template>

<script>
import LeftToRightMould from '@frames/dashboard/components/LeftToRightMould'
import DragDialog from '@frames/dashboard/components/Dialog'
export default {
  components: { LeftToRightMould, DragDialog },
  data() {
    return {
      value3: '',
      options: [],
      isCollapse: false,
      checked: true,
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
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    addEngineering() {
      this.$refs.dialogOne.show = true
    }
  }
}
</script>

<style lang="less" scoped>
  .engineering-information {
    .aside-menu {
      .el-menu-item.is-active {
        background: @primary !important;
      }
      .el-menu-item {
        height: 40px;
        line-height: 40px;
      }
    }
  }
</style>
