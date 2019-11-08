import * as React from "react";

import api from "../api/api";
import Header from "../components/PageHeader";

import { Grid } from "../components/NewTable";

export default class UserList extends React.Component<any, any> {
  tableColumns = [
    {
      key: "email",
      display: "Email"
    },
    {
      key: "disabled",
      display: "Disabled"
    }
  ];

  state = {
    data: []
  };

  fetch() {
    api.account.find().then(xs => {
      this.setState({
        data: xs
      });
    });
  }

  componentWillMount() {
    this.fetch();
  }

  render() {
    return (
      <div>
        <Header primary="All Accounts" />
        <div>
          <Grid columns={this.tableColumns} data={this.state.data} />
        </div>
      </div>
    );
  }
}
