import React, { useEffect } from 'react';

import { findTitleOfRoutes } from '@/router/routes';

function BasicLayout(props) {
  useEffect(() => {
    document.title = findTitleOfRoutes(props.location.pathname);
    const unlisten = props.history.listen((ev) => {
      document.title = findTitleOfRoutes(ev.pathname);
    });
    return () => {
      unlisten();
    };
  });
  return (
    <>{props.children}</>
  );
}

export default BasicLayout;
