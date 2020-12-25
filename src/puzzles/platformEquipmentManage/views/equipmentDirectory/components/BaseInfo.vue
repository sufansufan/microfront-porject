<template>
  <div class="base-info">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="info-form">
      <div class="header">
        <div>
          <el-form-item label="设备名称" prop="deviceName">
            <el-input v-model.trim="ruleForm.deviceName" :maxlength="20" placeholder="请选择设备名称" :disabled="disabled" clearable />
          </el-form-item>
          <el-form-item label="设备类型" prop="deviceType">
            <el-select v-model.trim="ruleForm.deviceType" :disabled="disabled" placeholder="请选择设备类型" clearable>
              <el-option
                v-for="item in constant.deviceType"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="品牌" prop="brand">
            <el-input v-model.trim="ruleForm.brand" placeholder="请输入品牌" :maxlength="20" :disabled="disabled" clearable />
          </el-form-item>
        </div>
        <div class="upload-frame">
          <el-upload
            ref="upload"
            class="avatar-uploader"
            :action="actionUrl"
            :show-file-list="false"
            :data="uploadData"
            :headers="uploadHeaders"
            :on-success="uploadSuccess"
            :before-upload="beforeUpload1M"
            :on-remove="(file, fileList) => {handleRemove(file, fileList, 'photoList')}"
          >
            <img v-if="ruleForm.deviceImage" :src="ruleForm.deviceImage" class="avatar" style="width:100%; height: 100%" @click="uploadbefore('photo')">
            <i v-else class="el-icon-plus avatar-uploader-icon" @click="uploadbefore('photo')" />
          </el-upload>
        </div>
      </div>
      <el-form-item label="规格型号" prop="specifications">
        <el-input v-model.trim="ruleForm.specifications" placeholder="请输入规格型号" :disabled="disabled" clearable :maxlength="20" />
      </el-form-item>
      <el-form-item label="单位" prop="unit">
        <el-select v-model.trim="ruleForm.unit" placeholder="请选择单位" clearable :disabled="disabled">
          <el-option
            v-for="item in constant.deviceUnit"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="市场价格" prop="unitPrice">
        <el-input v-model.trim="ruleForm.unitPrice" placeholder="请输入市场价格" :maxlength="10" :disabled="disabled" clearable />
      </el-form-item>
      <el-form-item label="产品说明书">
        <el-upload
          ref="upload"
          :file-list="bookList"
          :action="actionUrl"
          :on-success="fileBookSuccess"
          :data="uploadData"
          :headers="uploadHeaders"
          :on-remove="(file, fileList) => {handleRemove(file, fileList, 'bookList')}"
          :disabled="disabled"
          :before-upload="beforeUpload50M"
          :limit="1"
          :on-preview="previewFile"
        >
          <el-button type="primary" :disabled="disabled" @click="uploadbefore('book')">上传附件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="设备描述" style="width: 100%" class="row-label">
        <el-input v-model.trim="ruleForm.deviceDescription" placeholder="请输入设备描述" type="textarea" :rows="3" :disabled="disabled" :maxlength="255" />
      </el-form-item>
    </el-form>
    <div v-if="$route.query.type" class="base-info-footer">
      <el-button type="primary" @click="submit">保存</el-button>
      <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>

<script>
import upload from '@core/mixins/upload'
import { validateLength, validatePositive } from '@core/utils/validate'
import { mapGetters } from 'vuex'
import { addDirectories, getDirectoriesFromId, editDirectories } from '@core/api/platformEquipmentManage/devicemanager'
import { checkOrderByCataloguesId } from '@core/api/platformEquipmentManage/deviceordermanager'
export default {
  mixins: [upload],
  props: {
    disabled: {
      default: true,
      type: Boolean
    }
  },
  data() {
    var validPrice = (rule, value, callback) => {
      if (!validatePositive(value) && value) {
        callback(new Error('请输入任意正数,正小数(小数位不超过2位)'))
      } else {
        callback()
      }
    }
    return {
      fileList: [],
      bookList: [],
      photoList: [],
      ruleForm: {
        id: '',
        deviceName: '',
        deviceType: '',
        brand: '',
        specifications: '',
        unit: '',
        unitPrice: '',
        deviceDescription: '',
        deviceImage: '',
        productInfoUrl: '',
        productInfoName: ''
      },
      rules: {
        deviceName: [{ required: true, message: '请输入设备名称', trigger: 'blur' }, validateLength(0, 20)],
        deviceType: [{ required: true, message: '请选择设备类型', trigger: 'change' }],
        brand: [{ required: true, message: '请输入品牌', trigger: 'blur' }, validateLength(0, 20)],
        specifications: [{ required: true, message: '请输入规格型号', trigger: 'blur' }, validateLength(0, 20)],
        unit: [{ required: true, message: '请选择单位', trigger: 'change' }],
        unitPrice: [{ required: true, message: '请输入市场价格', trigger: 'blur' }, { required: true, validator: validPrice, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['deviceType', 'deviceUnit'])
    const { id } = this.$route.query
    // 查看获取数据
    if (id) {
      this.fetchSingleData(id)
      this.fetchFileList(id, 'equipmentDirectoryBook')
      this.uploadData.businessDataId = id
    }
  },
  methods: {
    // 根据ID获取数据
    fetchSingleData(id) {
      getDirectoriesFromId(id).then(({ data: { id, deviceName, deviceType, brand, specifications, unitPrice, deviceDescription, unit, deviceImage, productInfoUrl, productInfoName }}) => {
        this.ruleForm = { id, deviceName, deviceType, brand, specifications, unit, unitPrice, deviceDescription, deviceImage, productInfoUrl, productInfoName }
        this.$store.commit('SET_DIRECTORYTITLENAME', deviceName)
      })
    },
    // 获取附件
    fetchFileList(id, type) {
      this.getFileLoad(id, type).then(data => {
        switch (type) {
          case 'equipmentDirectoryPhoto':
            this.ruleForm.deviceImage = data ? data[0].fileUrl : ''
            this.photoList = data
            break
          case 'equipmentDirectoryBook':
            this.bookList = data
            this.bookList.map(item => {
              item.name = item.fileName
              item.url = item.fileUrl
              return item
            })
            break
          default:
            break
        }
      })
    },
    // 切换上传文件typeCode
    uploadbefore(type) {
      switch (type) {
        case 'photo':
          this.uploadData.typeCode = 'equipmentDirectoryPhoto'
          break
        case 'book':
          this.uploadData.typeCode = 'equipmentDirectoryBook'
          break
        default:
          break
      }
    },
    uploadSuccess(response, file, fileList) {
      this.uploadLoading.close()
      const { data } = response
      const row = data[0]
      this.ruleForm.deviceImage = row.fileUrl
      this.photoList.forEach(item => {
        if (item.id !== row.id) {
          this.handleRemove(item)
        }
      })
    },
    fileBookSuccess(response, file, fileList) {
      this.uploadLoading.close()
      const { data } = response
      const { fileName, fileUrl } = data[0]
      this.ruleForm.productInfoUrl = fileUrl
      const last = fileName.lastIndexOf('.')
      this.ruleForm.productInfoName = fileName.slice(0, last)
      this.bookList = fileList
    },
    // 点击提交
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 附件删除之后需要传productInfoUrl,productInfoName 且为空
          if (this.bookList.length === 0) {
            this.ruleForm.productInfoUrl = ''
            this.ruleForm.productInfoName = ''
          }
          const params = {
            Loading: true,
            ...this.ruleForm
          }
          params.id = this.uploadData.businessDataId
          const { type } = this.$route.query
          if (type === 'add') {
            addDirectories(params).then(() => {
              this.$message.success('新增成功')
              this.$router.go(-1)
            })
          } else if (type === 'edit') {
            checkOrderByCataloguesId(params.id).then(({ data }) => {
              if (data) {
                this.$confirm('该名录已有采购订单，确认是否修改?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.editSubmit(params)
                })
              } else {
                this.editSubmit(params)
              }
            })
            return
          }
        } else {
          return false
        }
      })
    },
    editSubmit(params) {
      editDirectories(params).then(() => {
        this.$message.success('修改成功')
        this.$router.go(-1)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.base-info {
  .info-form {
    display: flex;
    flex-wrap: wrap;
    .header {
      display: flex;
      width: 100%;
      & > div {
        width: 50%;
      }
    }
    & > .el-form-item {
      width: 50%;
    }
    .el-select {
      width: 100%;
    }
  }
  .base-info-footer {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
