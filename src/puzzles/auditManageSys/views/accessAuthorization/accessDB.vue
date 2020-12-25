<template>
  <div class="authorize-manage">
    <div class="top">
      <el-button class="back-btn" @click="$router.go(-1)">
        <i class="iconfont icon-fanhui-copy" /> 返回
      </el-button>
    </div>
    <div class="flow">
      <el-row>
        <el-col :span="2">
          <div class="grid-content" />
        </el-col>
        <el-col :span="20">
          <el-card class="box-card" :body-style="{ padding: '0px' }">
            <div slot="header" class="clearfix">
              <el-button type="text" :disabled="running" @click="run()">执行</el-button>
              <!--              <el-button type="text" @click="stop()">停止</el-button>-->
            </div>
            <div class="grid-content">
              <codemirror
                ref="cmEditor"
                :value="code"
                :options="cmOptions"
                @ready="onCmReady"
                @focus="onCmFocus"
                @input="onCmCodeChange"
                @cursorActivity="autoComplete"
              />
              <el-tabs v-if="resultUIShow" ref="resultUI" type="border-card">
                <el-tab-pane label="信息">
                  <div> > {{ executeResult.status }}</div>
                  <div> > {{ executeResult.executeTime }}</div>
                </el-tab-pane>
                <el-tab-pane ref="" label="结果">
                  <span v-if="tableData.length===0">暂无数据</span>
                  <el-table v-if="tableData.length>0" v-fit-columns style="width: 99.9%" height="350" :fit="true" border :data="tableData">
                    <template v-for="(item,index) in tableHead">
                      <el-table-column :key="index" :prop="item.column_name" :label="item.column_comment" />
                    </template>
                  </el-table>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-card>
        </el-col>
        <el-col :span="2">
          <div class="grid-content" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import table from '@core/mixins/table'
import { sqlExecute } from '@core/api/auditManageSys/accessAuthorization'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/mode/sql/sql.js'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/selection/active-line'
import 'codemirror/mode/sql/sql'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/sql-hint'
import Vue from 'vue'
import Plugin from 'v-fit-columns'
Vue.use(Plugin)

export default {
  components: {
    codemirror
  },
  mixins: [table],
  data() {
    return {
      code: '',
      cmOptions: {
        autofocus: true,
        extraKeys: { Ctrl: 'autocomplete' },
        tabSize: 4,
        mode: 'text/x-mysql',
        lineNumbers: true,
        line: true,
        styleActiveLine: true,
        matchBrackets: true
      },
      resultUIShow: false,
      executeResult: {
        status: '',
        executeTime: '',
        affect: '',
        result: []
      },
      tableHead: [],
      tableData: [],
      running: false
    }
  },
  computed: {
    currentId() {
      return this.$route.query.id
    },
    codemirror() {
      return this.$refs.cmEditor.codemirror
    }
  },
  methods: {
    onCmReady(cm) {
      // console.log('the editor is readied!', cm)
    },
    onCmFocus(cm) {
      // console.log('the editor is focused!', cm)
    },
    onCmCodeChange(newCode) {
      // console.log('this is new code', newCode)
      this.code = newCode
    },
    autoComplete(cm) {
      // cm.showHint()
    },
    run() {
      if (this.code.trim() === '') {
        this.$message.warning('请输入要执行的SQL')
        return
      }
      this.running = true
      const params = {
        code: this.code,
        authorizationId: this.currentId
      }
      sqlExecute(params).then(res => {
        this.running = false
        if (res.code === 200) {
          this.executeResult = res.data
          this.$message.success('执行成功')
          this.resultUIShow = true
          const result = this.executeResult.result

          this.tableHead = []
          if (result[0]) {
            for (const k in result[0]) {
              this.tableHead.push({
                column_name: k, column_comment: k
              })
            }
          }
          this.tableData = result
          console.log(this.tableHead)
        }
      }).catch(() => {
        this.running = false
      })
    },
    stop() {

    }
  }
}
</script>
<style lang="less" scoped>
  .authorize-manage {
    width: calc(100% - 20px);
    height: calc(100vh - 140px);
    overflow-y: auto;
    padding: 10px;
  }
  .CodeMirror {
    border: 1px solid #eee;
    height: auto;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  /deep/ .el-card__header {
    padding: 2px 20px;
  }
  /deep/ .el-tabs--border-card {
    border:none;
  }
</style>
