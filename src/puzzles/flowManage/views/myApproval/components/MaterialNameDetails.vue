<template>
  <div class="material-name-details">
    <div class="product">
      <div class="product_image">
        <div style="width: 440px;height: 440px">
          <img :src="ImgUrl" style="width: 100%;height: 100%">
        </div>
        <div class="little_img" style="width：440px;height:90px;">
          <ul v-for="img in imgUrl" :key="img.index">
            <li style="float:left;padding:10px;" @click="getIndex(img.url)">
              <img :src="img.url" style="width: 80px; height: 80px">
            </li>
          </ul>
        </div>
      </div>
      <div class="product_info" style="margin-left:20px;">
        <p class="title">1023清新建产品</p>
        <div class="product-price" style="background:#f5f5f5">
          <ul>
            <li>
              <span>合约价</span>
              <span style="color:#e64340;font:700 30px/30px '微软雅黑';">￥200.00</span>
            </li>
            <li>
              <span>市场价</span>￥230.00
              <span />
            </li>
            <li>
              <span>单位</span>
              <span>个</span>
              <span>有效期至</span>
              <span>2020-10-28</span>
            </li>
          </ul>
        </div>
        <div class="product-details">
          <ul>
            <li>
              <span>产品类别</span>
              <span>钢筋</span>
              <span>品牌</span>
              <span>清</span>
            </li>
            <li>
              <span>产品属性</span>
              <span>三级盘螺</span>
            </li>
            <li>
              <span>规格型号</span>
              <span>10*10</span>
              <span>库存量</span>
              <span>2020-10-28</span>
            </li>
          </ul>
        </div>
        <div style="text-align:center">
          <el-button class="back-btn" @click="$emit('changeTabConent', 'materialname', 'default')"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
        </div>
      </div>
    </div>
    <div class="describe">
      <div class="about-us" style="width:200px;height:238px;border:1px solid #ddd;">
        <div class="title" style="text-align:center;">关于供应商</div>
        <div
          class="name"
          style="text-align:center;padding:10px 0;color:#333;font:400 14px/18px '微软雅黑'"
        >西安速卖达科贸有限公司</div>
        <div class="info1">
          <span>工商注册信息</span>
          <span>已认证</span>
        </div>
        <div class="info1">
          <span>所在地区</span>
          <span>天津市天津市河西区</span>
        </div>
        <div class="info2">刘-供应商</div>
        <div class="info2">15029488156</div>
        <div class="info2">刘-供应商</div>
        <div class="info2">18792592535</div>
      </div>
      <div style="margin-left:20px;width:80%">
        <div class="product_desc">
          <div class="title" style="padding-left:8px;border-left:2px solid #0a4c8a">详细信息</div>
          <div class="info">
            <ul>
              <li>
                <span>产品名称</span>
                <span>1023清新建产品</span>
                <span>市场价</span>
                <span>230.00</span>
              </li>
              <li>
                <span>产品分类</span>
                <span>钢筋</span>
                <span>合约价</span>
                <span>200.00</span>
              </li>
              <li>
                <span>品牌</span>
                <span>清</span>
                <span>报价日期</span>
                <span>2020-10-28</span>
              </li>
              <li>
                <span>规格型号</span>
                <span>10*10</span>
                <span>有限期至</span>
                <span>2020-10-28</span>
              </li>
              <li>
                <span>产品属性</span>
                <span>三级</span>
                <span>备注</span>
                <span>发发发</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="dec1">
          <p>产品说这些不重要</p>
          <p>产品说这些不重要</p>
          <p>产品说这些不重要</p>
        </div>
        <div style="width:80%;height:887px">
          <img :src="ImgUrl" style="width: 100%;height: 100%">
        </div>
      </div>
    </div>
    <div class="step" style="margin-top:40px;">
      <process direction="vertical" />
    </div>

  </div>
</template>

<script>
import Process from '@frames/dashboard/components/Process'
export default {
  components: { Process },
  data() {
    return {
      imgUrl: [
        {
          index: 1,
          url:
            'http://img4.imgtn.bdimg.com/it/u=1694681277,1453280371&fm=26&gp=0.jpg'
        },
        {
          index: 2,
          url:
            'http://a1.att.hudong.com/81/71/01300000164151121808718718556.jpg'
        },
        {
          index: 3,
          url:
            'http://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/86d6277f9e2f0708d764066ee924b899a901f27f.jpg'
        }
      ], // 大图片默认显示第一张
      ImgUrl:
        'http://img4.imgtn.bdimg.com/it/u=1694681277,1453280371&fm=26&gp=0.jpg'
    }
  },
  methods: {
    getIndex(imgUrl) {
      this.ImgUrl = imgUrl
    }
  }
}
</script>
<style lang="less" scoped>
.material-name-details {
  padding: 10px 10px 10px 80px;
  .product {
    display: flex;
    .product_info {
      .title {
        font: 700 18px/18px "微软雅黑";
      }
      .product-price,
      .product-details {
        margin: 10px 0;
        padding: 16px 10px 20px 10px;
        ul {
          li {
            span:first-child,
            span:nth-child(3) {
              color: #999;
              display: inline-block;
              width: 60px;
            }
            span:nth-child(2),
            span:nth-child(4) {
              color: #333;
              display: inline-block;
              width: 180px;
            }
          }
        }
      }
    }
  }
  .describe {
    display: flex;
    .about-us,
    .product_desc {
      margin-bottom:20px;
      border-bottom:1px solid #ddd;
      .title {
        font: 400 14px/32px "微软雅黑";
        color: #333;
        background: #f5f5f5;
      }
    }
    .about-us {
      flex:1;
      .info1 {
        span {
          font: 400 12px/12px "微软雅黑";
          color: #666;
          margin: 10px;
        }
      }
      .info2 {
        font: 400 12px/16px "微软雅黑";
        color: #666;
        margin: 12px 10px;
      }
    }
    .product_desc {
      .info {
        ul {
          li {
            span:first-child,
            span:nth-child(3) {
              color: #666;
              display: inline-block;
              width: 60px;
              font: 400 12px/30px "微软雅黑";
              padding-left:20px;
            }
            span:nth-child(2),
            span:nth-child(4) {
              color: #999;
              display: inline-block;
              width: 300px;
              font: 400 12px/30px "微软雅黑";
            }
          }
        }
      }
    }
    .dec1{
      margin-left:20px;
      p{
        color:#303133;
        padding:5px 10px;
      }
    }
  }
}
</style>
