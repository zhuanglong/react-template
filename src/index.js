import React from 'react';
import ReactDom from 'react-dom';
import { ToastContainer2 } from '@/components/Toast2';

import '@/utils/hotcss/hotcss';
import '@/utils/reset.css';
import getRouter from '@/router';

import '../mock';

function renderWithHotReload(RootElement) {
  ReactDom.render(
    <>
      {RootElement}
      {ToastContainer2}
    </>,
    document.getElementById('app')
  );
}

renderWithHotReload(getRouter());
