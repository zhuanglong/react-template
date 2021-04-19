import React from 'react';
import { Redirect } from 'react-router-dom';

import NotFound from '@/pages/NotFound';
import TabBar from '@/components/TabBar';
import Home from '@/pages/Home';
import Product from '@/pages/Product';
import Message from '@/pages/Message';
import MessageDetail from '@/pages/MessageDetail';

import asyncComponent from './asyncComponent';

const My = asyncComponent(() => import(/* webpackChunkName: "My" */'@/pages/My'));
const Profile = asyncComponent(() => import(/* webpackChunkName: "Profile" */'@/pages/Profile'));

const config = [
  {
    path: '/index',
    component: TabBar,
    children: [
      {
        path: '/index/home',
        component: Home,
        exact: true
      },
      {
        path: '/index/message',
        component: Message,
        exact: true
      },
      {
        path: '/index/my',
        component: My,
        exact: true
      },
      {
        path: '/index/*',
        component: () => <Redirect to="/404" />
      }
    ]
  },
  {
    path: '/product',
    component: Product
  },
  {
    path: '/message-detail',
    component: MessageDetail
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/404',
    component: NotFound
  },
  {
    path: '*',
    component: () => <Redirect to="/404" />
  }
];

export default config;
