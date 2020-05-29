<template>
  <div class="approval-record">
    <div class="content">
      <div class="left finish">
        <div class="icon">
          <div class="circle" />
        </div>
        <div class="line" />
      </div>
      <div class="right">
        <div class="title">
          <span class="font-color">[申请]</span>
          <span class="font-color">[已申请]</span>
          <span>发起申请</span>
        </div>
        <div class="right-item">
          <span>申请人姓名 <span class="gray">(发起人)</span></span>
          <span class="status">提交</span>
          <span>办理时间</span>
          <span>耗时:31天21小时56分钟42秒</span>
        </div>
        <div class="right-item">
          <span>意见:</span>
          <span class="gray">审批意见审批意见审批意见审批意见审批意见，审批意见审批意见审批意见审批意见。审批意见审批意见审批意见审批意见审批意见审批</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="comment-left">
        <div class="comment-icon" />
        <div class="line" />
      </div>
      <div class="right">
        <div class="title">
          <span class="font-color">[评论]</span>
          <span class="font-color">评论:2020-03-15 14:22</span>
        </div>
        <div class="right-item">
          <span>评论人姓名:</span>
          <span class="gray">评论内容评论内容评论内容评论内容评论内容，评论内容评论内容。</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

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
          line-height: 20px;
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
      &.wait {
        .icon {
          & > .circle {
              border: 2px solid  #999;
              color: #999
          }
        }
      }
    }
    .right {
      margin-left: 10px;
      width: 100%;
      margin-bottom: 10px;
      .title {
        width: 100%;
        border-bottom: 1px solid #0a4c8a;
        margin-bottom: 5px;
        margin-top: -4px;
        & > span {
          margin-right: 10px;
          &.font-color {
            color: #0a4c8a;
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
