import React from 'react';
import ReactDom from 'react-dom';

import '@/utils/hotcss/hotcss';
import '@/utils/reset.css';
import getRouter from '@/router';

import '../mock';

function renderWithHotReload(RootElement) {
  ReactDom.render(
    <>
      {RootElement}
    </>,
    document.getElementById('app')
  );
}

renderWithHotReload(getRouter());
