<template>
  <div class="enterprise-mall">
    <div class="enterprise-head">
      <div class="head-left">
        <cate-gory />
      </div>
      <div class="head-center">
        <el-input v-model="input3" placeholder="请输入产品名称" style="width: 50vw;" size="medium">
          <el-select slot="prepend" v-model="select" placeholder="请选择" style="width: 100px;">
            <el-option label="产品" value="1" />
            <el-option label="供应商" value="2" />
          </el-select>
          <el-button slot="append" type="primary" style="width: 70px;">搜索</el-button>
        </el-input>
      </div>
      <div class="head-right">
        <div class="right-list" @click="changeGo()">
          <img src="http://b2-q.mafengwo.net/s5/M00/91/06/wKgB3FH_RVuATULaAAH7UzpKp6043.jpeg" alt="">
          <span>订单</span>
        </div>
        <div class="right-list" @click="goCart()">
          <img src="http://b2-q.mafengwo.net/s5/M00/91/06/wKgB3FH_RVuATULaAAH7UzpKp6043.jpeg" alt="">
          <span>购物车</span>
        </div>
        <div class="right-list" @click="goCmparison()">
          <img src="http://b2-q.mafengwo.net/s5/M00/91/06/wKgB3FH_RVuATULaAAH7UzpKp6043.jpeg" alt="">
          <span>对比</span>
        </div>
      </div>
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import CateGory from './components/Category'
export default {
  name: '',
  components: { CateGory },
  data() {
    return {
      select: '1',
      input3: '',
      value: [],
      options: [],
      deliveryState: 'default'
    }
  },
  methods: {
    changeGo() {
      this.$router.push('/shoppingMall/merchandiseOrder')
    },
    goCart() {
      this.$router.push('/shoppingMall/enterpriseMall/shoppingCart')
    },
    goCmparison() {
      this.$router.push('/shoppingMall/enterpriseMall/productComparison')
    }

  }
}
</script>

<style lang="less" scoped>
  .enterprise-mall {
    .enterprise-head {
      width: 100%;
      height: 55px;
      border-bottom: 1px solid #0a4c8a;
      display: flex;
      align-items: center;
      justify-content:space-around;
      .head-left {
        width: 180px;
        height: 55px;
      }
      .head-center {
        flex: 1;
        padding:0 40px 0 15px;
        display: flex;
        .el-select .el-input {
          width: 130px;
        }
        .el-input__inner {
          color:black;
        }
        .input-with-select {
          border: 2px solid #0a4c8a;
          border-left:1px solid #ccc;
        }
        .el-input-group__prepend {
          border-right:none;
          border-left:1px solid #0a4c8a;
        }
        .input-with-select .el-input-group__prepend {
          background-color: #fff;
        }
        .el-button--primary {
          background-color: #0a4c8a;
          color: #fff;
          border-radius: 0;
        }
        .el-icon-arrow-up:before {
            content: "\e6e1";
            color: black;
        }
      }
      .head-right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .right-list {
          display: flex;
          align-items: center;
          margin-right: 20px;
          cursor: pointer;
          img {
            width: 16px;
            height: 16px;
            margin-right: 4px;
          }
          span {
            font: 400 12px/12px '微软雅黑';
            color: #666;
          }
        }
      }
    }
  }
</style>

<style lang="less">
.enterprise-mall {
  .head-center {
    .el-input__inner {
      border: 2px solid #0a4c8a;
      border-left: 1px solid #ccc;
    }
    .el-input-group__append {
      background-color: #0a4c8a;
      color: #fff;
      border: 2px solid #0a4c8a;
    }
    .el-input-group__prepend {
      border: 2px solid #0a4c8a;
      border-right: 0;
      color: #333;
      background-color: #fff;
    }
  }
}
</style>
