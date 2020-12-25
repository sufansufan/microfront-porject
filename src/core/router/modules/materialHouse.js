export default {
  id: 'materialHouse',
  name: '材料库',
  leaf: false,
  children: [
    {
      id: 'materialInfo',
      name: '材料库',
      leaf: true,
      cache: true,
      page: '/materialInfo',
      puzzle: 'materialHouse',
      children: [
        {
          id: 'materialAdd',
          name: '新增,修改,查看',
          leaf: true,
          page: '/add',
          puzzle: 'materialHouse'
        },
        {
          id: 'materialEdit',
          name: '新增,修改,查看',
          leaf: true,
          page: '/edit',
          puzzle: 'materialHouse'
        },
        {
          id: 'materialDetails',
          name: '新增,修改,查看',
          leaf: true,
          page: '/details',
          puzzle: 'materialHouse'
        },
        {
          id: 'importMaterial',
          name: '导入',
          leaf: true,
          page: '/importMaterial',
          puzzle: 'materialHouse'
        },
        {
          id: 'materialPreview',
          name: '预览',
          leaf: true,
          page: '/materialPreview',
          puzzle: 'materialHouse'
        }
      ]
    }
  ],
  icon: 'puzzle',
  puzzle: 'materialHouse',
  version: '0.1.0',
  host: '/puzzles'
}
