import React from 'react';
import {
  HashRouter as Router, Switch, Route, Link, withRouter
} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Home from '@/pages/Home';
import About from '@/pages/About';
// import CounterState from '@/pages/CounterState';
import asyncComponent from './asyncComponent';

import styles from './styles.less';

const CounterState = asyncComponent(() => import(/* webpackChunkName: "CounterState" */'@/pages/CounterState'));

const AnimatedSwitch = withRouter((props) => {
  const { history: { action }, location } = props;
  const ANIMATION_MAP = {
    PUSH: 'fade',
    POP: 'refade',
    REPLACE: 'normal'
  };
  return (
    <TransitionGroup
      className={styles['comp-box']}
      childFactory={(child) => (
        React.cloneElement(child, {
          classNames: {
            enter: styles[`${ANIMATION_MAP[action]}-enter`],
            enterActive: styles[`${ANIMATION_MAP[action]}-enter-active`],
            exit: styles[`${ANIMATION_MAP[action]}-exit`],
            exitActive: styles[`${ANIMATION_MAP[action]}-exit-active`]
          }
        })
      )}
    >
      <CSSTransition
        key={location.pathname}
        timeout={500}
        classNames={{
          // enter: styles['fade-enter'],
          // enterActive: styles['fade-enter-active'],
          // exit: styles['fade-exit'],
          // exitActive: styles['fade-exit-active']
          // enter: styles['fadeInRight'],
          // exit: styles['fadeOutLeft']

          // enter: styles[`${ANIMATION_MAP[action]}-enter`],
          // enterActive: styles[`${ANIMATION_MAP[action]}-enter-active`],
          // exit: styles[`${ANIMATION_MAP[action]}-exit`],
          // exitActive: styles[`${ANIMATION_MAP[action]}-exit-active`]
        }}
      >
        <Switch location={location}>{props.children}</Switch>
      </CSSTransition>
    </TransitionGroup>
  );
});

function getRouter() {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/counterState" replace>CounterState</Link></li>
        </ul>
        <hr />
        <AnimatedSwitch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/counterState" component={CounterState} />
        </AnimatedSwitch>
      </div>
    </Router>
  );
}

export default getRouter;
