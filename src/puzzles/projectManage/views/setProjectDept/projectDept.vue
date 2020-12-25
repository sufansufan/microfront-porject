<template>
  <div class="project-dept">
    <div class="title two-ellipsis">
      {{ titleName }}
    </div>
    <el-tabs
      v-model="activeName"
      type="card"
      class="one-card-tabs"
      @tab-click="handleClick"
    >
      <template v-for="tab in tabList">
        <el-tab-pane
          v-if="tab.show && tabPower(tab.power)"
          :key="tab.name"
          :label="tab.label"
          :name="tab.name"
        >
          <div class="project-com">
            <component :is="tab.name" :options="componentOptions" @getTitleName="getTitleName" />
          </div>
        </el-tab-pane>
      </template>
      <el-tab-pane name="last">
        <span slot="label"><i class="iconfont icon-fanhui-copy" /> 返回</span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tabs from '@core/mixins/tabs'
import { getSessionStorage } from '@core/utils/auth'
export default {
  components: {
    projectInfo: () => import('./components/ProjectInfo'),
    projectPersonnel: () => import('./components/ProjectPersonnel'),
    EngineerInfo: () => import('@puzzles/contractManage/views/components/EngineerInfo')
  },
  mixins: [tabs],
  data(vm) {
    return {
      formData: {},
      componentOptions: {
        type: 'details'
      },
      tabList: [
        {
          label: '合同信息',
          name: 'EngineerInfo',
          power: 'setProjectDept:contractInfo',
          show: this.$route.query.type === 'details'
        },
        {
          label: '项目信息',
          name: 'projectInfo',
          show: true,
          power: 'setProjectDept:projectInfo'
        },
        {
          label: '项目部成员',
          name: 'projectPersonnel',
          show: true,
          power: 'setProjectDept:projectNumber'
        }
      ],
      activeName: this.$route.query.type === 'details' ? 'projectPersonnel' : 'projectInfo',
      titleName: ''
    }
  },
  created() {
    const { contactId, name } = this.$route.query
    this.componentOptions = {
      ...this.componentOptions,
      id: contactId,
      row: { id: contactId }
    }
    if (name) this.activeName = name
  },
  methods: {
    tabPower(val) {
      const powerList = JSON.parse(JSON.stringify(getSessionStorage('button')))
      return powerList.includes(val)
    },
    getTitleName(name) {
      this.titleName = name
    }
  }
}
</script>

<style lang="less" scoped>
.project-dept {
  padding: 10px;
  .project-com {
    height: calc(100vh - 230px);
    overflow-y: auto;
  }
  .title {
    width: 80%;
    margin: 0 auto;
    margin-bottom: 10px;
    line-height: 30px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
