import { findTitleOfRoutes } from '@/router/routes';

function listener(ev) {
  const path = ev.target.location.hash.substr(1);
  document.title = findTitleOfRoutes(path);
}

window.addEventListener('load', listener);
window.addEventListener('hashchange', listener);
