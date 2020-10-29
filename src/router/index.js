import React from 'react';
import {
  HashRouter as Router, Switch, Route, Link
} from 'react-router-dom';

import { ThemeContext, ThemeToggleButton, themes } from '@/components/Theme';

import Home from '@/pages/Home';
import About from '@/pages/About';
import asyncComponent from './asyncComponent';

const CounterState = asyncComponent(() => import(/* webpackChunkName: "CounterState" */'@/pages/CounterState'));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
      // eslint-disable-next-line react/no-unused-state
      toggleTheme: this.toggleTheme
    };
  }

  toggleTheme = () => {
    this.setState((state) => ({
      theme: state.theme === themes.light ? themes.dark : themes.light
    }));
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        <Router>
          <div>
            <ThemeToggleButton />
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/counterState">CounterState</Link></li>
            </ul>
            <hr />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <Route path="/counterState" component={CounterState} />
            </Switch>
          </div>
        </Router>
      </ThemeContext.Provider>
    );
  }
}

export default App;
