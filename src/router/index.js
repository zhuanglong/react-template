import React from 'react';
import {
  HashRouter as Router, Switch, Route, Redirect
} from 'react-router-dom';

import BasicLayout from '@/layouts/BasicLayout';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Product from '@/pages/Product';
import Message from '@/pages/Message';
import MessageDetail from '@/pages/MessageDetail';
import asyncComponent from './asyncComponent';

const My = asyncComponent(() => import(/* webpackChunkName: "My" */'@/pages/My'));
const Profile = asyncComponent(() => import(/* webpackChunkName: "Profile" */'@/pages/Profile'));

function getRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/index" />} />
        <Route
          path="/index"
          render={() => (
            <>
              <BasicLayout>
                <Switch>
                  <Route path="/index" exact component={() => <Redirect to="/index/home" />} />
                  <Route path="/index/home" component={Home} />
                  <Route path="/index/message" component={Message} />
                  <Route path="/index/my" component={My} />
                  <Route path="/index/*" component={() => <Redirect to="/404" />} />
                </Switch>
              </BasicLayout>
            </>
          )}
        />
        <Route path="/product" component={Product} />
        <Route path="/message-detail" component={MessageDetail} />
        <Route path="/profile" component={Profile} />
        <Route path="/404" component={NotFound} />
        <Route path="*" component={() => <Redirect to="/404" />} />
      </Switch>
    </Router>
  );
}

export default getRouter;
