import * as React from "react";
import { Segment, Header } from "semantic-ui-react";

const PageHeader = (props: { primary?: any; secondary?: any; right?: any }) => (
  <Segment basic clearing>
    <Header as="h2" textAlign="left">
      {props.primary}
      <Header.Subheader>{props.secondary}</Header.Subheader>
    </Header>
    <Header as="h2" textAlign="right">
      {props.right}
    </Header>
  </Segment>
);

export default PageHeader;
