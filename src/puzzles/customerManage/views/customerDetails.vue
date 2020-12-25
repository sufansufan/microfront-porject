<template>
  <div class="customer-details">
    <div class="title">
      <span>{{ customerBaseInfo.companyName }}</span>
      <span>{{ customerBaseInfo.contactPerson }}({{ customerBaseInfo.contactPersontelephone }})</span>
    </div>
    <div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="详细信息" name="detailsInfo">
          <details-info :disabled-status="disabled" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import DetailsInfo from './components/DetailsInfo'
import { mapGetters } from 'vuex'
export default {
  name: 'CustomerDetails',
  components: {
    DetailsInfo
  },
  data() {
    return {
      activeName: 'detailsInfo',
      disabled: false
    }
  },
  computed: {
    ...mapGetters(['customerBaseInfo'])
  },
  created() {
    const { disabled } = this.$route.query
    this.disabled = Boolean(disabled)
  },
  methods: {
    handleClick() {

    }
  }
}
</script>

<style lang="less" scoped>
.customer-details {
  padding: 10px;
  height: calc(100vh - 140px);
  overflow-y: auto;
  .title {
    height: 36px;
    width: 100%;
    text-align: center;
    line-height: 36px;
    background: #eee;
    margin-bottom: 10px;
    & > span {
      &:first-child {
        font-size: 18px;
      }
      &:last-child {
        color: #0A4C8A;
        margin-left: 20px;
      }
    }
  }
}
</style>
