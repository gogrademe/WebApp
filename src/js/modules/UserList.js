import React from "react";
import createReactClass from 'create-react-class';
import api from "../api/api";
import Header from "../components/PageHeader";

import { Grid } from "../components/NewTable";

export default createReactClass({
  displayName: 'UserList',

  tableColumns: [
    {
      key: "email",
      display: "Email"
    },
    {
      key: "disabled",
      display: "Disabled"
    }
  ],

  getInitialState() {
    return {
      data: []
    };
  },

  fetch() {
    api.account.find().then(xs => {
      this.setState({
        data: xs
      });
    });
  },

  componentWillMount() {
    this.fetch();
  },

  render() {
    return (
      <div>
        <Header primary="All Accounts" />
        <div>
          <Grid columns={this.tableColumns} data={this.state.data} />
        </div>
      </div>
    );
  },
});
