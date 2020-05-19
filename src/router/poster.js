import Layout from '@/layout' 

const Poster = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/poster'),
      meta: { title: '首页', icon: 'dashboard' }
    },
    {
      path: 'personalCenter',
      name: 'personalCenter',
      component: () => import('@/views/personalCenter/index'),
      meta: { title: '个人中心', icon: 'dashboard' },
      hidden: true
    }
  ]
  },
  {
    path: '/teamManage',
    component: Layout,
    redirect: '/teamManage/addPartner',
    name: 'TeamManage',
    meta: { title: '团队管理', icon: 'example' },
    children: [
      {
        path: 'poster',
        name: 'Poster',
        component: () => import('@/views/teamManage/poster/index'),
        meta: { title: '生成招募海报', icon: 'education' }
      },
      {
        path: 'partner',
        name: 'partner',
        component: () => import('@/views/teamManage/partner/index'),
        meta: { title: '经纪人团队管理', icon: 'tree' }
      },
      {
        path: 'partnerDetail',
        name: 'PartnerDetail',
        component: () => import('@/views/teamManage/partnerDetail/index'),
        meta: { 
          title: '经纪人团队详情', 
          icon: 'documentation',
          guidePath: true,
          jumpPath : '/teamManage/partner'
        },
        hidden: true
      }
    ]
  },

  {
    path: '/orderManagement',
    component: Layout,
    redirect: '/orderManagement/orderList',
    name: 'OrderManagement',
    children: [
      {
        path: 'orderList',
        name: 'OrderList',
        component: () => import('@/views/orderManagement/orderList/index'),
        meta: { title: '订单管理', icon: 'documentation' }
      },
      {
        path: 'orderDetail',
        name: 'OrderDetail',
        component: () => import('@/views/orderManagement/orderDetail/index'),
        meta: { 
          title: '订单详情', 
          icon: 'documentation',
          guidePath: true,
          jumpPath : '/orderManagement/orderList'
        },
        hidden: true
      }
    ]
  },

  {
    path: '/productManagement',
    component: Layout,
    children: [
      {
        path: 'productList',
        name: 'ProductList',
        component: () => import('@/views/productManagement/productList/index'),
        meta: { title: '产品管理', icon: 'table' }
      },
      {
        path: 'productDetail',
        name: 'ProductDetail',
        component: () => import('@/views/productManagement/productDetail/index'),
        meta: { 
          title: '产品详情', 
          icon: 'documentation',
          guidePath: true,
          jumpPath : '/productManagement/productList'
        },
        hidden: true
      }
    ]
  },
]

export default Poster