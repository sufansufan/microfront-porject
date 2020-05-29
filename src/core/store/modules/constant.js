import { getTypeCode } from '@core/api/dictionary'
import { getNotPage } from '@core/api/authResourcegc'
import { getAllOrganization } from '@core/api/organization'
import { getAllPost, getPostsByOrg } from '@core/api/post'
import { strFirstUpper } from '@core/utils'
export default {
  state: {
    noConstant: ['applicationList', 'levelOrganization', 'allPost', 'allPostByOrg'],
    constant: {
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
      allPostByOrg: [], // 组织架构-员工管理-根据组织查询的岗位列表

      personnelCertType: [], // 组织架构-员工管理-证书类型
      PersonnelCertificate: [], // 组织架构-员工管理-人员证书
      orgCertType: [], // 组织架构-员工管理-组织证书类型
      OperatorType: [], // 组织架构-员工管理-操作类别
      WorkTypeAndOperationProject: [], // 组织架构-员工管理-作业类别和准操项目
      WorkTypeAndProject: [], // 组织架构-员工管理-作业类别和项目
      inspectionFrequency: [], // 组织架构-员工管理-年检频率

      organizationState: [], // 组织架构-组织管理-组织状态
      orgType: [], // 组织架构-组织管理-组织类别
      mainBusiness: [], // 组织架构-组织管理-主营业务
      enterpriseNature: [], // 组织架构-组织管理-企业性质
      taxpayerType: [], // 组织架构-组织管理-纳税人类型
      managementModel: [], // 组织架构-组织管理-经营模式
      isMachining: [], // 组织架构-组织管理-是否提供加工/定制服务

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
      notifyTriggerType: [], // 类别
      applicationList: [], // 应用授权-应用
      AR_RM_ResourceType: [], // 系统管理-资源管理-资源类型
      postState: [], // 状态（岗位管理)
      OM_PM_PostType: [] // 岗位类型

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
        } else {
          events.push(dispatch('getDict', name))
        }
      }
      if (Array.isArray(name)) {
        for (const item of name) {
          if (state.constant[item].length) continue
          isConstant(item)
        }
      } else {
        if (state.constant[name].length) return
        isConstant(name)
      }
      return Promise.all(events)
    },
    getDict({ commit }, type) {
      return new Promise((resolve, reject) => {
        // applicationId 可点击每个子模块获取
        getTypeCode({ typeCode: type }).then(({ data }) => {
          commit('SEY_DICT', { type, data })
          resolve()
        }).catch(error => {
          reject(error)
        })
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
    getAllPostsByOrg({ commit }, type) {
      return new Promise((resolve, reject) => {
        getPostsByOrg().then(({ data }) => {
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
