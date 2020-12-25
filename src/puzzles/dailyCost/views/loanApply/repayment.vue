//还款
<template>
  <div class="repay-ment">
    <div class="title">
      <crumb-box>
        <div>借款信息</div>
      </crumb-box>
    </div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="借款单号">
            <el-input
              v-model="ruleForm.applicant"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="借款人">
            <el-input
              v-model="ruleForm.applicationTime"
              value-format="yyyy-MM-dd"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="所属组织"
            prop="name"
          >
            <el-select
              v-model="ruleForm.region"
              style="width: 100%"
              placeholder="请选择申请类别"
              :disabled="true"
            >
              <el-option
                label="区域一"
                value="shanghai"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="借款金额"
            prop="region"
          >
            <el-input
              v-model="ruleForm.applicationTime"
              value-format="yyyy-MM-dd"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="项目名称"
            prop="name"
          >
            <el-select
              v-model="ruleForm.region"
              :disabled="true"
              style="width: 100%"
              placeholder="请选择申请类别"
            >
              <el-option
                label="区域一"
                value="shanghai"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="归属单位"
            prop="region"
          >
            <el-input
              v-model="ruleForm.applicant"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="借款对象"
            prop="name"
          >
            <el-select
              v-model="ruleForm.region"
              :disabled="true"
              style="width: 100%"
              placeholder="请选择申请类别"
            >
              <el-option
                label="区域一"
                value="shanghai"
              />
            </el-select>

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="借款类型"
            prop="region"
          >
            <el-select
              v-model="ruleForm.region"
              :disabled="true"
              style="width: 100%"
              placeholder="请选择申请类别"
            >
              <el-option
                label="区域一"
                value="shanghai"
              />
            </el-select>

          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="借款用途"
            prop="name"
          >
            <el-input
              v-model="ruleForm.region"
              type="textarea"
              placeholder="请输入内容"
              :disabled="true"
            />

          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="申请时间"
            prop="region"
          >
            <el-input
              v-model="ruleForm.region"
              :rows="2"
              placeholder="请输入内容"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="title">
      <crumb-box>
        <div>历史还款明细</div>
      </crumb-box>
    </div>
    <div class="search">
      <div class="select">
        <div>
          <span>已还金额</span>
          <el-input
            v-model="input"
            placeholder="请输入"
            :disabled="true"
          />
        </div>
        <div>
          <span>未还金额</span>
          <el-input
            v-model="input"
            placeholder="请输入"
            :disabled="true"
          />

        </div>
      </div>
    </div>
    <div>
      <el-table
        :data="tableData"
        row-key="id"
        border
        default-expand-all
      >
        <el-table-column
          prop="index"
          label="序号"
          width="50"
          align="center"
        />
        <el-table-column
          prop="number"
          label="还款日期"
          width="100"
          align="center"
        />
        <el-table-column
          prop="number"
          label="还款方式"
          width="100"
          align="center"
        />
        <el-table-column
          prop="number"
          label="还款金额"
          width="100"
          align="center"
        />

        <el-table-column
          prop="number"
          align="center"
          label="报销单号"
          width="180"
        >
          <template slot-scope="scope">
            <div
              class="table-click-color"
              @click="view(scope.row)"
            >{{ scope.row.number }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="number"
          label="支付方式"
          align="center"
        />
        <el-table-column
          prop="number"
          label="支票号"
          align="center"
        />
        <el-table-column
          prop="number"
          label="支票号银行名称"
          align="center"
        />
        <el-table-column
          prop="number"
          label="收款账户类型"
          width="120"
          align="center"
        />
        <el-table-column
          prop="number"
          label="收款账户"
          align="center"
        />
        <el-table-column
          prop="number"
          label="收款人"
          align="center"
          width="200"
        />
        <el-table-column
          prop="number"
          label="备注"
          width="100"
          align="center"
        />
        <el-table-column
          prop="number"
          label="确认人"
          align="center"
          width="180"
        />
        <el-table-column
          prop="number"
          label="确认时间"
          align="center"
          width="140"
        />
      </el-table>
    </div>
    <div class="title">
      <crumb-box>
        <div>确认信息</div>
      </crumb-box>
    </div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="本次还款金额">
            <el-input
              v-model="ruleForm.applicant"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="剩余还款金额">
            <el-input
              v-model="ruleForm.applicationTime"
              value-format="yyyy-MM-dd"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="还款日期"
            prop="name"
          >
            <el-input
              v-model="ruleForm.applicationTime"
              value-format="yyyy-MM-dd"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="支付方式"
            prop="region"
          >
            <el-select
              v-model="ruleForm.region"
              :disabled="true"
              style="width: 100%"
              placeholder="请选择申请类别"
            >
              <el-option
                label="区域一"
                value="shanghai"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="支票号"
            prop="name"
          >
            <el-input
              v-model="ruleForm.applicant"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="支票银行名称"
            prop="region"
          >
            <el-input
              v-model="ruleForm.applicant"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="收款账户类型"
            prop="name"
          >
            <el-select
              v-model="ruleForm.region"
              :disabled="true"
              style="width: 100%"
              placeholder="请选择申请类别"
            >
              <el-option
                label="区域一"
                value="shanghai"
              />
            </el-select>

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="收款账户"
            prop="region"
          >
            <div class="fill-line">
              <el-input
                v-model="ruleForm.applicant"
                :disabled="true"
              />
              <el-button
                type="primary"
                icon="el-icon-search"
                @click="search"
              />
            </div>

          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="收款人"
            prop="name"
          >
            <el-select
              v-model="ruleForm.region"
              :disabled="true"
              style="width: 100%"
              placeholder="请选择申请类别"
            >
              <el-option
                label="区域一"
                value="shanghai"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="收款备注"
            prop="region"
          >
            <el-input
              v-model="ruleForm.region"
              :disabled="true"
              type="textarea"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item class="btn">
            <el-button type="primary">确定</el-button>
            <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <drag-dialog
      ref="dialog"
      title="选择现金账户"
      width="50%"
      height="60%"
    >
      <collection-account />
    </drag-dialog>
  </div>
</template>

<script>
import DragDialog from '@frames/dashboard/components/Dialog'
import CollectionAccount from './components/collectionaccount'
import CrumbBox from '@frames/dashboard/components/CrumbBox'
export default {
  components: { DragDialog, CollectionAccount, CrumbBox },
  data() {
    return {
      ruleForm: {
        region: ''
      },
      tableData: [{ number: '银行账户', index: 1 }]
    }
  },
  methods: {
    search() {
      this.$refs.dialog.show = true
    }
  }
}
</script>

<style lang="less" scoped>
.repay-ment {
  height: calc(100vh - 160px);
  overflow-y: auto;
  padding: 20px;
  .search > .select > div {
    margin: 0 15px 10px 15px;
    width: 48%;
  }
  .btn {
    text-align: center;
  }
  .fill-line {
    display: flex;
    .el-input {
      width: 94%;
      padding-right: 10px;
    }
  }
}
</style>
