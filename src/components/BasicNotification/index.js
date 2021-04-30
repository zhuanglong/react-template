import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import './styles.scss';

const prefixCls = 'sru-BasicNotification';

function BasicNotification() {
  const add = () => {

  };

  const remove = () => {

  };

  return (
    <div
      className={classnames({
        [`${prefixCls}`]: true
      })}
    >
      123
    </div>
  );
}

BasicNotification.newInstance = (props, callback) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const ref = (notificationRef) => {
    callback({
      notice: () => {
        notificationRef.add();
      },
      removeNotice: (key) => {
        notificationRef.remove(key);
      }
    });
  };
  ReactDOM.render(<BasicNotification {...props} ref={ref} />, div);
};

export default BasicNotification;
