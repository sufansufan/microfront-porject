import { MessageBox, Message } from 'element-ui'
import { getHasVersion, sonContractDelete, getSupplyRevisionList, supplyDelete } from '@core/api/contractManage/contractmanager'
import { previewCancel } from '@core/api/processManage/workflowmanager'
import { getSessionStorage } from '@core/utils/auth'
// 直接打开
const directOpen = () => ({ done: true })
// 打开并且回填
const returnOpen = () => ({ done: true, returnData: true })
// 直接打开 并且回填 并且撤销
const backOpen = async(id, type) => {
  return MessageBox.confirm(
    '该合同正在结算中，继续操作将撤销正在进行的流程，重新进行结算，请确认是否继续操作？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }
  ).then(async() => {
    // 等待撤销结束
    try {
      await _fetchRevokeContract(id, type)
      return { done: true, returnData: true, refer: true }
    } catch (e) {
      return { done: false, returnData: true }
    }

    // 请求撤销接口 并且打开回填数据
  }).catch(() => {
    // nothing
    return { done: false, returnData: false }
  })
}

const _fetchRevokeContract = async(id) => {
  await previewCancel({ processId: id })
}

// id 撤销Id  type 主合同/内部合同
export const openSettlement = async(approvalStatus, settlementState, id, type = 'main') => {
  // 结算状态 != 审批通过
  if (approvalStatus !== '03' || settlementState === '03') {
    Message.warning('只能操作审批状态为审批通过，结算状态不为审批通过且补充协议状态均为审批通过的记录')
    return { done: false }
  }
  const map = {
    '01': directOpen, // 未结算
    '04': returnOpen, // 审批拒绝
    '05': returnOpen, // 已经撤销
    '06': backOpen, // 已退回
    '02': backOpen // 审批中
  }
  const methods = map[settlementState]
  return methods(id, type)
}

// 删除逻辑

// 删除
export const handleDelete = async(approvalStatus, id, type) => {
  if (type === 'main') {
    // 主合同删除逻辑
  } else if (type === 'sub') {
    if (approvalStatus === '01' || approvalStatus === '05') {
      const data = await _getHasVersionList(id)
      return data
    } else {
      Message.warning({
        message: '只有审批状态为“草稿”/“已撤销”且不存在补充协议的数据才允许删除。',
        type: 'warning'
      })
    }
  } else if (type === 'supply') {
    if (approvalStatus === '01' || approvalStatus === '05') {
      const data = await _getHasSupplyVersionList(id)
      return data
    } else {
      Message.warning({
        message: '只有审批状态为“草稿”/“已撤销”的数据才允许删除。',
        type: 'warning'
      })
    }
  }
}

const _getHasVersionList = async(id) => {
  const { data } = await getHasVersion(id)
  const message = _getDelMessage(data, 'sub')
  // 删除接口
  return MessageBox.confirm(
    message,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }
  ).then(async() => {
    await sonContractDelete(id)
    Message.success('删除成功')
    return true
  })
}
const _getHasSupplyVersionList = async(id) => {
  const { data } = await getSupplyRevisionList({ id: id })
  const message = _getDelMessage(data, 'supply')
  // 删除接口
  return MessageBox.confirm(
    message,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }
  ).then(async() => {
    await supplyDelete(id)
    Message.success('删除成功')
    return true
  })
}

// 获得内容
const _getDelMessage = (boolean, type) => {
  if (type === 'sub') {
    if (boolean) return '请确认是否删除当前版本，删除后，将显示该合同的上一个版本'
    else return '请确认是否删除该合同'
  } else if (type === 'supply') {
    if (boolean) return '请确认是否删除当前版本，删除后，将显示该补充协议的上一个版本'
    else return '请确认是否删除该补充协议'
  }
}
// 撤销
export const handleRevokeEvent = async(approvalStatus, settlementState, id, settleId, type = 'contract') => {
  const approval = ['02', '06'] // 审批状态 审批中 已退回
  const settlement = ['02', '06'] // 结算状态 审批中 已退回
  let approvalFlag = false
  let settlementFlag = false
  approvalFlag = approval.includes(approvalStatus)
  settlementFlag = settlement.includes(settlementState)
  if (approvalFlag || settlementFlag) {
    return MessageBox.confirm('确定要撤销此记录', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(async() => {
      var revokeId = ''
      if (approvalFlag) {
        revokeId = id
      } else if (settlementFlag) {
        revokeId = settleId
      }
      await handelePreviewCancel(revokeId)
      return true
    })
  } else {
    if (type === 'contract') { // 合同撤销提示语
      Message.warning({
        message: '只能操作审批状态/结算状态为审批中/已退回的记录',
        // showClose: true,
        type: 'warning'
      })
    } else {
      Message.warning({ // 补充协议撤销提示语
        message: '只能操作审批状态为审批中/已退回的记录',
        // showClose: true,
        type: 'warning'
      })
    }
  }
}

const handelePreviewCancel = async(id) => {
  return previewCancel({ processId: id }).then((res) => {
    Message.success('撤销成功')
    return res
  })
}
/**
 * settlementState 结算状态
 * approvalStatus 审批状态
 * approvalStartUserId 审批人
 * approvalProcessId 审批流程id
 *  */
export const handeleContractEdit = async(settlementState, approvalStatus, approvalStartUserId, approvalProcessId) => {
  var approvalBack = ['02', '06'] // 审批状态 审批 已退回
  var settlement = ['02', '03'] // 结算 审批中 审批通过
  if (!settlement.includes(settlementState)) {
    if (approvalBack.includes(approvalStatus)) {
      if (approvalBack[0].includes(approvalStatus)) {
        return MessageBox.confirm(
          '该合同正在审核中，如若修改则自动撤销当前审批流程，请确定是否要修改？',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }
        ).then(() => {
          previewCancel({ processId: approvalProcessId }).then(() => {})
          return true
        })
      } else if (approvalBack[1].includes(approvalStatus)) {
        const userId = getSessionStorage('userId')
        if (userId === approvalStartUserId) {
          return MessageBox.confirm(
            '该合同已被退回，请在合同的退回页面修改合同信息',
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }
          ).then(() => {
            // 打开流程页面

          })
        } else {
          return MessageBox.confirm(
            '该合同已经退回给提交审批本人，请确认您是否要代替他修改合同，若是则自动撤销当前审批流程，由您来修改合同？',
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }
          ).then(() => {
            previewCancel({ processId: approvalProcessId }).then(() => {})
            return true
          })
        }
      }
    } else {
      return true
    }
  } else {
    if (settlement[0].includes(settlementState)) {
      Message.warning('该合同正在结算不允许修改')
      return
    } else if (settlement[1].includes(settlementState)) {
      Message.warning('该合同已结算不允许修改')
      return
    }
  }
}

/*

若选中的合同“结算状态”≠(“审批中”或者“审批通过”)合同才允许修改。
	如果用户选择了不允许修改的合同，则提示用户，提示信息如下：
	若结算状态为“审核中”则提示用户：该合同正在结算不允许修改；
	若结算状态为“已审核”则提示用户：该合同已结算不允许修改；
*/

// // 主合同修改

// 审批状态判断
const _judeApprovalStatus = (approvalStatus, approvalProcessId, approvalStartUserId, type) => {
  const confirmMesg = {
    '02': {
      msg: '该合同正在审核中，如若修改则自动撤销当前审批流程，请确定是否要修改？',
      method: previewCancel,
      params: { processId: approvalProcessId }
    }, // 审批中
    '06': _judeBackMethods(approvalStartUserId, approvalProcessId, type) // 退回判断
    // $router.push({name:'/processManage/myApprove'})

  }
  if (approvalStatus in confirmMesg) {
    const { msg, method, params } = confirmMesg[approvalStatus]
    return MessageBox.confirm(msg, '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }
    ).then(async() => {
      if (getSessionStorage('userId') === approvalStartUserId && approvalStatus === '06') {
        return '退回流程'
      }
      if (method) await method(params)// 撤销审批流程
      // else if (approvalStatus === '06') {
      //   this.$router.push({ path: '/processManage/myApprove' })
      // }
      return true
    }).catch(() => {
      return false
    })
  }
  return true
}

// 结算状态判断
const _judeSettlementState = (settlementState, type, belongMainType) => {
  const mesType = type === 'contract' ? '该' : '主'
  const settlementStateMap = {
    '02': `${mesType}合同正在结算不允许修改`, // 审批中
    '03': `${mesType}合同已结算不允许修改`, // 审批通过
    '06': `${mesType}合同正在结算不允许修改` // 已退回
  }
  //  || (belongMainType in settlementStateMap)
  if ((settlementState in settlementStateMap)) {
    const msg = settlementStateMap[settlementState]
    Message.warning(msg)

    return false // 不允许修改
  }
  // 判断归属主合同逻辑
  if ((belongMainType in settlementStateMap)) {
    const msg = settlementStateMap[belongMainType]
    Message.warning(msg)
    return false // 不允许修改
  }
  return true
}

// 审批状态执行方法判断
const _judeBackMethods = (approvalStartUserId, approvalProcessId, type) => {
  const mesType = type === 'contract' ? '合同' : '补充协议'
  const userId = getSessionStorage('userId')
  const obj = {
    msg: '',
    method: '',
    params: ''
  }
  if (userId === approvalStartUserId) {
    // 同一人
    obj['msg'] = `该${mesType}已被退回，请在合同的退回页面修改合同信息`
  } else {
    // 不同一人
    obj['msg'] = `该${mesType}已经退回给提交审批本人，请确认您是否要代替他修改合同，若是则自动撤销当前审批流程，由您来修改合同？`
    obj['method'] = previewCancel // 撤销之后打开
    obj['params'] = {
      processId: approvalProcessId
    }
  }
  return obj
}

// approvalStartUserId 审批流程的发起人
// userId sessionStorage 中的userId
export const openEdit = (row, type = 'contract') => {
  const {
    approvalStatus,
    belongMainType = null, // 归属合同结算状态
    settlementState,
    approvalProcessId, // 撤销 流程Id
    approvalStartUserId // 当前行发起流程人 Id
  } = row
  // 拿到主合同的状态
  // 首先判断结算状态 return false 不允许修改
  if (!_judeSettlementState(settlementState, type, belongMainType)) return false
  // 之后判断审批状态
  return _judeApprovalStatus(approvalStatus, approvalProcessId, approvalStartUserId, type)
}
