<template>
  <div class="portable-visual">
    <div class="title">
      便携可视设备数量：领用0台，使用0台 摄像头数量：0台，使用0台
    </div>
    <div>
      <el-tabs v-model="activeName" class="nomal post-tabs">
        <el-tab-pane label="实时预览" name="first">
          <visual-preview />
        </el-tab-pane>
        <el-tab-pane label="录像回放" name="sconed">
          <video-playback>
            <div slot="select" class="scene-search">
              <div>
                <span>项目名称:</span>
              </div>
              <div>
                <span>区域:</span>
              </div>
              <div>
                <span>监控点:</span>
              </div>
              <div>
                <span>摄像头:</span>
              </div>
            </div>
          </video-playback>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import VisualPreview from './components/VisualPreview'
import VideoPlayback from './components/VideoPlayback'
export default {
  components: {
    VisualPreview,
    VideoPlayback
  },
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>

<style lang="less" scoped>
.portable-visual {
  padding: 10px 0px;
  .title {
    color: @primary;
  }
  .scene-search {
    & > div {
      height: 40px;
      display: flex;
      & > span {
        min-width: 80px;
        text-align: right;
        line-height: 30px;
        font-size: 16px;
        margin-right: 10px;
      }
    }
  }
}
</style>
