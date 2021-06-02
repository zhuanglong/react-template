import React from 'react';
import {
  InfoCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { toast, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.minimal.css';

import './styles.scss';

const prefixCls = 'sru-Toast';
let toastId;

export const Fade = cssTransition({
  // collapseDuration: 500,
  collapse: false, // 为 false 时，动画结束立即执行 onClose 回调；为 true 时，可配合 collapseDuration 延时执行回调
  enter: 'fadeIn',
  exit: 'fadeOut'
});

export const Zoom = cssTransition({
  enter: 'zoomIn',
  exit: 'zoomOut'
});

// 默认配置
let config = {
  className: prefixCls,
  autoClose: 2000,
  hideProgressBar: true,
  draggable: false,
  closeOnClick: false,
  closeButton: false,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  transition: Fade,
  // 我的
  mask: false
};

// 初始化配置
toast.configure(config);

function notice(props) {
  const {
    icon,
    content,
    duration,
    mask = config.mask,
    onClose
  } = props;

  const renderContent = <Content text={content} icon={icon} />;
  const onOpen = () => {
    if (mask) {
      document.querySelector(`.${prefixCls}`).classList.add(`${prefixCls}-mask`);
    }
  };

  if (toast.isActive(toastId)) {
    toast.dismiss(toastId);
  }
  toastId = toast(renderContent, {
    autoClose: duration,
    onOpen,
    onClose
  });
}

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
    toast.dismiss();
  },

  config(props) {
    config = {
      ...config,
      ...props
    };
    toast.configure(config);
  }
};
