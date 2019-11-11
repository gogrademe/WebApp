import React from "react";
import Header from "../../components/PageHeader";
import MenuLink from "../../components/MenuLink";

import _ from "lodash";
import { Menu } from "semantic-ui-react";

import { Route, Switch } from "react-router-dom";

import Students from "./students";
import Grades from "./detail";
import Assignments from "../assignments/Assignments";
import Settings from "./Settings";

import { connect } from "react-redux";
import { fetchCourse } from "../../redux/modules/course";

class View extends React.Component {
  UNSAFE_componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(fetchCourse(match.params.resourceID));
  }
  renderPrimary = () => {
    switch (false) {
      case !!this.props.course:
        return "Loading...";
      default:
        return this.props.course.name + " - Grade " + this.props.course.gradeLevel;
    }
  };
  renderSecondary = () => {
    if (!!!this.props.course.term) {
      return "";
    }
    const term = this.state.course.terms.find(t => t.termId == this.props.match.params.termId);
    return `Year ${term.school_year} - ${term.name}`;
  };
  render() {
    const { match } = this.props;
    return (
      <div>
        <Header primary={this.renderPrimary()} secondary={this.renderSecondary()} />
        <Menu pointing attached>
          <MenuLink to={`${match.url}/grades`} name="Grades" />
          <MenuLink to={`${match.url}/students`} name="Students" />
          <MenuLink to={`${match.url}/assignments`} name="Assignments" />
          <MenuLink to={`${match.url}/settings`} name="Settings" />
        </Menu>
        <Switch>
          <Route path={`${match.path}/grades`} component={Grades} />
          <Route path={`${match.path}/students`} component={Students} />
          <Route path={`${match.path}/assignments`} component={Assignments} />
          <Route path={`${match.path}/settings`} component={Settings} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { resourceID } = ownProps.match.params;
  return {
    course: _.get(state.entities.courses, resourceID, {})
  };
};
const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
