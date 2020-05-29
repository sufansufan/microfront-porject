<template>
  <div class="breadcrumb-box">
    <crumb-box>
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item, index) in breadCrumbList" :key="index">
            <el-dropdown v-if="index === 0" trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                {{ item.title }}<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(v, i) in item.children" :key="i" :command="v">{{ v.title }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span v-else>
              {{ item.title }}
            </span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="right">
        <div>天气</div>
        <div class="date">
          <i class="el-icon-date" />
          <span>{{ nowDate }}</span>
        </div>
      </div>
    </crumb-box>
  </div>
</template>

<script>
import CrumbBox from '../../../components/CrumbBox'
import { parseTime } from '@core/utils/index'
import { getLocalStorage } from '@core/utils/auth.js'
import { mapGetters } from 'vuex'
export default {
  components: {
    CrumbBox
  },
  data() {
    return {
      nowDate: '',
      breadCrumbList: []
    }
  },
  computed: {
    ...mapGetters(['breadCrumb'])
  },
  watch: {
    $route: {
      handler() {
        if (this.$route.path === '/home') {
          this.breadCrumbList = []
        } else {
          this.breadCrumbList = this.breadCrumb.length ? this.breadCrumb : [...JSON.parse(getLocalStorage('breadCrumb'))]
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.nowDate = parseTime(new Date(), 'y-m-d')
  },
  methods: {
    handleCommand(command) {
      this.$store.dispatch('getBreadCrumb', command)
      this.$router.replace({
        path: '/' + command.url
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
}
</style>
