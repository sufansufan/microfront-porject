<template>
  <div class="add-meetting-room">
    <el-form label-width="110px" :rules="rules" :model="ruleform" class="resorce-form">
      <el-form-item label="会议室编号" prop="romnumber">
        <el-input v-model="ruleform.romnumber" placeholder="请输入" class="full-width" />
      </el-form-item>
      <el-form-item label="会议室名称" prop="romname">
        <el-input v-model="ruleform.romname" placeholder="请输入" class="full-width" />
      </el-form-item>
      <el-form-item label="会议室归属" prop="rombelong">
        <el-select v-model="ruleform.rombelong" placeholder="请选择" class="full-width">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="归属单位" prop="rombelongorg">
        <el-select v-model="ruleform.rombelongorg" placeholder="请选择" class="full-width">
          <el-option v-for="item in optionsOrg" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="视频会议" prop="romtype">
        <el-select v-model="ruleform.romtype" placeholder="请选择" class="full-width">
          <el-option v-for="item in optionsType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="视频监控" prop="surveillance">
        <el-input v-model="ruleform.surveillance" placeholder="请输入" class="full-width" />
      </el-form-item>
      <el-form-item label="会议室地址" prop="romaddress" class="purpose">
        <el-input v-model="ruleform.romaddress" placeholder="请输入" class="full-width" />
      </el-form-item>
      <el-form-item label="管理员" prop="romadmin">
        <el-input v-model="ruleform.romadmin" placeholder="请输入" class="full-width" />
      </el-form-item>
      <el-form-item label="联系电话" prop="romtel">
        <el-input v-model="ruleform.romtel" placeholder="请输入" class="full-width" />
      </el-form-item>
      <el-form-item label="可容纳人数" prop="romcapacity">
        <el-input v-model="ruleform.romcapacity" placeholder="请输入" class="full-width" />
      </el-form-item>
      <el-form-item label="状态" prop="romstate">
        <el-select v-model="ruleform.romstate" placeholder="请选择" class="full-width">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="拥有设备" prop="romdevices" class="purpose">
        <el-checkbox-group v-model="checkList" class="full-width">
          <el-checkbox label="投影仪" />
          <el-checkbox label="无线网络" />
          <el-checkbox label="有线网络" />
          <el-checkbox label="液晶电视" />
          <el-checkbox label="音响" />
          <el-checkbox label="麦克风" />
          <el-checkbox label="空调" />
          <el-checkbox label="其他设备" />
          <el-input v-model="ruleform.romdevices" placeholder="请输入" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="录入人" prop="entry">
        <el-input v-model="ruleform.entry" placeholder="请输入" class="full-width" />
      </el-form-item>
      <el-form-item label="录入时间" prop="entryTime">
        <el-input v-model="ruleform.entryTime" placeholder="请输入" class="full-width" />
      </el-form-item>

      <div class="btn">
        <el-button type="primary">保存</el-button>
        <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'MeettingRoomDetail',
  components: {},
  data() {
    return {
      ruleform: { // 附件暂且搁置
        romnumber: '',
        romname: '',
        rombelong: '',
        rombelongorg: '',
        romtype: '',
        surveillance: '',
        romaddress: '',
        romadmin: '',
        romtel: '',
        romcapacity: '',
        romstate: '',
        romdevices: '',
        entry: '',
        entryTime: ''
      },
      rules: {
        romnumber: [{
          required: true,
          message: '请填写'
        }],
        romname: [{
          required: true,
          message: '请填写'
        }],
        rombelong: [{
          required: true,
          message: '请选择'
        }],
        rombelongorg: [{
          required: true,
          message: '请选择'
        }],
        surveillance: [{
          required: true,
          message: '请选择'
        }],
        romtype: [{
          required: true,
          message: '请选择'
        }],
        romaddress: [{
          required: true,
          message: '请填写'
        }],
        romcapacity: [{
          required: true,
          message: '请填写'
        }]

      },
      options: [{
        value: '0',
        label: '公司'
      },
      {
        value: '1',
        label: '分公司'
      },
      {
        value: '2',
        label: '项目部'
      }
      ],
      optionsOrg: [{
        value: '0',
        label: '分公司名称'
      },
      {
        value: '2',
        label: '项目部名称'
      }
      ],
      optionsType: [{
        value: '0',
        label: '支持'
      },
      {
        value: '2',
        label: '不支持'
      }
      ],
      ProductActive: null
    }
  },

  methods: {
    changeProduct(event) {
      this.ProductActive = event
    }
  }
}
</script>

<style lang="less">
  .add-meetting-room {
    padding: 20px;
    height: calc(100vh - 160px);
    overflow-y: auto;
    .resorce-form {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .el-form-item {
        width: 49%;
        .full-width {
          width: 100%;
        }
      }
      .purpose {
        width: 100%;
        .full-line {
          width: 100%;
        }
      }
      .text {
        color: #333;
      }
      .btn {
        width: 100%;
        text-align: center;
        margin-top: 20px;
      }
    }
  }
</style>
