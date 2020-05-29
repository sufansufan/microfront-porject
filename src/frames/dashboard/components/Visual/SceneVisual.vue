<template>
  <div class="scene-visual">
    <div class="title">
      领用设备数量0台，实际使用设备数量0台
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
                <span>设备:</span>
                <el-select v-model="value" placeholder="请选择设备" style="width: 74%">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
              <div>
                <span>录像时间:</span>
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  style="width: 74%"
                />
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
.scene-visual {
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
