<template>
  <div class="platform-details">
    <div class="search">
      <div style="margin:0 0 15px 15px;">
        <el-button class="back-btn" @click="backGo()"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
      </div>
    </div>
    <div>
      <el-table :data="tableData" stripe style="width: 100%" show-summary :summary-method="getTolle">
        <el-table-column prop="date" label="设备图片" width="180" align="center">
          <template slot-scope="scope">
            <img style="width:100px;height:100px;" src="http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="deviceName" label="设备名称" width="180" align="center" />
        <el-table-column prop="address" label="设备类型" align="center" />
        <el-table-column prop="date" label="品牌" width="180" align="center" />
        <el-table-column prop="name" label="规格型号" width="180" align="center" />
        <el-table-column prop="address" label="机型" align="center" />
        <el-table-column prop="date" label="单价" width="180" align="center" />
        <el-table-column prop="num" label="购买数量" width="180" align="center">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.num" :min="1" :max="10" label="描述文字" @change="handleChange" />
          </template>
        </el-table-column>
        <el-table-column prop="address" label="金额" align="center" />
      </el-table>
      <div class="equipment">
        <div>已选设备种类：<span>0</span>种</div>
        <div>数量合计：<span>0</span>台</div>
        <div>金额总计（含运费）：<span class="equipment-money">¥0.00</span></div>
      </div>
    </div>
    <div class="form-border">
      <el-form :rules="rules" :model="ruleform" label-width="150px" class="dictionary-form">
        <el-form-item label="收货人" prop="number" class="there-points">
          <el-select v-model="value" placeholder="请选择" disabled>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="收货地区" prop="number" class="there-points">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="收货地址" prop="number" class="there-points">
          <el-input v-model="ruleform.number" disabled placeholder="请输入" />
        </el-form-item>
        <el-form-item label="是否开具发票" prop="name" class="there-points" style="margin-right:30%;">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="订单备注" prop="remark" class="full-item">
          <el-input v-model="ruleform.remark" disabled type="textarea" :rows="2" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div style="height:40px;" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlatformDetails',
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          deviceName: '人脸识别机（支持ID卡）',
          num: 1
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          deviceName: '人脸识别机（支持ID卡）',
          num: 1
        }
      ],
      ruleform: {
        number: 111,
        available: false,
        name: '1334',
        serviceurl: '',
        servicerule: '',
        remark: '',
        money: ''
      },
      rules: {
        number: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    backGo() {
      this.$router.push('/devicePurchase/platformOrder')
    }
  }
}
</script>

<style lang="less" scoped>
  .platform-details {
    padding: 12px;
    height: calc(100% - 100px);
    overflow-y: scroll;
    .platform-top {
      margin:10px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .platform-warning {
        color: rgb(255, 51, 51);
        font-size: 12px;
      }
    }
    .dictionary-form {
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
      .full-item {
        width: 100%;
        .text {
          color:@primary;
          margin-left: 17px;
          li{
            list-style-type: disc!important;
            text-decoration: underline!important;
          }
        }
      }
      .there-points {
        width: 33.3%;
        .el-form-item__content {
          display: flex;
          .is-disabled {
            width: 100%;
          }
          .el-select {
            width: 100%;
          }
        }
      }

    }
    .equipment {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font: 17px;
      margin-bottom: 24px;
      & > div{
          margin-right: 12px;
        .equipment-money {
          color: rgb(255, 0, 0);
        }
      }
    }
  }
</style>
