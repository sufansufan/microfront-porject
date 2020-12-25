<template>
  <div class="product-comparison">
    <table width="100%" class="custom-table">
      <tbody>
        <tr v-for="(item, index) in tableData" :key="index">
          <th>{{ item.type }}</th>
          <td v-for="i in item.content" :key="i.id" :class="item.url ? 'table-click-color': ''" @click="clickJump(i.name)">
            <template v-if="item.type === '操作'">
              <div class="operate">
                <div class="table-click-color" @click="setUpShow('采购数量')">采购</div>
                <div class="table-click-color" @click="setUpShow('加入购物车数量')">放入购物车</div>
                <div class="table-click-color">删除</div>
              </div>
            </template>
            <template v-else>
              {{ i.name }}
            </template>
          </td>
          <template v-if="item.content.length < 4">
            <template v-if="index===0">
              <td>
                <i class="el-icon-plus" @click="setUpShow('操作提示')" />
              </td>
            </template>
            <template v-else>
              <td />
            </template>
          </template>
        </tr>
      </tbody>
    </table>
    <drag-dialog ref="dialog" :title="title" width="35%" height="70%">
      <div v-if="title==='采购数量'">
        <el-form :rules="rules" :model="ruleform" label-width="0" class="dictionary-form">
          <el-form-item label="" prop="number" class="ful-points">
            <el-input-number v-model="num" :min="1" :max="10" label="描述文字" @change="handleChange" />
          </el-form-item>
          <el-form-item label="" prop="number" class="ful-points">
            <el-select v-model="value" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div style="width:100%;margin-top:20px;text-align:right;">
          <el-button type="primary" icon="el-icon-set-up">确认</el-button>
        </div>
      </div>
      <div v-if="title==='加入购物车数量'">
        <el-form :rules="rules" :model="ruleform" label-width="0" class="dictionary-form">
          <el-form-item label="" prop="number" class="ful-points">
            <el-input-number v-model="num" :min="1" :max="10" label="描述文字" @change="handleChange" />
          </el-form-item>
        </el-form>
        <div style="width:100%;margin-top:20px;text-align:right;">
          <el-button type="primary" icon="el-icon-set-up">确认</el-button>
        </div>
      </div>
      <div v-if="title==='操作提示'">
        <div>去搜索选择产品，加入对比即可！</div>
        <div style="width:100%;margin-top:20px;text-align:right;">
          <el-button type="primary" icon="el-icon-set-up" @click="goSearchProduct()">去搜索产品</el-button>
        </div>
      </div>
    </drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
export default {
  components: { DragDialog },
  data() {
    return {
      tableData: [
        {
          type: '产品名称',
          content: [
            {
              id: '1',
              name: '清新建产品'
            },
            {
              id: '2',
              name: '清新建产品'
            },
            {
              id: '3',
              name: '3333'
            }
          ],
          url: '3333'
        },
        {
          type: '产品分类',
          content: [
            {
              id: '3',
              name: '钢筋'
            },
            {
              id: '4',
              name: '水泥'
            },
            {
              id: '5',
              name: '石头'
            }
          ],
          url: ''
        },
        {
          type: '公司名称',
          content: [
            {
              id: '1',
              name: '西安速买达'
            },
            {
              id: '2',
              name: '西安速买达'
            },
            {
              id: '3',
              name: '3333'
            }
          ],
          url: '3333'
        },
        {
          type: '操作',
          content: [
            {
              id: '7'
            },
            {
              id: '8'
            },
            {
              id: '9'
            }
          ],
          url: ''
        }
      ],
      title: '采购数量'
    }
  },
  methods: {
    clickJump(val) {
      if (val === '清新建产品') {
        this.$router.push('/shoppingMall/productDetails')
      } else if (val === '西安速买达') {
        this.$router.push('/shoppingMall/companyDetails')
      }
    },
    setUpShow(val) {
      this.title = val
      this.$refs.dialog.show = true
    },
    goSearchProduct() {
      this.$router.push('/shoppingMall/enterpriseMall/shoppingClassification')
    }
  }
}
</script>

<style lang="less" scoped>
.product-comparison {
  padding: 10px;
  .custom-table {
    border-spacing: 0;
    border-collapse: collapse;
    th, td {
      font-size: 12px;
      border: 1px solid #9a9a9a;
      line-height: 32px;
      padding: 2px 12px;
      vertical-align: middle;
      color: #333;
    }
    th {
      background: #e7e9ec;
      width: 120px;
    }
    td {
      width: 330px;
      i {
        color: #0a4c8a;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
      }
    }
    .operate {
      display: flex;
      & > div {
        margin-right: 20px;
      }
    }
  }
  .el-input-number {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
}
</style>
