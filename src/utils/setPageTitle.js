function setTitle(ev) {
  const path = ev.target.location.hash.substr(1);
  if (path.startsWith('/index/home')) {
    document.title = '首页';
  } else if (path.startsWith('/index/message')) {
    document.title = '消息';
  } else if (path.startsWith('/index/my')) {
    document.title = '我的';
  } else {
    document.title = '默认标题';
  }
}

window.addEventListener('load', setTitle);
window.addEventListener('hashchange', setTitle);
