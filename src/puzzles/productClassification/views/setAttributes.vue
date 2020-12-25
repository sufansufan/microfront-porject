<template>
  <div class="resorce-add">
    <el-form :model="ruleForm" class="resorce-form" label-width="95px">
      <el-form-item label="分类编号" prop="classNumber">
        <el-input v-model.trim="ruleForm.classNumber" :maxlength="20" :disabled="disabled" placeholder="请输入分类编号" />
      </el-form-item>
      <el-form-item label="分类名称" prop="className">
        <el-input v-model.trim="ruleForm.className" :maxlength="20" :disabled="disabled" placeholder="请输入分类名称" />
      </el-form-item>
      <el-form-item label="上级分类" prop="classType">
        <el-cascader
          v-model="ruleForm.classType"
          :disabled="disabled"
          placeholder="请选择上级分类"
          :options="treeData"
          :props="{ multiple: false, checkStrictly: true ,value: 'classNumber', label: 'name', children: 'childrens',}"
          clearable
        />
      </el-form-item>
      <el-form-item label="状态" prop="classState">
        <el-select v-model="ruleForm.classState" :disabled="disabled " placeholder="请选择上级分类" @change="getClassState">
          <el-option v-for="item in constant.productClassState" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item label="说明" class="all-width  row-label" prop="classRemark">
        <el-input v-model.trim="ruleForm.classRemark" type="textarea" :maxlength="255" :rows="3" clearable :disabled="disabled" placeholder="请输入说明" />
      </el-form-item>
      <el-form-item label="分类属性" class="all-width" prop="classRemark">
        <el-button type="primary" @click="addAttributes">添加属性</el-button>
      </el-form-item>
      <div class="attribute-tab-div">
        <div style="width: 100% ">
          <el-table
            ref="tableRef"
            v-loading="loading"
            :data=" ruleForm.productClassPropertys"
            row-key="id"
            border
            max-height="calc(100vh - 300px)"
            @sort-change="sortTable"
            @select="handleSelectionSingleChange"
          >
            <el-table-column prop="name" label="属性名称" align="center" width="260" />
            <el-table-column prop="content" label="属性内容" align="center" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span class="one-ellipsis white-space" >{{scope.row.content}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="450">
              <template slot-scope="scope">
                <div class="product_attributes_operator">
                  <el-button size="mini" @click="updateData(scope.row, scope.$index)">修改</el-button>
                  <el-button size="mini" type="danger" @click="ruleForm.productClassPropertys.splice(scope.$index,1)">删除</el-button>
                  <el-button v-if="scope.$index!= ruleForm.productClassPropertys.length - 1" size="mini" type="info" icon="el-icon-bottom" @click="sortDown(scope.$index)" />
                  <el-button v-if="scope.$index!=0" size="mini" type="info" icon="el-icon-top" @click="sortUP(scope.$index)" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-form>
    <div class="submit-div">
      <el-button type="primary" @click="saveProductAttribute">保存</el-button>
      <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
    </div>

    <drag-dialog ref="dialog" :title="attributeDialogTitle" width="30%">
      <el-form ref="ruleForm" :model="attributeForm" :rules="rules">
        <el-form-item label="属性名称" label-width="95px" prop="name">
          <el-input v-model.trim="attributeForm.name" autocomplete="off" style="width: 100%" />
        </el-form-item>
        <el-form-item label="属性内容" label-width="95px" class="addAttributesLine-button" :error="contentError" required>
          <el-button type="primary" @click="addAttributesLine">添加行</el-button>
          <ul class="dialog-ui">
            <span v-for="(item,index) in content" :key="index" class="dialog-span">
              <span :class=" index === 0? 'dialog-span-content-item-first':'dialog-span-content-item'">
                <el-input v-model="content[index]" :maxlength="20" clearable autocomplete="off" placeholder="请输入属性内容" @blur="loseFocus(content[index])" />
              </span>
              <span :class="index === 0? 'dialog-span-opertion-item-first':'dialog-span-opertion-item'">
                <el-button type="danger" @click="deleteContentItem(index,item)">删除</el-button>
              </span>
            </span>
          </ul>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" @click="addProductAttribute">确 定</el-button>
      </span>
    </drag-dialog>
  </div>
</template>

<script>
import { getLeftTree, getOne, addProperty } from '@core/api/productClassification'
import upload from '@core/mixins/upload'
import { mapGetters } from 'vuex'
import { getNumberCode } from '@core/utils'
import { validateLength } from '@core/utils/validate'
import DragDialog from '@frames/dashboard/components/Dialog'

export default {
  components: {
    DragDialog
  },
  mixins: [upload],
  props: {
    disabled: {
      default: true,
      type: Boolean
    },
    companyType: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      content: [''],
      attributeForm: {
        content: this.content,
        id: '',
        tag: '',
        name: '',
        productClassId: '',
        sortNumber: ''
      },
      ruleForm: {
        classNumber: '',
        className: '',
        classType: [],
        parentId: '',
        classState: '',
        classRemark: '',
        id: '',
        productClassPropertys: []
      },
      dialogVisible: false,
      rules: {
        name: [{ required: true, message: '请输入属性名称 ', trigger: 'blur' }, validateLength(0, 20)]
        // content: [{ validator: validateName, trigger: 'change' }]
      },
      loading: false,
      contentError: '',
      attributeDialogTitle: '新增属性'
    }
  },

  computed: {
    ...mapGetters(['constant'])
  },
  watch: {
    companyType: {
      handler(value) {
        if (value) {
          this.fetchData()
        }
      },
      immediate: true,
      deep: true
    }

  },
  created() {
    this.$store.dispatch('getConstant', ['productClassState']).then(() => {})
    const id = this.$route.query.id
    this.getOneForID(id)
    this.getTree1()
  },
  methods: {

    getOneForID(id) {
      this.loading = true
      getOne(id).then(({ data }) => {
        this.ruleForm.classNumber = data.classNumber
        this.ruleForm.className = data.name
        this.ruleForm.classType = data.classNumber
        this.ruleForm.parentId = data.parentId
        this.ruleForm.classState = data.state
        this.ruleForm.classRemark = data.remark
        this.ruleForm.id = data.id
        this.ruleForm.productClassPropertys = data.productClassPropertys
        this.ruleForm.productClassPropertys.length
        this.ruleForm.productClassPropertys.forEach(item => {
          item.tag = getNumberCode()
        })
        this.loading = false
      })
    },
    getTree1() {
      getLeftTree({}).then(({ data }) => {
        this.treeData = data
      })
    },
    canlceProductAttribute() {
      this.dialogVisible = false
    },
    addProductAttribute() {
      this.$refs['ruleForm'].validate((valid) => {
        let isTrue = false
        if (this.contentError === '') {
          isTrue = true
        } else {
          isTrue = false
        }
        if (this.content.join('').trim() === '') {
          this.contentError = '请输入属性内容'
          return
        }
        if (valid && isTrue) {
          this.$refs.dialog.show = false
          this.dialogVisible = false

          let localAttributeForm = {}
          let isUpdate = false
          for (let i = 0; i < this.ruleForm.productClassPropertys.length; i++) {
            if (this.ruleForm.productClassPropertys[i].tag === this.attributeForm.tag) {
              // 修改替换
              isUpdate = true
              this.attributeForm.content = this.content.filter(item => (item && item.trim())).join(',')
              localAttributeForm = JSON.parse(JSON.stringify(this.attributeForm))
              this.ruleForm.productClassPropertys.splice(i, 1, localAttributeForm)
            }
          }
          if (!isUpdate) { // 添加
            this.attributeForm.sortNumber = this.ruleForm.productClassPropertys.length
            this.attributeForm.content = this.content.filter(item => (item && item.trim())).join(',')

            localAttributeForm = JSON.parse(JSON.stringify(this.attributeForm))
            this.ruleForm.productClassPropertys.push(localAttributeForm)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    saveProductAttribute() {
      const id = this.$route.query.id
      const param = {
        id: id,
        productClassPropertys: this.ruleForm.productClassPropertys
      }
      addProperty(param).then(({ data }) => {
        this.getOneForID(id)
        this.$message.success('保存成功!')
        this.$router.go(-1)
        // this.$router.replace({ path: '/productClassification/index' })
      })
    },
    sortUP(index) {
      this.ruleForm.productClassPropertys[index].sortNumber--
      this.ruleForm.productClassPropertys[index - 1].sortNumber++
      [this.ruleForm.productClassPropertys[index], this.ruleForm.productClassPropertys[index - 1]] = [this.ruleForm.productClassPropertys[index - 1], this.ruleForm.productClassPropertys[index]]
      this.$set(this.ruleForm.productClassPropertys, index, this.ruleForm.productClassPropertys[index])
    },
    sortDown(index) {
      this.ruleForm.productClassPropertys[index].sortNumber++
      this.ruleForm.productClassPropertys[index + 1].sortNumber--
      [this.ruleForm.productClassPropertys[index], this.ruleForm.productClassPropertys[index + 1]] = [this.ruleForm.productClassPropertys[index + 1], this.ruleForm.productClassPropertys[index]]
      this.$set(this.ruleForm.productClassPropertys, index, this.ruleForm.productClassPropertys[index])
    },
    updateData(data, index) {
      this.attributeDialogTitle = '修改属性'
      this.$refs.dialog.show = true
      this.dialogVisible = !this.dialogVisible
      let localeData = {}
      localeData = JSON.parse(JSON.stringify(this.ruleForm.productClassPropertys[index]))
      let contentArray = []
      contentArray = JSON.parse(JSON.stringify(localeData.content.split(',')))
      this.content = contentArray
      this.attributeForm = localeData
      this.attributeForm.content = contentArray
    },
    deleteAttributesItem(data, index) {
      this.ruleForm.productClassPropertys.splice(index, 1)
    },
    deleteContentItem(index, item) {
      this.content.splice(index, 1)
      this.attributeForm.content = this.content
    },
    addAttributes() {
      this.attributeDialogTitle = '新增属性'
      this.$refs.dialog.show = true
      this.dialogVisible = !this.dialogVisible
      this.content = ['']
      this.attributeForm = {
        content: this.content,
        id: '',
        tag: getNumberCode(),
        name: '',
        productClassId: '',
        sortNumber: ''
      }
    },
    addAttributesLine() {
      this.content.push('')
    },
    loseFocus(data) {
      if (this.content.join('').trim() !== '') {
        this.contentError = ''
      } else {
        this.contentError = '请输入属性内容'
        return
      }
      let contain = false
      this.content.forEach(item => {
        if (item.indexOf(',') !== -1) {
          contain = true
        }
      })
      if (contain) {
        this.contentError = '请勿输入英文“,”'
      } else {
        this.contentError = ''
      }
    },
    getCharCount(str) {
      const regex = new RegExp(' ', 'g') // 使用g表示整个字符串都要匹配
      const result = str.match(regex) // match方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
      // return !result ? 0 : result.length

      const conut = !result ? 0 : result.length
      str.replace('/ /g', '\xa0')
      // console.log('============='+conut)
      // for (let i = 0; i < conut; i++) {
      //   str + '\xa0'
      // }
      // console.log('============='+str)
      return str
    }
  }
}
</script>
<style lang="less" scoped>
    .resorce-add {
        padding: 5px 10px;
        .resorce-form {
            display: flex;
            flex-wrap: wrap;
            .el-form-item {
                width: 50%;
                /*padding: 3px 0;*/
              .el-button{
                /*padding: 5px;*/
              }
            }
            .el-select, .all-width{
                width:100%
            }
          .el-cascader, .all-width{
            width:100%
          }
        }
        .el-dialog{
          .el-form{
            .addAttributesLine-button{
              margin: 15px 0 25px 0;
             }
             .dialog-ui{
               max-height:200px;
               overflow-x:hidden;
               .dialog-span{
                 display: flex;
                 flex-direction:row ;
                 justify-content:start ;
                 align-items: center;
                 width: 100% ;
                 overflow: auto;

                 .dialog-span-content-item {
                   width: 100%;
                   padding: 5px 15px;
                   border:1px #c8c8c8 solid ;
                   border-style:none solid solid solid;
                   height:35px ;
                   align-items: center;
                   display: flex;
                 }
                 .dialog-span-content-item-first {
                   width: 100%;
                   padding: 5px 15px;
                   border:1px #c8c8c8 solid ;
                   border-style:solid solid solid solid;
                   margin-top: 5px;
                   height:35px ;
                   align-items: center;
                   display: flex;
                 }
                 .dialog-span-opertion-item {
                   padding: 5px 15px;
                   border:1px #c8c8c8 solid ;
                   border-style:none solid solid none;
                   height:35px ;
                   align-items: center;
                   display: flex;
                 }

                 .dialog-span-opertion-item-first {
                   padding: 5px 15px;
                   border:1px #c8c8c8 solid ;
                   border-style:solid solid solid none;
                   margin-top: 5px;
                   height:35px ;
                   align-items: center;
                   display: flex;
                 }
               }
             }
           }

        }
    }

    .submit-div{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 50px
    }

    .attribute-tab-div{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 3px
    }
    .product_attributes_operator{
      width: 100%;
      padding-left:100px;
      display: flex;
      flex-direction:row ;
      justify-content:start ;
      align-items: center;
    }
    .white-space {
      white-space:pre
    }
</style>
