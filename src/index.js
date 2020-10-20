import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import getRouter from '@/router';
import store from '@/redux/store';

function renderWithHotReload(RootElement) {
  ReactDom.render(
    <AppContainer>
      <Provider store={store}>
        {RootElement}
      </Provider>
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
