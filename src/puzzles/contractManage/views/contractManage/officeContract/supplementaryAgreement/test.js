import { Message, MessageBox } from 'element-ui'
import { previewCancel } from '@core/api/processManage/workflowmanager'
import { getSessionStorage } from '@core/utils/auth'
export const openEdit = async(row) => {
  // const settlementState = '01' // 测试数据
  const settlementState = JSON.parse(getSessionStorage('contractFormData')).settlementState
  switch (settlementState) {
    case '03':// 审批通过
      showMessage('主合同已结算，不允许修改')
      break
    case '02':// 审批中
      showMessage('主合同已结算，不允许修改')
      break
    case '06':// 已退回
      showMessage('主合同已退回，不允许修改')
      break
    case '01':// 未结算
    case '04':// 审批拒绝
    case '05':// 已撤销
      // row.approvalStatus = '02' // 测试数据
      if (row.approvalStatus === '02') { // 审批中
        return await showMessageBox(row, false, '该补充协议正在审核中，如若修改则自动撤销当前审核，请确定是否要修改？')
      } else if (row.approvalStatus === '06') { // 已退回
        if (row.createUserName === getSessionStorage('userName')) {
          return await showMessageBox(row, true, '该补充协议已被退回，请在合同的退回页面修改合同信息')
        } else {
          return await showMessageBox(row, false, '该补充协议已经退回给提交审批本人，请确认您是否要代替他修改合同，若是则自动撤销当前审批流程，由您来修改？')
        }
      } else {
        return true
      }
  }
  return false
}

const showMessage = (message) => {
  Message({ message: message, showClose: true, type: 'warning' })
}
const showMessageBox = (row, isRoute, message) => {
  return MessageBox.confirm(message, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  }).then(() => {
    if (isRoute) {
      // 跳转指定流程页面
      this.$router.push({ path: '/processManage/myApprove' })
    } else {
      previewCancel({ processId: row.approvalProcessId }).then((res) => {
        Message.success('撤销成功')
      })
      return true
    }
  }).catch(() => {
    return false
  })
}
