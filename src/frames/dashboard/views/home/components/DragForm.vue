<template>
  <div class="drag-form">
    <div class="added" :group="group">
      <div>
        <i class="iconfont icon-tongji" />
        已添加报表
        <span style="color: #999; margin-left: 5px">拖拽可添加</span>
      </div>
      <drag-ban :key="1" :list="itemData.selectchild === null ? addList : itemData.selectchild" :group="group" :resource-id="id" type="add" /></div>
    <div class="not-added" :group="group">
      <div>
        <i class="iconfont icon-tongji" />
        未添加报表
      </div>
      <drag-ban :key="2" :list="itemData.child === null ? [] : itemData.child" :group="group" :resource-id="id" type="reduce" />
    </div>
  </div>
</template>

<script>
import DragBan from './DragBan'

export default {
  components: {
    DragBan
  },
  props: {
    itemData: {
      type: Object,
      default: () => {}
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      group: 'mission',
      addList: [],
      reportList: []
    }
  },
  mounted() {
    console.log(this.itemData)
  },
  methods: {
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData('Text', '')
    }
  }
}
</script>

<style lang="less" scoped>
.drag-form {
  & > div {
    min-height: 128px;
    padding: 10px;
  }
  .added {
    width: 100%;
    height: 100px;
    color: #03AF1B;
    & > div:first-child {
      margin-bottom: 10px;
    }
  }
  .not-added {
    width: 100%;
    height: 100px;
    border-top: 1px solid #C1C1C1;
    color: #666666;
    & > div:first-child {
      margin-bottom: 10px;
    }
  }

}
</style>
