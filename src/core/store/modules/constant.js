import { getTypeCode, getTreeTypeCode } from '@core/api/dictionary'
import { getCity } from '@core/api/city'
import { getNotPage } from '@core/api/authResourcegc'
import { getAllOrganization, getOrgTree, getUserOrg } from '@core/api/organization'
import { getAllPost } from '@core/api/post'
import { getGenerateNo, getCooperatunits, getInsideAllList, getContractAttribution } from '@core/api/contractManage/contractmanager'
import { strFirstUpper, treeChildrenEmpty } from '@core/utils'
import customConstant from './customConstant'

import { getPersonnelsByOrgId } from '@core/api/personnel'
export default {
  state: {
    noConstant: ['applicationList', 'levelOrganization', 'allPost', 'userOrganization', 'generateNo', 'cooperatunitsList', 'insideList', 'contractAttributionList'],
    tree: ['nativePlace', 'qualifications', 'jzzs_cooperateunit', 'clgy_cooperateunit', 'qtqy_cooperateunit', 'WorkTypeAndProject', 'WorkTypeAndOperationProject', 'orgQualifications', 'quaCategory'],
    noCache: ['applicationList', 'levelOrganization', 'orgType', 'allPost', 'productBrand', 'insideList'],
    params: ['orgList', 'orgPersonList', 'insideList', 'cooperatunitsList'],
    constant: {
      ...customConstant,
      HasOrNot: [], // 组织架构-员工管理-有无---全局字典
      IsOrNot: [], // 组织架构-员工管理-是否---全局字典

      AR_RM_ROLETYPE: [], // 系统管理-角色管理-角色类型
      AR_RM_SuitScope: [], // 系统管理-角色管理-适用范围
      AR_RM_SuitPostType: [], // 系统管理-角色管理-适用岗位类型

      gender: [], // 组织架构-员工管理-性别
      employeeType: [], // 组织架构-员工管理-员工类型
      Education: [], // 组织架构-员工管理-学历
      employeeStatus: [], // 组织架构-员工管理-员工状态
      postType: [], // 组织架构-员工管理-岗位类别
      nativePlace: [], // 组织架构-员工管理-籍贯
      nation: [], // 组织架构-员工管理-民族
      politicalStatus: [], // 组织架构-员工管理-政治面貌
      Degree: [], // 组织架构-员工管理-学位
      Marriage: [], // 组织架构-员工管理-婚姻状况
      Children: [], // 组织架构-员工管理-子女状况
      laborContractType: [], // 组织架构-员工管理-劳动合同类型
      laborContractPeriod: [], // 组织架构-员工管理-劳动合同期限
      signingMode: [], // 组织架构-员工管理-签订方式
      laborContractState: [], // 组织架构-员工管理-劳动合同状态

      residenceNature: [], // 组织架构-员工管理-户口性质
      JobLevel: [], // 组织架构-员工管理-职称等级
      PersonnelPostState: [], // 组织架构-员工管理-任职状态
      isLegalEntity: [], // 组织架构-组织管理-是否法人单位
      levelOrganization: [], // 组织架构-组织管理-上级组织(组织列表)
      allPost: [], // 组织架构-组织管理-上级组织
      leaveType: [], // 组织结构-员工管理-离职类型
      leaveReason: [], // 组织结构-员工管理-离职原因

      personnelCertType: [], // 组织架构-员工管理-证书类型
      PersonnelCertificate: [], // 组织架构-员工管理-人员证书
      orgCertType: [], // 组织架构-员工管理-组织证书类型
      OperatorType: [], // 组织架构-员工管理-操作类别
      inspectionFrequency: [], // 组织架构-员工管理-年检频率
      saveType: [], // 组织架构-员工管理-保管类型
      specialty: [], // 组织架构-员工管理-专业
      grade: [], // 组织架构-员工管理-等级
      qualifications: [], // 组织架构-员工管理-组织架构-员工管理-行业证书+注册类别+专业
      WorkTypeAndProject: [], // 组织架构-员工管理-作业类别和项目
      WorkTypeAndOperationProject: [], // 组织架构-员工管理-作业类别和准操项目

      organizationState: [], // 组织架构-组织管理-组织状态
      orgType: [], // 组织架构-组织管理-组织类别
      mainBusiness: [], // 组织架构-组织管理-主营业务
      enterpriseNature: [], // 组织架构-组织管理-企业性质
      taxpayerType: [], // 组织架构-组织管理-纳税人类型
      managementModel: [], // 组织架构-组织管理-经营模式
      isMachining: [], // 组织架构-组织管理-是否提供加工/定制服务
      orgBusinessType: [], // 组织架构-组织管理-资质分类
      orgQualifications: [], // 组织架构-组织管理-组织资质
      businessScope: [], // 组织架构-组织管理-经营范围

      Proficiency: [], // 熟练度
      sealInfoCanBorrow: [], // 能否借出
      notifyTimingUnit: [], // 定时单位
      ImGroupType: [], // Im群类型
      DeliverManager: [], // 发货管理（供应商）
      ReceivingResult: [], // 验收结果（供应商）
      Machine: [], // 考勤机管理
      projectAttribution: [], // 项目归属
      Networking_State: [], // 联网状态
      roleType: [], // 基础角色
      OM_PM_JobAttribution: [], // 岗位归属(通用范围)
      OM_PM_QT_JobAttribution: [], // 岗位管理-岗位归属
      triggerType: [], // 紧急任务/系统消息 类别
      applicationList: [], // 应用授权-应用
      AR_RM_ResourceType: [], // 系统管理-资源管理-资源类型
      postState: [], // 状态（岗位管理)
      OM_PM_PostType: [], // 岗位类型
      cooperativeUnit: [], // 合作企业

      timingType: [], // 系统管理-紧急任务-下派时间
      timingUnit: [], // 系统管理-紧急任务-时间单位
      notifyAccObjType: [], // 系统管理-紧急任务-接收人
      frequencyUnit: [], // 系统管理-紧急任务-频率单位

      quaCategory: [], // 合作企业-主项资质类别

      jzzs_cooperateunit: [], // 合作企业-建筑装饰类型
      clgy_cooperateunit: [], // 合作企业-材料供应类型
      qtqy_cooperateunit: [], // 合作企业-其他企业类型

      source: [], // 客户管理-来源
      OsRegionFilterType: [], // 运用平台-营销区域管理-区域类型
      OsAreaLevel: [], // 运用平台-营销区域管理-区域级别
      company: [], // 运营平台--经销商管理-级别
      OsContactPersonRole: [], // 运营平台-联系人管理-角色

      CooperativeUnitState: [], // 合作企业-企业状态
      bankAccountType: [], // 合作企业-银行信息-账户类型

      OsBankAccountState: [], // 运营平台-银行状态
      CustomerLevel: [], // 运营平台-客户基本信息-级别
      CustomerSource: [], // 运营平台-客户管理-来源
      businessType: [], // 组织管理里面的主营业务
      deviceType: [], // 平台设备名录-设备类型
      deviceUnit: [], // 平台设备名录-单位
      deviceStatus: [], // 平台设备名录-设备状态
      deviceOrderState: [], // 平台采购-设备订单状态
      deviceInvoiceState: [], // 平台采购-开票状态

      authorizeStatus: [], // 服务商-授权状态

      productClassState: [], // 产品分类-停用状态
      productBrand: [], // 产品分类-品牌
      produceStatus: [], // 产品分类-生产状态
      publishStatus: [], // 产品分类-发布状态
      priceChange: [], // 产品分类-价格调整类型

      paramType: [], // 流程管理 - 参数类型
      approverType: [], // 流程管理 - 审批人类型
      managerType: [], // 流程管理 - 主管类别
      ccType: [], // 流程管理 - 抄送人类型
      impromptuAssignRange: [], // 流程管理 - 即席指定选择范围
      relationship: [], // 流程管理 - 关系
      useRange: [], // 流程管理 - 适用范围
      flowConfigState: [], // 流程管理 - 状态
      formType: [], // 流程管理 表单类型
      taskType: [], // 流程管理 环节类型
      processStatus: [], // 流程管理 流程状态

      ValuationMethod: [], // 合同管理-计价方式
      CountWay: [], // 合同管理-结算方式
      MainContractType: [], // 合同管理-主合同类型
      SubContractType: [], // 合同管理-子合同类型
      ContractCategory: [], // 合同管理-合同类别
      ProjectScale: [], // 合同管理-工程规模
      contractState: [], // 合同管理-合同状态/协议状态
      ApprovalStatus: [], // 合同管理-审批状态
      PaymentClass: [], // 合同管理-支付类别
      ContractSettleState: [], //  合同管理-结算状态
      ContractAttribution: [], // 合同归属
      BalanceType: [], // 合同管理-收支类型
      EngineeringStatus: [], // 合同管理-工程状态
      StructureType: [], // 合同管理-结构类型
      ContractBusinessType: [], // 合同管理-业务类型
      EffectiveState: [], // 合同管理-生效状态
      orgList: [], // 合同管理-经办组织 组织列表（后续通过传参扩展）
      orgPersonList: [], // 合同管理-经办人 组织列表（后续通过传参扩展）
      userOrganization: [], // 前登录人的任职所在组织 发起组织
      subSubTypeOne: [], // 合同管理-分包方式
      subSubTypeThree: [], // 合同管理-工程保险合同-合同类型
      generateNo: '', // 合同管理-审批单号
      cooperatunitsList: [], // 合同管理-获取合作企业列表
      insideList: [], // 合同管理-所有内部合同

      contractAttributionList: [], // 合同管理-合同归属
      noticeStatus: [], // 组建项目部-通知状态
      inOutStatus: [], // 组建项目部-进出状态
      teamLevel: [], // 工人实名制-级别
      pmEducation: [], // 工人实名制-文化程度
      workType: [], // 工人实名制-工种
      returnRecordState: [], // 工人实名制-返场状态
      memberVerificationSt: [], // 工人实名制-施工人员验证状态
      memberState: [], // 工人实名制-施工人员进场状态
      entryRecordType: [], // 工人实名制-进退场类型
      memberAppointment: [], // 工人实名制-任命

      commonYesNo: [], // 财务管理 是否
      applyBusiness: [], // 财务管理-财务类别新增-应用业务
      financeClassType: [], // 财务管理-财务类别新增-所属类型
      financeClassSource: [], // 财务管理-财务类别来源
      approveState: [], // 财务管理-审核状态
      projectFinanceSource: [], // 财务管理-开票明细来源
      financeInvoiceType: [], // 财务管理-开票明细发票类型
      PayType: [], // 财务管理-收款明细支付方式
      TransferType: [], // 财务管理-收款明细转入账户类型
      collectionCategory: [], // 财务管理-收款明细收款类别
      ReceivePaymentType: [], // 财务管理-付款类型
      financeprojectType: [], // 财务管理 工程类型
      warrantyMode: [], // 财务管理-质保方式
      BankAccountType: [], // 财务管理-投标保证金收付款账户类型
      CheckState: [] // 财务管理 -投标保证金审阅状态
    }
  },
  mutations: {
    SEY_DICT(state, { type, data }) {
      state.constant[type] = data
    }
  },
  actions: {
    getConstant({ dispatch, state }, name) {
      const events = []
      const isConstant = name => {
        if (state.noConstant.includes(name)) {
          events.push(dispatch('get' + strFirstUpper(name), name))
        } else if (state.tree.includes(name)) {
          events.push(dispatch('getTreeDict', name))
        } else if (typeof (name) === 'object' && state.params.includes(name.type)) {
          events.push(dispatch('get' + strFirstUpper(name.type), name))
        } else {
          events.push(dispatch('getDict', name))
        }
      }
      if (Array.isArray(name)) {
        for (const item of name) {
          var type = typeof (item) === 'object' ? item.type : item
          if (!state.noCache.includes(type)) {
            const type = Object.prototype.toString.call(state.constant[type])
            if (type === '[object Array]') {
              if (state.constant[type]?.length) continue
            } else if (type === '[object Object]') {
              if (Object.keys(state.constant[type]).length) continue
            } else if (type === '[object String]') {
              if (state.constant[type]) continue
            }
          }
          isConstant(item)
        }
      } else {
        var typeStr = typeof (name) === 'object' ? name.type : name
        if (!state.noCache.includes(typeStr)) {
          if (!state.noCache.includes(typeStr)) {
            const typeStr = Object.prototype.toString.call(state.constant[typeStr])
            if (typeStr === '[object Array]') {
              if (state.constant[typeStr].length) return
            } else if (typeStr === '[object Object]') {
              if (Object.keys(state.constant[typeStr]).length) return
            } else if (typeStr === '[object String]') {
              if (state.constant[typeStr]) return
            }
          }
          // if (state.constant[typeStr].length) return
        }
        // if (!state.noCache.includes(name)) {
        //   if (state.constant[name].length) return
        // }
        isConstant(name)
      }
      return Promise.all(events)
    },
    getDict({ commit }, type) {
      return new Promise((resolve, reject) => {
        // applicationId 可点击每个子模块获取  applicationId: applicationId: getSessionStorage('applicationId')
        getTypeCode({ typeCode: type }).then(({ data }) => {
          commit('SEY_DICT', { type, data })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getTreeDict({ commit }, type) {
      return new Promise((resolve, reject) => {
        // applicationId 可点击每个子模块获取 { applicationId: getSessionStorage('applicationId') }
        if (type === 'nativePlace') {
          getCity().then(({ data }) => {
            data = treeChildrenEmpty(data, 'children')
            commit('SEY_DICT', { type, data })
            resolve()
          })
        } else {
          getTreeTypeCode({ typeCode: type }).then(({ data }) => {
            // 取消最后一级树形结构的child树形，防止空子集
            data = treeChildrenEmpty(data, 'childs')
            commit('SEY_DICT', { type, data })
            resolve()
          }).catch(error => {
            reject(error)
          })
        }
      })
    },
    getApplicationList({ commit }, type) {
      return new Promise((resolve, reject) => {
        getNotPage().then(({ data }) => {
          commit('SEY_DICT', { type, data })
          resolve()
        })
          .catch(error => {
            reject(error)
          })
      })
    },
    getLevelOrganization({ commit }, type) {
      return new Promise((resolve, reject) => {
        getAllOrganization().then(({ data }) => {
          commit('SEY_DICT', { type, data })
          resolve()
        })
          .catch(error => {
            reject(error)
          })
      })
    },
    getAllPost({ commit }, type) {
      return new Promise((resolve, reject) => {
        getAllPost().then(({ data }) => {
          commit('SEY_DICT', { type, data })
          resolve()
        })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取当前登录人的任职所在组织(包含主岗和任职)
    getUserOrganization({ commit }, type) {
      return new Promise((resolve, reject) => {
        getUserOrg().then(({ data }) => {
          commit('SEY_DICT', { type, data })
          resolve()
        })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取审批单号
    getGenerateNo({ commit }, type) {
      return new Promise((resolve, reject) => {
        getGenerateNo().then(({ data }) => {
          commit('SEY_DICT', { type, data })
          resolve()
        })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取合作企业列表
    getCooperatunitsList({ commit }, name) {
      const { type, params } = name
      return new Promise((resolve, reject) => {
        getCooperatunits(params.orgId).then(({ data }) => {
          data = treeChildrenEmpty(data, 'list')
          commit('SEY_DICT', { type, data })
          resolve()
        })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取组织tree
    getOrgList({ commit }, name) {
      const { type, params } = name
      return new Promise((resolve, reject) => {
        getOrgTree(params).then(({ data }) => {
          data = treeChildrenEmpty(data, 'children')
          commit('SEY_DICT', { type, data })
          resolve()
        })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 根据组织获取人员
    getOrgPersonList({ commit }, name) {
      const { type, params } = name
      return new Promise((resolve, reject) => {
        getPersonnelsByOrgId(params).then(({ data }) => {
          commit('SEY_DICT', { type, data })
          resolve()
        })
          .catch(error => {
            reject(error)
          })
      })
    },
    getInsideList({ commit }, name) {
      const { type, params } = name
      return new Promise((resolve, reject) => {
        getInsideAllList(params).then(({ data }) => {
          commit('SEY_DICT', { type, data })
          resolve()
        })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 合同管理-合同类别
    getContractAttributionList({ commit }, type) {
      return new Promise((resolve, reject) => {
        getContractAttribution().then(({ data }) => {
          commit('SEY_DICT', { type, data })
          resolve()
        })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
