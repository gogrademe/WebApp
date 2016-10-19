import React from 'react';
import Header from '../../components/PageHeader';
import MenuLink from '../../components/MenuLink';
import api from '../../api/api';

import {Grid, Menu, Segment } from 'semantic-ui-react';

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
        <Menu pointing attached>
          <MenuLink to={`/app/course/${term_id}/${resourceID}/grades`} name="Grades" />
          <MenuLink to={`/app/course/${term_id}/${resourceID}/students`} name="Students"/>
          <MenuLink to={`/app/course/${term_id}/${resourceID}/assignments`} name="Assignments"/>
          <MenuLink to={`/app/course/${term_id}/${resourceID}/settings`} name="Settings"/>
        </Menu>
        {this.props.children}
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
