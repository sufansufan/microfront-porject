export default {
  id: 'vehicleManagement',
  name: '车辆管理',
  leaf: false,
  children: [
    {
      id: 'vehiclearchives',
      name: '车辆档案',
      leaf: true,
      page: '/vehiclearchives',
      puzzle: 'vehicleManagement',
      children: [
        {
          id: 'vehicleinformation',
          name: '查看',
          leaf: true,
          page: '/vehicleinformation',
          puzzle: 'vehiclearchives'
        }
      ]
    },
    {
      id: 'drivermanagement',
      name: '司机管理',
      leaf: true,
      page: '/drivermanagement',
      puzzle: 'vehicleManagement',
      children: [
        {
          id: 'driverinformation',
          name: '查看',
          leaf: true,
          page: '/driverinformation',
          puzzle: 'vehicleManagement'
        }
      ]

    }, {
      id: 'carapplication',
      name: '用车申请',
      leaf: true,
      page: '/carapplication',
      puzzle: 'vehicleManagement',
      children: [
        {
          id: 'vehiclerinformation',
          name: '用车信息',
          leaf: true,
          page: '/vehiclerinformation',
          puzzle: 'vehicleManagement'
        },
        {
          id: 'newcar',
          name: '新增用车',
          leaf: true,
          page: '/newcar',
          puzzle: 'vehicleManagement'
        }

      ]
    },
    {
      id: 'oilcardmanagement',
      name: '油卡管理',
      leaf: true,
      page: '/oilcardmanagement',
      puzzle: 'vehicleManagement',
      children: [
        {
          id: 'fuelcardinformation',
          name: '用车信息',
          leaf: true,
          page: '/fuelcardinformation',
          puzzle: 'vehicleManagement'
        }
      ]

    }, {
      id: 'refuelingmanagement',
      name: '加油管理',
      leaf: true,
      page: '/refuelingmanagement',
      puzzle: 'vehicleManagement',
      children: [
        {
          id: 'licenseplateinformation',
          name: '车牌信息',
          leaf: true,
          page: '/licenseplateinformation',
          puzzle: 'vehicleManagement'
        }
      ]

    }
  ]
}
