

import * as React from 'react';
import api from '../../api/api';

import {Grid} from '../../components/NewTable';

import {TermBtn} from '../../molecules/ModalButtons';
// import {PromiseState } from 'react-refetch';
// import connect from '../../api-connector';

var Terms = React.createClass({
    tableColumns: [
    {
        key: 'name',
        display: 'Name'
    },
    {
        key: 'school_year',
        display: 'School Year'
    }
    ],
    getInitialState() {
        return {
            data: []
        };
    },
    fetch() {
        api.term.find()
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
      //  const { termsFetch } = this.props
      //  if (termsFetch.pending) {
      //    return <div>Loading</div>
      //  }
      //  else if (termsFetch.rejected) {
      //    return <div>Error!: {termsFetch.reason}</div>
      //  }
      //  else if (termsFetch.fulfilled) {
         return(
           <div>
              <TermBtn primary/>
              <Grid columns={this.tableColumns} data={this.state.data} />
           </div>
         )
       }
    // }
});
export default Terms;
// export default connect(props => ({
//   termsFetch: '/term'
// }))(Terms)
