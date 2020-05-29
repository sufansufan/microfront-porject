<template>
  <div class="process" :style="{width: width}">
    <el-steps :direction="direction" :active="active" :finish-status="direction === 'vertical' ? 'success': 'finish'" :align-center="direction === 'horizontal'">
      <el-step v-for="(item, index) in stepData" :key="index">
        <template v-if="direction === 'vertical'">
          <div slot="title" class="vertical title">
            <div>[{{ item.status }}] </div>
            <div>{{ item.flow }}</div>
            <div>{{ item.type }}</div>
          </div>
          <div slot="description" class="vertical description">
            <div v-for="(v, i) in item.children" :key="v.name">
              <p>{{ v.name }}<span v-if="i < item.children.length - 1"> +</span></p>
            </div>
          </div>
        </template>
        <template v-if="direction === 'horizontal'">
          <div slot="title" class="horizontal title">
            <div>{{ item.flow }}</div>
          </div>
          <div slot="description" class="horizontal description">
            <div v-for="v in item.children" :key="v.name">
              <p>{{ v.name }} /</p>
              <p>{{ v.flow }} /</p>
            </div>
          </div>
        </template>
      </el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  props: {
    direction: {
      default: 'horizontal',
      type: String
    },
    width: {
      default: '90%',
      type: String
    },
    active: {
      default: -1,
      type: Number
    },
    stepData: {
      default: () => [
        {
          status: '已完成',
          flow: '发起申请（3人）',
          type: '会签',
          children: [
            {
              name: '张y-总经理',
              flow: '发起申请',
              time: '2020-01-17 15:29'
            }
          ]
        },
        {
          status: '审批中',
          flow: '部门经理审批（审批）',
          type: '非会签',
          children: [
            {
              name: '张工测试',
              flow: '直接上级',
              time: ''
            },
            {
              name: '张-董事长',
              flow: '直接上级',
              time: ''
            }
          ]
        },
        {
          status: '待办理',
          flow: '成本会计审批（办理）',
          type: '非会签',
          children: [
            {
              name: 'SGW荣-成本会计',
              flow: '成本会计',
              time: ''
            }
          ]
        }
      ],
      type: Array
    }
  }
}
</script>

<style lang="less" scoped>
.process {
  margin: 0 auto;
  overflow-x: scroll;
  .vertical.title {
    display: flex;
    border-bottom: 1px solid @primary;
    & > div {
      &:first-child {
        color: #0A4C8A;
      }
    }
    & > div {
      margin-right: 10px;
      font-size: 14px;
    }
  }
  .vertical.description {
    font-size: 14px;
    line-height: 26px;
    margin-bottom: 10px;
    display: flex;
    & > div {
      display: flex;
      & > p > span {
        color: #0A4C8A;
      }
    }
  }
  .horizontal.title  {
    display: flex;
    font-size: 14px;
    justify-content: center;
  }
  .horizontal.description {
    display: flex;
    flex-wrap: wrap;
     justify-content: center;
    & > div {
      display: flex;
      color: @primary;
    }
  }
}
</style>

<style lang="less">
.process {
  .el-step__head.is-finish, .el-step__head.is-success {
    color: @primary;
    border-color: @primary;
  }

  .el-step__line {
    background-color: #666;
  }
  .el-step__title.is-finish , .el-step__title.is-success {
    color: @primary;
  }
  .el-step__description.is-finish,.el-step__title.is-wait, .el-step__description.is-wait,  .el-step__description.is-success {
    color: #333;
  }
  .el-step__head.is-wait {
    border-color: #666;
    color: #666;
  }
}

</style>
