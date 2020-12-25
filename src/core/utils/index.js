import { downLoadFile } from '@core/api/accessoryFile'

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

// 向上寻找最近的父组件
/**
 * @params context当前 this
 * @params name 寻找父亲组件实例
 *
 *  */
export function findComponentUpward(context, componentName) {
  let parent = context.$parent
  let name = parent.$options.name

  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent
    if (parent) name = parent.$options.name
  }
  return parent
}

// 根据子集查找父集
/**
 * @params tree tree树形数据
 *
 *  */
export function queryParent(tree, checkName, optionName, childName = 'children', targetName = '') {
  const level = [];
  (function queryParent(data, checkName, parent) {
    Array.isArray(data) &&
    data.forEach((item, index) => {
      if (item[optionName] !== checkName) {
        item[childName] && queryParent(item[childName], checkName, [data, index])
      } else {
        parent && queryParent(tree, parent[0][parent[1]][optionName])
        level.push(targetName === '' ? item[optionName] : item[targetName])
      }
    })
  })(tree, checkName)
  return level
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

// 处理tree children为空的情况
export function treeChildrenEmpty(tree, type = 'children') {
  return tree.map(item => {
    if (item[type] && item[type].length !== 0) {
      treeChildrenEmpty(item[type], type)
    } else {
      delete item[type]
    }
    return item
  })
}

/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export function debounce(func, wait, immediate) {
  let timeout
  return function(...args) {
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) func.apply(this, args)
    } else {
      timeout = setTimeout(() => {
        func.apply(this, args)
      }, wait)
    }
  }
}

// 生成uuid
export function getUuid() {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 32; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  var uuid = s.join('')
  return uuid
}

/**
 * 字典数据把code转换成name
 * @params list list数据
 * @params code 所传的code值
 * @params codeType 查找的list对应的类型 例如 id或者code
 * @params type 返回list中所对应的值
 * */
export function codeChangeName(list, code, codeType = 'code', type = 'name') {
  if (Array.isArray(list)) {
    const row = list.filter(item => (item[codeType] === code))
    if (row.length) {
      return row[0][type]
    }
  }
}

/**
 * 过滤数组没有必要的值
 * @params list 所需的数组
 * @params code 所传的过滤的值即属性， 如果是一个字符串的话，过滤一项， 如果是数组的过滤两个属性的值
 * @params codeType 查找的list对应的类型 例如 id或者code
 * */
export function filterListData(list, code, codeType = 'code') {
  if (Array.isArray(list)) {
    var filterList = list
    const getList = (list, code, codeType) => {
      filterList = list.filter(item => (item[codeType] !== code))
      return filterList
    }
    if (Array.isArray(code)) {
      for (let i = 0; i < code.length; i++) {
        getList(filterList, code[i], codeType)
        if (code.length - 1 === i) return filterList
      }
    } else {
      return getList(list, code, codeType)
    }
  }
}

// 导出excel
export function exportExcel(res, name) {
  if (!res.data) return
  const url = window.URL.createObjectURL(new Blob([res.data]))
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  // 获取文件的名字
  var newName = ''
  var filename = res.headers
  filename = filename['content-disposition']
  filename = filename.split(';')[1].split('filename=')[1].split('.')
  newName = decodeURI(filename[0]) + '.' + filename[1]
  link.setAttribute(
    'download',
    name || newName
  )
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Url打开一个新的页面
export function exportUrl(url, name) {
  if (!url) return
  window.open(url, '_blank') // 新窗口打开外链接
}

/**
 * 获取线上环境的二级域名
 */
export function getProdTwoName() {
  const componyType = window.location.pathname.split('/')
  const twoName = process.env.NODE_ENV === 'development' ? '' : componyType[1]
  return twoName
}

/**
 * 动态生成入库单号
 * @param len 长度
 */
export function getNumberCode(len = 18) {
  if (len < 13) return
  var firstCode = new Date().getTime() + ''
  var codeChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  var endCode = ''
  for (var i = 0; i < len - firstCode.length; i++) {
    var charNum = Math.floor(Math.random() * 10)
    endCode += codeChars[charNum]
  }
  return firstCode + endCode
}

/**
 * 处理searchBar的赋值问题
 * @param selectList 原数据
 * @param indexList 下标数组
 * @param dataList 数据数组
 *
 * */
export function handlerSearchBar(selectList, indexList, dataList) {
  const list = JSON.parse(JSON.stringify(selectList))
  list.map((item, index) => {
    for (const i in indexList) {
      if (index === indexList[i] && item.selectData) {
        item.selectData = dataList[i]
        return item
      }
    }
  })
  return list
}

// 千分符并保留两位小数
export function handleMoney(str) {
  const strNum = Number(str)
  const num = strNum.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  return num
}

/**
 * 深拷贝
 * @param {Object} source
 * */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * 处理平台名称的问题
 */
const jdyList = ['CLGY', 'JZZS', 'QTQY']
const cpfbList = ['SCCS']
export function judgeTitle(organizationDTO) {
  if (!organizationDTO) return ''
  const { mainBusiness } = organizationDTO
  if (getProdTwoName() === 'plm') {
    return '产品全生命周期管理平台'
  }
  if (jdyList.includes(mainBusiness)) {
    return '金斗云智能管理平台'
  } else if (cpfbList.includes(mainBusiness)) {
    return '产品发布平台'
  } else {
    return '金斗云运营管理平台'
  }
}

import { Message, Loading } from 'element-ui'
export function Loadings(text, time = 60 * 1000) {
  const loading = Loading.service({
    lock: true,
    text: text || '正在处理您的操作，请稍候...',
    spinner: 'el-icon-loading',
    color: '#fff',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  setTimeout(() => {
    if (loading.visible) {
      Message.error('请求超时')
      loading.close()
    }
  }, time)
  return loading
}

/**
 * 根据id获取文件流
 * @param id  附件id
 * @param name 附件名称
 **/
export function downLoadById(id, name) {
  downLoadFile(id).then(res => {
    exportExcel(res, name)
  })
}

/**
 * 开始时间的禁止选择
 * @param endDate 结束时间
 * @param isSelf 是否包含本身时间, 默认包含
 **/
export function startPickerDate(endDate, isSelf = true) {
  return {
    disabledDate: (time) => {
      if (endDate) {
        if (isSelf) {
          return time.getTime() > new Date(endDate).getTime()
        } else {
          return time.getTime() > new Date(endDate).getTime() - 3600 * 24 * 1000
        }
      }
    }
  }
}
/**
 * 结束实际的禁止选择
 * @param startDate 开始时间
 * @param isSelf 是否包含本身时间, 默认包含
 **/
export function endPickerDate(startDate, isSelf = true) {
  return {
    disabledDate: (time) => {
      if (startDate) {
        if (isSelf) {
          return time.getTime() < new Date(startDate).getTime()
        } else {
          return time.getTime() < new Date(startDate).getTime() + 3600 * 24 * 1000
        }
      }
    }
  }
}

/**
 * 计算两个时间的差值
 * @param start 开始时间
 * @param end 结束时间
 **/
export function startAndEndValue(start, end) {
  if (start && end) {
    return parseInt((new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24) + 1)
  } else {
    return ''
  }
}
