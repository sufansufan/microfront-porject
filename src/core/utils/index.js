export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || 'y-m-d h:i:s'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/(y|m|d|h|i|s|a)/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}



// 金额格式化
// 金额的格式化s为要格式化的参数（浮点型），n为小数点后保留的位数
export function formatMoney(s, n) {
  n = n > 0 && n <= 20 ? n : 2
  s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''
  var l = s.split('.')[0].split('').reverse()
  var r = s.split('.')[1]
  var t = ''
  for (var i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
  }
  return t.split('').reverse().join('') + '.' + r
}

// 字符串首字母大写
export const strFirstUpper = str =>
  str.replace(/( |^)[a-z]/g, first => first.toUpperCase())

//  Boolean 转成 String 1 or 0
export const booleanChangeString = (obj) => {
  if (typeof (obj) !== 'object') return
  for (const key in obj) {
    if (obj[key] === true) {
      obj[key] = 1
    } else if (obj[key] === false) {
      obj[key] = 0
    }
  }
  return obj
}
