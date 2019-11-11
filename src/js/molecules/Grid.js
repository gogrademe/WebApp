import React from "react";
import api from "../api/api";
import Header from "../components/PageHeader";

import { Table, Column } from "fixed-data-table";

export default class extends React.Component {
  state = {
    data: []
  };

  get = index => {
    return this.state.data[index];
  };

  fetch = () => {
    api.account.find().then(xs => {
      this.setState({
        data: xs
      });
    });
  };

  UNSAFE_componentWillMount() {
    this.fetch();
  }

  render() {
    return (
      <div>
        <Header primary="All Accounts" />
        <div className="main container">
          <Table rowHeight={50} rowGetter={this.get} rowsCount={3} width={500} height={500} headerHeight={50}>
            <Column label="Email" width={300} dataKey="email" />
            <Column label="Disabled" width={200} dataKey="disabled" />
          </Table>
        </div>
      </div>
    );
  }
}
