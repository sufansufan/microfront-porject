<template>
  <div class="breadcrumb-box">
    <crumb-box>
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item, index) in breadCrumbList" :key="index">
            <el-dropdown v-if="index === 0 && item.child.length" trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                {{ item.name }}<i v-if="item.child.length" class="iconfont icon-xiangxia" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(v, i) in item.child" :key="i" :command="v">{{ v.name }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span v-else @click="breadcrumbClick(item, index)">
              {{ item.name }}
            </span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="right">
        <weather />
        <div class="date">
          <i class="el-icon-date" />
          <span>{{ nowDate }}</span>
          <span> 星期{{ week }}</span>
        </div>
      </div>
    </crumb-box>
  </div>
</template>

<script>
import CrumbBox from '../../../components/CrumbBox'
import Weather from '../../../components/Weather'
import { parseTime } from '@core/utils/index'
import { getLocalStorage, setLocalStorage, removeSessionStorage, setSessionStorage } from '@core/utils/auth.js'
import { mapGetters } from 'vuex'
export default {
  components: {
    CrumbBox,
    Weather
  },
  data() {
    return {
      nowDate: '',
      breadCrumbList: [],
      week: ''
    }
  },
  computed: {
    ...mapGetters(['breadCrumb'])
  },
  watch: {
    '$route.path': {
      handler() {
        if (this.$route.path === '/home') {
          this.breadCrumbList = []
          this.$store.commit('SET_BREADAPPSTATUS', false)
          this.$store.commit('SET_BREADCRUMB', [])
          setLocalStorage('breadCrumb', [])
          setSessionStorage('applicationId', '')
        } else {
          if (this.breadCrumb.length) {
            this.breadCrumbList = this.breadCrumb
            setLocalStorage('breadCrumb', JSON.stringify(this.breadCrumbList))
          } else {
            const bread = [...JSON.parse(getLocalStorage('breadCrumb'))]
            this.breadCrumbList = bread
            this.$store.commit('SET_BREADCRUMB', bread)
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.nowDate = parseTime(new Date(), 'y-m-d')
    this.week = parseTime(new Date(), 'a')
  },
  methods: {
    handleCommand(data) {
      this.$store.dispatch('getBreadCrumb', { data, type: 'bread' })
      this.$router.replace({
        path: data.routeUrl.indexOf('/') === 0 ? data.routeUrl : '/' + data.routeUrl
      })
      removeSessionStorage('menuId')
    },
    breadcrumbClick(row, index) {
      if (this.breadCrumbList.length - 1 === index) return
      // console.log(row)
      this.$router.replace({
        path: row.routeUrl.indexOf('/') === 0 ? row.routeUrl : '/' + row.routeUrl,
        query: { ...row.query }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.breadcrumb-box {
  .right {
    display: flex;
    .date {
      margin-left: 10px;
    }
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #0a4c8a;
    font-weight: 600;
    .icon-xiangxia {
      font-size: 14px;
      color: #0a4c8a !important;
    }
  }
  .el-icon-arrow-down {
    color: #0a4c8a;
    font-weight: 600;
  }
}
</style>
<style lang="less">
.breadcrumb-box {
  .el-breadcrumb__inner.is-link {
    color: #0a4c8a;
  }
  .el-breadcrumb__inner {
    color: #0a4c8a;
  }
  .el-breadcrumb__item {
    cursor: pointer;
    font-weight: 600;
    &:last-child {
      font-weight: 400;
      color: #606266;
      cursor: text;
    }
  }
  .el-breadcrumb :last-of-type {
    span :last-of-type {
      color: #606266;
    }
  }
}
</style>
