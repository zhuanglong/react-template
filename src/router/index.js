import React from 'react';
import {
  Router, Switch, Route, Redirect
} from 'react-router-dom';

import history from './history';
import routes from './routes';

function RouteWithSubRoutes(props) {
  const { component, path, exact, redirect, children } = props;
  const routeView = {};
  if (component) { // 是否为组件
    routeView.component = component;
  } else if (redirect) { // 是否为重定向，是则去掉组件，因为重定向就没必要有组件
    delete routeView.component;
    routeView.render = () => <Redirect to={redirect} />;
  } else { // 都没有返回空
    return null;
  }
  // 如果存在子节点就必须要有组件，这样才能包裹
  if (children && routeView.component) {
    return (
      <Route
        path={path}
        exact={exact}
        render={(routeProps) => (
          <routeView.component {...routeProps}>
            <Switch>
              {children.map((route, index) => (
                <RouteWithSubRoutes key={index} {...route} />
              ))}
            </Switch>
          </routeView.component>
        )}
      />
    );
  }
  return (
    <Route path={path} exact={exact} {...routeView} />
  );
}

function getRouter() {
  return (
    <Router history={history}>
      <Switch>
        {routes.map((route, index) => (
          <RouteWithSubRoutes key={index} {...route} />
        ))}
      </Switch>
    </Router>
  );
}

export default getRouter;
