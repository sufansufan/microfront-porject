<template>
  <div class="home-box">
    <div class="left">
      <user-info :user-info="userInfo" />
      <message-notify />
    </div>
    <div class="right">
      <div class="right-top-box">
        <urgent-task />
        <application />
      </div>
      <set-up />
    </div>
  </div>
</template>

<script>
import UserInfo from './components/UserInfo'
import MessageNotify from './components/MessageNotify'
import UrgentTask from './components/UrgentTask'
import Application from './components/Application'
import SetUp from './components/SetUp'
import { getUserInfo } from '@core/api/personnel'
import { setSessionStorage } from '@core/utils/auth'
import { judgeTitle } from '@core/utils'
export default {
  components: {
    UserInfo,
    MessageNotify,
    UrgentTask,
    Application,
    SetUp
  },
  data() {
    return {
      userInfo: {
        baseInfo: {},
        partTimeJob: [],
        projectInfo: []
      },
      activeName: 'first'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getUserInfo().then(({ data }) => {
        const { personnelDTO, personnelPostDTOs, probjects, organizationDTO, mainPostDTO, mainOrgDTO, mainOrg, attributionDTO } = data
        this.userInfo = {
          baseInfo: {
            id: personnelDTO.id,
            name: personnelDTO.name,
            orgName: organizationDTO ? organizationDTO.orgName : '',
            postName: mainPostDTO.postName,
            postId: mainPostDTO.id,
            mainOrg: mainOrg
          },
          partTimeJobInfo: personnelPostDTOs || [],
          projectInfo: probjects || []
        }
        const navInfo = {
          orgName: organizationDTO ? organizationDTO.orgName : '',
          title: judgeTitle(organizationDTO),
          mainBusiness: organizationDTO ? organizationDTO.mainBusiness : '',
          titleImg: organizationDTO ? organizationDTO.annex : ''
        }
        setSessionStorage('orgId', organizationDTO ? organizationDTO.id : '')
        setSessionStorage('orgName', organizationDTO ? organizationDTO.orgName : '')
        setSessionStorage('userName', personnelDTO.name)
        setSessionStorage('userId', personnelDTO.id)
        setSessionStorage('personnel', JSON.stringify(personnelDTO))
        setSessionStorage('organization', JSON.stringify(organizationDTO))
        setSessionStorage('creditCode', organizationDTO ? organizationDTO.creditCode : '')
        setSessionStorage('mainOrgId', attributionDTO ? attributionDTO.id : '')
        setSessionStorage('rootOrgId', mainOrgDTO ? mainOrgDTO.id : '')
        this.$store.dispatch('setNavInfo', navInfo)
      })
      this.$store.dispatch('generatePower')
    }
  }

}
</script>

<style lang="less" scoped>
.home-box {
  display: flex;
  padding-top: 20px;
  & > .left {
    width: 320px;
  }
  .right {
    width: calc(100vw - 320px);
    height: calc(100vh - 160px);
    overflow-y: auto;
    padding: 0 10px 20px 10px;
    .right-top-box {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
