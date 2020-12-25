<template>
  <div class="search-select">
    <div class="search">
      <div v-if="showSelect" class="select">
        <template v-for="(searchItem, index) in deepSelectList">
          <slot :name="'searchBar' + index" />
          <div :key="index" :style="{width: columnWidth}">
            <span>{{ searchItem.name }}</span>
            <template v-if="searchItem.searchType === 'input'">
              <!-- @keyup.enter.native="keyupSearch" -->
              <el-input v-model.trim="search[searchItem.value]" :placeholder="`请输入${searchItem.name}`" clearable />
            </template>
            <template v-if="searchItem.searchType === 'select'">
              <el-select
                v-model.trim="search[searchItem.value]"
                :placeholder="`请选择${searchItem.name}`"
                clearable
                :multiple="searchItem.selectOption && searchItem.selectOption.multiple || false"
                :collapse-tags=" searchItem.selectOption && searchItem.selectOption.collapseTags || false"
                filterable
                :filter-method="searchItem.selectOption && searchItem.selectOption.custom ? (val) => { filterMethod(val, index)} : false"
                @visible-change="searchItem.selectOption && searchItem.selectOption.custom ? filterFocus($event,index) : false"
              >
                <el-option
                  v-for="item in searchItem.selectData"
                  :key="searchItem.selectOption ? item[searchItem.selectOption.value] : item.code"
                  :label=" searchItem.selectOption ? item[searchItem.selectOption.label] : item.name"
                  :value="searchItem.selectOption ? item[searchItem.selectOption.value] : item.code"
                >
                  <template v-if="searchItem.selectOption ? searchItem.selectOption.custom : false">
                    <el-tooltip effect="dark" placement="top-start" :style="{width: calcTooltipLeftWidth(searchItem.selectOption.tooltipLeftWidth)}">
                      <div slot="content" class="tooltip-font"> {{ item[searchItem.selectOption.customLeft] }}</div>
                      <span style="float: left; width: 75%" class="one-ellipsis custom-left">{{ item[searchItem.selectOption.customLeft] }}</span>
                    </el-tooltip>
                    <el-tooltip effect="dark" placement="top-start" :style="{width: calcTooltipRightWidth(searchItem.selectOption.tooltipRightWidth)}">
                      <div slot="content" class="tooltip-font"> {{ item[searchItem.selectOption.customRight] }}</div>
                      <span style="float: right; width: 25%; color: #999; text-align: right;" class="one-ellipsis custom-right">{{ item[searchItem.selectOption.customRight] }}</span>
                    </el-tooltip>
                  </template>
                </el-option>
              </el-select>
            </template>
            <template v-if="searchItem.searchType === 'pickerDate'">
              <el-date-picker
                v-model="search[searchItem.value]"
                :type="searchItem.pickerType || 'daterange'"
                range-separator="至"
                start-placeholder="请选择开始日期"
                end-placeholder="请选择结束日期"
                :picker-options="pickerOptions"
                :default-time="defaultTime"
              />
            </template>
            <template v-if="searchItem.searchType === 'rangeInput'">
              <el-input v-model.trim="search[searchItem.value.split(',')[0]]" :placeholder="`请输入${searchItem.name}`" clearable />
              <span class="step-span">至</span>
              <el-input v-model.trim="search[searchItem.value.split(',')[1]]" :placeholder="`请输入${searchItem.name}`" clearable />
            </template>
            <template v-if="searchItem.searchType === 'rangeDate'">
              <el-date-picker
                v-model="search[searchItem.value.split(',')[0]]"
                type="date"
                placeholder="请选择开始日期"
                :picker-options="pickerOptionsStart(search[searchItem.value.split(',')[1]])"
              />
              <span class="step-span">至</span>
              <el-date-picker
                v-model="search[searchItem.value.split(',')[1]]"
                type="date"
                placeholder="请选择结束日期"
                :picker-options="pickerOptionsEnd(search[searchItem.value.split(',')[0]])"
              />
            </template>
            <template v-if="searchItem.searchType === 'cascader'">
              <el-cascader
                v-model="search[searchItem.value]"
                :options="searchItem.selectData"
                :props="searchItem.selectOption || {}"
                :placeholder="`请选择${searchItem.name}`"
                clearable
                filterable
              />
            </template>
          </div>
        </template>
        <div v-if="selectList.length > 0" class="query">
          <div>
            <el-button type="primary" @click="queryClick"><i class="iconfont icon-search-copy" /> 查询</el-button>
          </div>
        </div>
      </div>
      <div v-if="showBtn" class="btn">
        <div v-for="(item, index) in btnList" :key="index">
          <el-button-group>
            <template v-for="v in item.children">
              <el-button v-if="!v.dropdown" :key="v.power" v-power="v.power || v.dataPower" :class="v.class" :type="v.class ? '' : 'primary'" @click="v.on">
                <i class="iconfont" :class="v.icon" />
                {{ v.name }}
              </el-button>
              <template v-if="v.dropdown">
                <el-dropdown :key="v.power" trigger="click" @command="v.on">
                  <el-button type="primary">
                    {{ v.name }}
                    <i class="el-icon-arrow-down el-icon--right" />
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="dropItem in v.children" :key="dropItem.name" :command="dropItem.command">{{ dropItem.name }}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </template>
          </el-button-group>
        </div>
        <div v-if="showText" class="btn-text">
          <p style="line-height:33px">施工人员{{ statisticsDate.totalCount }}人，在施<span style="color:#FF0000">{{ statisticsDate.currentCount }}</span>人，<span style="color:#FF0000">{{ statisticsDate.unUploadCount }}</span>人未上传体检报告</p>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  props: {
    selectList: {
      type: Array,
      default: () => []
    },
    btnList: {
      type: Array,
      default: () => []
    },
    dropdownList: {
      type: Array,
      default: () => []
    },
    statisticsDate: {
      type: Object,
      default: () => {}
    },
    column: {
      type: Number,
      default: 4
    },
    showSelect: {
      type: Boolean,
      default: true
    },
    showBtn: {
      type: Boolean,
      default: true
    },
    showText: {
      type: Boolean,
      default: false
    },
    search: {
      type: Object,
      default: () => {}
    }
    // showDropdown: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      // search: {},
      deepSelectList: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      defaultTime: ['00:00:00', '23:59:59']
    }
  },
  computed: {
    columnWidth() {
      return (100 / this.column - 1.6) + '%'
    },
    pickerOptionsStart(end) {
      return (end) => {
        return {
          disabledDate: time => {
            if (end) {
              return time.getTime() > new Date(end).getTime()
            } else {
              return
            }
          }
        }
      }
    },
    pickerOptionsEnd(start) {
      return (start) => {
        return {
          disabledDate: time => {
            if (start) {
              return time.getTime() < new Date(start).getTime()
            } else {
              return
            }
          }
        }
      }
    },
    calcTooltipLeftWidth() {
      return (val) => {
        return val || '400px'
      }
    },
    calcTooltipRightWidth() {
      return (val) => {
        return val || '200px'
      }
    }
  },
  watch: {
    selectList: {
      handler() {
        this.deepSelectList = JSON.parse(JSON.stringify(this.selectList))
      },
      immediate: true
    }
  },
  mounted() {
    this.enterKeyup()
  },
  destroyed() {
    this.enterKeyupDestroyed()
  },
  methods: {
    queryClick() {
      this.$emit('changeSearch', this.search)
    },
    keyupSearch(e) {
      var keyCode = window.event ? e.keyCode : e.which
      if (keyCode === 13) {
        this.$emit('changeSearch', this.search)
      }
    },
    filterMethod(val, index) {
      if (val) {
        const list = this.selectList[index].selectData
        const { customLeft, customRight } = this.selectList[index].selectOption
        this.deepSelectList[index].selectData = list.filter(item => (item[customLeft].includes(val) || item[customRight].includes(val)))
      } else {
        this.$set(this.deepSelectList[index], 'selectData', this.selectList[index].selectData)
      }
    },
    filterFocus(val, index) {
      this.$set(this.deepSelectList[index], 'selectData', this.selectList[index].selectData)
    },
    enterKeyupDestroyed() {
      document.removeEventListener('keyup', this.enterKey)
    },
    enterKeyup() {
      document.addEventListener('keyup', this.keyupSearch)
    }
  }

}
</script>
