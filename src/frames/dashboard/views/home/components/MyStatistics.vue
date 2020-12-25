<template>
  <div v-loading="loading" class="my-statistics">
    <draggable class="statistics-content" @end="onEnd">
      <!-- <div>
        <staff-check />
      </div> -->
      <div v-for="item in dragList" :id="item.id" :key="item.id">
        {{ item.name }}
      </div>
    </draggable>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import StaffCheck from './StaffCheck'
import { getHomeMyReportItem, homeUpdateReportItem } from '@core/api/personelSet'
export default {
  components: {
    Draggable,
    StaffCheck
  },
  data() {
    return {
      dragList: [],
      loading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    onEnd(e) {
      const { to } = e
      const childrenList = to.children
      const updateItem = []
      for (let i = 0; i < childrenList.length; i++) {
        updateItem.push({
          reportItemId: childrenList[i].id,
          resourceId: null,
          sequence: i
        })
      }
      homeUpdateReportItem(updateItem).then(res => {
        this.$message.success('修改成功')
      })
    },
    fetchData() {
      this.loading = true
      getHomeMyReportItem().then(({ data }) => {
        this.loading = false
        this.dragList = data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.my-statistics {
  min-height: 130px;
  .statistics-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    & > div {
      width: calc(50% - 8px);
      height: 285px;
      border: 1px solid #eee;
      background-color: #fff;
      margin-bottom: 12px;
    }
  }

}
</style>
