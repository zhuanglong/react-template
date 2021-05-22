import React from 'react';
import ReactDom from 'react-dom';

import '@/utils/hotcss/hotcss';
// import '@/utils/reset.css';
import getRouter from '@/router';
import ThemeProviderPro from '@/theme';

import '../mock';

function renderWithHotReload(RootElement) {
  ReactDom.render(
    <>
      <ThemeProviderPro>
        {RootElement}
      </ThemeProviderPro>
    </>,
    document.getElementById('app')
  );
}

renderWithHotReload(getRouter());
