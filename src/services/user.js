import request from '@/utils/http/request';

// 登录
export function login(options) {
  return request({
    ...options,
    url: '/api/user/login',
    method: 'POST'
  });
}

// 登出
export function logout(options) {
  return request({
    ...options,
    url: '/api/user/logout',
    method: 'POST'
  });
}

// 用户信息
export function getUserinfo(options) {
  return request({
    ...options,
    url: '/api/user/userinfo',
    method: 'POST'
  });
}
