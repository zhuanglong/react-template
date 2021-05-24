import React from 'react';
import ReactDom from 'react-dom';

import '@/utils/reset.css';
import getRouter from '@/router';

function renderWithHotReload(RootElement) {
  ReactDom.render(
    <div>
      {RootElement}
    </div>,
    document.getElementById('app')
  );
}

renderWithHotReload(getRouter());
