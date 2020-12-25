<template>
  <div class="about-suppliers">
    <div class="box">
      <el-row>
        <el-col :span="5">
          <div class="detils-left">
            <div class="detils-title">关于我们</div>
            <div class="detils-one">西安速卖达科贸有限公司</div>
            <div class="detils-two"><span>工商注册信息：已认证</span><img src="http://a4.att.hudong.com/21/09/01200000026352136359091694357.jpg"></div>
            <div class="detils-two"><span>所在地区：天津市天津市河西区</span></div>
            <div class="detils-there">
              <img src="http://a4.att.hudong.com/21/09/01200000026352136359091694357.jpg" alt="">
              <div>刘-供应商</div>
            </div>
            <div class="detils-there">
              <img src="http://a4.att.hudong.com/21/09/01200000026352136359091694357.jpg" alt="">
              <div>15029488156</div>
            </div>
            <div class="detils-there">
              <img src="http://a4.att.hudong.com/21/09/01200000026352136359091694357.jpg" alt="">
              <div>15029488156</div>
            </div>
            <div class="detils-there">
              <img src="http://a4.att.hudong.com/21/09/01200000026352136359091694357.jpg" alt="">
              <div>15029488156</div>
            </div>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="detils-right">
            <div class="right-one"> <img src="http://a4.att.hudong.com/21/09/01200000026352136359091694357.jpg" alt=""> <span>基本信息</span> </div>
            <div style="margin: 10px 0;padding: 16px 10px">
              <div class="full-span">
                <div class="half-span">
                  <span class="half-title">主营产品类别：</span>
                  <span class="half-content">18792502535</span>
                </div>
                <div class="half-span">
                  <span class="half-title">经营模式：</span>
                  <span class="half-content">生产型企业</span>
                </div>
                <div class="half-span">
                  <span class="half-title">是否提供加工/定制服务：</span>
                  <span class="half-content">否</span>
                </div>
                <div class="half-span">
                  <span class="half-title">注册资本：</span>
                  <span class="half-content">2020-12-12</span>
                </div>
                <div class="half-span">
                  <span class="half-title">公司成立时间：</span>
                  <span class="half-content">2019年</span>
                </div>
                <div class="half-span">
                  <span class="half-title">公司注册地：</span>
                  <span class="half-content">天津市天津市河西区</span>
                </div>
                <div class="half-span">
                  <span class="half-title">企业类型：</span>
                  <span class="half-content">国有企业</span>
                </div>
                <div class="half-span">
                  <span class="half-title">法定代表人：</span>
                  <span class="half-content">18792502535</span>
                </div>
              </div>
            </div>

          </div>
          <div class="detils-right">
            <div class="right-one"> <img src="http://a4.att.hudong.com/21/09/01200000026352136359091694357.jpg" alt=""> <span>企业资质</span> </div>
            <div style="margin: 10px 0;padding: 16px 10px">
              <div style="padding:20px;">暂无资质</div>
            </div>
          </div>
          <div class="detils-right">
            <div class="right-one"> <img src="http://a4.att.hudong.com/21/09/01200000026352136359091694357.jpg" alt=""> <span>工艺说明</span> </div>
            <div style="margin: 10px 0;padding: 16px 10px">
              <div style="padding:20px;" />
            </div>
          </div>
          <div class="detils-right">
            <div class="right-one"> <img src="http://a4.att.hudong.com/21/09/01200000026352136359091694357.jpg" alt=""> <span>企业介绍</span> </div>
            <div style="margin: 10px 0;padding: 16px 10px">
              <div style="padding:20px;">18792502535</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
export default {
  components: { },
  props: {
    supply: {
      type: Boolean,
      default: true
    },
    supplyList: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      num: 1,
      imageViewUrl: 'http://a4.att.hudong.com/21/09/01200000026352136359091694357.jpg',
      productImages: [
        { id: 1, url: 'http://a4.att.hudong.com/21/09/01200000026352136359091694357.jpg' },
        { id: 2, url: 'http://a3.att.hudong.com/68/61/300000839764127060614318218_950.jpg' },
        { id: 3, url: 'http://a4.att.hudong.com/21/09/01200000026352136359091694357.jpg' },
        { id: 4, url: 'http://a4.att.hudong.com/21/09/01200000026352136359091694357.jpg' },
        { id: 5, url: 'http://a3.att.hudong.com/68/61/300000839764127060614318218_950.jpg' }
      ]
    }
  },
  methods: {
    backGo() {
      this.$emit('changeTabConent', 'products', 'default')
    },
    changeImg(val) {
      this.imageViewUrl = val.url
    },
    setUpShow() {
      this.$refs.dialog.show = true
    },
    open(val) {
      if (val === 'succse') {
        this.$message({
          message: '加入对比列表成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: '此产品已在对比列表中，不可重复添加！',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .about-suppliers {
    margin-top: -15px;
    // border: 1px solid #999;
    // border-top: 0;
    padding: 10px 20px;
    height: calc(100% - 100px);
    overflow-y: scroll;
    .box {
      padding: 10px 0;
      .box-left {
        .full-img {
          width: 100%;
        }
        .item-img {
          display: flex;
          justify-content: space-between;
          align-items: center;
          img{
            width: 19%;
            cursor: pointer;
          }
        }
      }
      .box-right {
        padding: 10px;
        .title {
          font: 700 18px/18px '微软雅黑';
          padding: 10px 0;
          word-break: break-all;
        }
        .detiles {
          font: 400 12px/18px '微软雅黑';
          color: #999;
          word-break: break-all;
        }

      }
      .detils-left {
        border:1px solid #999;
        .detils-title {
          text-align: center;
          font: 400 14px/32px '微软雅黑';
          color: #333;
          background: #f5f5f5;
        }
        .detils-one {
          margin: 18px 10px 10px 10px;
          text-align: center;
          font: 400 14px/18px '微软雅黑';
          color: #333;
        }
        .detils-two {
          font: 400 12px/12px '微软雅黑';
          color: #666;
          margin: 10px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          img {
            width: 20px;
            height: 18px;
            margin-left: 4px;
          }
        }
        .detils-there {
          margin: 10px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          img {
            width: 30px;
            height: 20px;
            margin-right: 4px;
          }
          div {
            font: 400 12px/16px '微软雅黑';
            color: #666;
          }
        }
      }
      .detils-right {
        padding-left:20px;
        .right-one {
          font: 400 14px/32px '微软雅黑';
          color: #333;
          padding-left: 8px;
          background: #f5f5f5;
          border-left: 2px solid #0a4c8a;
          display: flex;
          align-items: center;
          img {
            width: 24px;
            height: 32px;
            margin-right: 4px;
          }
        }
        .full-span {
          .half-span {
            width: 100%;
            display: flex;
            align-items: baseline;
            margin-top: 10px;
            .half-title {
              display: inline-block;
              text-align: right;
              color: #999;
              width:300px;
              white-space: nowrap;
            }
            .half-content {
              display: inline-block;
              color: #333;
              flex: 1;
            }
          }
        }
      }
      .detils-img {
        border-top:1px solid #999;
        padding: 0 10px;
        div {
          margin: 10px  0;
        }
        img {
          margin-bottom: 10px;
          width: 100%;
        }
      }
    }
    .dictionary-form {
      .el-input-number--small {
        width: 100%;
      }
      .el-select {
        width: 100%;
      }
    }
    .el-input-number--small {
      width: 100%;
    }
  }
</style>
