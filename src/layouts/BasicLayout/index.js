import React, { useEffect } from 'react';

import { findTitleOfRoutes } from '@/router/routes';

function BasicLayout(props) {
  const updateTitle = (pathname) => {
    const title = findTitleOfRoutes(pathname);
    // 如果路由 title 为 undefined，则使用默认 href
    // 如果为空字符串则不设置标题，这也表明想在组件内部设置标题
    if (title || title === undefined) {
      document.title = title || '';
    }
  };

  useEffect(() => {
    // 监听路由变化更改页面标题
    updateTitle(props.location.pathname);
    const unlisten = props.history.listen((event) => {
      updateTitle(event.pathname);
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
