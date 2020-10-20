import store from '@/redux/store';

export const GET_USER_INFO_REQUEST = 'userInfo/GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'userInfo/GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAIL = 'userInfo/GET_USER_INFO_FAIL';

function getUserInfoRequest() {
  return { type: GET_USER_INFO_REQUEST };
}

function getUserInfoSuccess(payload) {
  return { type: GET_USER_INFO_SUCCESS, payload };
}

// function getUserInfoFail(payload) {
//   return { type: GET_USER_INFO_FAIL, payload };
// }

export function getUserInfo() {
  return (dispatch) => {
    store.dispatch(getUserInfoRequest()); // store.dispatch 和传递的参数 dispatch 作用一样
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = {
          name: 'zhuanglong',
          age: 26
        };
        // dispatchh(getUserInfoFail({ errorMsg: '获取数据失败' }));
        dispatch(getUserInfoSuccess({ info: data }));
        resolve();
      }, 1500);
    });
  };
}
