function setTitle(ev) {
  const path = ev.target.location.hash.substr(1);
  let title = '默认标题';
  if (path.startsWith('/index/home')) {
    title = '首页';
  } else if (path.startsWith('/index/message')) {
    title = '消息';
  } else if (path.startsWith('/index/my')) {
    title = '我的';
  }
  document.title = title;
}

window.addEventListener('load', setTitle);
window.addEventListener('hashchange', setTitle);
