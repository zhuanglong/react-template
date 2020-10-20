import { GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL } from '../actions/userInfo';

const initState = {
  isLoading: false,
  errMsg: '',
  info: {}
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case GET_USER_INFO_REQUEST:
      return {
        ...state,
        isLoading: true,
        errMsg: '',
        info: {}
      };
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errMsg: '',
        info: action.payload.info
      };
    case GET_USER_INFO_FAIL:
      return {
        ...state,
        isLoading: false,
        errMsg: action.payload.errorMsg,
        info: {}
      };
    default:
      return state;
  }
}
