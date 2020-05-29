<template>
  <div class="step-box">
    <span class="title">
      {{ title }}
    </span>
    <div class="line" />
    <div class="icon">
      <div class="circle" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: '',
      type: String
    },
    type: {
      type: String,
      default: '6'
    }
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
.step-box {
  width: 100%;
  height: 24px;
  line-height: 24px;
  text-align: center;
  .line {
    width: 100%;
    height: 2px;
    background: #ccc;
    margin-top: 10px;
  }
  .icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: -12px;
    background: #fff;
    & > .circle {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      line-height: 20px;
      text-align: center;
      box-sizing: border-box;
    }
  }
  &.process {
    .title {
      color: #333;
    }
    .line {
      background: #333;
    }
    .icon {
       & > .circle {
          border: 2px solid  #666;
          color: #666
       }
    }
  }
  &.wait {
    .title {
     color: #C1C1C1;
    }
    .line {
     background: #C1C1C1;
    }
    .icon {
       & > .circle {
          border: 2px solid  #999;
          color: #999
       }
    }
  }
  &.finish {
    .title {
      color:  #1771C6;
    }
    .line {
     background:  #1771C6;
    }
    .icon {
       & > .circle {
          background: url('../../assets/step/finish.png') no-repeat center;
          background-size: 100% 100%;
       }
    }
  }
}
</style>
