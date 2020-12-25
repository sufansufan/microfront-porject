export default {
  id: 'shoppingMall',
  name: '商城',
  leaf: false,
  children: [
    {
      id: 'enterpriseMall',
      name: '企业商城',
      leaf: true,
      page: '/enterpriseMall',
      puzzle: 'shoppingMall',
      children: [
        {
          id: 'enterpriseMall',
          name: '企业商城',
          leaf: true,
          child: true,
          page: '/index',
          puzzle: 'shoppingMall'
        },
        {
          id: 'shoppingClassification',
          name: '企业商城1',
          leaf: true,
          child: true,
          page: '/shoppingClassification',
          puzzle: 'shoppingMall'
        },
        {
          id: 'materialName',
          name: '商品详情',
          leaf: true,
          child: true,
          page: '/materialName',
          puzzle: 'shoppingMall'
        },
        {
          id: 'shoppingCart',
          name: '购物车',
          leaf: true,
          child: true,
          page: '/shoppingCart',
          puzzle: 'shoppingMall'
        },
        {
          id: 'productComparison',
          name: '产品对比',
          leaf: true,
          child: true,
          page: '/productComparison',
          puzzle: 'shoppingMall'
        }
      ]
    },
    {
      id: 'merchandiseOrder',
      name: '商品订单',
      leaf: true,
      page: '/merchandiseOrder',
      puzzle: 'shoppingMall'
    },
    {
      id: 'companyDetails',
      name: '公司详情',
      leaf: true,
      page: '/companyDetails',
      puzzle: 'shoppingMall'
    },
    {
      id: 'productDetails',
      name: '产品详情',
      leaf: true,
      page: '/productDetails',
      puzzle: 'shoppingMall'
    }
  ],
  icon: 'puzzle',
  puzzle: 'shoppingMall',
  version: '0.1.0',
  host: '/puzzles'
}
