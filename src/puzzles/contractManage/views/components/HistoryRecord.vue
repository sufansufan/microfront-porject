<template>
  <div class="history-record">
    <div v-if="!isCurrent" class="title" @click="handleExtend">
      <i
        class="el-icon-d-arrow-right icon table-click-color"
        :class="extend ? 'icon-top':'icon-down' "
      />
      <span class="table-click-color">点击查看历史修改记录</span>
    </div>

    <div
      v-for="(item, index) in data"
      v-show="extend || isCurrent"
      :key="index"
      class="body"
    >
      <div class="top">
        <div><span class="title">修改人:</span>{{ item.name }}({{ item.date }})</div>
        <div><span class="title">修改原因:</span>{{ item.reason }}</div>
      </div>
      <div class="bottom">
        <span class="title">修改内容:</span>
        <div class="content">
          <update-context :update-data="item.content" :is-border="false" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UpdateContext from '@framesDash/components/UpdateContext'
import formUpdateContext from '@core/mixins/formUpdateContext'
export default {
  name: 'HistoryRecord',
  components: {
    UpdateContext
  },
  mixins: [formUpdateContext],
  props: {
    data: {
      type: Array
    },
    isCurrent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      extend: false
    }
  },
  methods: {
    // isPlaneObject(obj) {
    //   const result = []
    //   if (Object.prototype.toString.call(obj) === '[object Object]') {
    //     const reg = /(?<=[除|传]).+?(?=\.doc)\.doc/g
    //     const array = obj.text.split(reg) // 没有超链接部分
    //     const urlList = [] // 存在超链接部分
    //     /* 确定 */
    //     array.pop()
    //     const linkData = [...obj.text.matchAll(reg)].entries()
    //     for (const [key, value] of linkData) {
    //       urlList.push({
    //         value: value[0],
    //         url: obj.urlList[key]
    //       })
    //     }
    //     for (const [key, value] of array.entries()) {
    //       const unlink = value
    //       const link = urlList[key]
    //       result.push({
    //         value: unlink
    //       })
    //       result.push(link)
    //     }
    //   } else {
    //     result.push({
    //       value: obj
    //     })
    //   }

    //   return result
    // },
    onDown(obj) {
      if (!obj.url) return
      this.$emit('triggerClick', obj)
    },
    handleExtend() {
      this.extend = !this.extend
    }
  }
}
</script>
<style lang="less" scoped>
.history-record {
  color: #666;
}
.icon {
  transition: all 0.2s ease-in-out;
}
.icon-top {
  transform: rotate(-90deg);
}
.icon-down {
  transform: rotate(90deg);
}
.bolder {
  display: inline-block;
  width: 60px;
  color: #333;
  font-weight: 600;
}
.on-down {
  cursor: pointer;
  color: #0a4c8a;
}
// body
.body {
  // margin: 10px 0;
  .top{
    display: flex;
    div:nth-child(1) {
      margin-right: 40px;
    }
  }
  .bottom{
    display: flex;
    .content{
      flex: 1;
    }
  }
  .title{
    font-weight: 600;
    display: inline-block;
    text-align: left;
    width: 65px;
    margin-right: 10px;
  }
}
</style>
