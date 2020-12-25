<template>
  <div class="add-post">
    <div v-if="back">
      <el-button class="back-btn" @click="goPostInfo"><i class="iconfont icon-fanhui-copy" /> 返回</el-button>
    </div>
    <div class="title">{{ this.$route.query.postName }}（{{ this.$route.query.postNumber }}）</div>
    <el-form ref="ruleForm" label-width="110px" :rules="rules" :model="ruleForm">
      <el-form-item label="基础角色" prop="baseId">
        <el-select v-model="ruleForm.baseId" placeholder="请选择" class="fill-name" :disabled="disabled" @change="selectChange">
          <el-option
            v-for="item in basicRole"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="资源授权" prop="basicrole">
        <role-power ref="role" v-loading="loading" :role-data="roleData" :post-data="postData" :ischeckbox="ischeckbox" />
      </el-form-item>
      <el-form-item v-if="btn" class="btnadd">
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button class="cancel-btn" @click="$router.back(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import RolePower from '@frames/dashboard/components/RolePower'
import { mapGetters } from 'vuex'
import { getNotPage } from '@core/api/role'
import { saveAuthority, getPostPower } from '@core/api/post'
import { getRoleId } from '@core/api/authorizationPost'
export default {
  components: {
    RolePower
  },
  props: {
    seeType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      options: [],
      ruleForm: {
        id: '',
        baseId: ''
      },
      rules: {
        baseId: [{ required: true, message: '请选择基础角色', trigger: 'change' }]
      },
      basicRole: [],
      roleData: [],
      postData: [],
      disabled: false,
      detailsData: {},
      back: false,
      btn: true,
      ischeckbox: true,
      loading: false,
      selectLoading: false
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  watch: {
    seeType: {
      handler(newValue) {
        if (newValue) {
          this.disabled = true
          this.back = true
          this.btn = false
        }
      },
      immediate: true
    }
  },
  created() {
    const { baseId, id } = this.$route.query
    this.ischeckbox = this.seeType ? this.seeType !== 'details' : true
    this.ruleForm.baseId = baseId
    this.getBasicRole().then(res => {
      if (id) {
        this.featchSingData(id)
      }
    })
  },
  methods: {
    goPostInfo() {
      this.$router.go(-1)
    },
    selectChange() {
      this.fetchRoleId()
    },
    fetchRoleId() {
      this.roleData = []
      getRoleId(this.ruleForm.baseId).then(({ data }) => {
        this.roleData = data
      })
    },
    featchSingData(id) {
      this.loading = true
      getPostPower(id).then(({ data }) => {
        this.loading = false
        this.roleData = data
        this.$nextTick(() => {
          data.forEach(item => {
            if (item.roleType === '01' || item.roleType === '02') {
              this.ruleForm.baseId = item.id
            }
          })
        })
      })
    },
    getBasicRole() {
      this.selectLoading = true
      return new Promise((resolve, reject) => {
        const params = {
          roleTypeList: ['01', '02']
        }
        getNotPage(params).then(({ data }) => {
          this.selectLoading = false
          resolve(data)
          this.basicRole = data
        })
      })
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const resourceIds = this.$refs.role.resourceIds
          const filters = this.$refs.role.filters
          const idData = this.roleData.filter(item => item.roleType === '03')[0]
          this.$refs.role.handlerFilterData(this.$refs.role.tableData)
          if (!this.$refs.role.filterFlag) return
          const params = {
            Loading: true,
            appIds: this.$route.query.appId,
            postId: this.$route.query.id,
            ...this.ruleForm,
            resourceIds: resourceIds.toString(),
            filters: filters.toString(),
            roleType: '03',
            id: this.roleData.length ? idData ? idData.id : '' : ''
          }
          saveAuthority(params).then(res => {
            if (res.code === 200) {
              this.$message.success('设置成功')
              this.$router.go(-1)
            }
            return
          })
        }
        return false
      })
    }

  }
}
</script>

<style lang="less">
.add-post{
  padding: 20px;
  height: calc(100vh - 160px);
  overflow-y: auto;
  .fill-name{
    width: 100%;
  }
  .title{
    text-align: center;
    font-size:16px;
    font-weight: 700;
    color:#333333;
    padding-bottom:20px;
  }
  .btnadd{
    text-align: center;
  }
}
</style>
