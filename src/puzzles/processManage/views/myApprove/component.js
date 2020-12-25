const com = {
  /* 主合同 */
  MainInfo: () => import('@puzzles/contractManage/views/contractManage/contractInfo'),
  // 工程合同
  EngineerInfo: () => import('@puzzles/contractManage/views/components/EngineerInfo'),
  // 设计合同
  DesignInfo: () => import('@puzzles/contractManage/views/components/DesignInfo'),
  // 办公合同
  Office: () => import('@puzzles/contractManage/views/components/OfficeContractForm'),
  // 其它合同
  OtherContract: () => import('@puzzles/contractManage/views/components/OtherContractForm'),

  /* 内部合同 */
  // 工程合同-内部合同-劳务分包
  Labor: () => import('@puzzles/contractManage/views/components/LaborAdd'),
  // 工程合同-内部合同-采购合同
  Purchase: () => import('@puzzles/contractManage/views/components/PurchaseAdd'),
  // 工程合同-内部合同-机械合同
  Mechanics: () => import('@puzzles/contractManage/views/components/MechanicsAdd'),
  // 工程合同-内部合同-分包合同
  Subpackage: () => import('@puzzles/contractManage/views/components/SubpackageAdd'),
  // 工程合同-内部合同-工程保险合同
  EngineeInsure: () => import('@puzzles/contractManage/views/components/EngineeInsureAdd'),
  // 工程合同-内部合同-其它合同
  Other: () => import('@puzzles/contractManage/views/components/OtherAdd'),
  // 设计合同-内部合同-分包合同
  DesignSubpackage: () => import('@puzzles/contractManage/views/components/SignSubInfo'),
  // 设计合同-内部合同-其它合同
  DesignOther: () => import('@puzzles/contractManage/views/components/SignOtherInfo'),

  /* 补充协议 */
  // 工程合同-补充协议
  EngineerAgree: () => import('@puzzles/contractManage/views/contractManage/engineer/enginnerContract/info'),
  // 工程合同-内部合同-劳务合同-补充协议
  LaborAgree: () => import('@puzzles/contractManage/views/contractManage/engineer/internalContract/laboursupplyadd'),
  // 工程合同-内部合同-采购合同-补充协议
  PurchaseAgree: () => import('@puzzles/contractManage/views/contractManage/engineer/internalContract/purchasesupplyadd'),
  // 工程合同-内部合同-机械合同-补充协议
  MechanicsAgree: () => import('@puzzles/contractManage/views/contractManage/engineer/internalContract/mechanicssupplyadd'),
  // 工程合同-内部合同-分包合同-补充协议
  SubpackageAgree: () => import('@puzzles/contractManage/views/contractManage/engineer/internalContract/subpackagesupplyadd'),
  // 工程合同-内部合同-工程保险合同-补充协议
  EngineeInsureAgree: () => import('@puzzles/contractManage/views/contractManage/engineer/internalContract/engineeringsupplyadd'),
  // 工程合同-内部合同-其它合同-补充协议
  OtherAgree: () => import('@puzzles/contractManage/views/contractManage/engineer/internalContract/othersupplyadd'),
  // 设计合同-补充协议
  DesignAgree: () => import('@puzzles/contractManage/views/contractManage/designContract/signContract/info'),
  // 设计合同-内部合同-分包合同-补充协议
  DesignSubpackageAgree: () => import('@puzzles/contractManage/views/contractManage/designContract/subContract/extend/info'),
  // 设计合同-内部合同-其它合同-补充协议
  DesignOtherAgree: () => import('@puzzles/contractManage/views/contractManage/designContract/otherContract/extend/info'),
  // 办公类合同-补充协议
  OfficeAgree: () => import('@puzzles/contractManage/views/contractManage/officeContract/supplementaryAgreement/add')
  // 其它合同-补充协议
  // OtherContractAgree: () => import('@puzzles/contractManage/views/contractManage/otherContracts/supplementaryAgreement/add')

}
export default com
