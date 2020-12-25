<template>
  <div class="build-add">
    <jdy-title-name v-if="addTeam && action===1" :title="teamOrGroupName" />
    <jdy-title-name v-if="addTeam && action===2" :title="leaderName" />
    <jdy-title-name v-if="addGroup && action===1" :title="teamOrGroupName" />
    <jdy-title-name v-if="addGroup && action===2" :title="leaderName" />
    <jdy-steps v-if="addTeam" :action="action">
      <jdy-step title="施工队信息" />
      <jdy-step title="施工队长基本信息" />
      <template v-if="workType">
        <jdy-step title="施工队长持证信息" />
      </template>
    </jdy-steps>
    <jdy-steps v-if="addGroup" :action="action">
      <jdy-step title="施工班组信息" />
      <jdy-step title="施工班组长基本信息" />
      <template v-if="workType">
        <jdy-step title="施工班组长持证信息" />
      </template>
    </jdy-steps>
    <keep-alive>
      <template v-if="action===0">
        <team-info ref="teamInfo" :disabled="false" :res-data="resData" :teamogroup-id="teamogroupId" @childEvent="parentEvent" />
      </template>
      <template v-if="action===1">
        <base-info ref="baseInfo" :disabled="false" :res-data="resData" :type-name="typeName" :optimistic-lock="optimisticLock" :baseinfo-id="baseinfoId" @childInfo="parentEvent" @childWork="parentWork" />
      </template>
      <template v-if="action===2 && workType">
        <certificate-info ref="contractInfo" :disabled="false" :baseinfo-id="baseinfoId" />
      </template>
    </keep-alive>
    <div class="steps-action">
      <template v-if="action===0">
        <el-button
          type="primary"
          @click="saveAndNext('save')"
        >保存</el-button>
        <el-button
          type="primary"
          @click="saveAndNext('down')"
        > 下一步</el-button>
        <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
      </template>
      <template v-if="action===1">
        <el-button type="primary" @click="config('reduce')">上一步</el-button>
        <el-button type="primary" @click="saveAndNext('save')">保存</el-button>
        <el-button v-if="workType" type="primary" @click="saveAndNext('down')">下一步</el-button>
        <el-button v-if="!workType" type="primary" @click="saveAndNext('finish')">完成</el-button>
        <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
      </template>

      <template v-if="action===2 && workType">
        <el-button type="primary" @click="config('reduce')">上一步</el-button>
        <el-button type="primary" @click="$router.go(-1)">完成</el-button>
      </template>

    </div>
  </div>
</template>

<script>
import TeamInfo from './buildEdit'
import BaseInfo from './components/BaseInfo'
import CertificateInfo from './components/CertificateInfo'
export default {
  components: {
    TeamInfo,
    BaseInfo,
    CertificateInfo
  },
  data() {
    return {
      teamName: '',
      titleName: '',
      action: 0,
      workType: false,
      resData: {},
      teamogroupId: '',
      baseinfoId: '',
      optimisticLock: '',
      typeName: '',
      name: '',
      teamOrGroupName: '',
      leaderName: '',
      groupName: '' // 施工队/班组名称

    }
  },
  computed: {
    addTeam() {
      return this.$route.query.typePage === 'team'
    },
    addGroup() {
      return this.$route.query.typePage === 'group'
    }
  },
  created() {
  },
  methods: {
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
    saveAndNext(type, isNext) {
      const { typePage, teamName } = this.$route.query
      if (this.action === 0) {
        this.$refs.teamInfo.addOrEditTeamInfo().then(res => {
          const { name, id } = res
          this.groupName = name
          this.teamOrGroupName = typePage === 'team' ? name : teamName + '/' + name
          this.teamogroupId = id
          this.resData = res
          if (type === 'down') {
            this.config('add')
          }
        })
      } else if (this.action === 1) {
        this.typeName = type
        this.$refs.baseInfo.addOrEditBaseInfo().then(res => {
          const { name, id, optimisticLock } = res
          this.baseinfoId = id
          this.optimisticLock = optimisticLock
          this.leaderName = typePage === 'team' ? this.groupName + '(' + name + ')' : teamName + '/' + this.groupName + '(' + name + ')'
          if (type === 'down') {
            this.config('add')
          }
        })
      }
    },
    parentEvent(data) {
      if (this.action === 0) {
        this.teamName = data
        this.titleName = this.teamName
      } else if (this.action === 1) {
        this.titleName = this.teamName + '(' + data + ')'
      }
    },
    parentWork(data) {
      if (data[0] === 's') {
        this.workType = true
      } else {
        this.workType = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.build-add {
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
