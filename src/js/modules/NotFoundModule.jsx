
import React from 'react';

import Header from '../components/Header';

export default React.createClass({
  render() {
    return (
      <div>
        <Header title="Not Found!" />
        <div>
          Page not found.
        </div>
      </div>
    );
  }
});
