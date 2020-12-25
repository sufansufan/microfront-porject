export default {
  id: 'operationManagement',
  name: '运营管理',
  leaf: false,
  children: [
    {
      id: 'registrationaAudit',
      name: '注册审核',
      leaf: true,
      page: '/registrationaAudit',
      puzzle: 'operationManagement'
    }
  ],
  icon: 'puzzle',
  puzzle: 'operationManagement',
  version: '0.1.0',
  host: '/puzzles'
}
