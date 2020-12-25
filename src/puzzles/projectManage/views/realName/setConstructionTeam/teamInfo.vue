<template>
  <div class="team-info">
    <el-form ref="ruleForm" v-loading="loading" :rules="rules" :model="ruleForm" label-width="110px" class="rule-form-flex">
      <el-form-item label="编号" prop="number">
        <el-input
          v-model.trim="ruleForm.number"
          clearable
          placeholder="请输入编号"
          :maxlength="6"
          :disabled="isDetails"
        />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input
          v-model.trim="ruleForm.name"
          clearable
          placeholder="请输入名称"
          :maxlength="20"
          :disabled="isDetails"
        />
      </el-form-item>

      <el-form-item label="级别" prop="level">
        <el-select
          v-model="ruleForm.level"
          clearable
          placeholder="请选择级别"
          :disabled="isDetails"
        >
          <el-option v-for="item in []" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="addGroup || editGroup" label="所属施工队" prop="team">
        <el-select
          v-model="ruleForm.team"
          clearable
          placeholder="请选择所属施工队"
          :disabled="isDetails"
        >
          <el-option v-for="item in []" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="addTeam || editTeam" label="所属公司" prop="company">
        <el-cascader
          v-model="ruleForm.company"
          placeholder="请选择所属公司"
          clearable
          :disabled="isDetails"
          style="width:100%"
          filterable
          :options="[]"
          :props="{ expandTrigger: 'hover', value: 'id', label: 'name', children: 'list' }"
        />
      </el-form-item>
      <template v-if="editTeam || editGroup">
        <el-form-item label="负责人" prop="person">
          <el-select
            v-model="ruleForm.person"
            clearable
            placeholder="请选择负责人"
            :disabled="isDetails"
          >
            <el-option v-for="item in []" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item label="负责人联系电话" prop="phone">
          <el-input
            v-model.trim="ruleForm.phone"
            clearable
            placeholder="请输入负责人联系电话"
            :maxlength="11"
            :disabled="isDetails"
          />
        </el-form-item>
      </template>
      <template v-if="editTeam">
        <el-form-item label="代班" prop="selina">
          <el-select
            v-model="ruleForm.selina"
            clearable
            placeholder="请选择代班"
            :disabled="isDetails"
          >
            <el-option v-for="item in []" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item label="代班联系电话" prop="selinaphone">
          <el-input
            v-model.trim="ruleForm.selinaphone"
            :maxlength="11"
            clearable
            placeholder="请输入代班联系电话"
            :disabled="isDetails"
          />
        </el-form-item>
      </template>
      <el-form-item label="进场日期" prop="indate">
        <el-date-picker
          v-model="ruleForm.indate"
          type="date"
          placeholder="请选择进场日期"
          clearable
          :disabled="isDetails"
        />
      </el-form-item>
      <el-form-item label="退场日期" prop="backdate">
        <el-date-picker
          v-model="ruleForm.backdate"
          type="date"
          placeholder="请选择退场日期"
          clearable
          :disabled="isDetails"
        />
      </el-form-item>
      <el-form-item label="简介" class="one-width" prop="jianjie">
        <el-input v-model.trim="ruleForm.jianjie" type="textarea" :maxlength="255" :rows="3" :disabled="isDetails" placeholder="请输入简介" />
      </el-form-item>
      <el-form-item label="备注" class="one-width" prop="remark">
        <el-input v-model.trim="ruleForm.remark" type="textarea" :maxlength="255" :rows="3" :disabled="isDetails" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
    <div v-if="isEdit" class="rule-form-btn-box">
      <el-button type="primary">保存</el-button>
      <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>

<script>
import { validateLength } from '@core/utils/validate'
export default {
  data() {
    return {
      loading: false,
      ruleForm: {
        number: '', // 编号
        name: '', // 名称
        level: '', // 级别
        company: '', // 所属公司
        team: '', // 所属施工队
        indate: '', // 进场日期
        backdate: '', // 退场日期
        person: '', // 联系人
        phone: '', // 联系人电话
        selina: '', // 代班
        selinaphone: '', // 代班联系电话
        jianjie: '', // 简介
        remark: ''// 备注
      },
      rules: {
        number: [validateLength(0, 6)],
        phone: [validateLength(0, 11)],
        selinaphone: [validateLength(0, 11)],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }, validateLength(0, 20)],
        level: [{ required: true, message: '请选择级别', trigger: 'change' }],
        company: [{ required: true, message: '请选择所属公司', trigger: 'change' }],
        indate: [{ required: true, message: '请选择进场日期', trigger: 'change' }],
        backdate: [{ required: true, message: '请选择退场日期', trigger: 'change' }],
        jianjie: [validateLength(0, 255)],
        remark: [validateLength(0, 255)]
      }
    }
  },
  computed: {
    addTeam() {
      return this.$route.query.typePage === 'team'
    },
    editTeam() {
      return this.$route.query.row.level === '施工队'
    },
    addGroup() {
      return this.$route.query.typePage === 'group'
    },
    editGroup() {
      return this.$route.query.row.level === '施工班组'
    },
    isDetails() {
      return this.$route.query.type === 'details'
    },
    isEdit() {
      return this.$route.query.type === 'edit'
    }

  },
  created() {
    console.log(this.$route.query.row, 'row')
  }
}
</script>

<style lang="less" scoped>
.team-info {
  .rule-form-flex {
    display: flex;
    flex-wrap: wrap;
    & > .el-form-item {
      width: 50%;
    }
  }
}
</style>
