<!-- @date: 2020-08-19 11:54:22 -->

<template>
  <div class="m_audit_detail">
    <!-- tip  -->
    <div class="top">
      <el-button class="back-btn" @click="$router.go(-1)">
        <i class="iconfont icon-fanhui-copy" /> 返回
      </el-button>
      <div class="id">编号：{{ currentId }}</div>
    </div>
    <div class="flow">
      <div class="flow_content">
        <el-timeline>
          <!-- :class="activity.status?'flow_done':'flow_undone'" -->
          <el-timeline-item
            v-for="(activity,index) in stepList"
            :key="activity.id"
            placement="top"
            size="large"
            :class="{ 'middle':activity.middleStatus,'flow_done':activity.status,'flow_undone':!activity.status }"
            :icon="activity.status ? successIcon : ''"
            :timestamp="activity.timestamp"
          >
            <div class="step_item">
              <div class="step_one">
                {{ index === 0 ? "授权人" :
                  index !== stepList.length-1 || !activity.status ? "处理人" : "处理完成"
                }}
                <el-tag v-if="index === 0 && activity.status" class="step_status" type="success">已授权</el-tag>
              </div>
              <div class="step_two">
                <template
                  v-if="stepList.length === 1 || (index !== stepList.length-1) || (index === stepList.length-1 && !activity.status)"
                >
                  <span>{{ activity.name }}</span>
                  <span>{{ activity.company }}</span>
                  <span>{{ activity.post }}</span>
                </template>
                <tempalte v-else>
                  <span>{{ activity.explain }}</span>
                </tempalte>
              </div>
              <div v-if="index === 0" class="explain">
                <div class="explain_info">说明</div>
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
        <div v-if="stepList.length !== 1 && stepList[stepList.length-1].status" class="bottom">
          <div class="info">处理说明</div>
          <el-input v-model="explainInfo" class="info_input" type="textarea" :row="4" readonly />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AuditModel } from '@core/api/auditCreateor'
export default {
  name: 'AuditDetail',
  components: {},
  data() {
    return {
      successIcon:
        'iconfont icon-querenyuanzhengqueduigoutijiaochenggongwancheng',
      explainInfo: '',
      stepList: []
    }
  },
  computed: {
    currentId() {
      return this.$route.query.id
    }
  },
  watch: {},
  created() {
    this.auditModel = new AuditModel()
    this.initData()
  },
  methods: {
    async initData() {
      const params = {
        authorizationId: this.currentId
      }
      const { data } = await this.auditModel.getAuditFlow(params)
      this.fomatterData(data)
    },
    writeEndExplain(data) {
      this.explainInfo = data[data.length - 1].description
    },
    formatterStatus(index, length) {
      return index !== length
    },
    formatterExplain({ description, action }, index, length) {
      if (index === 0) return description
      else if (index === length && action === 'handle') {
        // 任务完成
        return '任务完成，访问权限已收回。'
      } else {
        return null
      }
    },
    // 如果是最后一个并且action是完成状态 那么就修改描述信息
    fomatterData(data) {
      const length = data.length - 1
      const endStatus = data[length].action === 'handle'
      this.writeEndExplain(data)
      this.stepList = data.map((i, index) => {
        return {
          name: i.assigneeName, // 最后一个如果是结束 那么就没有name 如果并没结束kill掉了 那么仍然存在name
          timestamp: i.assigneeTime,
          explain: this.formatterExplain(i, index, length),
          status: endStatus ? true : this.formatterStatus(index, length),
          company: i.enterpriseName,
          // 是否中间状态做样式调整
          middleStatus: i.action === 'claim' || i.action === 'handover',
          post: i.positionInEnterprise
        }
      })
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
  .el-timeline-item {
    padding-bottom: 5px;
  }
  .el-timeline-item:last-child {
    padding-bottom: 0;
  }
  .el-timeline-item__timestamp {
    font-size: 14px;
  }
  .el-timeline-item__wrapper {
    padding-left: 20px;
  }
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
