import React from 'react';

class Notice extends React.Component {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    duration: 1000
  };

  timer = null;

  componentDidMount() {
    this.startCloseTimer();
  }

  componentWillUnmount() {
    this.clearCloseTimer();
  }

  close = () => {
    const { onClose } = this.props;
    this.clearCloseTimer();
    onClose();
  }

  startCloseTimer = () => {
    this.timer = setTimeout(() => {
      this.close();
    }, this.props.duration);
  }

  clearCloseTimer = () => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  render() {
    return <div>{this.props.content}</div>;
  }
}

export default Notice;
