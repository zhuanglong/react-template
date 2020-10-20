import React from 'react';
import {
  HashRouter as Router, Switch, Route, Link
} from 'react-router-dom';

import Home from '@/pages/Home';
import About from '@/pages/About';
// import CounterDva from '@/pages/CounterDva';
import asyncComponent from './asyncComponent';

const CounterState = asyncComponent(() => import(/* webpackChunkName: "CounterState" */'@/pages/CounterState'));
const CounterDva = asyncComponent(() => import(/* webpackChunkName: "CounterDva" */'@/pages/CounterDva'));

function getRouter() {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/counterState">CounterState</Link></li>
          <li><Link to="/counterDva">CounterDva</Link></li>
        </ul>
        <hr />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/counterState" component={CounterState} />
          <Route path="/counterDva" component={CounterDva} />
        </Switch>
      </div>
    </Router>
  );
}

export default getRouter;
