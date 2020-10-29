import React from 'react';

import { withTheme } from '@/components/Theme';
import styles from './styles.scss';

@withTheme
class About extends React.Component {
  render() {
    return (
      <div style={{ background: this.props.theme.background }}>
        <div className={styles.title}>
          Hello
          <span className={styles.subTitle}> Sass</span>
        </div>
      </div>
    );
  }
}

export default About;
