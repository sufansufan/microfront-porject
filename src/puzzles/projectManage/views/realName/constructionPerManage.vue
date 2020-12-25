<template>
  <div class="construction-per-manage">
    <jdy-title-name :title="getTitle" />
    <el-tabs
      v-model="activeName"
      type="card"
      class="one-card-tabs is-padding"
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
            <template v-if="isComponent">
              <component :is="tab.name" :options="componentOptions" @changeTabConent="changeTabConent" />
            </template>
            <template v-else>
              <component :is="compoment" :row-date="rowDate" :type-page="typePage" @changeTabConent="changeTabConent" />
            </template>
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
import { getConstructionMemberCount } from '@core/api/projectManage/projectmanager'
export default {
  components: {
    joinApply: () => import('./constructionPerManage/joinApply'),
    dataValidation: () => import('./constructionPerManage/dataValidation'),
    buildPerson: () => import('./constructionPerManage/buildPerson'),
    buildpersonAdd: () => import('./constructionPerManage/buildpersonAdd'),
    buildpersonEdit: () => import('./constructionPerManage/buildpersonEdit'),
    buildpersonDetails: () => import('./constructionPerManage/buildpersonDetails'),
    returnConfirmation: () => import('./constructionPerManage/returnConfirmation'),
    ApprovaInfo: () => import('./constructionPerManage/components/ApprovaInfo'),
    ValidationInfo: () => import('./constructionPerManage/components/ValidationInfo'),
    BaseInfo: () => import('./constructionPerManage/components/BaseInfo')

  },
  mixins: [tabs],
  data(vm) {
    return {
      isComponent: true,
      rowDate: {},
      typePage: '',
      compoment: '',
      componentOptions: {
        type: 'details'
      },
      tabList: [
        {
          label: '加入申请',
          name: 'joinApply',
          power: 'constructionPerManage:joinApply',
          show: true
        },
        {
          label: '资料验证',
          name: 'dataValidation',
          power: 'constructionPerManage:dataValidation',
          show: true
        },
        {
          label: '施工人员',
          name: 'buildPerson',
          show: true,
          power: 'constructionPerManage:buildPerson'
        },
        {
          label: '返场确认',
          name: 'returnConfirmation',
          show: true,
          power: 'constructionPerManage:returnConfirmation'
        }
      ],
      activeName: 'buildPerson',
      joinApplyNum: '',
      dataVerifyNum: '',
      returnConfirmNum: ''

    }
  },
  computed: {
    getTitle() {
      return this.$route.query.projectName
    }
  },
  created() {
    const { taskType } = this.$route.query
    if (taskType === '返场确认') {
      this.activeName = 'returnConfirmation'
    } else if (taskType === '进场资料验证') {
      this.activeName = 'dataValidation'
    } else if (taskType === '加入申请') {
      this.activeName = 'joinApply'
    }
    this.getCount()
  },
  methods: {
    tabPower(val) {
      const powerList = JSON.parse(JSON.stringify(getSessionStorage('button')))
      return powerList.includes(val)
    },
    getCount() {
      const { projectId } = this.$route.query
      getConstructionMemberCount(projectId).then(({ data: { confirmNum, unSubmitNum, verifyNum }}) => {
        if (confirmNum || unSubmitNum || verifyNum) {
          unSubmitNum !== 0 ? this.tabList[0].label = `加入申请(${unSubmitNum})` : '加入申请'
          verifyNum !== 0 ? this.tabList[1].label = `资料验证(${verifyNum})` : '资料验证'
          confirmNum !== 0 ? this.tabList[3].label = `返场确认(${confirmNum})` : '返场确认'
        }
      })
    },
    handleClick(tab) {
      this.isComponent = true
      if (tab.name === 'last') {
        this.$router.go(-1)
      }
    },
    /*
    compoment 页面
    typePage 查看
    data 行数据
    */
    changeTabConent(compoment, typePage, data) {
      if (this.tabName) {
        this.isComponent = true
      } else {
        this.isComponent = false
        this.compoment = compoment
        this.rowDate = data
        this.typePage = typePage
      }
    }
  }
}
</script>

<style lang="less" scoped>
.construction-per-manage{
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
