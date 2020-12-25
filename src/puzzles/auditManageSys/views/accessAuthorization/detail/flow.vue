<!-- @date: 2020-08-19 11:54:22 -->

<template>
  <div class="m_audit_detail">
    <div class="flow">
      <div class="flow_content">
        <el-timeline>
          <el-timeline-item
            v-for="(activity,index) in stepList"
            :key="activity.id"
            placement="top"
            size="large"
            :class="'flow_undone'"
            :icon="successIcon"
            :timestamp="activity.timestamp"
          >
            <div class="step_item">
              <div class="step_one">
                {{ getTitle(index) }}
                <el-tag class="step_status" type="success">{{ formatterTitle(activity.status) }}</el-tag>
              </div>

              <div class="step_two">
                <span>{{ activity.name }}</span>
                <span v-if="index===0">{{ activity.company }}</span>
                <span>{{ activity.post }}</span>
              </div>
              <!-- v-if="index === 0 || index === 2" -->

              <div v-if="activity.explain != null" class="explain">
                <div v-if="index === 0" class="explain_info">问题说明</div>
                <el-input
                  v-model="activity.explain"
                  class="explain_info_input"
                  type="textarea"
                  :rows="2"
                  readonly
                />
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuditDetail',
  components: {},
  props: {
    stepList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      statusList: [
        { value: 'unclaimed', label: '待认领' },
        { value: 'claimed', label: '已认领' },
        { value: 'pending', label: '待处理' },
        { value: 'pending_grant', label: '待授权' },
        { value: 'granted', label: '已授权' },
        { value: 'processing', label: '处理中' },
        { value: 'done', label: '已完成' }
      ],
      successIcon:
        'iconfont icon-querenyuanzhengqueduigoutijiaochenggongwancheng'
    }
  },
  computed: {
    currentId() {
      return this.$route.query.id
    }
  },
  watch: {},
  created() {},
  methods: {
    getTitle(index) {
      return index === 0 ? '发起人' : '处理人'
    },
    formatterTitle(value) {
      const filterList = this.statusList.filter(item => {
        return item.value === value
      })
      return filterList[0].label
    }
  }
}
</script>
<style lang='less' scoped>
.m_audit_detail {
  padding: 10px;
  height: 100%;
  box-sizing: border-box;
}
.id {
  margin-left: 20px;
  padding-top: 10px;
  text-align: center;
  font-size: 16px;
  font-weight: 650;
  line-height: 35px;
  box-sizing: border-box;
  display: inline-block;
  width: calc(100% - 120px);
  color: #333;
}
.flow {
  overflow: auto;
  margin: 20px auto;
  padding-left: 10px;
  height: calc(100% - 165px);
}

.flow_content {
  margin: 0 auto;
  width: 600px;
}

.step_item {
  margin: 10px 0;
  font-size: 12px;
}

// 步骤一固定样式
.step_status {
  margin-left: 5px;
}
.explain {
  width: 80%;
}
.explain_info {
  margin-bottom: 5px;
}

// 步骤二固定样式
.step_two {
  height: 20px;
  margin: 5px 0px;
  color: #666;
  span {
    margin-left: 8px;
    color: #999;
    float: left;
  }
  span:nth-child(1) {
    margin-left: 8px;
    color: #666;
  }
}
// bottom
.bottom {
  .info {
    margin: 10px 0 5px 0;
  }
  .info_input {
    height: 100%;
  }
  box-sizing: border-box;
  height: 160px;
}
</style>
<style lang='less'>
.m_audit_detail {
  .el-textarea__inner {
    color: #999;
    cursor: no-drop;
  }
  .icon-querenyuanzhengqueduigoutijiaochenggongwancheng {
    color: #0a4c8a !important;
  }
  .middle {
    height: 72px;
    // box-sizing: border-box;
  }
  // .el-timeline-item {
  //   padding-bottom: 5px;
  // }
  // .el-timeline-item:last-child {
  //   padding-bottom: 0;
  // }
  .el-timeline-item__timestamp {
    font-size: 14px;
  }
  // .el-timeline-item__wrapper {
  //   padding-left: 20px;
  // }
  .flow_done {
    .el-timeline-item__node {
      .el-timeline-item__icon {
        font-size: 14px;
      }
    }
  }
  .flow_undone {
    .el-timeline-item__node {
      background-color: #666 !important;
      width: 12px;
      height: 12px;
    }
  }
}
</style>
