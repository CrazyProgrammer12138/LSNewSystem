import Layout from '@/layout' 

const Partner = [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [{
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/parther.vue'),
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
        path: 'addPartner',
        name: 'addPartner',
        component: () => import('@/views/teamManage/addPartner/index'),
        meta: { title: '新增城市合伙人', icon: 'nested' }
      },
      {
        path: 'broker',
        name: 'broker',
        component: () => import('@/views/teamManage/broker/index'),
        meta: { title: '合伙人团队管理', icon: 'form' }
      },
      {
        path: 'brokerDetail',
        name: 'BrokerDetail',
        component: () => import('@/views/teamManage/brokerDetail/index'),
        meta: { 
          title: '合伙人团队详情', 
          icon: 'documentation',
          guidePath: true,
          jumpPath : '/teamManage/broker'
        },
        hidden: true
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
      },
      
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
    redirect: '/productManagement/productList',
    name: 'ProductManagement',
    meta: { title: '产品管理', icon: 'table' },
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
      },
      {
        path: 'productAdd',
        name: 'productAdd',
        component: () => import('@/views/productManagement/productAdd/index'),
        meta: { 
          title: '产品详情', 
          guidePath: true,
          jumpPath : '/productManagement/productList'
        },
        hidden: true
      },
      {
        path: 'drafts',
        name: 'drafts',
        component: () => import('@/views/productManagement/drafts/index'),
        meta: { 
          title: '草稿箱', 
          guidePath: true,
          jumpPath : '/productManagement/productList'
        },
        hidden: true
      },
      {
        path: 'recycleBin',
        name: 'recycleBin',
        component: () => import('@/views/productManagement/recycleBin/index'),
        meta: { 
          title: '回收站', 
          guidePath: true,
          jumpPath : '/productManagement/productList'
        },
        hidden: true
      }
    ]
  },
]

export default Partner