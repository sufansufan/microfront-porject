<template>
  <div class="shopping-preview">
    <div class="shopping-preview-container">
      <div class="image-container">
        <div v-viewer class="image">
          <img :src="imageUrl" class="image-gesture">
        </div>
        <div class="image-right">
          <div class="title">{{ content.name }}  </div>
          <div class="dec">{{ content.subtitle }}</div>
          <div class="price-container">
            <span>市场价 </span>
            <span class="price"><span style="font-size: 16px">￥</span>{{ content.price | changNumber }} </span>
            <span style="font-size: 14px"> /{{ content.unit }}</span>
          </div>
          <div class="content-container">
            <div class="content-title">
              <div>产品分类：{{ content.productClassifyName }}</div>
              <div>品牌：{{ content.brandName }}</div>
            </div>
            <div class="attribute">
              产品属性：{{ content.productAttribute }}
            </div>
            <div class="attribute">
              规格型号：{{ content.model }}
            </div>
            <div class="content-footer">
              <slot name="footerBtn" />
            </div>
          </div>
        </div>
      </div>
      <ul class="thumb-container">
        <li v-for="item in content.imgList" :key="item.id" :class="{active: item.fileUrl === imageUrl} " @click="imageChanage(item.fileUrl)">
          <img :src="item.fileUrl" alt="">
        </li>
      </ul>
      <div class="shopping-content">
        <div>
          <div class="company-info">
            <div class="title">
              <i class="iconfont icon-qiye1" />
              <span>厂商信息</span>
            </div>
            <div class="content">
              <div class="name">{{ companyInfo.orgName }}</div>
              <div class="business-info">工商注册信息：已认证  <i class="iconfont icon-renzheng" /></div>
              <div>所在地区：{{ companyInfo.registeredPlaceName }}</div>
              <hr class="line">
              <div>联系人：{{ companyInfo.legalPersonName }}</div>
              <div class="tel"><span>电</span>话：{{ companyInfo.telephone }}</div>
            </div>
          </div>
        </div>
        <div class="shopping-dec">
          <el-tabs v-model="activeName" type="card" class="three-card-tabs">
            <el-tab-pane label="详细信息" name="detailsInfo">
              <template v-if="content.productDesc">
                <div v-html="content.productDesc" />
              </template>
              <template v-else>
                <not-content name="notData" />
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSessionStorage } from '@core/utils/auth'
import NotContent from '@frames/dashboard/components/NotContent/index.vue'
import { handleMoney } from '@core/utils'
import { mapGetters } from 'vuex'
export default {
  components: {
    NotContent
  },
  filters: {
    changNumber(val) {
      return handleMoney(val, 'y-m-d')
    }
  },
  props: {
    content: {
      type: Object,
      default: () => {},
      required: true
    }
  },

  data() {
    return {
      activeName: 'detailsInfo',
      imageUrl: '',
      companyInfo: {}
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  watch: {
    content: {
      handler() {
        if (this.content) {
          if (this.content.imgList.length) {
            this.imageUrl = this.content.imgList[0].fileUrl
          } else {
            this.imageUrl = require('./image/noPicture.png')
          }
        }
      },
      immediate: true,
      deep: true
    }
  },

  created() {
    this.companyInfo = JSON.parse(getSessionStorage('organization'))
  },
  methods: {
    imageChanage(url) {
      this.imageUrl = url
    }
  }
}
</script>

<style lang="less" scoped>
.contentColor() {
  color: #666666;
}
.boxMarginTop () {
  margin-top: 6px;
}
.shopping-preview {
  padding: 10px;
  display: flex;
  justify-content: center;
  height: calc(100vh - 140px);
  overflow-y: auto;
  &-container {
    width: 65%;
    height: auto;

    & > .image-container {
      display: flex;
      justify-content: space-between;
    }
    .image {
      width: 400px;
      height: 400px;
      background: #eee;
      overflow: hidden;
      &-gesture {
        width: 100%;
        height: 100%;
        object-fit: scale-down;
        cursor: pointer;
      }
    }
    .image-right {
      color: #333333;
      font-size: 14px;
      width: calc(100% - 410px);
      padding-top: 5px;
      .title {
        font-weight: bold;
      }
      .dec {
        line-height: 17px;
        height: 34px;
        .contentColor();
        .boxMarginTop()
      }
      .price-container {
        height: 50px;
        background: #FFF2E8;
        display: flex;
        align-items: center;
        .boxMarginTop();
        padding: 0px 10px;
        .price {
          color: #FA5151;
          font-size: 20px;
          font-weight: bold;
          margin: 0 3px;
        }
      }
      .content-container {
        .boxMarginTop();
        height: 252px;
        background: #F5F5F5;
        padding: 10px;
        position: relative;
        .content-title {
          display: flex;
          & > div {
            width: 40%;
            &:last-child {
              width: 60%;
            }
          }
        }
        .attribute {
          line-height: 17px;
          margin-top: 10px;
        }
        .content-footer {
          position: absolute;
          left: 10px;
          bottom: 10px;
        }
      }
    }
    .thumb-container {
      margin-top: 10px;
      width: 350px;
      padding: 0px 25px;
      display: flex;
      & > li {
        width: 60px;
        height: 60px;
        border: 1px solid #c7c7c7;
        margin-left: 10px;
        box-sizing: border-box;
        cursor: pointer;
        &.active {
          border: 2px solid #999999;
        }
        &:first-child {
          margin-left: 0px;
        }
        &:hover {
          border: 2px solid #999999;
        }
        & > img {
          height: 100%;
          width: 100%;
          object-fit: scale-down;
        }
      }
    }
    .shopping-content {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      .company-info {
        width: 200px;
        .title {
          height: 30px;
          background: #eee;
          padding: 0 10px;
          display: flex;
          align-items: center;
          & > i {
            font-size: 16px;
            color: #0a4c8a;
          }
          & > span {
            margin-left: 5px;
          }
        }
        & > .content {
          height: 200px;
          width: 200px;
          box-sizing: border-box;
          border: 1px solid #ccc;
          font-size: 12px;
          padding: 0px 10px;
          & > .name {
            font-weight: bold;
            width: 169px;
            margin: 20px auto 10px;
            line-height: 15px;
            text-align: center;
          }
          & > .business-info {
            & > i {
              font-size: 16px;
              color: #ff9000;
              margin-top: 4px;
            }
          }
          & > .line {
            margin: 10px 0px;
          }
          & > .tel {
            & > span {
              margin-right: 12px;
            }
          }
        }
      }
      .shopping-dec {
        width: calc(100% - 210px);
      }
    }
  }
  .image-dialog {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
  }
}
</style>
