import React from 'react';
import { Segment, Header } from 'semantic-ui-react'

const PageHeader = ({primary, secondary, right}) => (
  <Segment basic clearing>
    <Header as='h2' floated='left'>
      {primary}
      <Header.Subheader>
        {secondary}
      </Header.Subheader>
    </Header>
    <Header as='h2' floated='right'>
      {right}
    </Header>
  </Segment>
);

export default PageHeader;
// {/* <h3>
//   {primary}<small>{secondary}</small>
// </h3>
// <div className="right actions">
//   {right}
// </div>
// </div> */}
