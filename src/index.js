import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import dva from 'dva';

import getRouter from '@/router';
import models from '@/models';

const app = dva();

// require('@/models').default.forEach((model) => app.model(model.default));
[...models].forEach((model) => app.model(model.default));

app.router(() => getRouter());

const App = app.start();

function renderWithHotReload() {
  ReactDom.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('app')
  );
}

renderWithHotReload();

if (module.hot) {
  module.hot.accept('@/router', () => {
    renderWithHotReload();
  });
}
