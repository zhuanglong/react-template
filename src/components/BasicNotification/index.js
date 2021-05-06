// eslint-disable-next-line max-classes-per-file
import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import Notice from './Notice';
import './styles.scss';

const prefixCls = 'sru-BasicNotification';

let seed = 0;
function getUuid() {
  return `sruBasicNotification_${Date.now()}_${seed++}`;
}

class BasicNotification extends React.Component {
  state = {
    notices: []
  }

  add = (props) => {
    const key = props.key || getUuid();
    const noticeProps = {
      key,
      content: props.content,
      duration: props.duration,
      onClose: () => {
        this.remove(key);
        if (props.onClose) {
          props.onClose();
        }
      }
    };

    this.setState((prevState) => {
      const { notices } = prevState;
      const noticeIndex = notices.findIndex((item) => item.key === props.key);
      const updateNotices = notices.concat();
      if (noticeIndex !== -1) {
        updateNotices.splice(noticeIndex, 1, noticeProps);
      } else {
        updateNotices.push(noticeProps);
      }
      return {
        notices: updateNotices
      };
    });
  }

  remove = (noticeKey) => {
    this.setState((prevState) => {
      const { notices } = prevState;
      return {
        notices: notices.filter((item) => item.key !== noticeKey)
      };
    });
  }

  render() {
    return (
      <div
        className={classnames({
          [`${prefixCls}`]: true
        })}
      >
        {this.state.notices.map((item) => (
          <Notice
            key={item.key}
            content={item.content}
            duration={item.duration}
            onClose={item.onClose}
          />
        ))}
      </div>
    );
  }
}

BasicNotification.newInstance = (props, callback) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  function ref(notificationRef) {
    callback({
      notice: (noticeProps) => {
        notificationRef.add(noticeProps);
      },
      removeNotice: (key) => {
        notificationRef.remove(key);
      }
    });
  }

  ReactDOM.render(<BasicNotification {...props} ref={ref} />, div);
};

export default BasicNotification;
