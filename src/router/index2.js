// 对应的手动版
import React from 'react';
import {
  Router, Switch, Route, Redirect
} from 'react-router-dom';

import BasicLayout from '@/layouts/BasicLayout';
import BlankLayout from '@/layouts/BlankLayout';
import MainLayout from '@/layouts/MainLayout';

import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Product from '@/pages/Product';
import Message from '@/pages/Message';
import MessageDetail from '@/pages/MessageDetail';

import history from './history';
import asyncComponent from './asyncComponent';

const My = asyncComponent(() => import(/* webpackChunkName: "My" */'@/pages/My'));
const Profile = asyncComponent(() => import(/* webpackChunkName: "Profile" */'@/pages/Profile'));

function getRouter() {
  return (
    <Router history={history}>
      <Switch>
        <Route
          path="/"
          render={(routeProps) => (
            <BasicLayout {...routeProps}>
              <Switch>
                <Route path="/" exact render={() => <Redirect to="/index" />} />
                <Route
                  path="/index"
                  render={() => (
                    <BlankLayout {...routeProps}>
                      <Switch>
                        <MainLayout {...routeProps}>
                          <Switch>
                            <Route path="/index" exact render={() => <Redirect to="/index/home" />} />
                            <Route path="/index/home" component={Home} />
                            <Route path="/index/message" component={Message} />
                            <Route path="/index/my" component={My} />
                            <Route path="/index/*" render={() => <Redirect to="/404" />} />
                          </Switch>
                        </MainLayout>
                      </Switch>
                    </BlankLayout>
                  )}
                />
                <Route path="/product" component={Product} />
                <Route path="/message-detail" component={MessageDetail} />
                <Route path="/profile" component={Profile} />
                <Route path="/404" component={NotFound} />
                <Route path="*" render={() => <Redirect to="/404" />} />
              </Switch>
            </BasicLayout>
          )}
        />
      </Switch>
    </Router>
  );
}

export default getRouter;
