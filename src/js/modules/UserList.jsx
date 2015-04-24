import React from 'react';
import api from '../api/api';
import Header from '../components/PageHeader';

// import NewTable from '../components/NewTable';
// import {Table, Column} from 'fixed-data-table';

export default React.createClass({
    getInitialState() {
      return {
          data: []
      };
    },
    get(index) {
      return this.state.data[index];
    },
    fetch() {
      api.user.find()
        .then((xs) => {
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
            <Header primary="All Users" />
            <div className="main container">              
            </div>
          </div>
        );
    }
});
