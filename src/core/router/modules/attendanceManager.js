export default {
  id: 'attendanceManager',
  name: '考勤管理',
  leaf: false,
  children: [
    {
      id: 'attendanceStatistics',
      name: '考勤统计',
      leaf: true,
      page: '/attendanceStatistics',
      puzzle: 'attendanceManager'
    },
    {
      id: 'attendanceSettings',
      name: '考勤设置',
      leaf: true,
      page: '/attendanceSettings',
      puzzle: 'attendanceManager'
    },
    {
      id: 'attendanceApplication',
      name: '考勤申请',
      leaf: true,
      page: '/attendanceApplication',
      puzzle: 'attendanceManager',
      children: [
        {
          id: 'leaveRequest',
          name: '请假申请',
          leaf: true,
          page: '/leaveRequest',
          puzzle: 'attendanceManager'
        },
        {
          id: 'outgoingApplication',
          name: '外出申请',
          leaf: true,
          page: '/outgoingApplication',
          puzzle: 'attendanceManager'
        },
        {
          id: 'supplementaryCardApplication',
          name: '补卡申请',
          leaf: true,
          page: '/supplementaryCardApplication',
          puzzle: 'attendanceManager'
        },
        {
          id: 'applicationBusinessTrip',
          name: '出差申请',
          leaf: true,
          page: '/applicationBusinessTrip',
          puzzle: 'attendanceManager'
        },
        {
          id: 'overtimeApplication',
          name: '加班申请',
          leaf: true,
          page: '/overtimeApplication',
          puzzle: 'attendanceManager'
        }
      ]
    }
  ],
  icon: 'puzzle',
  puzzle: 'attendanceManager',
  version: '0.1.0',
  host: '/puzzles'
}
