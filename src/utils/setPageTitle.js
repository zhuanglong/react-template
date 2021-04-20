function setTitle(ev) {
  const hash = ev.path[0].location.hash.substr(1);
  if (hash.startsWith('/index/home')) {
    document.title = '首页';
  } else if (hash.startsWith('/index/message')) {
    document.title = '消息';
  } else if (hash.startsWith('/index/my')) {
    document.title = '我的';
  } else {
    document.title = '默认标题';
  }
}

window.addEventListener('load', setTitle);
window.addEventListener('hashchange', setTitle);
