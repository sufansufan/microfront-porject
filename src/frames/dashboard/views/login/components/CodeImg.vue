<template>
  <canvas
    id="codeimg"
    ref="codeimg"
    class="codeimg"
    onselectstart="return false;"
    @click="createCode"
  />
</template>

<script>
export default {
  data() {
    return {
      verifyCode: '',
      verifyCodeInp: ''
    }
  },
  mounted() {
    this.createCode()
  },
  methods: {
    createCode() {
      var lineColorArr = [
        '#7D9EC0',
        '#8B5A2B',
        '#96CDCD',
        '#C6E2FF',
        '#B4EEB4',
        '#E0EEE0',
        '#2F4F4F',
        '#B0C4DE',
        '#CDC9A5',
        '#2F4F4F'
      ]
      // var canvas = document.getElementById('codeimg')
      var canvas = this.$refs.codeimg
      var context = canvas.getContext('2d')
      context.strokeStyle = '#E8F0FE' // 背景颜色
      context.fillStyle = '#666666' // 验证码字体颜色
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.strokeRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < 108; i++) {
        const color = lineColorArr[Math.floor(Math.random() * 10)]
        this.drawline(canvas, context, color)
      }
      var codeChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      var codeLength = 4
      this.verifyCode = ''
      this.verifyCodeInp = ''
      for (let i = 0; i < codeLength; i++) {
        context.font = '76px Arial'
        // 将初始状态保存
        context.save()
        // 获得-1到1的随机数
        var rA = 1 - Math.random() * 2
        // 获取随机倾斜角
        var angle = rA / 8

        var charNum = Math.floor(Math.random() * 10)
        var charStr = codeChars[charNum]
        // 旋转生成的随机字符
        context.rotate(angle)
        // 把rand()生成的随机数文本依次填充到canvas中，注意x坐标
        context.fillText(charStr, 60 + 45 * i, 100)
        // 恢复初始状态，以便下一次循环
        context.restore()
        this.verifyCode += charStr
      }
    },
    drawline(canvas, context, color) {
      // 若省略beginPath，则每点击一次验证码会累积干扰线的条数
      context.beginPath()
      // 起点与终点在canvas宽高内随机
      context.moveTo(
        Math.floor(Math.random() * canvas.width),
        Math.floor(Math.random() * canvas.height)
      )
      context.lineTo(
        Math.floor(Math.random() * canvas.width),
        Math.floor(Math.random() * canvas.height)
      )
      context.lineWidth = 1
      context.strokeStyle = color // 干扰线颜色(单条)
      context.stroke()
    }
  }
}
</script>

<style lang="less" scoped>
#codeimg {
  width: 120px;
  height: 44px;
  margin-left: 2px;
}
</style>
