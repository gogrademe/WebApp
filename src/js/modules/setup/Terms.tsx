import * as React from "react";
import api from "../../api/api";

import { Grid } from "../../components/NewTable";

import { TermBtn } from "../../molecules/ModalButtons";
import { reaction } from "mobx";

class Terms extends React.Component<any, any> {
  tableColumns: [
    {
      key: "name";
      display: "Name";
    },
    {
      key: "schoolYear";
      display: "School Year";
    }
  ];
  getInitialState() {
    return {
      data: []
    };
  }
  fetch() {
    api.term.find().then(xs => {
      this.setState({
        data: xs
      });
    });
  }
  UNSAFE_componentWillMount() {
    this.fetch();
  }
  render() {
    return (
      <div>
        <TermBtn label="New" />
        <Grid columns={this.tableColumns} data={this.state.data} />
      </div>
    );
  }
  // }
}
export default Terms;
// export default connect(props => ({
//   termsFetch: '/term'
// }))(Terms)
