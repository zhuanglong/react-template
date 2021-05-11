// 参考 https://github.com/react-component/notification

import React, { useState, createRef, forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import Notice from './Notice';
import './styles.scss';

const prefixCls = 'sru-BasicNotification';

let seed = 0;
function getUuid() {
  return `sruBasicNotification_${Date.now()}_${seed++}`;
}

const BasicNotification = forwardRef((props, ref) => {
  const [notices, setNotices] = useState([]);

  const remove = (noticeKey) => {
    setNotices(notices.filter((item) => item.key !== noticeKey));
  };

  const add = (params) => {
    const key = params.key || getUuid();
    const noticeProps = {
      key,
      content: params.content,
      duration: params.duration,
      onClose: () => {
        remove(key);
        if (params.onClose) {
          params.onClose();
        }
      }
    };

    const noticeIndex = notices.findIndex((item) => item.key === params.key);
    const updateNotices = notices.concat();
    if (noticeIndex !== -1) {
      updateNotices.splice(noticeIndex, 1, noticeProps);
    } else {
      updateNotices.push(noticeProps);
    }
    setNotices(updateNotices);
  };

  useImperativeHandle(ref, () => ({
    add,
    remove
  }));

  return (
    <div
      className={classnames({
        [`${prefixCls}`]: true
      })}
    >
      {notices.map((item) => (
        <Notice
          key={item.key}
          content={item.content}
          duration={item.duration}
          onClose={item.onClose}
        />
      ))}
    </div>
  );
});

BasicNotification.newInstance = (props) => {
  const ref = createRef();
  const div = document.createElement('div');
  document.body.appendChild(div);

  ReactDOM.render(<BasicNotification {...props} ref={ref} />, div);

  return {
    notice: (noticeProps) => {
      ref.current.add(noticeProps);
    },
    removeNotice: (key) => {
      ref.current.remove(key);
    }
  };
};

export default BasicNotification;
