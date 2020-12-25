<template>
  <div class="org-manage-add">
    <template v-if="Category==='SubCompany'|| Category==='ProjectDepartment'|| Category==='Company'">
      <jdy-steps :action="action">
        <jdy-step title="基本信息" />
        <jdy-step title="资质信息" />
      </jdy-steps>
    </template>
    <template v-if="action===0">
      <base-info ref="baseInfo" :disabled="false" :personnel-id="personnelId" @OrgCategory="OrgCategory" />
    </template>
    <template v-if="action===1">
      <qualification-info :disabled="false" :org-name="orgName" :personnel-id="personnelId" />
    </template>
    <div class="steps-action">
      <template v-if="action===0">
        <el-button type="primary" @click="saveAndNext('save')">保存</el-button>
        <template v-if="Category==='SubCompany'|| Category==='ProjectDepartment'|| Category==='Company'">
          <el-button v-if="department" type="primary" @click="saveAndNext('down')">下一步</el-button>
        </template>
      </template>
      <template v-if="action===1">
        <el-button type="primary" @click="config('reduce')">上一步</el-button>
        <el-button type="primary" @click="fishSave">完成</el-button>
      </template>
      <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>

<script>

import BaseInfo from './components/BaseInfo'
import QualificationInfo from './components/QualificationInfo'
export default {
  name: 'OrgManageAdd',
  components: {
    BaseInfo,
    QualificationInfo
  },
  data() {
    return {
      action: 0,
      personnelId: '',
      orgName: '',
      Category: '',
      department: true

    }
  },
  created() {
  },
  methods: {
    OrgCategory(data) {
      this.Category = data
    },
    config(type) {
      switch (type) {
        case 'add':
          this.action += 1
          break
        case 'reduce':
          this.action -= 1
          break
        default:
          break
      }
    },
    saveAndNext(type) {
      this.$refs.baseInfo.addOrEdit().then(res => {
        this.personnelId = res.id
        this.orgName = res.orgName
        if (type === 'down') {
          this.config('add')
        }
      })
    },
    // $router.replace({ path: '/orgStructure/orgManage' })
    fishSave() {
      this.$message.success('新增成功')
      this.$router.replace({ path: '/orgStructure/orgManage' })
    }
  }
}
</script>

<style lang="less" scoped>
.org-manage-add {
  padding: 10px;
  height: calc(100vh - 140px);
  overflow-y: auto;
  .steps-action {
    display: flex;
    justify-content: center;
    margin: 30px auto;
  }
}
</style>
