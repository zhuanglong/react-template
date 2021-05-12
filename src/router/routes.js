import BasicLayout from '@/layouts/BasicLayout';
import BlankLayout from '@/layouts/BlankLayout';
import MainLayout from '@/layouts/MainLayout';

import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Product from '@/pages/Product';
import Message from '@/pages/Message';
import MessageDetail from '@/pages/MessageDetail';
import Login from '@/pages/Login';

import asyncComponent from './asyncComponent';

const My = asyncComponent(() => import(/* webpackChunkName: "My" */'@/pages/My'));
const Profile = asyncComponent(() => import(/* webpackChunkName: "Profile" */'@/pages/Profile'));

// 路由配置
const config = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/',
        exact: true,
        redirect: '/index'
      },
      {
        path: '/index',
        component: BlankLayout,
        children: [
          {
            path: '/index',
            component: MainLayout,
            children: [
              {
                path: '/index',
                exact: true,
                redirect: '/index/home'
              },
              {
                path: '/index/home',
                title: '首页',
                component: Home
              },
              {
                path: '/index/message',
                title: '消息',
                component: Message
              },
              {
                path: '/index/my',
                title: '我的',
                component: My
              },
              {
                path: '/index/*',
                redirect: '/404'
              }
            ]
          }
        ]
      },
      {
        path: '/product',
        title: '产品',
        component: Product
      },
      {
        path: '/message-detail',
        title: '', // 空字符串用于组件内部设置标题
        component: MessageDetail
      },
      {
        path: '/profile',
        title: '个人信息',
        component: Profile
      },
      {
        path: '/login',
        title: '登录',
        isAuth: false,
        component: Login
      },
      {
        path: '/404',
        title: '404',
        isAuth: false,
        component: NotFound
      },
      {
        path: '/*',
        redirect: '/404'
      }
    ]
  }
];

// 找到路由中的标题
export function findTitleOfRoutes(pathname, routes = config) {
  let title = '';
  for (let index = 0; index < routes.length; index++) {
    const item = routes[index];
    if (pathname === item.path) {
      title = item.title;
      break;
    }
    if (item.children) {
      title = findTitleOfRoutes(pathname, item.children);
    }
  }
  return title;
}

export default config;
