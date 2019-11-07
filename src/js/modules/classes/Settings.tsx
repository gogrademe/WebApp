import * as React from "react";
import api from "../../api/api";
import { Grid, CrudActions } from "../../components/NewTable";
import * as _ from "lodash";
import { AssignmentGroupBtn } from "../../molecules/ModalButtons";

import { selectCourseGroups, loadGroups } from "../../redux/modules/group";
import { connect } from "react-redux";

import * as cx from "classnames";

class AssignmentEdit extends React.Component<any, any> {
  render() {
    return (
      <div className="btn-group">
        <CrudActions {...this.props} />
        <AssignmentGroupBtn label="Edit" values={{ groupId: this.props.row.groupId }} className="btn btn-primary" />
      </div>
    );
  }
}

const WeightFooter = props => {
  const weights = props.data.map(x => x.weight * 100);
  const weight = weights.length ? weights.reduce((a, b) => a + b) : 0;
  return (
    <div>
      <strong className={cx({ "text-danger": weight !== 100 })}>{weight}</strong> /100
    </div>
  );
};

class Settings extends React.Component<any, any> {
  tableColumns = [
    {
      key: "name",
      display: "Name"
    },
    {
      key: "weight",
      display: "Weight",
      format: "decimalPercent",
      footerRenderer: WeightFooter
    },
    {
      display: "",
      renderer: AssignmentEdit,
      resourceType: "group",
      className: "text-right",
      tdClassName: "text-right col-md-2"
    }
  ];
  componentDidMount() {
    const { termId, resourceID } = this.props.match.params;
    this.props.loadGroups(resourceID, termId);
  }
  render() {
    const { termId, resourceID } = this.props.match.params;
    return (
      <div>
        <div className="btn-toolbar" role="toolbar">
          <AssignmentGroupBtn
            label="New"
            values={{ courseId: Number(resourceID), termId: Number(termId) }}
            className="btn btn-primary pull-right"
          />
        </div>
        <Grid columns={this.tableColumns} data={this.props.groups} />
      </div>
    );
  }
}

// Settings.propTypes = {
//     courseId: PropTypes.string,
//     termId: PropTypes.string
// };

// export default Settings;

export default connect(
  (state, ownProps) => ({
    groups: selectCourseGroups(state, ownProps.match.params.resourceID, ownProps.match.params.termId)
  }),
  { loadGroups }
)(Settings);
