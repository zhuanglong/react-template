import React from 'react';
import {
  HashRouter as Router, Switch, Route, Link
} from 'react-router-dom';

import Home from '@/pages/Home';
import About from '@/pages/About';
// import CounterRedux from '@/pages/CounterRedux';
import asyncComponent from './asyncComponent';

const CounterState = asyncComponent(() => import(/* webpackChunkName: "CounterState" */'@/pages/CounterState'));
const CounterRedux = asyncComponent(() => import(/* webpackChunkName: "CounterRedux" */'@/pages/CounterRedux'));
const My = asyncComponent(() => import(/* webpackChunkName: "My" */'@/pages/My'));

function getRouter() {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/counterState">CounterState</Link></li>
          <li><Link to="/counterRedux">CounterRedux</Link></li>
          <li><Link to="/my">My</Link></li>
        </ul>
        <hr />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/counterState" component={CounterState} />
          <Route path="/counterRedux" component={CounterRedux} />
          <Route path="/my" component={My} />
        </Switch>
      </div>
    </Router>
  );
}

export default getRouter;
