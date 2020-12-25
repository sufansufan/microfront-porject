export default {
  id: 'dataManage',
  name: '资料管理',
  leaf: false,
  children: [
    {
      id: 'dataPreview',
      name: '资料编制及预览',
      leaf: true,
      page: '/dataPreview',
      puzzle: 'dataManage',
      children: [
        {
          id: 'projectDataDetail',
          name: '工程资料详情',
          leaf: true,
          page: '/projectDataDetail',
          puzzle: 'dataManage'
        }
      ]
    }
  ],
  icon: 'puzzle',
  puzzle: 'dataManage',
  version: '0.1.0',
  host: '/puzzles'
}
