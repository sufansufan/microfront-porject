<template>
  <div class="shopping-cart">
    <div class="shoop-cart">我的购物车</div>
    <div class="no-table">
      <el-table border>
        <el-table-column width="55" align="center" />
        <el-table-column label="产品" align="center">
          <el-table-column label="产品名称" align="center" />
          <el-table-column label="产品分类" align="center" />
          <el-table-column label="品牌与认证" align="center" />
          <el-table-column label="规格型号" align="center" />
          <el-table-column label="产品属性" align="center" />
          <el-table-column label="单位" align="center" />
        </el-table-column>
        <el-table-column label="采购" align="center">
          <el-table-column label="数量" width="180" align="center" />
          <el-table-column label="单价（元）" align="right" header-align="center" />
          <el-table-column label="金额（元）" align="right" header-align="center" />
        </el-table-column>
        <el-table-column label="操作" align="center" header-align="center" />
      </el-table>
    </div>
    <div>
      <div class="calc-box">
        <div>
          <div class="checkbox">
            <el-checkbox v-model="checked" @click="toggleSelection(checked)">全选</el-checkbox>
          </div>
          <div class="delete" @click="deleteAll">
            删除
          </div>
          <div class="table-click-color" @click="go()">
            西安速卖达科贸有限公司
          </div>
          <div>
            刘-供应商（15029488156）
          </div>
        </div>
        <div>
          <div>
            货品种类：
            <strong>3</strong>
            种
          </div>
          <div>
            数量总计：
            <strong>3</strong>
          </div>
          <div>
            货品金额总计：
            <strong><span>950.00</span></strong> 元
          </div>
          <div>
            <strong @click="submissionProcurement">提交采购</strong>
          </div>
        </div>
      </div>
      <el-table ref="multipleTable" :data="tableData" border :show-header="false">
        <el-table-column width="55" type="selection" align="center" />
        <el-table-column prop="id" label="产品" align="center">
          <el-table-column prop="rule" label="产品名称" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.rule" placement="top">
                <div class="table-click-color" @click="changeTab()">
                  {{ scope.row.rule }}
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="产品分类" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.name" placement="top">
                <div>{{ scope.row.name }}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="品牌与认证" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.name" placement="top">
                <div>{{ scope.row.name }}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="规格型号" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.name" placement="top">
                <div>{{ scope.row.name }}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="产品属性" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.name" placement="top">
                <div>{{ scope.row.name }}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="单位" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.name" placement="top">
                <div>{{ scope.row.name }}</div>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="name" label="采购" align="center">
          <el-table-column prop="servicename" label="数量" width="180" align="center">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.num" :min="1" :max="10" label="" @change="handleChange" />
            </template>
          </el-table-column>
          <el-table-column prop="rule" label="单价（元）	" align="right" header-align="center" />
          <el-table-column prop="rule" label="金额（元）" align="right" header-align="center" />
        </el-table-column>
        <el-table-column prop="rule" label="操作" align="center" header-align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="open">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <drag-dialog ref="dialog" title="请选择采购的项目" width="35%" height="70%">
      <div>
        <el-form :rules="rules" :model="ruleform" label-width="0" class="dictionary-form">
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
    </drag-dialog></div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
export default {
  components: { DragDialog },
  data() {
    return {
      count: 30,
      dialogVisible: false,
      number: 11,
      value: '',
      options: [],
      tableDate: [],
      checked: false,
      tableData: [
        {
          id: '1',
          number: '01',
          name: '组织缺少负责人',
          servicename: '服务名称',
          serviceurl: '服务路径',
          rule: '触发规则',
          available: '是否可用',
          num: 1
        },
        {
          id: '2',
          number: '01',
          name: '组织缺少负责人',
          servicename: '服务名称',
          serviceurl: '服务路径',
          rule: '触发规则',
          available: '是否可用',
          num: 1
        }
      ],
      ruleform: {
        number: ''
      },
      multipleSelection: []

    }
  },
  methods: {
    changeTab() {
      this.$router.push('/shoppingMall/productDetails')
    },
    go() {
      this.$router.push('/shoppingMall/companyDetails')
    },
    open() {
      this.$confirm('确认从采购车中移除此产品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deleteAll() {
      this.$confirm('确认从采购车中移除选中产品？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    submissionProcurement() {
      this.$refs.dialog.show = true
    },
    toggleSelection(state) {
      if (!state) {
        this.tableData.forEach(item => {
          this.$refs.multipleTable.toggleRowSelection(item)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }

  }
}
</script>

<style lang="less" scoped>
.shopping-cart {
  padding: 10px;
  .shoop-cart {
    height: 36px;
    font: 700 14px/36px '微软雅黑';
    padding-left: 12px;
  }
  & > div:nth-of-type(3) {
    margin-top: 10px;
    & > .calc-box {
      width: 100%;
      border: 1px solid #797979;
      border-bottom: none;
      box-sizing: border-box;
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > div {
        display: flex;
        align-items: center;
        &:first-child {
          & > div {
            margin-right: 20px;

          }
          .delete {
              color: #0a4c8a;
            }
          .checkbox {
            margin-left: 17px;
            span {
              color: #333;
            }
          }
        }
        &:last-child {
          & > div {
            margin-left: 20px;
          }

          strong {
            font-size: 18px;
          }
          span {
            font-size: 18px;
            color: #ee3435
          }
          & > div:last-child {
            width: 100px;
            height: 42px;
            background: #ff500b;
            color: #fff;
            font-size: 18px;
            line-height: 42px;
            text-align: center;
          }
        }
      }

    }
  }
  .el-select {
    width: 100%;
  }
}
</style>
<style lang="less">
.shopping-cart {
  .no-table {
    .el-table__empty-block {
      display: none;
    }
  }
  .checkbox {
    .el-checkbox__label {
      color: #333;
    }
  }

}

</style>
