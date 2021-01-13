import React from 'react';
import {
  HashRouter as Router, Link
} from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';

import Home from '@/pages/Home';
import About from '@/pages/About';
import asyncComponent from './asyncComponent';

const CounterState = asyncComponent(() => import(/* webpackChunkName: "CounterState" */'@/pages/CounterState'));

function getRouter() {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/counterState">CounterState</Link></li>
        </ul>
        <hr />
        <CacheSwitch>
          <CacheRoute path="/" exact component={Home} />
          <CacheRoute path="/about" component={About} />
          <CacheRoute path="/counterState" component={CounterState} />
        </CacheSwitch>
      </div>
    </Router>
  );
}

export default getRouter;
