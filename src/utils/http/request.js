/* eslint-disable no-alert */
import axios from 'axios';

import appConfig from '@/utils/appConfig';
import history from '@/router/history';
import { tokenStorage } from '@/storage';
import { showLoading, hideLoading, matchHttpStatusCode } from './statusHandle';

const instance = axios.create({
  baseURL: appConfig.baseURL, // 如果使用了代理，请设置成'/'
  withCredentials: true,
  timeout: 5000
});

// request 拦截器
instance.interceptors.request.use(
  (config) => {
    showLoading(config);
    // 携带 token
    const token = tokenStorage.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
  // 测试了“断网、代码异常、异常配置”都不会跳到这里，而是跳到 response 拦截器的 error，所以不需要这块异常处理
  // (error) => {
  //   return Promise.reject(error);
  // }
);

// response 拦截器
instance.interceptors.response.use(
  (response) => {
    hideLoading(response.config);
    const res = response.data;
    if (res.code === 101) {
      alert('登录已失效，请重新登陆！');
      history.replace('/login');
      return Promise.reject(new Error('token 失效，请重新登陆！'));
    }
    return Promise.resolve(res);
  },
  (error) => {
    // 当成功发出请求，error 会存在以下属性
    // const { config, request, response, isAxiosError, toJSON } = error;
    hideLoading(error.config);
    console.warn(`=== response err === ${error}`);
    if (error.response) {
      // 请求已发出，但是不在 2xx 的范围
      alert(matchHttpStatusCode(error.response.status));
    } else {
      // 断网或代码异常
      alert('网络异常');
    }
    return Promise.reject(error);
  }
);

export default instance;
