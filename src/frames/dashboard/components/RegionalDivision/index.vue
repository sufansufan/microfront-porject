<template>
  <div>
    <div v-loading="loading" class="regional-division">
      <div>
        <span>已划分区域</span>
        <div class="content">
          <!-- <div v-for="item in areaDataDeep.dividedAreaList" :key="item.id">
            {{ item.name || item.zh }}
          </div> -->
          <el-tree
            ref="dividTree"
            :data="areaDataDeep.dividedAreaList"
            node-key="id"
            :props="{ children: 'child', label: noParent ? 'name' : 'zh'}"
            default-expand-all
          />
        </div>
      </div>
      <div>
        <span>可划分区域</span>
        <div class="content">
          <el-tree
            ref="tree"
            :data="unDividedAreaList"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            default-expand-all
            :check-strictly="true"
          />
        </div>
      </div>
      <div class="choice-btn">
        <div @click="arrowLeft">
          <i class="el-icon-arrow-left" />
        </div>
        <div @click="arrowRight">
          <i class="el-icon-arrow-right" />
        </div>
      </div>
      <div>
        <span>已选择区域</span>
        <div class="content">
          <div v-for="(item) in areaDataDeep.selectedAreaList" :key="item.id">
            <el-checkbox v-model="item.checkbox" :disabled="item.disabledState === 1">{{ item.name || item.zh }}</el-checkbox>
          </div>
        </div>
      </div>
    </div>
    <div class="area-btn">
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    areaData: {
      type: Object,
      default: () => {}
    },
    treeProps: {
      type: Object,
      default: () => {}
    },
    noParent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checked: false,
      areaDataDeep: {},
      arrowLeftList: [],
      loading: false
    }
  },
  computed: {
    unDividedAreaList() {
      return this.areaDataDeep.unDividedAreaList
    }
  },
  watch: {
    areaData: {
      handler() {
        this.areaDataDeep = JSON.parse(JSON.stringify(this.areaData))
        if (this.noParent) {
          this.areaDataDeep.unDividedAreaList.map(item => {
            item.disabled = true
            return item
          })
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.defaultProps = this.treeProps
  },
  methods: {
    arrowRight() {
      // 点击右箭头处理已选择区域
      if (this.areaDataDeep.selectedAreaList === null) {
        this.areaDataDeep.selectedAreaList = []
      }
      const list = this.areaDataDeep.selectedAreaList
      if (list.length === 0) {
        this.areaDataDeep.selectedAreaList.push(...this.$refs.tree.getCheckedNodes())
      } else {
        this.$refs.tree.getCheckedNodes().forEach(v => {
          const type = list.every(item => v.id !== item.id)
          if (type) {
            v.disabled = false
            this.areaDataDeep.selectedAreaList.push(v)
          }
        })
      }
      // 点击右箭头处理可划分区域禁止
      this.$nextTick(() => {
        this.handlerTreeDisable(this.areaDataDeep.unDividedAreaList, true)
        this.$refs.tree.setCheckedKeys([])
      })
    },
    arrowLeft() {
      this.arrowLeftList = []
      this.areaDataDeep.selectedAreaList = this.areaDataDeep.selectedAreaList.filter(item => {
        if (item.checkbox) {
          this.arrowLeftList.push(item)
        }
        const type = this.arrowLeftList.every(v => v.id !== item.id)
        if (type) {
          return item
        }
      })
      this.$nextTick(() => {
        this.rightToLeft(this.areaDataDeep.unDividedAreaList)
        // const selectList = this.arrowLeftList
        // for (let i = 0; i < selectList.length; i++) {
        //   this.areaDataDeep.unDividedAreaList.map(item => {
        //     if (item.id === selectList[i].id) {
        //       delete item.checkbox
        //       this.areaDataDeep.unDividedAreaList = this.handlerTreeDisable(this.areaDataDeep.unDividedAreaList, false)
        //       return item
        //     } else {
        //       if (selectList[i].parentId === item.id) {
        //         if (item.child === null) {
        //           item.child = []
        //           item.child.push(selectList[i])
        //           return item
        //         } else {
        //           item.child.forEach(item => {
        //             if (item.id !== selectList[i].id) {
        //               item.child.push(selectList[i])
        //             }
        //           })
        //           return item
        //         }
        //       }
        //     }
        //   })
        // }
      })
    },
    // 处理又向左的层级禁止问题
    rightToLeft(tree) {
      const selectList = this.arrowLeftList
      for (let i = 0; i < selectList.length; i++) {
        return tree.map(item => {
          if (item.id === selectList[i].id) {
            delete item.checkbox
            this.areaDataDeep.unDividedAreaList = this.handlerTreeDisable(this.areaDataDeep.unDividedAreaList, false)
            return item
          } else if (item.id !== selectList[i].id && item.child !== null) {
            this.rightToLeft(item.child)
            if (selectList[i].parentId === item.id) {
              const state = item.child.every(v => (v.id !== selectList[i].id))
              if (state) {
                item.child.push(selectList[i])
              }
            }
          } else {
            if (selectList[i].parentId === item.id) {
              if (item.child === null) {
                item.child = []
                item.child.push(selectList[i])
                return item
              } else {
                item.child.forEach(v => {
                  if (v.id !== selectList[i].id) {
                    item.child.push(selectList[i])
                  }
                })
                return item
              }
            }
          }
        })
      }
    },
    // 处理数据禁止掉
    handlerTreeDisable(tree, status) {
      var selectList = []
      if (status) {
        selectList = this.areaDataDeep.selectedAreaList
      } else {
        selectList = this.arrowLeftList
      }
      if (Array.isArray(tree)) {
        return tree.map((item, index) => {
          for (let i = 0; i < selectList.length; i++) {
            if (status) {
              if (item.id === selectList[i].id) {
                item.disabled = true
                return item
              }
              delete selectList[i].checkbox
            } else {
              if (item.id === selectList[i].id) {
                item.disabled = false
                delete item.checkbox
                return item
              }
            }
          }
          if (item.child !== null) {
            this.handlerTreeDisable(item.child, status)
          }
          return item
        })
      }
    },
    save() {
      const ids = []
      this.areaDataDeep.selectedAreaList.forEach(item => {
        if (this.noParent) {
          if (item.parentId !== 'china') {
            ids.push(item.id)
          }
        } else {
          ids.push(item.id)
        }
      })
      this.$emit('save', ids)
    }
  }
}
</script>

<style lang="less" scoped>
.regional-division {
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div {
    width: calc(30% - 20px);
    & > span {
      font-weight: bold;
      font-size: 18px;
    }
    .content {
      height: 300px;
      overflow-y: auto;
      border: 1px solid #eee;
      border-radius: 4px;
      padding: 5px;
    }
  }
  .choice-btn {
    width: 40px;
    font-size: 30px;
    cursor: pointer;
  }
}
.area-btn {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
