<template>
  <div class="check-password">
    <div class="input-span">
      <span id="one" />
      <span id="two" />
      <span id="three" />
    </div>
    <div id="font">
      <span>弱</span>
      <span>中</span>
      <span>强</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    password: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      msgText: ''
    }
  },
  watch: {
    password(newname, oldname) {
      this.msgText = this.checkStrong(newname)
      if (this.msgText > 1 || this.msgText === 1) {
        document.getElementById('one').style.background = '#fa5151'
      } else {
        document.getElementById('one').style.background = '#eee'
      }
      if (this.msgText > 2 || this.msgText === 2) {
        document.getElementById('two').style.background = '#ff9000'
      } else {
        document.getElementById('two').style.background = '#eee'
      }
      if (this.msgText === 4) {
        document.getElementById('three').style.background = '#03AF1B'
      } else {
        document.getElementById('three').style.background = '#eee'
      }
    }
  },
  methods: {
    checkStrong(sValue) {
      var modes = 0
      // var character = /([`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]|[a-z]|[A-Z])/
      // if (sValue.length < 1) return modes
      // if (/\d/.test(sValue) && sValue.length <= 8) modes = 1
      // if (/(\d)/.test(sValue) && character.test(sValue) && sValue.length <= 8 || /\d/.test(sValue) && sValue.length > 8) modes = 2
      // if (/\d/.test(sValue) && character.test(sValue) && sValue.length > 8) modes = 3
      var character = /([`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、])/
      if (/\d/.test(sValue) || /[a-z]/.test(sValue)) modes = 1
      if (/\d/.test(sValue) && /[a-z]/.test(sValue) && /[A-Z]/.test(sValue) || /\d/.test(sValue) && /[a-z]/.test(sValue) && character.test(sValue) || /\d/.test(sValue) && /[A-Z]/.test(sValue) && character.test(sValue)) modes = 2
      if (/\d/.test(sValue) && /[a-z]/.test(sValue) && /[A-Z]/.test(sValue) && character.test(sValue)) modes = 4
      // 逻辑处理
      switch (modes) {
        case 1:
          return 1
        case 2:
          return 2
        case 3:
          return 3
        case 4:
          return sValue.length < 4 ? 3 : 4
      }
      return modes
    }
  }
}
</script>

<style scoped>
.check-password {
  margin-bottom: 5px;
}

.input-span {
  line-height: 18px !important;
}

.input-span span {
  display: inline-block;
  width: 85px;
  height: 10px;
  background: #eee;
}

#one {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-right: 0px solid;
  margin-right: 3px;
}

#two {
  border-left: 0px solid;
  border-right: 0px solid;
  margin-left: -5px;
  margin-right: 3px;
}
#three {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-left: 0px solid;
  margin-left: -5px;
}
#font {
  line-height: 8px !important;
}
#font span:nth-child(1) {
  color: #fa5151;
  margin-left: 40px;
}
#font span:nth-child(2) {
  color: #ff9000;
  margin: 0 60px;
}
#font span:nth-child(3) {
  color: #03AF1B;
  margin-left: 10px;
}
</style>
