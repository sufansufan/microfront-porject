<template>
  <div class="user-info">
    <div class="photo">
      <img src="../../../assets/home/photo-man.png" alt="">
    </div>
    <div class="box">
      <p class="name">
        <strong>张三</strong>
      </p>
      <p class="company one-ellipsis">
        北京阡陌十方信息技术有限公司西安分公司
      </p>
      <p class="post">
        <span>普通员工岗(研发工程师)</span>
        <span>|产品部</span>
      </p>
      <div class="btn">
        <div>
          兼职：5
        </div>
        <div>
          项目任职：3
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
.user-info {
  text-align: center;
  line-height: 24px;
  height: 32.7vh;
  position: relative;
  .photo {
    width: 130px;
    height: 130px;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    margin: 0 auto;
    z-index: 10;
    & > img {
      width: 100%;
      height: 100%;
    }
  }
  .box {
    width: calc(90% - 20px);
    height: calc(26vh - 65px);
    padding: 0px 10px;
    position: absolute;
    right: 5%;
    bottom: 0px;
    box-shadow: 0px 0px 10px 5px #d5d5d5;
    padding-top: 65px;
    .name {
      color: #565656;
      font-size: 18px;
      margin-top: 15px;
    }
    .company {
      color: #666;
      font-size: 12px;;
    }
    .post {
      font-size: 14px;
      & > span {
        &:first-child {
          color: #0A4C8A;
        }
        &:last-child {
          color: #A3A3A3;
        }
      }
    }
    .btn {
      display: flex;
      justify-content: space-around;
      & > div {
        width: 120px;
        height: 30px;
        border-radius: 3px;
        color: #fff;
        line-height: 30px;
        margin-top: 5px;
        &:first-child {
          background: #FA5151;
        }
        &:last-child {
          background: #5195FA;
        }
      }
    }
  }
}
</style>
