export default {
  id: 'dispatchManage',
  name: '调度管理',
  leaf: false,
  children: [
    {
      id: 'dispatchScheme',
      name: '调度方案',
      leaf: true,
      page: '/dispatchScheme',
      puzzle: 'dispatchManage'
    }
  ],
  icon: 'puzzle',
  puzzle: 'dispatchManage',
  version: '0.1.0',
  host: ''
}
