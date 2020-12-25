<template>
  <div class="category">
    <div class="title">
      <i class="el-icon-s-fold" @click="menuStstus=true" />
      <span @click="menuStstus=true">全部分类</span>
    </div>
    <ul v-if="menuStstus" class="category-menu" @mouseleave="menuOver('menu')">
      <li v-for="(item, index) in category" :ref="'menu' + index" :key="index" @click="handleMenu(index)">
        {{ item.name }}
      </li>
    </ul>
    <div v-if="contentStatus" class="category-content" @mouseleave="menuOver('content')" @mouseenter="menuEnter('content')">
      <div class="category-item">
        <span class="category-title"> <strong> 金属材料 ></strong></span>
        <span v-for="(item, index) in categoryData" :key="item">
          {{ item }}
          <span class="space">{{ index === categoryData.length - 1 ? '' : '|' }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: [
        {
          name: '土建'
        },
        {
          name: '电气'
        },
        {
          name: '装饰'
        }
      ],
      categoryData: ['钢筋', '钢板', '角钢', '圆钢', '槽钢', '工字钢', '扁钢', 'H型钢', '铜板材', '铝板/带材', '钢绞线/钢丝束', '钢绞线/钢丝束钢绞线/钢丝束钢绞线'],
      contentStatus: false,
      menuStstus: false
    }
  },
  methods: {
    handleMenu(index) {
      for (let i = 0; i < this.category.length; i++) {
        this.$refs['menu' + i][0].classList.remove('active')
      }
      this.$refs['menu' + index][0].classList.add('active')
      this.contentStatus = true
    },
    menuOver(type) {
      if (this.contentStatus && this.menuStstus) {
        this.contentStatus = false
        this.menuStstus = false
      } else if (this.menuStstus && !this.contentStatus) {
        this.menuStstus = false
      }
    },
    menuEnter(type) {
      this.contentStatus = true
      this.menuStstus = true
    }
  }
}
</script>

<style lang="less" scoped>
.category {
   position: relative;
  .title {
    width: 160px;
    height: 55px;
    background: #0a4c8a;
    line-height: 55px;
    color: #fff;
    padding-left: 20px;
    display: flex;
    align-items: center;
    & > i {
      font-size: 24px;
      margin-right: 5px;
      cursor: pointer;
    }
    & > span {
      cursor: pointer;
    }
  }
  &-menu {
    position: absolute;
    bottom: -70vh;
    left: 0px;
    width: 180px;
    height: 70vh;
    background: #f2f2f2;
    z-index: 20;
    border: 1px solid #0a4c8a;
    border-top: 0;
    box-sizing: border-box;
    & > li {
      height: 35px;
      padding-left: 20px;
      line-height: 35px;
      cursor: pointer;
      &:hover,&.active {
        background: #0a4c8a;
        color: #fff;
      }
    }
  }
  &-content {
    position: absolute;
    top: 55px;
    right: calc(-50vw + -80px);
    width: 50vw;
    z-index: 20;
    border: 1px solid #0a4c8a;
    background: #fff;
    padding: 10px 40px;
    .category-item {
      width: 100%;
      border-bottom:  1px dotted #ccc;
      line-height: 30px;
      display: flex;
      flex-wrap: wrap;
      font-size: 12px;
      color: #8b7c7c;
      & > .category-title {
        color: #333;
        margin-right: 10px;
      }
      .space {
        margin: 0 10px;
      }
    }
  }
}
</style>
