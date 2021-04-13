import React from 'react';
// import styles from './styles.scss';

class Discover extends React.Component {
  go = () => {
    this.props.history.push('/discover/discover-child');
  }

  render() {
    return (
      <div>
        Discover
        <button type="button" onClick={this.go}>go</button>
      </div>
    );
  }
}

export default Discover;
