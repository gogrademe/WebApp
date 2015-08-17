import React from 'react';
import api from '../api/api';
import Header from '../components/PageHeader';

import NewTable from '../components/NewTable';

export
default React.createClass({
tableColumns: [
  {
    key: 'email',
    display: 'Email'
  }, {
    key: 'disabled',
    display: 'Disabled'
  }
],
getInitialState() {
  return {
    data: []
  };
},
fetch() {
  api.account.find().then((xs) => {
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
      <Header primary='All Accounts'/>
      <div>
        <NewTable.Grid columns={this.tableColumns} data={this.state.data}/>
      </div>
    </div>
  );
}
});
