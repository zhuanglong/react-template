import React from 'react';
import classnames from 'classnames';
import Notification from 'rc-notification';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';

import './styles.scss';

const prefixCls = 'sru-Toast';
const messageKey = 'messageKey';
let messageInstance = null;

let config = {
  duration: 2,
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

  const IconElement = {
    info: InfoCircleOutlined,
    success: CheckCircleOutlined,
    fail: CloseCircleOutlined,
    loading: LoadingOutlined
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
        <div className={`${prefixCls}-body`}>
          {IconElement && <IconElement className={`${prefixCls}-body-icon`} /> }
          {content && (
            <div className={`${prefixCls}-body-text`}>
              {content}
            </div>
          )}
        </div>
      ),
      onClose() {
        onClose();
      }
    });
  });
}

export default {
  show(props) {
    const { icon, content, duration, mask, onClose } = props || {};
    notice({
      icon,
      content,
      duration,
      mask,
      onClose
    });
  },

  info(props) {
    const { content, duration, mask, onClose } = props || {};
    notice({
      icon: 'info',
      content,
      duration,
      mask,
      onClose
    });
  },

  success(props) {
    const { content, duration, mask, onClose } = props || {};
    notice({
      icon: 'success',
      content,
      duration,
      mask,
      onClose
    });
  },

  fail(props) {
    const { content, duration, mask, onClose } = props || {};
    notice({
      icon: 'fail',
      content,
      duration,
      mask,
      onClose
    });
  },

  loading(props) {
    const { content = 'loading...', duration = null, mask, onClose } = props || {};
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
