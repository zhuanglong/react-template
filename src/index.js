import '@/utils/hotcss/hotcss';

import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import getRouter from '@/router';

hotcss.designWidth = 375;

function renderWithHotReload(RootElement) {
  ReactDom.render(
    <AppContainer>
      {RootElement}
    </AppContainer>,
    document.getElementById('app')
  );
}

renderWithHotReload(getRouter());

if (module.hot) {
  module.hot.accept('@/router', () => {
    const getNextRouter = require('@/router').default;
    renderWithHotReload(getNextRouter());
  });
}
