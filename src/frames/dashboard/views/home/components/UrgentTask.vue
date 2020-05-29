<template>
  <div class="urgent-task">
    <CrumbBox>
      <div>
        <div class="image" />
        紧急任务
      </div>
      <div class="more" @click="moreClick">
        更多
        <div class="image" />
      </div>
    </CrumbBox>
    <div class="task-content">
      <ul>
        <li
          v-for="(item, index) in dataList"
          :key="index"
        >
          <div class="left-content">
            <p class="reminder">{{ item.reminder }}</p>
            <p class="type"><span>{{ item.time }}</span><span class="type-text">{{ item.type }}</span></p>
            <p class="circle" />
          </div>
          <div class="right-content">
            <p class="day">{{ item.day }}</p>
            <p class="month">{{ item.month }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import CrumbBox from '../../../components/CrumbBox'
export default {
  components: {
    CrumbBox
  },
  data() {
    return {
      dataList: [
        {
          reminder: '您【12月26日】忘记打卡了，点击补卡!',
          time: '05:00',
          type: '类型:缺卡提醒',
          day: '26',
          month: '12月'
        },
        {
          reminder: '您【12月26日】忘记打卡了，点击补卡!',
          time: '05:00',
          type: '类型:缺卡提醒',
          day: '26',
          month: '12月'
        },
        {
          reminder: '您【12月26日】忘记打卡了，点击补卡!',
          time: '05:00',
          type: '类型:缺卡提醒',
          day: '26',
          month: '12月'
        },
        {
          reminder: '您【12月26日】忘记打卡了，点击补卡!',
          time: '05:00',
          type: '类型:缺卡提醒',
          day: '26',
          month: '12月'
        }
      ]
    }
  },
  methods: {
    moreClick() {
      this.$router.push({ path: 'urgentMore' })
    }
  }
}
</script>
<style lang="less" scoped>
.urgent-task {
  width: 49.5%;
  height: 330px;
  .image {
    background: url('../../../assets/home/task.png') no-repeat center;
    background-size: 100% 100%;
  }
  .more {
    color: @primary;
    cursor: pointer;
    .image {
      width: 14px;
      height: 7px;
      background: url('../../../assets/home/more.png') no-repeat center;
      background-size: 100% 100%;
    }
  }
  .task-content {
    padding: 0 10px;
    ul {
      li {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        position: relative;
        .left-content {
          .reminder {
            line-height: 14px;
            font-size: 14px;
            color: #333;
            font-weight: 400;
            font-family: Microsoft YaHei;
            cursor: pointer;
          }
          .reminder:hover {
            color: #0a4c8a;
          }
          .type {
            padding-top: 8px;
            line-height: 12px;
            font-size: 12px;
            color: #a1a1a1;
            font-family: Microsoft YaHei;
            .type-text {
              padding-left: 46px;
            }
          }

          .circle {
            position: absolute;
            left: -12px;
            top: 12px;
            width: 6px;
            height: 6px;
            background: #000;
            border-radius: 100%;
          }
        }
        .right-content {
          .day {
            line-height: 20px;
            font-size: 20px;
            color: #333;
            font-weight: 400;
            font-family: Microsoft YaHei;
          }
          .month {
            line-height: 12px;
            font-size: 12px;
            color: #333;
            font-family: Microsoft YaHei;
          }
        }
      }
    }
  }
}
</style>
