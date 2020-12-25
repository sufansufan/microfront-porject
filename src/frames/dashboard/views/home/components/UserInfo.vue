<template>
  <div class="user-info">
    <div class="photo">
      <img :src="headImg" alt="">
    </div>
    <div class="box">
      <p class="name">
        <strong>{{ userInfo.baseInfo.name }}</strong>
      </p>
      <p class="company one-ellipsis">
        {{ userInfo.baseInfo.orgName }}
      </p>
      <p class="post one-ellipsis">
        <span @click="postDetails">{{ userInfo.baseInfo.postName }}</span>
        <span> {{ userInfo.baseInfo.mainOrg ? ` | ${userInfo.baseInfo.mainOrg }` : '' }}</span>
      </p>
      <div class="btn">
        <el-popover width="300" trigger="click">
          <div v-for="item in userInfo.partTimeJobInfo" :key="item.id" style="margin-bottom: 5px">
            <div class="post-name" style="color: #333">{{ item.postName }}</div>
            <div style="font-size: 12px; color:#999">{{ item.orgName }}</div>
          </div>
          <div slot="reference" class="job-num">
            兼职：{{ userInfo.partTimeJobInfo && userInfo.partTimeJobInfo.length || 0 }}
          </div>
        </el-popover>
        <el-popover width="300" trigger="click">
          <!-- <div>2222</div> -->
          <div slot="reference" class="job-num serving">
            项目任职：{{ userInfo.projectInfo && userInfo.projectInfo.length || 0 }}
          </div>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
import { getHeadImg } from '@core/api/personelSet'
export default {
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      headImg: require('../../../assets/home/photo.png')
    }
  },
  watch: {
    '$store.state.topNav.headerImg': {
      handler() {
        this.getImg()
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    // this.getImg()
  },
  methods: {
    getImg() {
      getHeadImg().then(({ data }) => {
        if (data !== null) {
          this.headImg = data.headImg
        }
      })
    },
    postDetails() {
      this.$router.push({
        name: 'postInfo',
        query: { type: 'details', post: 'post', id: this.userInfo.baseInfo.postId }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-info {
  text-align: center;
  line-height: 24px;
  height: 258px;
  position: relative;
  .photo {
    width: 130px;
    height: 130px;
    border-radius: 50%;
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
      border-radius: 50%;
    }
  }
  .box {
    width: calc(90% - 20px);
    height: calc(200px - 65px);
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
          cursor: pointer;
        }
        &:last-child {
          color: #A3A3A3;
        }
      }
    }
    .btn {
      display: flex;
      justify-content: space-around;
      .job-num {
        width: 120px;
        height: 30px;
        border-radius: 3px;
        color: #fff;
        line-height: 30px;
        margin-top: 5px;
        background: #FA5151;
        cursor: pointer;
        &.serving {
          background: #5195FA;
        }
      }
    }
  }
  .post-name {
    color: #333;
  }
}
</style>
<style lang="less">
.user-info {
  .el-popover {
    background: #f5f5f5;
  }
}

</style>
