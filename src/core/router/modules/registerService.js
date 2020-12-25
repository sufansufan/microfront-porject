export default {
  id: 'registerService',
  name: '注册服务管理',
  leaf: false,
  icon: 'puzzle',
  children: [
    {
      id: 'registerService',
      name: '注册服务管理',
      leaf: true,
      cache: true,
      page: '/index',
      puzzle: 'registerService'
    }
  ],
  puzzle: 'registerService',
  version: '0.1.0',
  host: '/puzzles'
}
