import React, {Component} from 'react';
import {connect} from 'react-redux';

import Header from '../../components/PageHeader';
import CourseNav from '../components/CourseNav';

import { load as loadAuth, login, logout } from '../redux/modules/course';

class CourseContainer extends Component {
  renderPrimary() {
    switch (false) {
    case !!this.state.course:
      return 'Loading...';
    default:
      return this.state.course.name + ' - Grade ' + this.state.course.grade_level;
    }
  }
  renderSecondary(){
    if (!!!this.state.course.term) {return ''; }
    const term = this.state.course.terms.find(t => t.term_id == this.props.params.term_id);
    return `Year ${term.school_year} - ${term.name}`;
  }
  render() {
    const {term_id,resourceID} = this.props.params;
    return (
      <div>
        <Header primary={this.renderPrimary()} secondary={this.renderSecondary()} />
        <div>
          <div className="row">
            <div className="col-sm-12 col-md-2">
              <CourseNav course_id={resourceID} term_id={term_id} />
            </div>
            <div className="col-sm-12 col-md-10">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  course: state.entities.course
}),{loadAuth, login, logout})(CourseContainer)
