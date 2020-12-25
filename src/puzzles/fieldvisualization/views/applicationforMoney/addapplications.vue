<template>
  <div class="add-applications">
    <el-form
      :rules="rules"
      :model="ruleform"
      label-width="120px"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="单据编号"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="工程名称"
            prop="number"
          >
            <el-select
              v-model="number"
              placeholder="请选择申请类别"
            >
              <el-option
                label="区域一"
                value="shanghai"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="归属单位"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="合同编号"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="合同金额"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="项目结算金额"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="项目可用余额"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="是否有合同"
            prop="number"
          >
            <el-select
              v-model="number"
              placeholder="请选择申请类别"
            >
              <el-option
                label="区域一"
                value="shanghai"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="财务类别"
            prop="number"
          >
            <el-select
              v-model="number"
              placeholder="请选择申请类别"
            >
              <el-option
                label="区域一"
                value="shanghai"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="用款类别"
            prop="number"
          >
            <el-select
              v-model="number"
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
        <el-col :span="8">
          <el-form-item
            label="合同类型"
            prop="number"
          >
            <el-select
              v-model="number"
              placeholder="请选择申请类别"
            >
              <el-option
                label="区域一"
                value="shanghai"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="合同名称"
            prop="number"
          >
            <el-select
              v-model="number"
              placeholder="请选择申请类别"
            >
              <el-option
                label="区域一"
                value="shanghai"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="合同编号"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="合同金额"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="合同结算金额"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="已付金额"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="剩余未付金额"
            prop="number"
          >
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="收款单位">
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="用款金额"
            prop="name"
          >
            <el-input
              v-model="ruleform.name"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item
            label="计划用款日期"
            prop="serviceurl"
          >
            <el-input
              v-model="ruleform.serviceurl"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="用款说明"
            prop="remark"
          >
            <el-input
              v-model="ruleform.remark"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="支付方式">
            <el-select
              v-model="ruleform.category"
              placeholder="请选择"
              class="full-width"
              @change="changeProduct($event)"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="领款人"
            prop="name"
          >
            <el-input
              v-model="ruleform.name"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="是否已开发票"
            prop="serviceurl"
          >
            <el-select
              v-model="number"
              placeholder="请选择"
            >
              <el-option
                label="区域一"
                value="shanghai"
              />
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>
      <template v-if="ProductActive ==1 && ProductActive !==null ">
        <el-row>
          <el-col :span="8">
            <el-form-item label="账户名称">
              <el-input
                v-model="ruleform.number"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="收款账号"
              prop="name"
            >
              <el-input
                v-model="ruleform.name"
                placeholder="请输入"
                clearable
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item
              label="开户行"
              prop="serviceurl"
            >
              <el-input
                v-model="ruleform.serviceurl"
                placeholder="请输入"
                clearable
              />
            </el-form-item>
          </el-col>

        </el-row>
      </template>
      <invoice-list />
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="委托付款申请书"
            prop="name"
          >
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button
                size="small"
                type="primary"
              >上传附件</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="发票真伪查询"
            prop="name"
          >
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button
                size="small"
                type="primary"
              >上传附件</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="出入库单"
            prop="name"
          >
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button
                size="small"
                type="primary"
              >上传附件</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input
              v-model="ruleform.remark"
              type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="录入人">
            <el-input
              v-model="ruleform.number"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="录入时间"
            prop="name"
          >
            <el-input
              v-model="ruleform.name"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item
            label="部门"
            prop="serviceurl"
          >
            <el-input
              v-model="ruleform.serviceurl"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item class="btnadd">
            <el-button type="primary">保存</el-button>
            <el-button type="primary">提交</el-button>
            <el-button class="cancel-btn" @click="$router.go(-1)">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
  </div>
</template>

<script>
import InvoiceList from './components/invoicelist'
export default {
  components: { InvoiceList },
  data() {
    return {
      number: '',
      ProductActive: null,
      options: [
        {
          value: '0',
          label: '支票'
        },
        {
          value: '1',
          label: '电汇'
        },
        {
          value: '2',
          label: '现金'
        },
        {
          value: '3',
          label: '扣款'
        },
        {
          value: '4',
          label: '其他'
        }
      ],
      downTime: '',
      ruleform: {
        number: '',
        available: false,
        name: '',
        serviceurl: '',
        servicerule: '',
        remark: ''
      },
      rules: {
        number: [
          {
            required: true,
            message: '请填写'
          }
        ],
        available: [
          {
            required: true,
            message: '请填写'
          }
        ],
        name: [
          {
            required: true,
            message: '请填写'
          }
        ],
        serviceurl: [
          {
            required: true,
            message: '请填写'
          }
        ],
        servicerule: [
          {
            required: true,
            message: '请填写'
          }
        ]
      }
    }
  },
  methods: {
    changeProduct(event) {
      this.ProductActive = event
    }
  }
}
</script>

<style lang="less">
.add-applications {
  height: calc(100vh - 160px);
  overflow-y: auto;
  padding: 20px;
  .btnadd {
    width: 100%;
    text-align: center;
  }
  .el-select {
    width: 100%;
  }
}
</style>
