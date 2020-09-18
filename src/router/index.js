import React from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';

function getRouter() {
    return (
        <Router>
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
                <hr />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" component={About} />
                </Switch>
            </div>
        </Router>
    );
}

export default getRouter;