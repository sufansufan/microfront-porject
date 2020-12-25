<template>
  <div class="new-company-attendance">
    <el-form label-width="110px" :rules="rules" :model="ruleform">
      <el-form-item label="方案名称" prop="rolename">
        <el-input v-model="ruleform.rolename" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="方案适用组织" prop="roletype">
        <el-select v-model="value" placeholder="请选择" style="width:100%;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="排除人员" prop="roletype">
        <el-select v-model="value" placeholder="请选择" style="width:100%;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="班次" prop="roletype">
        <el-select v-model="value" placeholder="请选择" style="width:100%;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="设置工作日" prop="roletype">
        <el-radio-group v-model="radio" @change="setChange">
          <el-radio label="1">每天</el-radio>
          <el-radio label="2">周一至周五</el-radio>
          <el-radio label="3">自定义</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="setActive ==3 && setActive !== null">
        <el-form-item label="自定义工作日" prop="route">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="周日" />
            <el-checkbox label="周一" />
            <el-checkbox label="周二" />
            <el-checkbox label="周三" />
            <el-checkbox label="周四" />
            <el-checkbox label="周五" />
            <el-checkbox label="周六" />
          </el-checkbox-group>
        </el-form-item>
      </template>
      <el-form-item prop="range">
        <el-checkbox v-model="checked">法定节假日自动排休</el-checkbox>
      </el-form-item>
      <el-form-item label="特定工作日" prop="range">
        <el-button type="primary" icon="el-icon-plus" @click="onAdd" />
        <el-form-item
          v-for="(item,i) of items"
          :key="i"
          v-model="items[i]"
          prop="type"
          style="display:inline-block"
        >
          <el-date-picker v-model="ruleform.rolename" type="date" placeholder="选择日期" />
          <el-button type="primary" icon="el-icon-delete" />
        </el-form-item>
      </el-form-item>
      <el-form-item label="特定休息日" prop="range">
        <el-button type="primary" icon="el-icon-plus" @click="onAdd" />
        <el-form-item
          v-for="(item,i) of items"
          :key="i"
          v-model="items[i]"
          prop="type"
          style="display:inline-block"
        >
          <el-date-picker v-model="ruleform.rolename" type="date" placeholder="选择日期" />
          <el-button type="primary" icon="el-icon-delete" />
        </el-form-item>
      </el-form-item>
      <el-form-item prop="type">
        <el-button type="primary">预览方案</el-button>
      </el-form-item>
    </el-form>
    <div style="text-align:center;">
      <el-button type="primary">保存</el-button>
      <el-button class="cancel-btn" type="primary" @click="$emit('changeTabConent', 'companyplan', 'default')">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: '',
      items: [],
      checkList: [],
      ruleform: {
        rolename: '',
        roletype: '',
        range: '',
        type: '',
        application: '',
        remark: ''
      },
      rules: {
        rolename: [
          {
            required: true,
            message: '请填写'
          }
        ],
        roletype: [
          {
            required: true,
            message: '请选择'
          }
        ],
        range: [
          {
            required: true,
            message: '请选择'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择'
          }
        ],
        application: [
          {
            required: true,
            message: '请填写'
          }
        ]
      },
      setActive: null,
      checked: true
    }
  },
  methods: {
    setChange(val) {
      this.setActive = val
    },
    onAdd() {
      this.items.push('')
    }
  }
}
</script>

<style lang="less">
</style>
