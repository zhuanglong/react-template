import React from 'react';
import classnames from 'classnames';
import Notification from 'rc-notification';

import './styles.scss';

const prefixCls = 'sru-Toast';

const messageKey = 'messageKey';
let messageInstance = null;

let config = {
  duration: 3,
  mask: true
};

function getMessageInstance(mask, callback = () => null) {
  Notification.newInstance({
    style: {}, // 清除默认样式
    prefixCls,
    transitionName: 'sru-Toast-fade', // 'sru-Toast-zoom'
    className: classnames({
      [`${prefixCls}-mask`]: mask,
      [`${prefixCls}-nomask`]: !mask
    })
  }, (notification) => {
    callback(notification);
  });
}

function notice(props) {
  const {
    icon,
    content,
    duration = config.duration,
    mask = config.mask,
    onClose = () => null
  } = props;

  const iconType = {
    info: '',
    success: 'success',
    fail: 'fail',
    loading: 'loading'
  }[icon];

  getMessageInstance(mask, (notification) => {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }

    messageInstance = notification;

    messageInstance.notice({
      key: messageKey,
      duration,
      content: (
        <div className={`${prefixCls}-text`}>
          {content}
        </div>
      ),
      onClose() {
        onClose();
      }
    });
  });
}

export default {
  show({ content, duration, mask, onClose }) {
    notice({
      icon: 'info',
      content,
      duration,
      mask,
      onClose
    });
  },

  info({ content, duration, mask, onClose }) {
    notice({
      icon: 'info',
      content,
      duration,
      mask,
      onClose
    });
  },

  success({ content, duration, mask, onClose }) {
    notice({
      icon: 'success',
      content,
      duration,
      mask,
      onClose
    });
  },

  fail({ content, duration, mask, onClose }) {
    notice({
      icon: 'success',
      content,
      duration,
      mask,
      onClose
    });
  },

  loading({ content, duration = null, mask, onClose }) {
    notice({
      icon: 'loading',
      content,
      duration,
      mask,
      onClose
    });
  },

  hide() {
    if (messageInstance) {
      messageInstance.removeNotice(messageKey);
    }
  },

  config({ duration, mask }) {
    config = {
      ...config,
      duration,
      mask
    };
  }
};
