export default {

  id: 'videoConferencing',
  name: '视频会议',
  leaf: false,
  children: [
    {
      id: 'videoConferencing',
      name: '视频会议',
      leaf: true,
      page: '/videoConferencing',
      puzzle: 'videoConferencing',
      children: [
        {
          id: 'newMeeting',
          name: '新增',
          leaf: true,
          page: '/newMeeting',
          puzzle: 'videoConferencing'
        },
        {
          id: 'viewMeeting',
          name: '查看',
          leaf: true,
          page: '/viewMeeting',
          puzzle: 'videoConferencing'
        }
      ]
    }
  ],

  icon: 'puzzle',
  puzzle: 'videoConferencing',
  version: '0.1.0',
  host: '/puzzles'
}
