import request from '@/utils/http/request';

// 登录
export function login(data) {
  return request({
    url: '/api/user/login',
    method: 'POST',
    data
  });
}

// 登出
export function logout(data) {
  return request({
    url: '/api/user/logout',
    method: 'POST',
    data
  });
}

// 用户信息
export function getUserinfo(data) {
  return request({
    url: '/api/user/userinfo',
    method: 'POST',
    data
  });
}

// 消息列表
export function getMessageList(data) {
  return request({
    url: '/api/message/list',
    method: 'POST',
    data
  });
}

// IP
export function getCityjson(data) {
  return request({
    // url: 'https://pv.sohu.com/cityjson',
    url: 'http://ip-api.com/jsons',
    method: 'POST',
    data,
    noLoading: true
  });
}
