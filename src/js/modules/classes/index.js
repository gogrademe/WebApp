import React from 'react';
import Header from '../../components/PageHeader';
import {RouteHandler} from 'react-router';
import api from '../../api/api';

import {Nav,NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const View = React.createClass({
  getInitialState() {
    return {
      term: null,
      terms: null,
      course: {}
    };
  },
  componentWillMount() {
    const {resourceID} = this.props.params;
    api.course.get(resourceID).then((data) => {
      this.setState({
        course: data
      });
    });
  },
  renderPrimary() {
    switch (false) {
    case !!this.state.course:
      return 'Loading...';
    default:
      return this.state.course.name + ' - Grade ' + this.state.course.grade_level;
    }
  },
  renderSecondary(){
    if (!!!this.state.course.term) {return ''; }
    const term = this.state.course.terms.find(t => t.term_id == this.props.params.term_id);
    return `Year ${term.school_year} - ${term.name}`;
  },
  render(){
    const {term_id,resourceID} = this.props.params;
    return (
      <div>
        <Header primary={this.renderPrimary()} secondary={this.renderSecondary()} />
        <div>
          <div className="row">
            <div className="col-sm-12 col-md-2">
              <Nav bsStyle='pills' stacked>
                {['grades','students','assignments','settings'].map((name,id) => (
                  <LinkContainer key={id} to={`/app/course/${term_id}/${resourceID}/${name}`}>
                    <NavItem>{name}</NavItem>
                  </LinkContainer>
                ))}
              </Nav>
            </div>
            <div className="col-sm-12 col-md-10">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
});
module.exports = {
  View: View,
  List: require('./list'),
  Assignments: require('../assignments/Assignments'),
  Students: require('./students')
};
