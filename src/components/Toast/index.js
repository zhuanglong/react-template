// Toast 简单封装
// 推荐更强大的 https://github.com/fkhadra/react-toastify

import React from 'react';
import classnames from 'classnames';
import Notification from 'rc-notification';
import {
  InfoCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined
} from '@ant-design/icons';

import './styles.scss';

const prefixCls = 'sru-Toast';
const messageKey = 'messageKey';
let messageInstance = null;
let timer = null;

let config = {
  duration: 2,
  mask: false
};

function getRCNotificationInstance(mask, callback = () => null) {
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

  const IconElement = {
    info: InfoCircleOutlined,
    success: CheckCircleOutlined,
    fail: CloseCircleOutlined,
    loading: LoadingOutlined
  }[icon];

  if (timer) {
    clearTimeout(timer);
  }

  getRCNotificationInstance(mask, (notification) => {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }

    messageInstance = notification;

    messageInstance.notice({
      key: messageKey,
      duration,
      content: (
        <>
          {IconElement && <IconElement className={`${prefixCls}-icon`} /> }
          {content && (
            <div className={`${prefixCls}-text`}>
              {content}
            </div>
          )}
        </>
      ),
      onClose() {
        onClose();
        timer = setTimeout(() => {
          if (messageInstance) {
            messageInstance.destroy();
            messageInstance = null;
            timer = null;
          }
        }, 300);
      }
    });
  });
}

export default {
  show(content, props) {
    const { duration, mask, onClose } = props || {};
    notice({
      content,
      duration,
      mask,
      onClose
    });
  },

  info(content, props) {
    const { duration, mask, onClose } = props || {};
    notice({
      icon: 'info',
      content,
      duration,
      mask,
      onClose
    });
  },

  success(content, props) {
    const { duration, mask, onClose } = props || {};
    notice({
      icon: 'success',
      content,
      duration,
      mask,
      onClose
    });
  },

  fail(content, props) {
    const { duration, mask, onClose } = props || {};
    notice({
      icon: 'fail',
      content,
      duration,
      mask,
      onClose
    });
  },

  loading(content = 'loading...', props) {
    const { duration = null, mask = true, onClose } = props || {};
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
      timer = setTimeout(() => {
        if (messageInstance) {
          messageInstance.destroy();
          messageInstance = null;
          timer = null;
        }
      }, 300);
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
