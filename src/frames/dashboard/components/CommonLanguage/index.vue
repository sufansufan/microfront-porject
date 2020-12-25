<template>
  <div class="common-language">
    <div class="common-add">
      <el-input v-model="commonValue" placeholder="请输入常用语" clearable />
      <div class="common-box" @click="addCommon">
        <i class="el-icon-plus" />
      </div>
    </div>
    <div class="tag">
      <div v-for="(tag, index) in tagsList" :key="index">
        <el-tag closable @close="handleClose(index)"> {{ tag }}</el-tag>
      </div>
    </div>
    <div class="btn">
      <el-button type="primary" @click="submit">保存</el-button>
    </div>
  </div>
</template>

<script>
import { languageSave, languageList } from '@core/api/personelSet'
export default {
  data() {
    return {
      commonValue: '',
      tagsList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      languageList().then(({ data }) => {
        data.forEach(item => {
          this.tagsList.push(item.content)
        })
      })
    },
    handleClose(index) {
      this.tagsList.splice(index, 1)
    },
    addCommon() {
      if (this.tagsList.length > 20) {
        this.$message.warning('常用语不能超过20条')
        return
      }
      if (this.commonValue.length > 20) {
        this.$message.warning('常用语文字不能超过20个字')
        return
      }
      if (this.commonValue) {
        this.tagsList.push(this.commonValue)
        this.commonValue = ''
      } else {
        this.$message.warning('请输入常用语')
        return
      }
    },
    submit() {
      languageSave(this.tagsList).then(res => {
        this.$message.success('保存成功')
        this.$emit('closeDialog', 'languageDialog')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.common-language {
  .common-add {
    display: flex;
    .common-box {
      width: 30px;
      height: 30px;
      color: #fff;
      background: @primary;
      line-height: 30px;
      text-align: center;
      font-size: 20px;
      margin-left: 10px;
      border-radius: 4px;
    }
  }
  .tag {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    & > div {
      margin-right: 20px;
      margin-top: 10px;
    }
  }
  .btn {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px
  }
}
</style>

<style lang="less">
.common-language {
  .el-tag {
    background-color: #fff;
    border-color: @primary;
    color: @primary;
  }
  .el-tag--small {
    line-height: 26px;
    height: 26px;
  }
  .el-tag .el-tag__close {
    color: #fff;
    background-color: #ed5353;
    top: -13px;
    right: -15px;
    &:hover {
      background-color: #ed5353;
    }
  }
}

</style>
