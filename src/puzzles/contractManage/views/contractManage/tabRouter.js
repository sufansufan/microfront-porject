export const engineerTab = {
  level: '1',
  class: ['one-card-tabs'],
  back: true,
  model: 'oneModel',
  children: [{
    label: '工程合同',
    name: 'project',
    tabList: {
      level: '2',
      class: ['two-card-tabs', 'one-card-tabs'],
      model: 'twoModel',
      children: [{
        label: '合同信息',
        name: 'project',
        component: 'ContractInfo'
      },
      {
        label: '补充协议',
        name: 'supplement',
        component: 'ContractExtend'
      }
      ]
    }
  },
  {
    label: '内部合同',
    name: 'inside',
    defaultActive: 'labour',
    tabList: {
      level: '2',
      class: ['two-card-tabs', 'one-card-tabs'],
      model: 'twoModel',
      children: [{
        label: '劳务合同',
        name: 'labour',
        defaultCompoent: 'laborList',
        component: [{
          name: 'laborList',
          component: 'PublicLists'
        },
        {
          name: 'laborAdd',
          component: 'LaborAdd'
        },
        {
          name: 'laborView',
          component: 'ContractVersion'
        },
        {
          name: 'laborDetails',
          defaultActive: 'labourInfo',
          tabList: {
            level: '3',
            // oneLevel: true,
            class: ['three-card-tabs', 'one-card-tabs'],
            back: true,
            isBackList: 'laborList',
            model: 'threeModel',
            children: [{
              label: '合同信息',
              name: 'labourInfo',
              component: 'LaborAdd'
            },
            {
              label: '补充协议',
              name: 'labourSupply',
              defaultCompoent: 'supplyAgreement',
              component: [{
                name: 'supplyAgreement',
                component: 'SupplyAgreement'
              },
              {
                name: 'laborsupplyAdd',
                component: 'LaborSupplyAdd'
              },
              {
                name: 'laborsupplyView',
                component: 'ContractVersion'
              }
              ]
            }
            ]
          }
        }
        ]
      },
      {
        label: '采购合同',
        name: 'purchase',
        defaultCompoent: 'purchaseList',
        component: [{
          name: 'purchaseList',
          component: 'PublicLists'
        },
        {
          name: 'purchaseAdd',
          component: 'PurchaseAdd'
        },
        {
          name: 'purchaseView',
          component: 'ContractVersion'
        },
        {
          name: 'purchaseDetails',
          defaultActive: 'purchaseInfo',
          tabList: {
            level: '3',
            // oneLevel: true,
            class: ['three-card-tabs', 'one-card-tabs'],
            back: true,
            model: 'threeModel',
            isBackList: 'purchaseList',
            children: [{
              label: '合同信息',
              name: 'purchaseInfo',
              component: 'PurchaseAdd'
            },
            {
              label: '补充协议',
              name: 'purchaseSupply',
              defaultCompoent: 'supplyAgreement',
              component: [{
                name: 'supplyAgreement',
                component: 'SupplyAgreement'
              },
              {
                name: 'purchasesupplyAdd',
                component: 'PurchaseSupplyAdd'
              },
              {
                name: 'purchasesupplyView',
                component: 'ContractVersion'
              }
              ]
            }
            ]
          }
        }
        ]
      },
      {
        label: '机械合同',
        name: 'mechanics',
        defaultCompoent: 'mechanicsList',
        component: [{
          name: 'mechanicsList',
          component: 'PublicLists'
        },
        {
          name: 'mechanicsAdd',
          component: 'MechanicsAdd'
        },
        {
          name: 'mechanicsView',
          component: 'ContractVersion'
        },
        {
          name: 'mechanicsDetails',
          defaultActive: 'mechanicsInfo',
          tabList: {
            level: '3',
            // oneLevel: true,
            back: true,
            isBackList: 'mechanicsList',
            class: ['three-card-tabs', 'one-card-tabs'],
            model: 'threeModel',
            children: [{
              label: '合同信息',
              name: 'mechanicsInfo',
              component: 'MechanicsAdd'
            },
            {
              label: '补充协议',
              name: 'mechanicsSupply',
              defaultCompoent: 'supplyAgreement',
              component: [{
                name: 'supplyAgreement',
                component: 'SupplyAgreement'
              },
              {
                name: 'mechanicssupplyAdd',
                component: 'MechanicsSupplyAdd'
              },
              {
                name: 'mechanicssupplyView',
                component: 'ContractVersion'
              }
              ]
            }
            ]
          }
        }
        ]
      },
      {
        label: '分包合同',
        name: 'subpackage',
        defaultCompoent: 'subpackageList',
        component: [{
          name: 'subpackageList',
          component: 'PublicLists'
        },
        {
          name: 'subpackageAdd',
          component: 'SubpackageAdd'
        },
        {
          name: 'subpackageView',
          component: 'ContractVersion'
        },
        {
          name: 'subpackageDetails',
          defaultActive: 'subpackageInfo',
          tabList: {
            level: '3',
            // oneLevel: true,
            back: true,
            isBackList: 'subpackageList',
            class: ['three-card-tabs', 'one-card-tabs'],
            model: 'threeModel',
            children: [{
              label: '合同信息',
              name: 'subpackageInfo',
              component: 'SubpackageAdd'
            },
            {
              label: '补充协议',
              name: 'subpackageSupply',
              defaultCompoent: 'supplyAgreement',
              component: [{
                name: 'supplyAgreement',
                component: 'SupplyAgreement'
              },
              {
                name: 'subpackagesupplyAdd',
                component: 'SubSupplyAdd'
              },
              {
                name: 'subpackagesupplyView',
                component: 'ContractVersion'
              }
              ]
            }
            ]
          }
        }
        ]
      },
      {
        label: '工程保险合同',
        name: 'engineeInsure',
        defaultCompoent: 'engineeInsureList',
        component: [{
          name: 'engineeInsureList',
          component: 'PublicLists'
        },
        {
          name: 'engineeInsureAdd',
          component: 'EngineeInsureAdd'
        },
        {
          name: 'engineeInsureView',
          component: 'ContractVersion'
        },
        {
          name: 'engineeInsureDetails',
          defaultActive: 'engineeInsureInfo',
          tabList: {
            level: '3',
            // oneLevel: true,
            back: true,
            isBackList: 'engineeInsureList',
            class: ['three-card-tabs', 'one-card-tabs'],
            model: 'threeModel',
            children: [{
              label: '合同信息',
              name: 'engineeInsureInfo',
              component: 'EngineeInsureAdd'
            },
            {
              label: '补充协议',
              name: 'engineeringSupply',
              defaultCompoent: 'supplyAgreement',
              component: [{
                name: 'supplyAgreement',
                component: 'SupplyAgreement'
              },
              {
                name: 'engineeringsupplyAdd',
                component: 'EngineeSupplyAdd'
              },
              {
                name: 'engineeringsupplyView',
                component: 'ContractVersion'
              }
              ]
            }
            ]
          }
        }
        ]
      },
      {
        label: '其它合同',
        name: 'other',
        defaultCompoent: 'otherList',
        component: [{
          name: 'otherList',
          component: 'PublicLists'
        },
        {
          name: 'otherAdd',
          component: 'OtherAdd'
        },
        {
          name: 'otherView',
          component: 'ContractVersion'
        },
        {
          name: 'otherDetails',
          defaultActive: 'otherInfo',
          tabList: {
            level: '3',
            // oneLevel: true,
            back: true,
            isBackList: 'otherList',
            class: ['three-card-tabs', 'one-card-tabs'],
            model: 'threeModel',
            children: [{
              label: '合同信息',
              name: 'otherInfo',
              component: 'OtherAdd'
            },
            {
              label: '补充协议',
              name: 'otherSupply',
              defaultCompoent: 'supplyAgreement',
              component: [{
                name: 'supplyAgreement',
                component: 'SupplyAgreement'
              },
              {
                name: 'othersupplyAdd',
                component: 'OtherSupplyAdd'
              },
              {
                name: 'othersupplyView',
                component: 'ContractVersion'
              }
              ]
            }
            ]
          }
        }
        ]
      }
      ]
    }
  }
  ]
}

// 设计合同
export const designTab = {
  level: '1',
  class: ['one-card-tabs'],
  back: true,
  model: 'oneModel',
  children: [{
    label: '设计合同',
    name: 'project',
    tabList: {
      level: '2',
      class: ['two-card-tabs', 'one-card-tabs'],
      model: 'twoModel',
      children: [{
        label: '合同信息',
        name: 'project',
        component: 'DesignInfo'
      },
      {
        label: '补充协议',
        name: 'supplement',
        component: 'DesignContractExtend'
      }
      ]
    }
  },
  {
    label: '内部合同',
    name: 'inside',
    defaultActive: 'subContract',
    tabList: {
      level: '2',
      class: ['two-card-tabs', 'one-card-tabs'],
      model: 'twoModel',
      children: [
        {
          label: '分包合同',
          name: 'subContract',
          defaultCompoent: 'subMainList',
          component: [{
            name: 'subMainList',
            component: 'SubContractMain'
          },
          // 详情(新增修改)
          {
            name: 'subInfo',
            component: 'SubContractInfo'
          },
          // 版本查看
          {
            name: 'subVersion',
            component: 'SubContractVersion'
          },
          // details 查看(进入三级)
          {
            name: 'subDetail',
            defaultActive: 'subDetailInfo',
            tabList: {
              level: '3',
              class: ['three-card-tabs', 'one-card-tabs'],
              model: 'threeModel',
              back: true,
              isBackList: 'subMainList',
              defaultCompoent: 'subDetailInfo',
              children: [{
                label: '合同信息',
                name: 'subDetailInfo',
                component: 'SubContractInfo'
              },
              {
                label: '补充协议',
                name: 'subExtend',
                defaultCompoent: 'subExtendMain',
                component: [
                // 分包合同补充协议主页面
                  {
                    name: 'subExtendMain',
                    component: 'SubExtendMain'
                  },
                  // 分包合同补充协议新增页面
                  {
                    name: 'subExtendInfo',
                    component: 'SubExtendInfo'
                  },
                  // 分包合同补充协议的版本查看
                  {
                    name: 'subExtendVersion',
                    component: 'SubExtendVersion'
                  }
                ]
              }
              ]
            }
          }
          ]
        },
        {
          label: '其它合同',
          name: 'otherContract',
          defaultCompoent: 'otherMainList',
          component: [
            // 主页面
            {
              name: 'otherMainList',
              component: 'OtherContractMain'
            },
            // 详情
            {
              name: 'otherInfo',
              component: 'OtherContractInfo'
            },
            // 版本查看
            {
              name: 'otherVersion',
              component: 'OtherContractVersion'
            },
            // 进入三级
            {
              name: 'otherDetail',
              defaultActive: 'otherDetailInfo',
              tabList: {
                level: '3',
                back: true,
                isBackList: 'otherMainList',
                class: ['three-card-tabs', 'one-card-tabs'],
                model: 'threeModel',
                children: [{
                  label: '合同信息',
                  name: 'otherDetailInfo',
                  component: 'OtherContractInfo'
                },
                {
                  label: '补充协议',
                  name: 'otherDetailExtend',
                  defaultCompoent: 'otherExtendMain',
                  component: [
                  // 其他合同补充协议主页面
                    {
                      name: 'otherExtendMain',
                      component: 'OtherExtendMain'
                    },
                    // 其他合同补充协议新增页面
                    {
                      name: 'otherExtendInfo',
                      component: 'OtherExtendInfo'
                    },
                    // 其他合同补充协议的版本查看
                    {
                      name: 'otherExtendVersion',
                      component: 'OtherExtendVersion'
                    }
                  ]
                }
                ]
              }
            }
          ]
        }
      ]
    }
  }
  ]
}

export const officeTab = {
  level: '1',
  class: ['one-card-tabs'],
  back: true,
  model: 'oneModel',
  children: [{
    label: '合同信息',
    name: 'project',
    component: 'ContractInformationTabOffice'
  },
  {
    label: '补充协议',
    name: 'supplement',
    component: 'SupplementaryAgreementOffice'
  }
  ]
}

export const otherTab = {
  level: '1',
  class: ['one-card-tabs'],
  back: true,
  model: 'oneModel',
  children: [{
    label: '合同信息',
    name: 'project',
    component: 'ContractInformationTabOther'
  },
  {
    label: '补充协议',
    name: 'supplement',
    component: 'SupplementaryAgreementOffice'
  }
  ]
}
