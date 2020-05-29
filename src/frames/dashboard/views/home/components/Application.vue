<template>
  <div class="application">
    <CrumbBox>
      <div>
        <div class="image" />
        应用
      </div>
    </CrumbBox>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item><span
          style="cursor: pointer;"
          @click="itemClick('back')"
        >首页</span></el-breadcrumb-item>
        <template v-if="crumbContent">
          <el-breadcrumb-item> {{ crumbContent }} </el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <div ref="swiper" class="swiper">
      <el-carousel
        arrow="hover"
        height="250px"
        :autoplay="false"
        indicator-position="outside"
        trigger="click"
      >
        <el-carousel-item v-for="(item, index) in swiperList" :key="index">
          <div class="carousel-box">
            <div v-for="(v, o) in item.children" :key="o" class="carousel-content">
              <div class="content-item" @click="itemClick(v, item)">
                <div class="carousel-image">
                  <img :src="v.img" alt="">
                </div>
                <span>{{ v.title }}</span>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import CrumbBox from '../../../components/CrumbBox'
import { mapGetters } from 'vuex'
export default {
  components: {
    CrumbBox
  },
  data() {
    return {
      crumbContent: '',
      swiperList: [],
      applicationList: [
        {
          title: '系统管理',
          img: require('../../../assets/application/platform.png'),
          children: [
            {
              title: '资源管理',
              img: require('../../../assets/application/systemConfig/resourceManage.png'),
              url: 'systemManage/resourceManage'
            },
            {
              title: '应用配置',
              img: require('../../../assets/application/systemConfig/annexManage.png'),
              url: 'systemManage/applicationConfig'
            },
            {
              title: '应用授权',
              img: require('../../../assets/application/systemConfig/dictionaryManage.png'),
              url: 'systemManage/applicationEmpower'
            },
            {
              title: '角色管理',
              img: require('../../../assets/application/systemConfig/urgentTask.png'),
              url: 'systemManage/roleManage'
            }
          ]
        },
        {
          title: '调度管理',
          img: require('../../../assets/application/dispatchManage/dispatchManage.png'),
          children: [
            {
              title: '调度方案',
              img: require('../../../assets/application/dispatchManage/dispatchScheme.png'),
              url: 'dispatchManage/dispatchScheme'
            }
          ]
        },
        {
          title: '流程管理',
          img: require('../../../assets/application/flowManage/flowManage.png'),
          children: [
            {
              title: '流程配置',
              img: require('../../../assets/application/flowManage/flowConfig.png'),
              url: 'flowManage/flowConfig'
            },
            {
              title: '我的审批',
              img: require('../../../assets/application/flowManage/myApproval.png'),
              url: 'flowManage/myApproval'
            }
          ]
        },
        {
          title: '组织架构',
          img: require('../../../assets/application/orgStructure/orgStructure.png'),
          children: [
            {
              title: '岗位管理',
              img: require('../../../assets/application/orgStructure/postManager.png'),
              url: 'orgStructure/postManage'
            },
            {
              title: '组织管理',
              img: require('../../../assets/application/orgStructure/organizationManager.png'),
              url: 'orgStructure/orgManage'
            },
            {
              title: '员工管理',
              img: require('../../../assets/application/orgStructure/employeeManager.png'),
              url: 'orgStructure/employeeManage'
            }
          ]
        },
        {
          title: '项目成本管理',
          img: require('../../../assets/application/projectCostManager/projectCostManager.png'),
          children: [
            {
              title: '项目成本管理',
              img: require('../../../assets/application/projectCostManager/projectCostManager.png'),
              url: 'projectCostManager/projectCostManager'
            }
          ]
        },
        {
          title: '日志管理',
          img: require('../../../assets/application/workLog/workLog.png'),
          children: [
            {
              title: '我的日志',
              img: require('../../../assets/application/workLog/myWorkLog.png'),
              url: 'workLogManage/myWorkLog'
            },
            {
              title: '下属日志',
              img: require('../../../assets/application/workLog/subWorkLog.png'),
              url: 'workLogManage/subWorkLog'
            },
            {
              title: '日志查询',
              img: require('../../../assets/application/workLog/workLogQuery.png'),
              url: 'workLogManage/workLogQuery'
            },
            {
              title: '日志统计',
              img: require('../../../assets/application/workLog/workLogStatistic.png'),
              url: 'workLogManage/workLogStatistic'
            },
            {
              title: '日志配置',
              img: require('../../../assets/application/workLog/workLogConf.png'),
              url: 'workLogManage/workLogConf'
            }
          ]
        },
        {
          title: '视频会议',
          img: require('../../../assets/application/projectCostManager/projectCostManager.png'),
          children: [
            {
              title: '视频会议',
              img: require('../../../assets/application/projectCostManager/projectCostManager.png'),
              url: 'videoConferencing/videoConferencing'
            }
          ]
        },
        {
          title: '便携可视',
          img: require('../../../assets/application/fieldvisualization/portableMonitor.png'),
          children: [
            {
              title: '监控与回放',
              img: require('../../../assets/application/fieldvisualization/monitorAndPly.png'),
              url: 'portableVisual/monitoringAplayback'
            },
            {
              title: '现场问题',
              img: require('../../../assets/application/fieldvisualization/liveProblem.png'),
              url: 'portableVisual/fieldproblems'
            }
          ]
        },
        {
          title: '财务管理',
          img: require('../../../assets/application/dailyCost/cost.png'),
          children: [
            {
              title: '项目财务综合管理',
              img: require('../../../assets/application/dailyCost/cost.png'),
              url: 'financialManage/integratedManage'
            },
            {
              title: '资金账户管理',
              img: require('../../../assets/application/dailyCost/cost.png'),
              url: 'financialManage/accountManagement'
            },
            {
              title: '用款申请',
              img: require('../../../assets/application/dailyCost/cost.png'),
              url: 'financialManage/applicationforMoney'
            }
          ]
        },
        {
          title: '合同管理',
          img: require('../../../assets/application/contractManage/contractManage.png'),
          children: [
            {
              title: '合同管理',
              img: require('../../../assets/application/contractManage/contractManage.png'),
              url: 'contractManage/contractManage'
            }
          ]
        },
        {
          title: '资料管理',
          img: require('../../../assets/application/dataManage/dataManager.png'),
          children: [
            {
              title: '资料编制及预览',
              img: require('../../../assets/application/dataManage/projectConfig.png'),
              url: 'dataManage/dataPreview'
            }
          ]
        },
        {
          title: '会议管理',
          img: require('../../../assets/application/meettingManage/meetingRoom.png'),
          children: [
            {
              title: '会议室管理',
              img: require('../../../assets/application/meettingManage/meetingRoom.png'),
              url: 'meettingManage/meettingRoom'
            }
          ]
        },
        {
          title: '项目管理',
          img: require('../../../assets/application/projectManage/projectManage.png'),
          children: [
            {
              title: '劳务分包',
              img: require('../../../assets/application/projectManage/laborSubcontract.png'),
              url: 'projectManage/laborSubcontract'
            },
            {
              title: '组建项目部',
              img: require('../../../assets/application/projectManage/formationProject.png'),
              url: 'projectManage/formationProject'
            },
            {
              title: '进场管理',
              img: require('../../../assets/application/projectManage/approachManage.png'),
              url: 'projectManage/approachManage'
            },
            {
              title: '施工队管理',
              img: require('../../../assets/application/projectManage/constructionTeamManage.png'),
              url: 'projectManage/constructionTeamManage'
            },
            {
              title: '项目管理(岗位)',
              img: require('../../../assets/application/projectManage/projectManagePost.png'),
              url: 'projectManage/projectManagePost'
            }
          ]
        },
        {
          title: '现场可视',
          img: require('../../../assets/application/fieldvisualization/monitorManage.png'),
          children: [
            {
              title: '监控与回放',
              img: require('../../../assets/application/fieldvisualization/monitorAndPly.png'),
              url: 'fieldvisualization/monitoringAplayback'
            },
            {
              title: '现场问题',
              img: require('../../../assets/application/fieldvisualization/liveProblem.png'),
              url: 'fieldvisualization/fieldproblems'
            }
          ]
        },
        {
          title: '采购管理',
          img: require('../../../assets/application/purchasingManagement/PurchasingManager.png'),
          children: [
            {
              title: '采购统计',
              img: require('../../../assets/application/purchasingManagement/PurchasingStatistics.png'),
              url: 'purchasingManagement/procurementStatistics'
            },
            {
              title: '材料用款',
              img: require('../../../assets/application/purchasingManagement/MoneyApply.png'),
              url: 'purchasingManagement/materialConsumption'
            },
            {
              title: '材料出库',
              img: require('../../../assets/application/purchasingManagement/MaterialOut.png'),
              url: 'purchasingManagement/materialOutStock'
            },
            {
              title: '现场验收',
              img: require('../../../assets/application/purchasingManagement/Receiving.png'),
              url: 'purchasingManagement/siteAcceptance'
            },
            {
              title: '采购申请',
              img: require('../../../assets/application/purchasingManagement/PurchasingApply.png'),
              url: 'purchasingManagement/procurementApplication'
            },
            {
              title: '采购配置',
              img: require('../../../assets/application/purchasingManagement/PurchasingConfig.png'),
              url: 'purchasingManagement/procurementConfiguration'
            }
          ]
        },
        {
          title: '办公用品',
          img: require('../../../assets/application/officeSupplies/officesupplies.png'),
          children: [
            {
              title: '用品采购',
              img: require('../../../assets/application/officeSupplies/purchase.png'),
              url: 'officeSupplies/procurementofsupplies'
            },
            {
              title: '统计分析',
              img: require('../../../assets/application/officeSupplies/count.png'),
              url: 'officeSupplies/statisticalanalysis'
            },
            {
              title: '用品领用',
              img: require('../../../assets/application/officeSupplies/collar.png'),
              url: 'officeSupplies/necessities'
            }
          ]
        },
        {
          title: '印信管理',
          img: require('../../../assets/application/sealManagement/SealManager.png'),
          children: [
            {
              title: '介委授申请',
              img: require('../../../assets/application/sealManagement/commissionApply.png'),
              url: 'sealManagement/applicationcommission'
            },
            {
              title: '印证信息',
              img: require('../../../assets/application/sealManagement/sealInfo.png'),
              url: 'sealManagement/corroborateinformation'
            },
            {
              title: '印证申请',
              img: require('../../../assets/application/sealManagement/sealApply.png'),
              url: 'sealManagement/verificationapplication'
            }
          ]
        },
        {
          title: '合作企业',
          img: require('../../../assets/application/dailyCost/cost.png'),
          children: [
            {
              title: '合作企业管理',
              img: require('../../../assets/application/dailyCost/cost.png'),
              url: 'cooperativeEnterprise/businessManagement'
            }
          ]
        },
        {
          title: '日常费用',
          img: require('../../../assets/application/dailyCost/cost.png'),
          children: [
            {
              title: '借款申请',
              img: require('../../../assets/application/dailyCost/cost.png'),
              url: 'dailyCost/loanApply'
            },
            {
              title: '报销申请',
              img: require('../../../assets/application/dailyCost/cost.png'),
              url: 'dailyCost/reimbursementApply'
            },
            {
              title: '费用统计',
              img: require('../../../assets/application/dailyCost/cost.png'),
              url: 'dailyCost/costStatistics'
            }
          ]
        },
        {
          title: '车辆管理',
          img: require('../../../assets/application/vehicleManagement/vehicleManager.png'),
          children: [
            {
              title: '车辆档案',
              img: require('../../../assets/application/vehicleManagement/vehicleInfo.png'),
              url: 'vehicleManagement/vehiclearchives'
            },
            {
              title: '司机管理',
              img: require('../../../assets/application/vehicleManagement/driverInfo.png'),
              url: 'vehicleManagement/drivermanagement'
            },
            {
              title: '用车申请',
              img: require('../../../assets/application/vehicleManagement/userCarApply.png'),
              url: 'vehicleManagement/carapplication'
            },
            {
              title: '油卡管理',
              img: require('../../../assets/application/vehicleManagement/oilCard.png'),
              url: 'vehicleManagement/oilcardmanagement'
            },
            {
              title: '加油管理',
              img: require('../../../assets/application/vehicleManagement/refueling.png'),
              url: 'vehicleManagement/refuelingmanagement'
            }
          ]
        },
        {
          title: '运营管理',
          img: require('../../../assets/application/contractManage/contractManage.png'),
          children: [
            {
              title: '运营管理',
              img: require('../../../assets/application/contractManage/contractManage.png'),
              url: 'operationManagement/registrationaAudit'
            }
          ]
        },
        {
          title: '岗位培训',
          img: require('../../../assets/application/contractManage/contractManage.png'),
          children: [
            {
              title: '岗位培训',
              img: require('../../../assets/application/contractManage/contractManage.png'),
              url: 'onthejobTraining/jobTraining'
            }
          ]
        },
        {
          title: '商城',
          img: require('../../../assets/application/shoppingMall/procurementMall.png'),
          children: [
            {
              title: '企业商城',
              img: require('../../../assets/application/shoppingMall/procurementMall.png'),
              url: 'shoppingMall/enterpriseMall/shoppingClassification'
            }
          ]
        },
        {
          title: '考勤管理',
          img: require('../../../assets/application/attendanceManager/attendManager.png'),
          children: [
            {
              title: '考勤统计',
              img: require('../../../assets/application/attendanceManager/attendanceStatistic.png'),
              url: 'attendanceManager/attendanceStatistics'
            },
            {
              title: '考勤设置',
              img: require('../../../assets/application/attendanceManager/attendanceSetting.png'),
              url: 'attendanceManager/attendanceSettings'
            },
            {
              title: '考勤申请',
              img: require('../../../assets/application/attendanceManager/attendanceApply.png'),
              url: 'attendanceManager/attendanceApplication'
            }
          ]
        },
        {
          title: '平台设备采购',
          img: require('../../../assets/application/devicePurchase/devicePurchase.png'),
          url: 'devicePurchase/platformProcurement'
        },
        {
          title: '产品管理',
          img: require('../../../assets/application/productManager(Supply)/ProductManager(Supply).png'),
          children: [
            {
              title: '产品维护',
              img: require('../../../assets/application/productManager(Supply)/ProductManager(Supply).png'),
              url: 'productManagementSupply/productMaintenance'
            },
            {
              title: '发布管理',
              img: require('../../../assets/application/productManager(Supply)/ReleaseOrderManager.png'),
              url: 'productManagementSupply/releaseManagement'
            }
          ]
        }
      ],
      applicationListclone: []
    }
  },
  computed: {
    ...mapGetters(['pages'])
  },
  created() {
    this.applicationListClone = JSON.parse(
      JSON.stringify(this.applicationList)
    )
  },
  mounted() {
    this.handleSwiper()
  },
  methods: {
    itemClick(item, parent) {
      if (Array.isArray(item.children) && item.children.length) {
        this.applicationList = item.children
        this.crumbContent = item.title
        this.$store.dispatch('getBreadCrumb', item)
        this.handleSwiper()
      } else if (item === 'back') {
        if (this.crumbContent === '') return
        this.crumbContent = ''
        this.applicationList = JSON.parse(
          JSON.stringify(this.applicationListClone)
        )
        this.handleSwiper()
      } else {
        if (!item.url) return
        this.$store.dispatch('getBreadCrumb', item)
        this.$router.push({ path: item.url })
      }
    },
    handleSwiper() {
      const oWidth = this.$refs.swiper.offsetWidth - 20
      const num = Math.floor(oWidth / 85) * 3
      this.swiperList = []
      if (this.applicationList.length > num) {
        this.swiperList.push(
          { children: this.applicationList.splice(0, num) },
          { children: this.applicationList }
        )
      } else {
        this.swiperList.push({ children: this.applicationList })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.application {
  width: 49.5%;
  height: 330px;
  .image {
    background: url('../../../assets/home/application-act.png') no-repeat center;
    background-size: 100% 100%;
  }
  .breadcrumb {
    padding: 0 10px;
    height: 30px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid @primary;
  }
  .swiper {
    .carousel-box {
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
    }
    .carousel-content {
      margin-top: 10px;
      .content-item {
        width: 85px;
        height: 67px;
        text-align: center;
        font-size: 12px;
        line-height: 24px;
        cursor: pointer;
        & > .carousel-image {
          width: 48px;
          height: 48px;
          margin: 0 auto;
          & > img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
