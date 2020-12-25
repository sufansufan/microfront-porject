<template>
  <div class="update-context-box" :class="isBorder ? '' : 'is-border'">
    <template v-if="updateData.length">
      <li v-for="item in updateData" :key="item.title">
        <template v-if="item.type !== 'file' && item.oldName != item.modifyName">
          <span v-if="item.oldName && !item.modifyName">
            {{ item.title + '：清除了 ' + item.oldName }}
          </span>
          <span v-else>
            {{ item.oldName || item.modifyName ? item.title + '：' : '' }}
            {{ calcMoney(item.oldName, item.suf) }}
            {{ item.oldName ? item.suf : '' }}
            {{ item.oldName || item.modifyName ? item.oldName ? '修改为：' : '录入了 ' : '' }}
            {{ calcMoney(item.modifyName, item.suf) }}
            {{ item.modifyName ? item.suf : '' }}
          </span>
        </template>
        <template v-else-if="item.type === 'file'">
          <div style="display: flex; flex-wrap: wrap">
            {{ item.oldList.length && item.oldList[0].fileName || item.modifyList.length && item.modifyList[0].fileName ? item.title + '：' : '' }}
            <span v-if="getDeleteList(item.oldList, item.modifyList, 'delete').length">
              <span>删除 </span>
            </span>
            <template v-for="(o, oi) in getDeleteList(item.oldList, item.modifyList, 'delete')">
              <div :key="o.id" style="margin-right: 3px">
                <span class="table-click-color" @click="downLoad(o.id, o.fileName)">
                  {{ o.fileName ? o.fileName + (oi === getDeleteList(item.oldList, item.modifyList, 'delete').length - 1 ? '' :'、' ): '' }}
                </span>
              </div>
            </template>
            <span v-if="getDeleteList(item.oldList, item.modifyList, 'add').length">
              <span>{{ getDeleteList(item.oldList, item.modifyList, 'delete').length > 0 ? '，' : '' }}上传 </span>
            </span>
            <template v-for="(el, eli) in getDeleteList(item.oldList, item.modifyList, 'add')">
              <div :key="el.id" style="margin-right: 3px">
                <span class="table-click-color" @click="downLoad(el.id, el.fileName)">
                  <!-- {{ el.fileName }} -->
                  {{ el.fileName ? el.fileName + (eli === getDeleteList(item.oldList, item.modifyList, 'add').length - 1 ? '' :'、' ): '' }}
                </span>
              </div>
            </template>
          </div>
        </template>
      </li>
    </template>
  </div>
</template>

<script>
import { downLoadById, handleMoney } from '@core/utils'
export default {
  props: {
    updateData: {
      type: Array,
      default: () => []
    },
    isBorder: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    calcMoney() {
      return (val, suf) => {
        if (!val) {
          return ''
        }
        if (suf === '元') {
          if (val.includes(',')) {
            const numList = val.split(',')
            var str = ''
            numList.forEach(item => {
              str += item
            })
            return handleMoney(str)
          } else {
            return handleMoney(val)
          }
        } else {
          return val
        }
      }
    },
    getDeleteList() {
      return (oldList, newList, type) => {
        var listOld = []
        var ListNew = []
        if (oldList.length) {
          if (type === 'delete') {
            oldList.forEach(item => {
              const status = newList.some(v => v.id === item.id)
              if (!status) {
                listOld.push(item)
              }
            })
            return listOld
          } else if (type === 'add') {
            newList.forEach(item => {
              const status = oldList.some(v => v.id === item.id)
              if (!status) {
                ListNew.push(item)
              }
            })
            return ListNew
          }
        } else {
          if (type === 'delete') {
            return []
          } else if (type === 'add') {
            return newList
          }
        }
      }
    }
  },
  methods: {
    downLoad(id, name) {
      downLoadById(id, name)
    }
  }
}
</script>

<style lang="less" scoped>
.update-context-box {
  min-height: 32px;
  height: auto;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  color: #606266;
  padding: 0 10px;
  list-style-type: none;
  &.is-border {
    border: none;
  }
}
</style>
