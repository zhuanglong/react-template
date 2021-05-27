// 基于 rc-notification 封装 Toast
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

const prefixCls = 'sru-Toast-my';
const messageKey = 'messageKey';
let messageInstance = null;
let timer = null;

let config = {
  duration: 2000,
  mask: false
};

// 加个定时器是为了让动画先执行完毕再卸载实例
function timerDestroy() {
  timer = setTimeout(() => {
    timer = null;
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }
  }, 300);
}

function getRCNotificationInstance(mask, callback = () => null) {
  Notification.newInstance({
    style: {}, // 清除默认样式
    prefixCls,
    transitionName: `${prefixCls}-fade`, // `${prefixCls}-zoom`
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
    timer = null;
  }

  getRCNotificationInstance(mask, (notification) => {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }

    messageInstance = notification;

    messageInstance.notice({
      key: messageKey,
      duration: duration / 1000,
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
      // 持续的切换不会执行到 onClose 回调，因为实例已经卸载
      onClose() {
        onClose();
        timerDestroy();
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
      timerDestroy();
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
