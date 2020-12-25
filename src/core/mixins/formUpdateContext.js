import { codeChangeName, queryParent, parseTime } from '@core/utils'
export default {
  methods: {
    formUpdateContext(val) {
      const { type, selectData, formName, name, value, selectOptions, oldList, modifyList } = val
      var oldName = ''
      var modifyName = ''
      if (type === 'select') {
        const { code, name: selctName } = selectOptions
        var selectDataName = null
        if (typeof (selectData) === 'string') {
          if (selectData.includes('.')) {
            const list = selectData.split('.')
            selectDataName = this[list[0]][list[1]]
          } else {
            selectDataName = this[selectData]
          }
        } else {
          selectDataName = selectData
        }
        oldName = codeChangeName(selectDataName, this.deepRuleForm[formName], code, selctName)
        modifyName = codeChangeName(selectDataName, value, code, selctName)
      }
      if (type === 'cascader') {
        const { code, name: selctName } = selectOptions
        const oldLen = this.deepRuleForm[formName].length ? this.deepRuleForm[formName].length - 1 : ''
        const oldId = this.deepRuleForm[formName][oldLen]
        const newLen = value ? value.length - 1 : ''
        const newId = value[newLen]
        var cascaderDataName = null
        if (typeof (selectData) === 'string') {
          if (selectData.includes('.')) {
            const list = selectData.split('.')
            cascaderDataName = this[list[0]][list[1]]
          } else {
            cascaderDataName = this[selectData]
          }
        } else {
          cascaderDataName = selectData
        }

        oldName = queryParent(cascaderDataName, oldId, code, 'children', selctName).toString().replace(/,/g, '/')
        modifyName = queryParent(cascaderDataName, newId, code, 'children', selctName).toString().replace(/,/g, '/')
      }
      if (type === 'date') {
        oldName = parseTime(this.deepRuleForm[formName], 'y-m-d')
        modifyName = parseTime(value, 'y-m-d')
      }
      if (type === 'input') {
        oldName = this.deepRuleForm[formName]
        modifyName = value
      }
      if (type === 'file') {
        return {
          title: name,
          oldList: oldList && oldList.length ? oldList : [],
          modifyList: modifyList.length ? modifyList : [],
          type
        }
      }
      return {
        title: name,
        oldName,
        modifyName,
        type,
        suf: selectOptions && selectOptions.suf || ''
      }
    },
    getChangeUploadContext(row, formName) {
      if (this.ruleForm[formName].length) {
        const isExitTitle = this.ruleForm[formName].some(v => (v.title === row.title))
        this.ruleForm[formName].forEach((item, index) => {
          if (isExitTitle && item.title === row.title) {
            this.ruleForm[formName].splice(index, 1, row)
          }
        })
        if (!isExitTitle) {
          this.ruleForm[formName].push(row)
        }
      } else {
        this.ruleForm[formName].push(row)
      }
    },

    getChangeUploadContext2(row, content) {
      if (content.length) {
        const isExitTitle = content.some(v => (v.title === row.title))
        content.forEach((item, index) => {
          if (isExitTitle && item.title === row.title) {
            content.splice(index, 1, row)
          }
        })
        if (!isExitTitle) {
          content.push(row)
        }
      } else {
        content.push(row)
      }
      return content
    }
  }
}
