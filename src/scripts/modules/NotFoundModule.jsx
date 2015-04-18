
import React from 'react';

import Header from '../components/Header';
import Panel from '../components/Panel';

export default React.createClass({
  render() {
    return (
      <div>
        <Header title="Not Found!" />
        <Panel title="404 Page" hasBody={true}>
          Page not found.
        </Panel>
      </div>
    );
  }
});
