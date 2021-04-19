import React from 'react';
import {
  HashRouter as Router, Switch, Route
} from 'react-router-dom';

function RouterView(props) {
  const { routes } = props;
  return (
    <Router>
      <Switch>
        {
          routes.map((item, index) => {
            const Comp = item.component;
            return (
              <Route
                key={index}
                path={item.path}
                exact={item.exact}
                render={(routeProps) => (
                  <Comp routes={item.children} {...routeProps} />
                )}
              />
            );
          })
        }
      </Switch>
    </Router>
  );
}

export default RouterView;
