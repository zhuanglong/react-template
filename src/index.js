import React from 'react';
import ReactDom from 'react-dom';

import getRouter from './router';

ReactDom.render(
    getRouter(),
    document.getElementById('app')
);