<template>
  <div class="dcynamic-component">
    <draggable class="statistics-content" @end="onEnd">
      <div v-for="item in dragList" :id="item.id" :key="item.id">
        {{ item.name }}
      </div>
    </draggable>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import { homeUpdateReportItem } from '@core/api/personelSet'
export default {
  components: {
    Draggable
  },
  props: {
    dragList: {
      type: Array,
      default: () => {}
    },
    resourceId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  methods: {
    onEnd(e) {
      const { to } = e
      const childrenList = to.children
      const updateItem = []
      for (let i = 0; i < childrenList.length; i++) {
        updateItem.push({
          reportItemId: childrenList[i].id,
          resourceId: this.resourceId,
          sequence: i
        })
      }
      homeUpdateReportItem(updateItem).then(res => {
        this.$message.success('修改成功')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.dcynamic-component {
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
