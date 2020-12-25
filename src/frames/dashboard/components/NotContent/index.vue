<template>
  <div class="not-data">
    <div class="not-data-image">
      <img :src="imageList[name]" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      imageList: {
        notData: require('./image/notData.png'),
        notMessage: require('./image/notMessage.png'),
        notNetWork: require('./image/notNetwork.png'),
        notpage: require('./image/notPage.png'),
        notRecord: require('./image/notRecord.png'),
        devLoading: require('./image/devLoading.png')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.not-data {
  width: 100%;
  display: flex;
  justify-content: center;
  &-image {
    width: 366px;
    height: 200px;
    & > img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
