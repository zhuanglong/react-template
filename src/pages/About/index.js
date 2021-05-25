import React from 'react';
import styled from 'styled-components';

// import styles from './styles.scss';

class About extends React.Component {
  render() {
    return (
      <Root>
        <div className="title">
          Hello
          <span className="subTitle"> Sass</span>
        </div>
      </Root>
    );
  }
}

const Root = styled.div`
  .title {
    display: flex;
    font-size: 18px;

    .subTitle {
      color: red;
    }
  }
`;

export default About;
