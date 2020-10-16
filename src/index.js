import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'mobx-react';

import getRouter from '@/router';
import stores from '@/stores';

function renderWithHotReload(RootElement) {
  ReactDom.render(
    <Provider {...stores}>
      <AppContainer>
        {RootElement}
      </AppContainer>
    </Provider>,
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
