<template>
  <div class="approval-record">
    <div v-for="(item,index) in processData" :key="index" class="content">
      <div v-if="item.type ==='comment'" class="comment-left">
        <div class="comment-icon" />
        <div class="line" />
      </div>
      <div v-else :class="['left', isCircle(item)]">
        <div class="icon">
          <div class="circle">
            {{ item.status !== 'finish' && item.type !== 'cc' && item.type !== 'comment' ? index + 1 :'' }}
          </div>
        </div>
        <div v-if="index !== processData.length - 1" class="line" />
      </div>
      <div class="right">
        <div class="title">
          <span v-if="item.taskStatus" class="font-color">{{ '['+item.taskStatus+']' }}</span>
          <template v-if="item.type === 'cc'">
            <span :class="isCcNum(readList(item.approverRecords, 'length'))"> {{ readList(item.approverRecords, 'length') }} </span>
          </template>
          <template v-else>
            <span>{{ item.name }}</span>
            <span class="font-color-gray">{{ '(' + item.taskTypeName + ')' }}</span>
            <span v-if="isNumber">{{ item.approverRecords.length }} 人</span>
            <span v-if="item.type !== 'start'" style="color: #666">{{ item.approveTypeName }}</span>
          </template>
          <span v-if="item.type !== 'start' && item.status !== 'notStart'">到达：{{ item.startTime }}</span>
        </div>
        <!-- 抄送 -->
        <template v-if="item.type === 'cc'">
          <div v-for="element in readList(item.approverRecords, 'read')" :key="element">
            <div class="right-item">
              <span>{{ element.name }}</span>
              <span class="status">{{ element.statusName }}</span>
              <span class="gray">阅读时间：{{ element.endTime }}</span>
            </div>
          </div>
          <template v-if="readList(item.approverRecords, 'unread').length">
            <div class="cc-name-box">
              <div v-for="(element, i) in readList(item.approverRecords, 'unread')" :key="element">
                <span>{{ element.name }} </span>
                <span class="cc-name">{{ i === readList(item.approverRecords, 'unread').length - 1 ? '' : '+' }}</span>
              </div>
              <div>
                <span class="all-unread">未读</span>
              </div>
            </div>
          </template>
        </template>
        <!-- 审批中 -->
        <template v-else-if="item.status === 'running' && item.type !== 'cc' || item.status === 'notStart'">
          <template v-for="(element) in transferList(item.approverRecords, 'transfer')">
            <!-- 转交 -->
            <div :key="element" class="running-item">
              <span class="transfer-box">
                {{ element.name }}
                <span class="gray">
                  由<span class="transfer-name">{{ element.transferFromUser.userName }}</span>转交
                  <span class="transfer">转交</span>
                  <span>( {{ element.name }} )</span>
                  <span class="time-margin">{{ element.startTime }}</span>
                  <span v-if="element.spendTime">耗时: {{ element.spendTime }}</span>
                </span>
              </span>
            </div>
          </template>
          <!-- 会签 -->
          <template v-if="item.approveType === '03'">
            <div v-for="element in countersignList(item.approverRecords)" :key="element">
              <div class="right-item">
                <span>{{ element.name }} <span v-if="element.role" class="gray">({{ element.role }})</span></span>
                <span class="status">{{ element.statusName }}</span>
                <span>{{ element.startTime }}</span>
                <span>{{ element.spendTime ? '耗时：' : '' }} {{ element.spendTime }}</span>
              </div>
              <div v-if="element.comment" class="right-item">
                <span> {{ element.comment ? '意见：' : '' }}</span>
                <span class="gray">{{ element.comment }}</span>
              </div>
            </div>
          </template>
          <div style="display: flex; flex-wrap: wrap">
            <!-- 正常审批 -->
            <template v-for="(element, p) in transferList(item.approverRecords, 'unTransfer')">
              <div :key="element" class="running-item">
                <span>{{ element.name }} <span v-if="element.role" class="gray">({{ element.role }})</span></span>
                <span class="add-name" :style="{color: item.taskType === 'approve' ? '#333' : '' }">
                  {{ transferList(item.approverRecords, 'unTransfer').length - 1 !== p ? item.taskType === 'approve' ? '/' : '+' : '' }}
                </span>
              </div>
            </template>
          </div>
        </template>
        <template v-else>
          <div v-for="element in item.approverRecords" :key="element">
            <div class="right-item">
              <span>{{ element.name }} <span v-if="element.role" class="gray">({{ element.role }})</span></span>
              <span class="status">{{ element.statusName }}</span>
              <span>{{ element.startTime }}</span>
              <span>{{ element.spendTime ? '耗时：' : '' }} {{ element.spendTime }}</span>
            </div>
            <div v-if="element.comment" class="right-item">
              <span> {{ element.comment ? '意见：' : '' }}</span>
              <span class="gray">{{ element.comment }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// 缺评论、待办理、会签(审批中)、已办理
export default {
  props: {
    processData: {
      default: () => [],
      type: Array
    },
    isNumber: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {

    }
  },
  computed: {
    isCircle() {
      return (row) => {
        const { status, type } = row
        if (type === 'cc') return 'cc'
        return status
      }
    },
    isCcNum() {
      return (str) => {
        if (str === '全部已读') {
          return 'all-read'
        } else if (str === '全部未读') {
          return 'all-unread'
        } else {
          return 'num-read'
        }
      }
    },
    readList() {
      return (list, type) => {
        if (type === 'length') {
          const allRead = list.every(item => item.status === 'read')
          if (allRead) return '全部已读'
          const allUnread = list.every(item => item.status === 'unread')
          if (allUnread) return '全部未读'
          const readList = list.filter(item => item.status === 'read')
          if (readList.length) return `${readList.length}人已读`
        } else if (type === 'read') {
          return list.filter(item => item.status === 'read')
        } else if (type === 'unread') {
          return list.filter(item => item.status === 'unread')
        }
      }
    },
    transferList() {
      return (list, type) => {
        if (type === 'transfer') {
          return list.filter(item => item.transferFromUser)
        } else if (type === 'unTransfer') {
          if (this.isNumber) {
            return list
          } else {
            return list.filter(item => item.transferFromUser === null && item.status !== 'handled')
          }
        }
      }
    },
    countersignList() {
      return (list) => {
        return list.filter(item => item.status === 'handled')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.approval-record {
  width: 90%;
  margin: 0 auto;
  .content {
    display: flex;
    width: 100%;
    .comment-left {
      position: relative;
      margin-left: 5px;
      .comment-icon {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #666;
      }
      .line {
        position: absolute;
        top: 14px;
        bottom: 0px;
        width: 2px;
        background-color: #999;
        margin-left: 6px;
      }
    }
    .left {
      position: relative;
      .icon {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #fff;
        z-index: 10;
        & > .circle {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          line-height: 22px;
          text-align: center;
          box-sizing: border-box;
        }
      }
      .comment-icon {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #666;
      }
      .line {
        position: absolute;
        top: 24px;
        bottom: 0px;
        width: 2px;
        background-color: #999;
        margin-left: 11px;
      }
      &.finish {
        .icon {
          & > .circle {
            background: url('../../assets/step/finish.png') no-repeat center;
            background-size: 100% 100%;
          }
        }
      }
      &.running {
        .icon {
          & > .circle {
              border: 1px solid  #333;
              color: #333
          }
        }
      }
      &.notStart {
        .icon {
          & > .circle {
              border: 1px solid  #999;
              color: #999
          }
        }
      }
      &.cc {
        .icon {
          width: 20px;
          height: 20px;
          margin-left: 1px;
          & > .circle {
            background: url('../../assets/step/cc.png') no-repeat center;
            background-size: 100% 100%;
          }
        }
        .line {
          top: 20px;
        }
      }
    }
    .right {
      margin-left: 10px;
      width: 100%;
      margin-bottom: 10px;
      .all-unread {
        color: #fa5151;
      }
      .all-read {
        color: #03af1b;
      }
      .num-read {
          color: #ff9000;
      }
      .title {
        width: 100%;
        border-bottom: 1px solid #0a4c8a;
        margin-bottom: 5px;
        margin-top: -4px;
        & > span {
          &.font-color {
            margin-right: 10px;
            color: #0a4c8a;
          }
          &.font-color-gray {
            color: #999999;
          }
        }
      }
      .cc-name-box {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        .cc-name {
          margin: 0 5px;
          color: #0a4c8a;
          font-size: 16px;
        }
      }
      .running-item {
        // & > span {
        //   margin-right: 5px;
        // }
        .gray {
          color: #999;
        }
        .add-name {
          margin: 0 5px;
          color: #0a4c8a;
          font-size: 16px;
        }
        .transfer-box {
          & > span {
            margin-left: 10px;
            .transfer-name {
              color: #333;
            }
            .transfer {
              color: #0a4c8a;
              margin-left: 10px;
            }
            .time-margin {
              margin: 0px 10px;
            }
          }
        }
      }
      .right-item {

        & > span {
          margin-right: 10px;
        }
        .gray {
          color: #999;
        }
        .status {
          color: #03AF1B;
        }
      }
    }
  }
}
</style>
