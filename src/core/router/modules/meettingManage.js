export default {
  id: 'meettingManage',
  name: '会议管理',
  leaf: false,
  children: [
    {
      id: 'meettingRoom',
      name: '会议室管理',
      leaf: true,
      page: '/meettingRoom',
      puzzle: 'meettingManage',
      children: [
        {
          id: 'addMeettingRoom',
          name: '新增',
          leaf: true,
          page: '/addMeettingRoom',
          puzzle: 'meettingManage'
        },
        {
          id: 'meettingRoomDetail',
          name: '新增',
          leaf: true,
          page: '/meettingRoomDetail',
          puzzle: 'meettingManage'
        }
      ]
    }
  ],
  icon: 'puzzle',
  puzzle: 'meettingManage',
  version: '0.1.0',
  host: '/puzzles'
}
