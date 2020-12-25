<template>
  <div class="meetting-rome">
    <div class="search">
      <div class="select">
        <div>
          <span>会议室编号</span>
          <el-input
            v-model="input"
            placeholder="请输入会议室编号"
          />
        </div>
        <div>
          <span>会议室名称</span>
          <el-input
            v-model="input"
            placeholder="请输入会议室名称"
          />
        </div>
        <div>
          <span>归属单位</span>
          <el-select
            v-model="value"
            placeholder="请选择"
            class="ascription"
            style="width: 175px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-model="value"
            placeholder="请选择组织名称"
            style="width: 175px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <span>会议室地址</span>
          <el-input
            v-model="input"
            placeholder="请输入会议室地址"
            style="width: 307px"
          />
        </div>
        <div>
          <span>视频监控</span>
          <el-input
            v-model="input"
            placeholder="请输入视频监控"
          />
        </div>
        <div>
          <span>管理员</span>
          <el-input
            v-model="input"
            placeholder="请输入管理员"
          />
        </div>
        <div>
          <span>录入人</span>
          <el-input
            v-model="input"
            placeholder="请输入录入人"
            style="width: 352px"
          />
        </div>
        <div>
          <span>状态</span>
          <el-select
            v-model="value"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <div>
            <el-button
              type="primary"
              icon="el-icon-search"
            >查询</el-button>
          </div>
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button-group>
            <el-button type="primary" @click="addClick"><i class="iconfont icon-xinzeng1-copy" /> 新增</el-button>
            <el-button type="primary"><i class="iconfont icon-xiugai-copy" /> 修改</el-button>
            <el-button type="primary"><i class="iconfont icon-icon7-copy" /> 删除</el-button>
          </el-button-group>
        </div>
        <div>
          <el-button-group>
            <el-button type="primary"><i class="iconfont icon-tingyong-copy" /> 停用</el-button>
            <el-button type="primary">恢复</el-button>
          </el-button-group>
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
          type="selection"
          width="40"
        />
        <el-table-column
          type="index"
          label="序号"
          header-align="center"
          align="center"
          width="50"
        />
        <el-table-column
          prop="number"
          label="会议室编号"
          header-align="center"
          align="center"
          sortable
          width="120"
        >
          <template slot-scope="scope">
            <div
              class="table-click-color"
              @click="addClick('detail')"
            >{{ scope.row.number }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="会议室名称"
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="belong"
          label="归属单位"
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="address"
          label="会议室地址"
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="surveillance"
          label="视频监控"
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="capacity"
          label="可容纳人数"
          header-align="center"
          align="center"
          width="90"
        />
        <el-table-column
          prop="admin"
          label="管理员"
          header-align="center"
          align="center"
          width="100"
          sortable
        />
        <el-table-column
          prop="tel"
          label="联系电话"
          header-align="center"
          align="center"
          width="150"
          sortable
        />
        <el-table-column
          prop="entry"
          label="录入人"
          header-align="center"
          align="center"
          width="120"
          sortable
        />
        <el-table-column
          prop="entryTime"
          label="录入时间"
          header-align="center"
          align="center"
          width="120"
          sortable
        />
        <el-table-column
          prop="state"
          label="状态"
          header-align="center"
          align="center"
          width="80"
          sortable
        />
      </el-table>
    </div>
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

<script>
import pagination from '@core/mixins/pagination'
export default {
  name: 'Index',
  mixins: [pagination],
  data() {
    return {
      count: 30,
      tableData: [
        {
          id: 1,
          number: '1555546545231',
          name: '第一会议室',
          belong: '北京北恒建筑装饰工程有限公司',
          address: '',
          surveillance: '区域002/二楼会议室',
          capacity: '5',
          admin: '',
          tel: '',
          entry: '',
          entryTime: '',
          state: '正常'
        },
        {
          id: 2,
          number: '1555546545231',
          name: '第二会议室',
          belong: '陈平第三分公司',
          address: '',
          surveillance: '区域002/二楼会议室',
          capacity: '15',
          admin: '',
          tel: '',
          entry: '',
          entryTime: '',
          state: '正常'
        },
        {
          id: 3,
          number: '1555546545231',
          name: '第三会议室',
          belong: '马宁沈阳分公司',
          address: '',
          surveillance: '区域002/二楼会议室',
          capacity: '25',
          admin: '',
          tel: '',
          entry: '',
          entryTime: '',
          state: '停用'
        }
      ]
    }
  },
  methods: {
    addClick(type) {
      if (type === 'detail') {
        this.$router.push({ name: 'meettingRoomDetail' })
      } else {
        this.$router.push({ name: 'addMeettingRoom' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.meetting-rome {
  padding: 20px;
  .search > .select > div {
    span {
      min-width: 95px;
      text-align: right;
    }
  }
  .ascription {
    margin-right: 2px;
  }
}
</style>
