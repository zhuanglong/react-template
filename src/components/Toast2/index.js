// Toast 简单封装
// 推荐更强大的 https://github.com/fkhadra/react-toastify

import React from 'react';
import classnames from 'classnames';
import { ToastContainer, toast, cssTransition, Zoom } from 'react-toastify';
import Notification from 'rc-notification';
import {
  InfoCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import 'react-toastify/dist/ReactToastify.minimal.css';

import './styles.scss';

const prefixCls = 'sru-Toast2';
const messageKey = 'messageKey';
let messageInstance = null;
let toastId = null;
let timer = null;

let config = {
  duration: 2,
  mask: false
};

const Zoom2 = cssTransition({
  enter: 'Toastify__zoom-enter',
  exit: 'Toastify__zoom-exit',
  appendPosition: false,
  collapse: true,
  collapseDuration: 300
});

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

export const ToastContainer2 = (
  <>
    <ToastContainer
      className={prefixCls}
      autoClose={2000}
      hideProgressBar
      draggable={false}
      closeOnClick={false}
      closeButton={false}
      // pauseOnFocusLoss={false}
      transition={Zoom}
    />
  </>
);

function Content(props) {
  const { icon, text } = props;
  const IconElement = {
    info: InfoCircleOutlined,
    success: CheckCircleOutlined,
    fail: CloseCircleOutlined,
    loading: LoadingOutlined
  }[icon];

  return (
    <div className={`${prefixCls}-content`}>
      {IconElement && <IconElement className={`${prefixCls}-icon`} /> }
      {text && (
        <div className={`${prefixCls}-text`}>
          {text}
        </div>
      )}
    </div>
  );
}

export default {
  show(content, props) {
    const { duration, mask, onClose } = props || {};
    // notice({
    //   content,
    //   duration,
    //   mask,
    //   onClose
    // });
    const render = <Content text={content} />;
    if (toast.isActive(toastId)) {
      toast.update(toastId, {
        render
      });
    } else {
      toastId = toast(render, {
        className: "dsdsd"
      });
    }
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
