import axios from 'axios';

const service = axios.create({
  baseURL: '/', // 如果使用了代理，请设置成'/'
  withCredentials: true,
  timeout: 5000
});

// request 拦截器
service.interceptors.request.use(
  (config) => {
    // 不传递默认开启 loading
    if (config.hideLoading) {
      // loading
    }
    const token = window.localStorage.getItem('token');
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.warn(`=== request err === ${error}`);
    return Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  (response) => {
    // hide loading
    const res = response.data;
    if (response.status !== 200) {
      return Promise.reject(res);
    }
    if (res.code === 101) {
      return Promise.reject(Error('token 失效，请重新登陆！'));
    }
    return Promise.resolve(res);
  },
  (error) => {
    // hide loading
    console.warn(`=== response err === ${error}`);
    return Promise.reject(error);
  }
);

export default service;
