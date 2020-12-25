<template>
  <div class="cooperative-main">
    <keep-alive :include="keepAliveInclude">
      <left-to-right-mould>
        <div slot="left" v-loading="loading" class="left">
          <company-menu :menu-data="cooperateunitType" />
        </div>
        <div slot="right">
          <router-view :key="key" />
        </div>
      </left-to-right-mould>
    </keep-alive>
  </div>
</template>

<script>
import LeftToRightMould from '@frames/dashboard/components/LeftToRightMould'
import { mapGetters } from 'vuex'
import CompanyMenu from '@frames/dashboard/components/CompanyMenu'
import { getCompany } from '@core/api/organization'
import { queryParent } from '@core/utils'
import keepAlive from '@core/mixins/keepAlive'
export default {
  name: 'CooperativeEnterprise',
  components: {
    LeftToRightMould,
    CompanyMenu
  },
  mixins: [keepAlive],
  data() {
    return {
      mainBusiness: '',
      cooperateunitType: [],
      loading: true,
      includeData: []
    }
  },
  computed: {
    ...mapGetters(['constant']),
    key() {
      return this.$route.path
    }
  },
  created() {
    this.$store.dispatch('getConstant', ['jzzs_cooperateunit', 'clgy_cooperateunit', 'qtqy_cooperateunit']).then(() => {
      this.getCompany()
    })
  },
  methods: {
    getCompany() {
      this.loading = true
      getCompany().then(({ data }) => {
        this.loading = false
        this.mainBusiness = data.company.mainBusiness
        if (this.mainBusiness === 'CLGY') {
          this.cooperateunitType = this.constant.clgy_cooperateunit
        } else if (this.mainBusiness === 'JZZS') {
          this.cooperateunitType = this.constant.jzzs_cooperateunit
        } else {
          this.cooperateunitType = this.constant.qtqy_cooperateunit
        }
        this.cooperateunitType.map((item, index) => {
          if (item.childs) {
            item.childs.map((v, i) => {
              var code = queryParent(this.cooperateunitType, v.code, 'code', 'childs').toString()
              switch (v.code) {
                case 'CLGY':
                  v.url = '/cooperativeEnterprise/materialSupply?code=' + code
                  break
                case 'LWFB':
                  v.url = '/cooperativeEnterprise/laborSubcontract?code=' + code
                  break
                case 'JZZS':
                  v.url = '/cooperativeEnterprise/laborSubcontract?code=' + code
                  break
                default:
                  v.url = '/cooperativeEnterprise/otherEnterprises?code=' + code + '&index=' + i
                  break
              }
              return v
            })
            item.url = String(index)
          }
        })
        this.$store.commit('SET_COOPERMENUURL', this.cooperateunitType[0].childs[0].url)
        this.$store.commit('SET_COOPERMENUNAME', this.cooperateunitType[0].childs[0].name)
      })
    }
  }
}
</script>

<style lang="less" >
.cooperative-main {
  display: flex;
  .left {
    height: calc(100vh - 120px);
    overflow-y: auto;
    .aside-menu{
      .el-submenu__title{
          background-color:rgba(10, 76, 138, 1);
          color:#fff;
          height:40px;
          line-height: 40px;
      }

    }
  }
}
</style>
