/* eslint-disable no-console */

export function showLoading(config = {}) {
  // 不传递默认开启 loading
  if (!config.hideLoading) {
    console.log('show loading');
  }
}

export function hideLoading(config = {}) {
  if (!config.hideLoading) {
    console.log('hide loading');
  }
}

// 匹配状态码
export function matchHttpStatusCode(status) {
  let msg = '';
  switch (status) {
    case 401:
      msg = '没有该操作权限';
      break;
    case 403:
      msg = '服务器禁止访问';
      break;
    case 404:
      msg = '服务器没有此服务';
      break;
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
      msg = '服务器错误';
      break;
    default:
      msg = `未知错误 ${status}`;
  }
  return msg;
}
