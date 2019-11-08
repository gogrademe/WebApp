import * as React from "react";
import api from "../../api/api";
import { Grid, CrudActions } from "../../components/NewTable";
import * as _ from "lodash";
import { AssignmentGroupBtn } from "../../molecules/ModalButtons";

import { selectCourseGroups, loadGroups } from "../../redux/modules/group";
import { connect } from "react-redux";

import * as cx from "classnames";

const AssignmentEdit = props => (
  <div className="btn-group">
    <CrudActions {...props} />
    <AssignmentGroupBtn
      label="Edit"
      values={{ groupId: props.row.groupId, termId: props.row.termId, courseId: props.row.courseId }}
      className="btn btn-primary"
    />
  </div>
);

const WeightFooter = ({ data }) => {
  const weights = data.map(x => x.weight * 100);
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

export default connect(
  (state, ownProps) => ({
    groups: selectCourseGroups(state, ownProps.match.params.resourceID, ownProps.match.params.termId)
  }),
  { loadGroups }
)(Settings);
