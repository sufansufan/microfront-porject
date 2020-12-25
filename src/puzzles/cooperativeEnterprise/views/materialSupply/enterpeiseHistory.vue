<template>
  <div class="enterpeise-history">
    <div>
      <el-tabs v-model="activeName" type="card" class="one-card-tabs is-padding" @tab-click="handleClick">
        <el-tab-pane label="我通知合作企业的" name="my" />
        <el-tab-pane label="合作企业通知我的" name="his" />
        <el-tab-pane name="last">
          <span slot="label"><i class="iconfont icon-fanhui-copy" />返回</span>
        </el-tab-pane>
        <I-inform-you ref="list" :information-code="informationCode" :organization-id="organizationId" :my-information-code="myInformationCode" :hisorganization-id="hisorganizationId" />
      </el-tabs>
    </div>
  </div>
</template>

<script>
import IInformYou from '../components/IInformYou'
import tabs from '@core/mixins/tabs'

export default {
  name: 'EnterpeiseHistory',
  components: {
    IInformYou
  },
  mixins: [tabs],
  data() {
    return {
      activeName: 'my',
      informationCode: this.$route.query.informationCode,
      organizationId: this.$route.query.organizationId,
      myInformationCode: this.$route.query.myInformationCode,
      hisorganizationId: this.$route.query.hisorganizationId,
      companyId: this.$route.query.companyId
    }
  },
  methods: {
    handleClick(e) {
      this.$refs.list.fetchType = e.name
      if (e.label === '我通知合作企业的') {
        if (this.companyId === null || this.companyId === '') {
          return
        }
        this.$refs.list.fetchData()
      } else if (e.label === '合作企业通知我的') {
        this.$refs.list.fetchData()
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.enterpeise-history {
  padding: 10px;
  height: calc(100vh - 140px);
  overflow-y: auto;
  & > div {
    &:first-child {
      margin-bottom: 10px;
    }
  }
}
</style>
