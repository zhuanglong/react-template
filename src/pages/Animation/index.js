import React from 'react';
import { Route, Link } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import AnimationExm1 from './AnimationExm1';
import AnimationExm2 from './AnimationExm2';
import AnimationExm3 from './AnimationExm3';

function Animation() {
  return (
    <div style={{ marginLeft: '50px' }}>
      <ul type="circle">
        <li><Link to="/animation/animation-exm1">Exm1</Link></li>
        <li><Link to="/animation/animation-exm2">Exm2</Link></li>
        <li><Link to="/animation/animation-exm3">Exm3</Link></li>
      </ul>
      <div style={{ height: '1px', background: 'blue', margin: '10px 0' }} />
      <Route path="/animation/animation-exm1" component={AnimationExm1} />
      <Route path="/animation/animation-exm2" component={AnimationExm2} />
      <Route path="/animation/animation-exm3" component={AnimationExm3} />
    </div>
  );
}

export default hot(Animation);
