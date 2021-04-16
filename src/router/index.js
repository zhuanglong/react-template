import React from 'react';
import {
  HashRouter as Router, Switch, Route, Redirect
} from 'react-router-dom';

import TabBar from '@/components/TabBar';

import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Product from '@/pages/Product';
import Message from '@/pages/Message';
import MessageDetail from '@/pages/MessageDetail';
import asyncComponent from './asyncComponent';

import styles from './styles.scss';

const My = asyncComponent(() => import(/* webpackChunkName: "My" */'@/pages/My'));
const Profile = asyncComponent(() => import(/* webpackChunkName: "Profile" */'@/pages/Profile'));

function getRouter() {
  return (
    <Router>
      <div className={styles.container}>
        <Switch>
          <Route>
            <Redirect to="/tabbar" />
            <Route
              path="/tabbar"
              render={() => (
                <>
                  <TabBar>
                    <Redirect to="/tabbar/home" />
                    <Route path="/tabbar/home" component={Home} />
                    <Route path="/tabbar/message" component={Message} />
                    <Route path="/tabbar/my" component={My} />
                  </TabBar>
                </>
              )}
            />
            <Route path="/product" component={Product} />
            <Route path="/message-detail" component={MessageDetail} />
            <Route path="/profile" component={Profile} />
            <Route path="*" component={NotFound} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default getRouter;
