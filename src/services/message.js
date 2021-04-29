import request from '@/utils/http/request';

// 消息列表
export function getMessageList(options) {
  return request({
    ...options,
    url: '/api/message/list',
    method: 'POST'
  });
}
