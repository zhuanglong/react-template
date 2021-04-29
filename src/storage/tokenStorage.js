const KEY = 'token';

function set(data) {
  return window.localStorage.setItem(KEY, JSON.stringify(data));
}

function get() {
  return JSON.parse(window.localStorage.getItem(KEY));
}

function del() {
  return window.localStorage.removeItem(KEY);
}

export default {
  set,
  get,
  del
};
