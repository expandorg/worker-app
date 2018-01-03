import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return <div>Home</div>;
  }
}

export default Home;
