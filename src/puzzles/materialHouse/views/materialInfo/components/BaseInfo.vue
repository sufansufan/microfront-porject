<template>
  <div class="base-info">
    <el-form ref="ruleForm" :key="key" v-loading="loading" :rules="rules" :model="ruleForm" label-width="100px" class="info-form">
      <el-form-item label="产品分类" prop="productClassifyChange">
        <el-cascader
          v-model="ruleForm.productClassifyChange"
          placeholder="请选择产品分类"
          clearable
          :disabled="disabled"
          style="width:100%"
          filterable
          :options="treeAllData"
          :props="{expandTrigger: 'hover', value: 'id', label: 'name', children: 'childrens' }"
          @change="productChange"
        />
      </el-form-item>
      <el-form-item label="产品编码" prop="productNumber">
        <el-input v-model.trim="ruleForm.productNumber" placeholder="请输入产品编码" :maxlength="20" :disabled="disabled" clearable>
          <template slot="prepend">{{ classNumber }}</template>
        </el-input>
      </el-form-item>
      <el-form-item label="产品名称" prop="name">
        <el-input v-model.trim="ruleForm.name" clearable placeholder="请输入产品名称" :maxlength="160" :disabled="disabled" @blur="handleName" />
      </el-form-item>
      <el-form-item label="副标题" prop="subtitle">
        <el-input v-model.trim="ruleForm.subtitle" :maxlength="160" :disabled="disabled" placeholder="请输入副标题" clearable />
      </el-form-item>
      <el-form-item label="品牌" prop="brand">
        <el-select v-model="ruleForm.brand" clearable placeholder="请选择品牌" :disabled="disabled">
          <el-option
            v-for="item in constant.productBrand"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="单位" prop="unit">
        <el-input v-model.trim="ruleForm.unit" :maxlength="20" :disabled="disabled" placeholder="请输入单位" clearable />
      </el-form-item>
      <el-form-item label="规格型号" prop="model">
        <el-input v-model.trim="ruleForm.model" :maxlength="50" :disabled="disabled" placeholder="请输入规格型号" clearable />
      </el-form-item>
      <el-form-item label="市场价" prop="price">
        <amount-input v-model.trim="ruleForm.price" :disabled="disabled" placeholder="请输入市场价" @blur="amountInputBlur" />
      </el-form-item>
      <el-form-item label="生产状态">
        <el-select v-model="ruleForm.produceStatus" clearable placeholder="请选择生产状态" :disabled="disabled || status" style="width: 100%">
          <el-option v-for="item in constant.produceStatus" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select v-model="ruleForm.publishStatus" clearable placeholder="请选择发布状态" :disabled="disabled || status" style="width: 100%">
          <el-option v-for="item in constant.publishStatus" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="ruleForm.publishStatus==='2'" label="下架原因" class="all-width row-label">
        <el-input v-model.trim="ruleForm.notUseReason" type="textarea" :maxlength="255" :rows="3" :disabled="disabled" placeholder="请输入下架原因" />
      </el-form-item>
      <el-form-item label="关键字" prop="keyWords" class="all-width">
        <el-input v-model.trim="ruleForm.keyWords" :disabled="disabled" placeholder="请输入关键字" :maxlength="200" />
        <span class="text">多个关键字用逗号隔开</span>
      </el-form-item>
      <el-form-item label="产品属性" class="all-width row-label">
        <el-input v-model.trim="ruleForm.productAttribute" type="textarea" :rows="3" :disabled="disabled || status" placeholder="请输入产品属性" />
      </el-form-item>
      <el-form-item class="all-width">
        <div v-if="$route.query.type !=='details'" style="padding:10px 0;">
          <el-button type="primary" @click="addAttr">添加属性</el-button>
        </div>
        <div>
          <el-table ref="tableRef" :data="productAttributes" row-key="id" border max-height="calc(100vh - 400px)">
            <el-table-column prop="attributeName" label="属性名称" align="left">
              <template slot-scope="{row}">
                <span v-if="row.attributeId">{{ row.attributeName }}</span>
                <el-input v-else v-model.trim="row.attributeName" :maxlength="50" clearable placeholder="请输入属性名称" :disabled="$route.query.type ==='details'" />
              </template>
            </el-table-column>
            <el-table-column prop="attributeValue" label="属性内容" align="center">
              <template slot-scope="{row}">
                <el-select v-if="row.attributeId" v-model.trim="row.attributeValue" clearable placeholder="请选择属性内容" style="width: 100%" :disabled="$route.query.type ==='details'">
                  <el-option
                    v-for="item in row.attributeList"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  />
                </el-select>
                <el-input v-else v-model.trim="row.attributeValue" clearable :maxlength="100" placeholder="请输入属性内容" :disabled="$route.query.type ==='details'" />
              </template>
            </el-table-column>
            <el-table-column prop="id" label="来源" align="center">
              <template slot-scope="scope">
                {{ scope.row.attributeId ? '默认' : '自定义' }}
              </template>
            </el-table-column>
            <el-table-column v-if="$route.query.type !=='details'" label="操作" align="center">
              <template slot-scope="scope">
                <div class="product-attributes">
                  <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
                  <el-button v-if="scope.$index != productAttributes.length - 1" size="mini" type="info" icon="el-icon-bottom" @click="btnReomve(scope.$index, '+')" />
                  <el-button v-if="scope.$index !=0" size="mini" type="info" icon="el-icon-top" @click="btnReomve(scope.$index, '-')" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>
      <el-form-item label="备注" class="all-width row-label">
        <el-input v-model.trim="ruleForm.remark" type="textarea" :maxlength="255" :rows="3" :disabled="disabled" placeholder="请输入备注" />
      </el-form-item>
      <el-form-item label="产品资质" class="all-width">
        <el-upload
          :file-list="fileList"
          :action="actionUrl"
          :on-success="fileSuccess"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="handleRemove"
          :before-upload="beforeUpload50M"
          :disabled="disabled"
          :on-error="fileError"
          :on-progress="uploadProgress"
          :on-preview="previewFile"
        >
          <el-button type="primary" :disabled="disabled">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <template v-if="$route.query.type !=='add'">
        <el-form-item label="操作人">
          <el-input v-model.trim="ruleForm.operationUserName" :disabled="disabled || $route.query.type !=='add'" placeholder="请输入操作人" />
        </el-form-item>
        <el-form-item label="操作时间">
          <el-input v-model.trim="ruleForm.operationTime" :disabled="disabled || $route.query.type !=='add'" placeholder="请输入操作时间" />
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { validateLength, validateCodeNum, validateOnlyCode, validatePrice, validateKeyword, toDecimal } from '@core/utils/validate'
import { getSessionStorage } from '@core/utils/auth'
import { productSave, productEdit, getProductId, validateUnique } from '@core/api/materialHouse/product'
import upload from '@core/mixins/upload'
import { getSelectTree, getOne } from '@core/api/productClassification'
import { treeChildrenEmpty, queryParent } from '@core/utils'
import { copyFileList } from '@core/api/accessoryFile'
import { setSessionStorage } from '@core/utils/auth'
export default {
  mixins: [upload],
  props: {
    disabled: {
      default: true,
      type: Boolean
    },
    addOrEditState: {
      default: '',
      type: String
    },
    copyId: {
      default: '',
      type: String
    }
  },
  data() {
    const { id: checkId, type, handelType } = this.$route.query
    var validCodeNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('产品编码不能为空'))
      } else {
        if (!validateCodeNum(value)) {
          callback(new Error('只能输入数字和字母'))
        } else {
          callback()
        }
      }
    }
    const validKeyWord = (rule, value, callback) => {
      if (!validateKeyword(value) && value !== '') {
        callback(new Error('请输入正确的关键字,用逗号中间不能为空,结尾不能有逗号,且每个关键字不能超过10个'))
      } else {
        callback()
      }
    }
    const validateProPrice = (rule, value, callback) => {
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
    return {
      ruleForm: {
        productClassify: [],
        productNumber: '',
        name: '',
        subtitle: '',
        brand: '',
        unit: '',
        model: '',
        price: '',
        keyWords: '',
        productAttribute: '',
        remark: '',
        produceStatus: '0',
        publishStatus: '0',
        productClassifyChange: []
      },
      productAttributes: [],
      loading: false,
      treeAllData: [],
      rules: {
        productClassifyChange: [{ required: true, message: '请选择产品分类', trigger: 'change' }],
        productNumber: [{ required: true, message: '请输入产品编码', trigger: 'blur' }, { validator: validCodeNum, trigger: 'blur' }, { required: true, validator: (rule, value, callback) => { validateOnlyCode(rule, value, callback, validateUnique({ productNumber: this.classNumber + value, id: type === 'add' && handelType === 'copy' ? this.copyId : (type === 'add' ? this.uploadData.businessDataId : checkId) }), '03') }, trigger: 'blur' }, validateLength(0, 20)],
        name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }, validateLength(0, 160)],
        brand: [{ required: true, message: '请选择品牌', trigger: 'change' }],
        unit: [{ required: true, message: '请输入单位', trigger: 'blur' }, validateLength(0, 20)],
        model: [{ required: true, message: '请输入规格型号', trigger: 'blur' }, validateLength(0, 50)],
        price: [{ required: true, message: '请输入市场价', trigger: 'blur' }, { required: true, validator: validateProPrice, trigger: 'blur' }],
        keyWords: [{ validator: validKeyWord, trigger: 'blur' }],
        subtitle: [validateLength(0, 160)],
        remark: [validateLength(0, 255)]
      },
      attributeList: [],
      classNumber: '',
      status: true,
      key: 0
    }
  },

  computed: {
    ...mapGetters(['constant', 'materialInfoId'])
  },
  watch: {
    productAttributes: {
      handler() {
        var attr = ''
        this.productAttributes.forEach(item => {
          if (item.attributeValue) {
            attr += item.attributeValue + '/'
          }
        })
        this.ruleForm.productAttribute = attr.slice(0, -1)
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.key += 1
    const { type, id, handelType } = this.$route.query
    this.getTree()
    this.$store.dispatch('getConstant', ['productBrand', 'produceStatus', 'publishStatus'])
    this.uploadData.typeCode = 'qualifyAnnex'
    if (type === 'edit' || type === 'details' || handelType === 'copy') {
      this.fetchData(id)
      this.uploadData.businessDataId = id
    }
    this.$store.commit('SET_MATERIALINFOID', this.uploadData.businessDataId)
  },
  methods: {
    fetchData(id) {
      this.loading = true
      const { handelType, type } = this.$route.query
      getProductId(id).then(({ data }) => {
        this.loading = false
        const { productNumber, productClassify, attributeDTOList, imgList } = data
        setSessionStorage('imgList', JSON.stringify(imgList))
        const product = productClassify ? productClassify.split(',') : []
        const afterIndex = productNumber.lastIndexOf('-')
        const afterstr = productNumber.substring(afterIndex + 1, productNumber.length)
        const beforeIndex = productNumber.lastIndexOf('-')
        const beforestr = productNumber.substring(0, beforeIndex)
        this.classNumber = beforestr + '-'
        this.ruleForm = {
          ...data,
          productNumber: afterstr,
          productClassify: product,
          productClassifyChange: product
        }
        if (handelType === 'copy') {
          this.ruleForm.productNumber = ''
          this.uploadData.businessDataId = this.copyId
          if (data.qualifitionList) {
            const param = data.qualifitionList
            param.map(item => {
              item.businessDataId = this.uploadData.businessDataId
              delete item.sort
              return item
            })
            copyFileList(param).then(({ data }) => {
              this.fileList = data
              if (this.fileList) {
                this.fileList.map(item => {
                  item.name = item.fileName
                  item.url = item.fileUrl
                  return item
                })
              }
            })
          }
        } else {
          this.fetchFile()
        }
        if (product[product.length - 1]) {
          getOne(product[product.length - 1]).then(({ data: { classNumber, productClassPropertys }}) => {
            var returnList = []
            if (attributeDTOList || productClassPropertys) {
              attributeDTOList.forEach(itemT => {
                if (itemT.attributeId === '') {
                  returnList.push(itemT)
                }
                productClassPropertys.forEach(itemE => {
                  if (itemT.attributeId === itemE.id) {
                    itemT.content = itemE.content
                    itemT.attributeId = itemE.id
                    returnList.push(itemT)
                  }
                })
              })
            }
            this.productAttributes = returnList
            this.productAttributes.map(e => {
              var attributeContent = []
              if (e.content) {
                const editContentList = e.content.split(',').filter(i => i && i.trim())
                editContentList.forEach(item => {
                  attributeContent.push({ key: item, value: item })
                })
                e.attributeList = attributeContent
                if (!editContentList.includes(e.attributeValue)) {
                  if (type === 'edit') {
                    this.$set(e, 'attributeValue', e.attributeList[0].key)
                  } else if (type === 'details') {
                    this.productAttributes = attributeDTOList
                  }
                }
              }
              return e
            })
          })
        }
      })
    },
    getProduct(id) {
      if (id) {
        getOne(id).then(({ data: { classNumber, productClassPropertys }}) => {
          this.classNumber = JSON.parse(getSessionStorage('organization')).orgNumber + '-' + classNumber + '-'
          this.productAttributes = productClassPropertys
          this.productAttributes.map(e => {
            e['attributeName'] = e.name
            var json = []
            if (e.content) {
              const addContentList = e.content.split(',').filter(i => i && i.trim())
              addContentList.forEach(item => {
                json.push({ key: item, value: item })
              })
            }
            e.attributeList = json
            e.attributeId = e.id
            this.$set(e, 'attributeValue', e.attributeList[0].key)
            return e
          })
        })
      }
    },
    getTree() {
      getSelectTree({}).then(({ data }) => {
        this.treeAllData = treeChildrenEmpty(data, 'childrens')
        const { type, classifyId } = this.$route.query
        if (type === 'add') {
          const classifyIdList = queryParent(this.treeAllData, classifyId, 'id', 'childrens', 'id')
          const classifyNumberList = queryParent(this.treeAllData, classifyId, 'id', 'childrens', 'classNumber')
          if (classifyIdList.length === 3) {
            this.ruleForm.productClassifyChange = classifyIdList
            this.ruleForm.productClassify = classifyIdList
            this.classNumber = JSON.parse(getSessionStorage('organization')).orgNumber + '-' + classifyNumberList[2] + '-'
            this.getProduct(classifyIdList[classifyIdList.length - 1])
          }
        }
      })
    },
    productChange(val) {
      if (this.ruleForm.productClassify.toString() !== val.toString() && this.ruleForm.productClassify.length) {
        this.$confirm('改变产品分类已经维护的产品属性会丢失！您确定要变更分类吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getCodeFormProduct(val)
        }).catch(() => {
          this.ruleForm.productClassifyChange = this.ruleForm.productClassify
          this.key += 1
        })
      } else {
        this.getCodeFormProduct(val)
      }
    },
    getCodeFormProduct(val) {
      this.ruleForm.productClassify = val
      this.classNumber = ''
      this.productAttributes = []
      const productId = val[val.length - 1]
      this.getProduct(productId)
      this.key += 1
    },
    handleName() {
      this.$emit('childEvent', this.ruleForm.name)
    },

    // 上传成功
    fileSuccess(response, file, fileList) {
      this.fileList = fileList
      this.uploadLoading.close()
    },
    // 查看附件
    fetchFile() {
      this.getFileLoad().then(data => {
        this.fileList = data
        this.formLoading = false
        this.fileList.map(item => {
          item.name = item.fileName
          item.url = item.fileUrl
          return item
        })
      })
    },
    addAttr() {
      if (this.productAttributes.length <= 50) {
        this.productAttributes.push({
          attributeName: '',
          attributeValue: ''
        })
      } else {
        this.$message.warning('最多支持添加50行')
      }
    },
    handleDelete(index) {
      this.productAttributes.splice(index, 1)
    },

    btnReomve(index, type) {
      const position = type === '+' ? index + 1 : index - 1
      const up = this.productAttributes[position]
      this.$set(this.productAttributes, position, this.productAttributes[index])
      this.$set(this.productAttributes, index, up)
    },
    addOrEdit() {
      return new Promise((resolve, inject) => {
        for (var i = 0; i < this.productAttributes.length; i++) {
          if (this.productAttributes[i].attributeName === '') {
            this.$message.warning('请填写属性名称,最多不超过50个字')
            return
          }
          if (this.productAttributes[i].attributeValue === '') {
            this.$message.warning('请填写属性内容,最多不超过100个字')
            return
          }
        }
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let indexNum = 0
            const productAttributesMap = JSON.parse(JSON.stringify(this.productAttributes))
            const table = productAttributesMap.map(item => {
              item.productId = this.uploadData.businessDataId
              item.sort = indexNum++
              delete item.attributeList
              delete item.id
              delete item.content
              delete item.name
              delete item.productClassId
              delete item.sortNumber
              return item
            })
            const { productClassify, productNumber } = this.ruleForm
            const params = {
              Loading: true,
              ...this.ruleForm,
              productNumber: this.classNumber + productNumber,
              id: this.uploadData.businessDataId,
              productClassify: productClassify.toString(),
              productAttributes: table
            }
            this.$store.commit('SET_BASEINFOTABLE', table)
            delete params.productClassifyChange
            delete params.produceStatus
            delete params.publishStatus
            delete params.attributeDTOList
            if (this.$route.query.type === 'edit' || this.addOrEditState === 'isAdd') {
              productEdit(params, this.uploadData.businessDataId).then(({ data }) => {
                this.$message.success('修改成功!')
                resolve('isAdd')
              })
            } else {
              productSave(params).then(({ data }) => {
                this.$message.success('保存成功!')
                resolve('isAdd')
              })
            }
          } else {
            inject()
            return false
          }
        })
      })
    },
    amountInputBlur() {
      const ruleForm = {
        ...this.ruleForm
      }
      if (ruleForm.price) this.ruleForm.price = toDecimal(ruleForm.price, 2)
    }
  }
}
</script>

<style lang="less" scoped>
.base-info{
  .info-form {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    & > div {
      width: 50%;
    }
    & > .el-form-item {
      width: 50%;
      .el-date-editor.el-input,.el-select {
        width: 100%;
      }
       &.all-width{
        width:100%;
      }
    }
    .text{
      color:#999;
      font-size:12px;
    }
    .product-attributes {
      width: 100%;
      padding-left:100px;
      display: flex;
      flex-direction:row ;
      justify-content:start ;
      align-items: center;

    }
    .iconfont {
      color:#666;
      font-size: 16px;
      padding-right:5px;
      cursor: pointer;
    }
    .iconfont:hover{
      color:#0a4c8a
    }
  }
  .attr-form {
    .attr-box {
      display:flex;
      padding-bottom:5px;
    }
  }
  .product-attributes
  .base-info-footer {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }

}
</style>
<style lang="less">
.base-info {
  .el-table__body-wrapper {
    max-height: calc(100vh - 500px);
  }
  .el-table__header-wrapper{
    max-height: calc(100vh - 450px);
  }
}
</style>
