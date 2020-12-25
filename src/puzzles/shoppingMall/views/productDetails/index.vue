<template>
  <div class="product-details">
    <!-- 产品详情 -->
    <div class="box">
      <el-row>
        <el-col :span="8">
          <div class="box-left">
            <img class="full-img" :src="imageViewUrl" alt="">
            <div class="item-img">
              <img v-for="item in productImages" :key="index" :src="item.url" @click="changeImg(item)">
            </div>
          </div>

        </el-col>
        <el-col :span="11">
          <div class="box-right">
            <div class="title">1010无合约价产品</div>
            <div class="detiles">复制产品副标题述：建筑装饰企业反反复复，01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789</div>
            <div style="background: #f5f5f5;margin: 10px 0;padding: 16px 10px">
              <div class="full-span">
                <div class="half-span">
                  <span class="half-title">合约价</span>
                  <span class="half-content" style="color: #e64340;font: 700 30px/30px '微软雅黑';">¥200.00</span>
                </div>
              </div>
              <div class="full-span">
                <div class="half-span">
                  <span class="half-title">市场价</span>
                  <span class="half-content">¥50.00</span>
                </div>
              </div>
              <div class="full-span">
                <div class="half-span">
                  <span class="half-title">单位</span>
                  <span class="half-content">个</span>
                </div>
                <div class="half-span">
                  <span class="half-title">有效期至</span>
                  <span class="half-content">2020-12-12</span>
                </div>
              </div>
            </div>
            <div style="margin: 10px 0;padding: 16px 10px">
              <div class="full-span">
                <div class="half-span">
                  <span class="half-title">产品类别</span>
                  <span class="half-content">1212</span>
                </div>
                <div class="half-span">
                  <span class="half-title">品牌</span>
                  <span class="half-content">324</span>
                </div>
              </div>
              <div class="full-item">
                <span class="half-title">产品属性</span>
                <span class="half-content">复制产品副标题述：建筑装饰企业反反复复，复制产品副标题述：建筑装饰企业反反复复，</span>
              </div>
              <div class="full-span">
                <div class="half-span">
                  <span class="half-title">规格型号</span>
                  <span class="half-content">1212</span>
                </div>
                <div class="half-span">
                  <span class="half-title">库存量</span>
                  <span class="half-content">324</span>
                </div>
              </div>
            </div>
            <div style="text-align:center;margin-top:20px;">
              <el-button class="back-btn" @click="backGo()"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <el-row>
        <el-col :span="5">
          <div class="detils-left">
            <div class="detils-title">关于供应商</div>
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
            <div class="right-one">详细信息</div>
            <div style="margin: 10px 0;padding: 16px 10px">
              <div class="full-span">
                <div class="half-span">
                  <span class="half-title">产品名称：</span>
                  <span class="half-content">个</span>
                </div>
                <div class="half-span">
                  <span class="half-title">市场价：</span>
                  <span class="half-content">2020-12-12</span>
                </div>
              </div>
              <div class="full-span">
                <div class="half-span">
                  <span class="half-title">产品分类：</span>
                  <span class="half-content">个</span>
                </div>
                <div class="half-span">
                  <span class="half-title">合约价：</span>
                  <span class="half-content">2020-12-12</span>
                </div>
              </div>
              <div class="full-span">
                <div class="half-span">
                  <span class="half-title">品牌：</span>
                  <span class="half-content">个</span>
                </div>
                <div class="half-span">
                  <span class="half-title">报价日期：</span>
                  <span class="half-content">2020-12-12</span>
                </div>
              </div>
              <div class="full-span">
                <div class="half-span">
                  <span class="half-title">规格型号：</span>
                  <span class="half-content">个</span>
                </div>
                <div class="half-span">
                  <span class="half-title">有效期至：</span>
                  <span class="half-content">2020-12-12</span>
                </div>
              </div>
              <div class="full-span">
                <div class="half-span">
                  <span class="half-title">产品属性：</span>
                  <span class="half-content">红色/木头，铜铁，哈哈哈木头，铜铁，哈哈哈木头，铜铁，哈哈哈木头，铜铁，哈哈哈木头，铜铁，哈哈哈木头，铜铁，哈哈哈木头，铜铁，哈哈哈/很好很好的</span>
                </div>
                <div class="half-span">
                  <span class="half-title">备注：</span>
                  <span class="half-content">2020-12-12</span>
                </div>
              </div>
            </div>
            <div class="detils-img">
              <div>产品说明是什么呢，随意描述的！！！！！</div>
              <img src="http://a4.att.hudong.com/21/09/01200000026352136359091694357.jpg" alt="">
              <img src="http://a4.att.hudong.com/21/09/01200000026352136359091694357.jpg" alt="">
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <drag-dialog ref="dialog" title="采购数量" width="35%" height="70%">
      <div>
        <el-form :rules="rules" :model="ruleform" label-width="0" class="dictionary-form">
          <el-form-item label="" prop="number" class="ful-points">
            <el-input-number v-model="num" :min="1" :max="10" label="描述文字" @change="handleChange" />
          </el-form-item>

        </el-form>
        <div style="width:100%;margin-top:20px;text-align:right;">
          <el-button type="primary" icon="el-icon-set-up">确认</el-button>
        </div>
      </div>
    </drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
export default {
  components: { DragDialog },
  props: {
    supply: {
      type: Boolean,
      default: false
    },
    supplyList: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
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
      this.$router.go(-1)
      // this.$router.push('/shoppingMall/enterpriseMall/shoppingClassification')
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
  .product-details {
    border: 1px solid #999;
    padding: 0px 20px 10px 20px;
    height: calc(100% - 60px);
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
        padding: 10px 20px;
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
        .full-span {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
          .half-span {
            width: 50%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .half-title {
              display: inline-block;
              text-align: left;
              color: #999;
              width: 70px;
            }
            .half-content {
              display: inline-block;
              color: #333;
              word-break: break-all;
            }
          }
        }
        .full-item {
          display: flex;
          justify-content: flex-start;
          align-items: baseline;
          margin-top: 10px;
          .half-title {
              display: inline-block;
              color: #999;
              width: 70px;
              white-space: nowrap;
            }
            .half-content {
              flex: 1;
              min-width: 100px;
              display: inline-block;
              color: #333;
            }
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
        }
        .full-span {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
          .half-span {
            width: 50%;
            display: flex;
            justify-content: flex-start;
            align-items: baseline;
            .half-title {
              display: inline-block;
              text-align: left;
              color: #999;
              width: 70px;
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
  }
</style>
