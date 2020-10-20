import React from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { getUserInfo } from '@/redux/actions/userInfo';

class My extends React.Component {
  render() {
    const { userInfo, dispatch } = this.props;
    return (
      <div>
        <div>
          {userInfo.isLoading
            ? '请稍等...'
            : userInfo.errMsg || null}
        </div>
        <div>
          name：
          {userInfo.info.name}
        </div>
        <div>
          age：
          {userInfo.info.age}
        </div>
        <button type="button" onClick={() => dispatch(getUserInfo())}>获取</button>
      </div>
    );
  }
}

export default hot(connect(
  (state) => ({
    userInfo: state.userInfo
  }),
  (dispatch) => ({
    dispatch
  })
)(My));
