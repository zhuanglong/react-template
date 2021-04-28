import { setup, mock, Random } from 'mockjs';

// 延时200-600毫秒请求到数据
setup({
  timeout: '200-1000'
});

// 登录
mock('/api/user/login', 'post', {
  code: 0,
  data: {
    // token采用的是JWT的跨域认证解决方案 https://jwt.io/
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmODEyODhkMzU3OGJiMDA1YTc5Y2RjMSIsInVzZXJOYW1lIjoicHdzdHJpY2tAMTYzLmNvbSIsInJlYWxOYW1lIjoic3RyaWNrIiwiaWF0IjoxNjA5MDY5ODQ0LCJleHAiOjE2MDkxMTMwNDR9.H8WtilifQQEighczhXtpA_W-YP0Nm4Ci48OITRlmnCg',
    date: '@datetime'
  }
});

// 登出
mock('/api/user/logout', 'post', {
  code: 0
});

// 用户信息
mock('/api/user/userinfo', 'post', (options) => {
  console.log(options);
  return {
    code: 0,
    data: {
      username: Random.name(),
      avatar: 'https://img0.baidu.com/it/u=3376612412,3331842818&fm=26&fmt=auto&gp=0.jpg',
      gender: 1,
      country: '中国',
      province: '广东省'
    }
  };
});
