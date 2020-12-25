<template>
  <div class="material-info">
    <split-pane :min-percent="10" :default-percent="12" split="vertical">
      <template slot="paneL">
        <div v-loading="treeLoading" class="left">
          <el-tree ref="treeRef" :data="treeData" :expand-on-click-node="false" node-key="id" :default-expanded-keys="defaultExpandedKeys" :props="defaultProps" :highlight-current="highLight" @node-click="handleNodeClick" />
        </div>
      </template>
      <template slot="paneR">
        <div class="right">
          <search-bar :select-list="selectList" :btn-list="btnList" :search="search" @changeSearch="changeSearch" />
          <el-table
            ref="tableRef"
            v-loading="loading"
            :data="tableData"
            row-key="id"
            border
            max-height="calc(100vh - 300px)"
            @sort-change="sortTable"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="40" />
            <el-table-column type="index" width="48" label="序号" align="center" />
            <el-table-column prop="productNumber" label="产品编码" sortable="custom" align="center" width="200" show-overflow-tooltip />
            <el-table-column label="产品名称" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span class="table-click-color one-ellipsis" @click="orgJump('details',scope.row)">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="brandName" label="品牌" align="center" />
            <el-table-column prop="unit" label="单位" align="center" />
            <el-table-column prop="model" label="规格型号" align="center" />
            <el-table-column prop="productAttribute" label="产品属性" align="center" />
            <el-table-column prop="productClassifyName" label="产品分类" align="center" />
            <el-table-column prop="price" label="市场价" sortable="custom" align="center" width="160">
              <template slot-scope="scope">
                <amount-input v-model.trim="scope.row.price" type="number" placeholder="请输入市场价" @blur="singelPriceChange(scope.row, scope.$index)" @focus="priceFocus(scope.row.price)" />
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" align="center" />
            <el-table-column prop="operationTime" label="操作时间" sortable="custom" align="center" width="140" />
            <el-table-column prop="produceStatus" label="生产状态" align="center" sortable="custom" width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.produceStatus=='0'?'生产中':(scope.row.produceStatus=='1'?'已停产':'') }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="publishStatus" label="发布状态" align="center" sortable="custom" width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.publishStatus=='0'?'未发布':(scope.row.publishStatus=='1'?'已发布':'已下架') }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClick(scope.row)">预览</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              v-show="count"
              :page-sizes="pageSizes"
              :page-size="size"
              :total="count"
              :current-page="page"
              :layout="pageLayout"
              background
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
            />
          </div>
        </div>
      </template>
    </split-pane>
    <drag-dialog ref="offShelf" title="下架" width="45%">
      <el-form ref="ruleForm" :key="key" :model="ruleForm" :rules="rules" label-width="110px">
        <el-form-item label="产品名称" prop="name" class="row-label">
          <el-input v-model.trim="ruleForm.name" type="textarea" :rows="3" disabled="disabled" placeholder="请输入产品名称" />
        </el-form-item>
        <el-form-item label="下架原因" prop="reason" class="row-label">
          <el-input v-model.trim="ruleForm.reason" type="textarea" :rows="3" :maxlength="255" placeholder="请输入下架原因" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="offShelfSubmit">确定</el-button>
      </div>
    </drag-dialog>
    <drag-dialog ref="priceDialog" title="调整价格" width="35%">
      <el-form ref="priceRuleForm" :key="key" :model="priceRuleForm" :rules="priceRules" label-width="110px">
        <el-form-item label="调整类型" prop="type">
          <el-select v-model="priceRuleForm.type" clearable placeholder="请选择调整类型" style="width: 100%" @change="changePriceType">
            <el-option
              v-for="item in constant.priceChange"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="调整比例" prop="number">
          <amount-input v-model="priceRuleForm.number" placeholder="请输入调整百分率" clearable>
            <template slot="append">%</template>
          </amount-input>
        </el-form-item>
        <el-form-item>
          <p class="text">上调：在原市场价的基础上增加对应调整比例，即现在的价格=原价格*(1+调整比例)”</p>
          <p class="text">下降：在原市场价的基础上下降对应调整比例，即现在的价格=原价格*(1-调整比例)”</p>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submitPrice">确定</el-button>
      </div>
    </drag-dialog>
  </div>
</template>

<script>
import pagination from '@core/mixins/pagination'
import table from '@core/mixins/table'
import search from '@core/mixins/search'
import DragDialog from '@frames/dashboard/components/Dialog'
import { getAllTree } from '@core/api/productClassification'
import { productList, productDelete, changeStatus, productStop, exportProduct, productNoUse, pricesChangeBlur } from '@core/api/materialHouse/product'
import { exportExcel, treeChildrenEmpty, handlerSearchBar, codeChangeName, Loadings } from '@core/utils'
import { validateDown, validateUp, validatePrice, validateLength } from '@core/utils/validate'
import { savePrice } from '@core/api/materialHouse/pricechange'
import SearchBar from '@frames/dashboard/components/SearchBar'
import { mapGetters } from 'vuex'
export default {
  name: 'OrgManage',
  components: {
    DragDialog,
    SearchBar
  },
  mixins: [pagination, table, search],
  data() {
    var validPrice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('调整比例不能为空'))
      } else {
        if (this.priceType === '0') {
          if (!validateUp(value)) {
            callback(new Error('请输入大于0小于10000的数字(小数点后保留两位)'))
          } else {
            callback()
          }
        } else {
          if (!validateDown(value)) {
            callback(new Error('请输入大于0小于100的数字(小数点后保留两位)'))
          } else {
            callback()
          }
        }
      }
    }
    return {
      loading: true,
      treeLoading: true,
      highLight: false,
      count: 0,
      ruleForm: {
        name: '',
        reason: ''
      },
      priceRuleForm: {
        type: '',
        number: ''
      },
      deepPriceRuleForm: {},
      rules: {
        reason: [{ required: true, message: '请输入下架原因', trigger: 'blur' }, validateLength(0, 255)]
      },
      priceRules: {
        type: [{ required: true, message: '请选择调整类型', trigger: 'change' }],
        number: [{ required: true, message: '请输入调整比例', trigger: 'blur' },
          { required: true, validator: validPrice, trigger: 'blur' }
        ]
      },
      searchOther: {
        productClassify: ''
      },
      treeData: [],
      defaultProps: {
        children: 'childrens',
        label: 'name'
      },
      tableData: [],
      defaultExpandedKeys: [],
      nodeTreeData: {},
      priceType: '',
      search: {},
      selectList: [
        {
          value: 'name',
          searchType: 'input',
          name: '产品名称'
        },
        {
          value: 'publishStatus',
          searchType: 'select',
          name: '发布状态',
          selectData: []
        },
        {
          value: 'produceStatus',
          searchType: 'select',
          name: '生产状态',
          selectData: []
        },
        {
          value: 'operationTime',
          searchType: 'pickerDate',
          name: '操作时间'
        }
      ],
      btnList: [
        {
          children: [
            { name: '新增', power: 'materialHouse:add', on: () => { this.orgJump('add') }, icon: 'icon-xinzeng1-copy' },
            { name: '修改', power: 'materialHouse:edit', on: () => { this.orgJump('edit') }, icon: 'icon-xiugai-copy' },
            { name: '删除', power: 'materialHouse:delete', on: () => { this.deleteData() }, icon: 'icon-icon7-copy' },
            { name: '复制', power: 'materialHouse:copy', on: () => { this.orgJump('copy') }, icon: 'icon-fuzhi' }
          ]
        },
        {
          children: [
            { name: '发布', power: 'materialHouse:release', on: () => { this.publishProduct() }, icon: 'icon-fabu-copy' },
            { name: '下架', power: 'materialHouse:down', on: () => { this.orgJump('down') }, icon: 'icon-xiajia' },
            { name: '停产', power: 'materialHouse:stop', on: () => { this.stopProduct() }, icon: 'icon-tingchan' },
            { name: '价格调整', power: 'materialHouse:adjust', on: () => { this.orgJump('price') }, icon: 'icon-jiagetiaozheng' }
          ]
        },
        {
          children: [
            { name: '导入', power: 'materialHouse:import', on: () => { this.orgJump('import') }, icon: 'icon-daoru-copy' },
            { name: '导出', power: 'materialHouse:export', on: () => { this.exportPro() }, icon: 'icon-daochu-copy' }
          ]
        },
        {
          children: [
            { name: '品牌维护', power: 'materialHouse:maintain', on: () => { this.$router.push({ name: 'applicationConfig', query: { menuId: '3f0dec218d4c460281bca7f95ec3f164' }}) }, icon: 'icon-pinpaiweihu' }
          ]
        }
      ],
      priceFocusValue: ''
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  activated() {
    this.$store.dispatch('getConstant', ['productBrand', 'produceStatus', 'publishStatus', 'priceChange']).then(() => {
      const { publishStatus, produceStatus } = this.constant
      this.selectList = handlerSearchBar(this.selectList, [1, 2], [publishStatus, produceStatus])
      this.fetchData()
    })
    this.getTree()
  },
  created() {
    this.deepPriceRuleForm = JSON.parse(JSON.stringify(this.priceRuleForm))
  },
  methods: {
    priceFocus(price) {
      this.priceFocusValue = price
    },
    // 列表市场价调整
    singelPriceChange(row, index) {
      const { id, price, name } = row
      if (price) {
        const params = {
          ...row,
          price: Number(price).toFixed(2)
        }
        this.$set(this.tableData, index, params)
        if (!validatePrice(params.price)) {
          if (params.price <= 0.00) {
            this.$message.warning('只能输入大于0的金额')
            return
          } else if (params.price > 9999999999.99) {
            this.$message.warning('只能输入小于等于9999999999.99的金额')
            return
          }
        } else {
          if (params.price <= 0.00) {
            this.$message.warning('只能输入大于0的金额')
            return
          } else if (params.price > 9999999999.99) {
            this.$message.warning('只能输入小于等于9999999999.99的金额')
            return
          }
        }
        pricesChangeBlur(id, params.price).then(() => {
          this.fetchData()
          this.$message.success(`${name}的价格修改成功`)
        })
      } else {
        this.$set(this.tableData, index, { ...row, price: this.priceFocusValue })
      }
    },
    // 价格调整提交
    submitPrice() {
      this.$refs.priceRuleForm.validate(valid => {
        if (valid) {
          const { number, type } = this.priceRuleForm
          const priceList = this.multipleSelection.map(item => {
            item.productId = item.id
            item.number = number
            item.type = type
            return item
          })
          var loadingInstance = null
          loadingInstance = Loadings()
          savePrice(priceList).then(() => {
            loadingInstance && loadingInstance.close()
            this.$message.success('调整成功')
            this.priceRuleForm.number = ''
            this.$refs.priceDialog.show = false
            this.fetchData()
            this.$refs['priceRuleForm'].resetFields()
          }).catch(() => {
            loadingInstance && loadingInstance.close()
          })
        } else {
          return false
        }
      })
    },
    changePriceType(value) {
      this.priceType = value
    },
    fetchData(type) {
      this.loading = true
      this.queryCopy(type)
      const { page, size, sortData } = this
      const { operationTime } = this.search
      this.params = {
        page: page - 1,
        size,
        ...this.search,
        ...this.searchOther,
        ...sortData,
        operationTime: {
          after: operationTime ? operationTime[0] : null,
          before: operationTime ? operationTime[1] : null
        }
      }
      this.$store.commit('SET_MATERIALSEARCH', this.params)
      productList(this.params).then(({ data: { content, total }}) => {
        this.loading = false
        this.count = total
        this.tableData = content
        this.tableData.map(item => {
          item.brandName = codeChangeName(this.constant.productBrand, item.brand)
          item.price = item.price ? Number(item.price).toFixed(2) : ''
          return item
        })
      })
    },
    // 导出
    exportPro() {
      exportProduct(this.params).then(res => {
        exportExcel(res, `材料库.xls`)
      })
    },
    // 删除数据
    deleteData() {
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        var deleteStatus = this.multipleSelection.every(item => {
          return item.publishStatus === '0'
        })
        if (!deleteStatus) {
          this.$message.warning('只能删除未发布的产品')
        } else {
          this.$confirm('确定要删除选中的产品吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const ids = this.multipleSelection.map(v => v.id)
            productDelete(ids).then(res => {
              this.$message.success('删除成功!')
              this.fetchData('query')
              this.getTree()
            })
          })
        }
      } else {
        this.$message.warning('请选择一条数据')
      }
    },
    // 发布
    publishProduct() {
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        var productName = this.multipleSelection.every(item => {
          return item.productClassifyName !== ''
        })
        var releaseStatus = this.multipleSelection.every(item => {
          return item.publishStatus === '0' || item.publishStatus === '2'
        })
        if (!productName) {
          this.$message.warning('产品分类为空的不能进行发布')
        } else {
          if (releaseStatus) {
            this.$confirm('确定要发布选中的产品吗？发布后该产品将会展示给用户', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              const ids = this.multipleSelection.map(v => v.id)
              changeStatus(ids).then(res => {
                this.$message.success('发布成功!')
                this.fetchData()
                this.getTree()
              })
            })
          } else {
            this.$message.warning('只有未发布和已下架的产品才能发布')
          }
        }
      } else {
        this.$message.warning('请选择一条数据')
      }
    },
    // 停产
    stopProduct() {
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        this.$confirm('确定要停产选中的产品吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const ids = this.multipleSelection.map(v => v.id)
          productStop(ids).then(res => {
            this.fetchData()
            this.getTree()
          })
        })
      } else {
        this.$message.warning('请选择一条数据')
      }
    },
    // 下架
    offShelfSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const ids = this.multipleSelection.map(v => v.id)
          var loadingInstance = null
          loadingInstance = Loadings()
          productNoUse(ids, this.ruleForm.reason).then(() => {
            this.$message.success('下架成功')
            loadingInstance && loadingInstance.close()
            this.$refs.offShelf.show = false
            this.fetchData()
            this.getTree()
            this.ruleForm = { ...this.deepRuleForm }
          }).catch(() => {
            loadingInstance && loadingInstance.close()
          })
        } else {
          return
        }
      })
    },

    // 获取左树 默认展开一级分类
    getTree() {
      this.treeLoading = true
      getAllTree({}).then(({ data }) => {
        this.treeData = treeChildrenEmpty(data, 'childrens')
        this.treeData.forEach(i => {
          this.defaultExpandedKeys.push(i.id)
        })
        this.highLight = true
        this.$nextTick(() => {
          this.$refs.treeRef.setCurrentKey(this.searchOther.productClassify)
        })
        this.treeLoading = false
      })
    },
    // 点击树
    handleNodeClick(data) {
      this.nodeTreeData = data
      this.currentNodeKey = data.id
      if (this.searchOther.productClassify === data.id) {
        this.highLight = !this.highLight
        this.searchOther.productClassify = ''
        this.fetchData('query')
      } else {
        this.highLight = true
        this.searchOther.productClassify = data.id
        this.fetchData('query')
      }
    },
    handleClick(row) {
      const { id } = row
      this.$router.push({ name: 'materialPreview', query: { id }})
    },
    orgJump(type, row) {
      switch (type) {
        case 'add':
          this.$router.push({ name: 'materialAdd', query: { type: 'add', classifyId: this.searchOther.productClassify }})
          break
        case 'edit':
          if (this.multipleSelection && this.multipleSelection.length > 0) {
            if (this.multipleSelection.length !== 1) {
              this.$message.warning('只能选择单条记录')
              return
            }
            const { id, publishStatus } = this.multipleSelection[0]
            var stateList = ['0']
            if (!stateList.includes(publishStatus)) {
              this.$message.warning('只能修改未发布的产品')
              return
            }
            this.$router.push({ name: 'materialEdit', query: { type: 'edit', id }})
          } else {
            this.$message.warning('请选择一条数据')
          }
          break
        case 'details':
          var { id } = row
          this.$router.push({ name: 'materialDetails', query: { type: 'details', id }})
          break
        case 'import':
          this.$router.push({ name: 'importMaterial' })
          break
        case 'down':
          if (this.multipleSelection && this.multipleSelection.length > 0) {
            var downState = this.multipleSelection.every(item => {
              return item.publishStatus === '1'
            })
            if (!downState) {
              this.$message.warning('只能下架已发布的产品')
            } else {
              this.ruleForm.name = this.multipleSelection.map(item => {
                return `${item.name}`
              }).join('，')
              this.key += 1
              this.$refs.offShelf.show = true
            }
          } else {
            this.$message.warning('请选择一条数据')
          }
          break
        case 'copy':
          if (this.multipleSelection && this.multipleSelection.length > 0) {
            if (this.multipleSelection.length !== 1) {
              this.$message.warning('只能选择一条产品记录进行复制操作！')
              return
            }
            const { id, name } = this.multipleSelection[0]
            this.$router.push({ name: 'materialAdd', query: { type: 'add', handelType: 'copy', id, name }})
          } else {
            this.$message.warning('请选择一条数据')
          }
          break
        case 'price':
          if (this.multipleSelection && this.multipleSelection.length > 0) {
            var priceState = this.multipleSelection.every(item => {
              return item.price !== null && item.price !== ''
            })
            if (priceState) {
              this.priceRuleForm = { ...this.deepPriceRuleForm }
              this.key += 1
              this.$refs.priceDialog.show = true
            } else {
              this.$message.warning('市场价为空不能调整价格')
            }
          } else {
            this.$message.warning('请选择一条数据')
          }
          break
        default:
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
	.material-info {
		padding: 10px 0px 10px 10px;
		height: calc(100vh - 140px);
		.left {
			margin-right: 5px;
			height: 100%;
			overflow-y: auto;
		}
		.right {
			margin-left: 10px;
			padding-right: 10px;
			height: 100%;
			// overflow-y: auto;
    }
    .text{
      color:#999;
      font-size:12px;
    }
	}
</style>
<style lang="less">
.material-info {
  .el-table__body-wrapper {
    max-height: calc(100vh - 360px);
  }
}
</style>
