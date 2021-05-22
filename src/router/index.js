import React from 'react';
import {
  Router, Switch, Route, Redirect
} from 'react-router-dom';
import { AliveScope } from 'react-activation';

import { tokenStorage } from '@/storage';
import history from './history';
import routes from './routes';

// 登录状态鉴权路由
function RouteAuth(props) {
  const { isAuth, ...rest } = props;
  const isLogined = !!tokenStorage.get();
  const Comp = <Route {...rest} />;
  if (isAuth === false) {
    return Comp;
  }
  return isLogined ? Comp : <Redirect to="/login" />;
}

function RouteWithSubRoutes(props) {
  const { component, path, exact, redirect, isAuth, children } = props;
  const routeView = {};
  if (component) { // 是否为组件
    routeView.component = component;
  } else if (redirect) { // 是否为重定向，是则去掉组件，因为重定向就没必要有组件
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
    <RouteAuth path={path} exact={exact} isAuth={isAuth} {...routeView} />
  );
}

function getRouter() {
  return (
    <Router history={history}>
      <AliveScope>
        <Switch>
          {routes.map((route, index) => (
            <RouteWithSubRoutes key={index} {...route} />
          ))}
        </Switch>
      </AliveScope>
    </Router>
  );
}

export default getRouter;
