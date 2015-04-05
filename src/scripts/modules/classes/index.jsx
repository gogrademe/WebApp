import React from 'react';
import Header from '../../components/PageHeader';
import {Link, RouteHandler, State} from 'react-router';
import api from '../../api/api.ls';
import {find} from 'prelude-ls';

let View = React.createClass({
  mixins: [State],
  displayName: "View",
  getInitialState() {
    return {
      term: null,
      terms: null,
      'class': null
    };
  },
  componentWillMount() {
    let resourceId = this.getParams().resourceId;

    api['class'].get(resourceId).then((data) => {
      this.setState({
        'class': data
      });
    });

    api.term.find().then((it) => {
      let termId = this.getParams().termId;
      let term = find(function(it){
        return it.id === termId;
      }, it);
      this.setState({
        terms: it[0]
      });
      this.setState({
        term: term
      });
    });
  },
  renderPrimary() {
    switch (false) {
    case !!this.state['class']:
      return "Loading...";
    default:
      return this.state['class'].name + " - " + this.state['class'].gradeLevel;
    }
  },
  renderSecondary: function(){
    switch (false) {
    case !!this.state.term:
      return "";
    default:
      return "Year " + this.state.term.schoolYear.start + "-" + this.state.term.schoolYear.end + " - " + this.state.term.name + " ";
    }
  },
  render: function(){
    let params = {
      termId: this.getParams().termId,
      resourceId: this.getParams().resourceId
    };

    return (
      <div>
        <Header primary={this.renderPrimary()} secondary={this.renderSecondary()} />
        <div className="main container">
          <div className="ui stackable grid">
            <div className="thirteen wide column">
              <RouteHandler
                classId={this.getParams().resourceId}
                termId={this.getParams().termId}
                class={this.state['class']}
                terms={this.state.terms}
                term={this.state.term}
                />
            </div>
            <div className="right floated three wide column">
              <div className="ui fluid vertical menu sunken">
                <Link className="item" to="class.grades" params={params}>Grades</Link>
                <Link className="item" to="class.students" params={params}>Students</Link>
                <Link className="item" to="class.assignments" params={params}>Assignments</Link>
              </div>
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
  AssignmentGrades: require('../assignments/AssignmentGrades'),
  Students: require('./students'),
  Settings: require('./Settings')
};
