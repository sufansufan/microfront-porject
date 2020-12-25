// 手机号
export function validatePhone(phone) {
  const reg = /^1[234567890]\d{9}$/
  return reg.test(phone)
}
export function validateNumPhone(phone) {
  const reg = /^\d{11}$/
  return reg.test(phone)
}
// 校验手机或座机
export function validateLandline(phone) {
  const reg = /^((0\d{2,3}-?\d{7,8})|(1[23465789]\d{9}))$/
  return reg.test(phone)
}

/* 数字 */
export function validateNumber(number) {
  const reg = /^[0-9]+$/
  return reg.test(number)
}

// 多位手机号
export function validateMorePhone(phone) {
  const reg = /(^(\d{11}){1}$)|(^(\d{11},)+(\d{11})$)/
  return reg.test(phone)
}

// 身份证验证
export function validateID(ID) {
  const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  return reg.test(ID)
}

// 固定电话 正确格式为：XXXX-XXXXXXX，XXXX-XXXXXXXX，XXX-XXXXXXX，XXX-XXXXXXXX，XXXXXXX，XXXXXXXX
export function validateFixedPhone(phone) {
  const reg = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/
  return reg.test(phone)
}

// 邮箱验证
export function validateEmail(mail) {
  const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  return reg.test(mail)
}

// 正数 保留两位小数
export function validatePositive(number) {
  const reg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/
  return reg.test(number)
}

// 正整数
export function validateInteger(number) {
  const reg = /(^[1-9]\d*$)/
  return reg.test(number)
}
// 大于0
export function validateDecimal(number) {
  const reg = /^(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)$/
  return reg.test(number)
}

// /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/

// 域名 domainName
export function validateDomain(domain) {
  const reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/
  return reg.test(domain)
}

// 文本域，输入框长度校验：min:最小长度 max:最大长度
export function validateLength(min, max) {
  if (min) {
    return {
      min: min,
      max: max,
      message: '长度在 ' + min + ' 到 ' + max + ' 个字符',
      trigger: 'blur'
    }
  } else {
    return {
      min: min,
      max: max,
      message: '最大长度 ' + max + ' 个字符',
      trigger: 'blur'
    }
  }
}
// 工号检验 不能以0开头 限制8位
export function validateJobNum(number) {
  const reg = /^[1-9]\d{2,7}$/
  return reg.test(number)
}
// 调整价格校验 大于0小于100保留两位小数
export function validateDown(number) {
  const reg = /^0\.\d[1-9]$|^0\.[1-9]\d$|^[1-9](\.\d{1,2})?$|^[1-9]\d(\.\d{1,2})?$/
  return reg.test(number)
}
// 调整价格校验 大于0小于10000保留两位小数
export function validateUp(number) {
  const reg = /(^[1-9]\d{0,3}$)|(^0\.\d{2}$)|(^[1-9]\d{0,3}\.\d{2}$)/
  return reg.test(number)
}

// 价格校验十位数字 保留两位小数
export function validatePrice(number) {
  const reg = /^0\.([1-9]|\d[1-9])$|^[1-9]\d{1,12}\.\d{0,2}$|^[1-9]\d{1,11}$/
  return reg.test(number)
}

// 设备序列号
export function validateSerial(value) {
  const valueReplace = value.replace(/，/g, ',')
  const valueSplit = valueReplace.split(',')
  const existEmpty = valueSplit.filter(item => item === '')
  if (existEmpty.length) return false
  if (valueSplit[valueSplit.length - 1] === '') return false
  return true
}

//  关键字
export function validateKeyword(value) {
  const valueReplace = value.replace(/，/g, ',')
  const valueSplit = valueReplace.split(',')
  const flag = valueSplit.every(item => item.length <= 10)
  const existEmpty = valueSplit.filter(item => item === '')
  if (existEmpty.length) return false
  if (flag === false) return false
  if (!valueSplit.length) return false
  if (valueSplit[valueSplit.length - 1] === '') return false
  return true
}
// 只能是数字和字母
export function validateCodeNum(number) {
  const reg = /^[0-9a-zA-Z]+$/
  return reg.test(number)
}

export function toDecimal(num, decimal) {
  if (num === '') {
    return ''
  } else {
    num = num.toString()
    const index = num.indexOf('.')
    if (index !== -1) {
      num = num.substring(0, decimal + index + 1)
    } else {
      num = num.substring(0)
    }
    return parseFloat(num).toFixed(decimal)
  }
}

/**
 * 表单失去焦点校验唯一性
 * @param cb 接口的回调函数
 * @param type 提示语类型
 */
const messageList = [{
  name: '企业编号',
  value: '01'
},
{
  name: '统一社会信用代码',
  value: '02'
},
{
  name: '产品编码',
  value: '03'
},
{
  name: '合同编号',
  value: '04'
},
{
  name: '协议编号',
  value: '05'
},
{
  name: '编号',
  value: '06'
},
{
  name: '名称',
  value: '07'
}
]

export function validateOnlyCode(rule, value, callback, cb, type) {
  const messageItem = messageList.find(item => item.value === type).name + '不能重复'
  cb.then(({
    data
  }) => {
    data === true ? callback() : callback(messageItem)
  })
}
// 大于等于0
export function validateNum(number) {
  const reg = /^\d+(?=\.{0,1}\d+$|$)/
  return reg.test(number)
}

// 大于0
export function validatePeriod(number) {
  const reg = /^\+?[1-9][0-9]*$/
  return reg.test(number)
}

/**
 * 校验rule价格
 */
export function validateRulePrice(rule, value, callback) {
  if (!validatePrice(value)) {
    if (parseFloat(value) <= parseFloat(0)) {
      callback(new Error('只能输入大于0的金额'))
    } else if (parseFloat(value) > parseFloat(9999999999.99)) {
      callback(new Error('只能输入小于等于9999999999.99的金额'))
    } else {
      callback()
    }
  } else {
    if (Number(value) <= 0) {
      callback(new Error('只能输入大于0的金额'))
    } else if (Number(value) > 9999999999.99) {
      callback(new Error('只能输入小于等于9999999999.99的金额'))
    } else {
      callback()
    }
  }
}
export function validatePriceZero(rule, value, callback) {
  if (!validatePrice(value)) {
    if (parseFloat(value) < parseFloat(0)) {
      callback(new Error('只能输入大于等于0的金额'))
    } else if (parseFloat(value) > parseFloat(9999999999.99)) {
      callback(new Error('只能输入小于等于9999999999.99的金额'))
    } else {
      callback()
    }
  } else {
    if (Number(value) < 0) {
      callback(new Error('只能输入大于等于0的金额'))
    } else if (Number(value) > 9999999999.99) {
      callback(new Error('只能输入小于等于9999999999.99的金额'))
    } else {
      callback()
    }
  }
}
/**
 * 失去焦点检验价格
 */
import {
  Message
} from 'element-ui'
export function validateBlurPrice(value) {
  if (!validatePrice(value)) {
    if (value <= 0.00) {
      Message.warning('只能输入大于0的金额')
      return false
    } else if (value > 9999999999.99) {
      Message.warning('只能输入小于等于9999999999.99的金额')
      return false
    }
  } else {
    if (value <= 0.00) {
      Message.warning('只能输入大于0的金额')
      return false
    } else if (value > 9999999999.99) {
      Message.warning('只能输入小于等于9999999999.99的金额')
      return false
    }
  }
}
