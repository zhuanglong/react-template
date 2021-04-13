import React from 'react';
import {
  HashRouter as Router, Switch, Route
} from 'react-router-dom';

import TabBar from '@/components/TabBar';
// import styles from './styles.scss';

import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import HomeChild from '@/pages/HomeChild';
import Discover from '@/pages/Discover';
import DiscoverChild from '@/pages/DiscoverChild';
import asyncComponent from './asyncComponent';

const My = asyncComponent(() => import(/* webpackChunkName: "My" */'@/pages/My'));
const MyChild = asyncComponent(() => import(/* webpackChunkName: "MyChild" */'@/pages/MyChild'));

function getRouter() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home/home-child" component={HomeChild} />
          <Route>
            <Route path="/discover" exact component={Discover} />
            <Route path="/discover/discover-child" component={DiscoverChild} />
          </Route>
          <Route path="/my" component={My} />
          <Route path="/my/my-child" component={MyChild} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
      <TabBar />
    </Router>
  );
}

export default getRouter;
