import React from 'react';
import Header from '../../components/PageHeader';
import {RouteHandler} from 'react-router';
import api from '../../api/api';
import {find} from 'prelude-ls';

import {Nav} from 'react-bootstrap';
import {NavItemLink} from 'react-router-bootstrap';

let View = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState() {
    return {
      term: null,
      terms: null,
      'class': null
    };
  },
  componentWillMount() {
    let params = this.context.router.getCurrentParams();

    api.course.get(params.resourceId).then((data) => {
      this.setState({
        'class': data
      });
    });

    api.term.find()
      .then((res) => {
        let termId = params.termId;
        let term = find(function(it){
          return it.id === termId;
        }, res);
        this.setState({
          terms: res[0]
        });
        this.setState({
          term: term
        });
    });
  },
  renderPrimary() {
    switch (false) {
    case !!this.state['class']:
      return 'Loading...';
    default:
      return this.state['class'].name + ' - ' + this.state['class'].gradeLevel;
    }
  },
  renderSecondary(){
    switch (false) {
    case !!this.state.term:
      return '';
    default:
      return 'Year ' + this.state.term.schoolYear.start + '-' + this.state.term.schoolYear.end + ' - ' + this.state.term.name + ' ';
    }
  },
  render(){
    const ctxParam = this.context.router.getCurrentParams();
    let params = {
      termId: ctxParam.termId,
      resourceId: ctxParam.resourceId
    };
    return (
      <div>
        <Header primary={this.renderPrimary()} secondary={this.renderSecondary()} />
        <div>
          <div className="row">
            <div className="col-sm-12 col-md-2">
              <Nav bsStyle='pills' stacked>
                <NavItemLink to="class.grades" params={params}>Grades</NavItemLink>
                <NavItemLink to="class.students" params={params}>Students</NavItemLink>
                <NavItemLink to="class.assignments" params={params}>Assignments</NavItemLink>
                <NavItemLink to="class.settings" params={params}>Settings</NavItemLink>
              </Nav>
            </div>
            <div className="col-sm-12 col-md-10">
              <RouteHandler
                classId={ctxParam.resourceId}
                termId={ctxParam.termId}
                terms={this.state.terms}
                term={this.state.term}
                />
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
  Grades: require('./detail'),
  Overview: require('./Overview'),
  Assignments: require('../assignments/Assignments'),
  Students: require('./students'),
  Settings: require('./Settings')
};
