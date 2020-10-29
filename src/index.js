import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from '@/router';

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
