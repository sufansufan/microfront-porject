export default {
  id: 'productClassification',
  name: '产品分类管理',
  leaf: false,
  icon: 'puzzle',
  children: [

    {
      id: 'productClassification',
      name: '产品分类',
      leaf: true,
      page: '/index',
      puzzle: 'productClassification',
      children: [
        // {
        //   id: 'orgManageAdd',
        //   name: '新增组织,修改组织,查看组织',
        //   leaf: true,
        //   page: '/add',
        //   puzzle: 'productClassification'
        // },
      ]
    },
    {
      id: 'productAdd',
      name: '新增',
      leaf: true,
      page: '/add',
      puzzle: 'productClassification'
    },
    {
      id: 'productEdit',
      name: '修改',
      leaf: true,
      page: '/edit',
      puzzle: 'productClassification'
    },
    {
      id: 'productDetails',
      name: '查看',
      leaf: true,
      page: '/details',
      puzzle: 'productClassification'
    },
    {
      id: 'setAttributes',
      name: '设置分类属性',
      leaf: true,
      page: '/setAttributes',
      puzzle: 'productClassification'
    }
  ],
  puzzle: 'productClassification',
  version: '0.1.0',
  host: '/puzzles'
}
