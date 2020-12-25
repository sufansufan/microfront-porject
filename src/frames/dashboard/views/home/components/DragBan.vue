<template>
  <div class="board-column">
    <draggable :list="list" class="added-list" :class="type=== 'add' ? 'add' : 'reduce'" :set-data="setData" data-id-attr="data-id" v-bind="$attrs" @end="dragEnd">
      <div v-for="item in list" :key="item.id">
        <div :id="item.id" class="list-content" @mousedown="itemClick(item.id)">
          <div class="img-box">
            <img src="../../../assets/application/projectCostManager/projectCostManager.png">
          </div>
          <div>
            {{ item.name }}
          </div>
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
import { changeReportSortSave, updateReportSortSave, deleteReportSetting } from '@core/api/personelSet'
import draggable from 'vuedraggable'
export default {
  name: 'DragBan',
  components: {
    draggable
  },
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    list: {
      type: Array,
      default: () => []
    },
    resourceId: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      reportItemId: ''
    }
  },
  methods: {
    setData(dataTransfer) {
      dataTransfer.setData('Text', '')
    },
    // getImg(url) {
    //   return require(url)
    // },
    addReportSort(params) {
      changeReportSortSave(params).then(res => {
        this.$message.success('添加成功')
      })
    },
    itemClick(id) {
      this.reportItemId = id
    },
    dragEnd(e) {
      const { to, newIndex, pullMode } = e
      this.$nextTick(() => {
        const reportList = []
        if (to.classList[1] === 'add') {
          var childrenList = to.children
          if (newIndex === childrenList.length - 1 && pullMode) {
            const params = {
              reportItemId: this.reportItemId,
              resourceId: this.resourceId,
              sequence: newIndex
            }
            this.addReportSort(params)
          } else {
            for (let i = 0; i < childrenList.length; i++) {
              var obj = {
                reportItemId: childrenList[i].firstChild.id,
                resourceId: this.resourceId,
                sequence: i
              }
              if (pullMode) {
                if (newIndex === i) {
                  this.addReportSort(obj)
                }
              }
              reportList.push(obj)
            }
            updateReportSortSave(reportList)
          }
        } else if (to.classList[1] === 'reduce') {
          deleteReportSetting(this.reportItemId).then(res => {
            this.$message.success('删除成功')
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.board-column {
  min-width: 100%;
  min-height: 100px;
  height: auto;
  overflow: hidden;
  .added-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    color: #333;
    .img-box {
      width: 50px;
      height: 50px;
      border-radius: 10px;
      margin: 0 auto;
      & > img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
  }
  .list-content {
    width: 54px;
    margin-right: 20px;
    font-size: 12px;
    text-align: center;
  }
}
</style>
