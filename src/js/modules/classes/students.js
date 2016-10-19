import React, {PropTypes} from 'react';
import {Grid} from '../../components/NewTable';
// import {DropdownList} from 'react-widgets';
import {Students} from '../../molecules/AutoCompleteFor';
import {Segment} from 'semantic-ui-react';

import api from '../../api/api';

const StudentActions = React.createClass({
    unEnroll: function(e){
      e.preventDefault();
      api.enrollment.del(this.props.row.enrollment_id);
    },
    render(){
      return (
        <button className="btn btn-danger" onClick={this.unEnroll}>Un-Enroll</button>
      );
    }
  });

const cols = [
    {
      key: 'person.first_name',
      display: 'First Name'
    }, {
      key: 'person.middle_name',
      display: 'Middle Name'
    }, {
      key: 'person.last_name',
      display: 'Last Name'
    }, {
      key: 'person.gradeLevel',
      display: 'Grade Level'
    }, {
      display: 'Actions',
      renderer: StudentActions,
      linkTo: 'class',
      tdClassName: 'text-right col-md-2'
    }
  ];

let CourseStudents = React.createClass({
    propTypes: {
      course_id: PropTypes.string,
      term_id: PropTypes.string
    },
    getInitialState(){
      return {
        students: [],
        people: [],
        selected: {}
      };
    },
    getEnrollments(){
      const {term_id, resourceID} = this.props.params;
      api.enrollment.find({
        course_id: resourceID,
        term_id: term_id
      }).then(xs => this.setState({students: xs}));
    },
    componentWillMount(){
      api.enrollment.events.addListener('change', this.getEnrollments);
      this.getEnrollments();

      api.person.find()
        .then(xs => this.setState({people: xs}));
    },
    componentWillUnmount(){
      return api.enrollment.events.removeListener('change', this.getEnrollments);
    },
    enrollStudent(){
      const {term_id, resourceID} = this.props.params;
      api.enrollment.create({
        person_id: Number(this.state.selected),
        course_id: Number(resourceID),
        term_id: Number(term_id)
      });
    },
    render(){
      return (
        <div>
          <Segment attached>
            <Students input={{onChange: selected => this.setState({selected: selected.value}), selection: true, inline: true}}
              value={this.state.selected} onChange={selected => this.setState({selected: selected.value})} />
            <div className="input-group-btn">
              <button className="ui button" onClick={this.enrollStudent}>
                Enroll
              </button>
            </div>
          </Segment>
          <Grid attached columns={cols} data={this.state.students} />
        </div>
      );
      // return div(null, div({
      //   className: "ui top attached segment"
      // }, div({
      //   className: "ui search form"
      // }, div({
      //   className: "ui fluid action input"
      // }, Autocomplete({
      //   onChange: this.studentSelected,
      //   placeholder: "Student..."
      // }, this.state.people ? this.state.people.map(function(p, key){
      //   return Option({
      //     key: key,
      //     value: p.id,
      //     label: p.first_name + " " + p.last_name
      //   });
      // }) : "Loading..."), div({
      //   className: "ui primary button",
      //   onClick: this.enrollStudent
      // }, "Enroll")))), Grid({
      //   className: "bottom attached",
      //   columns: cols,
      //   data: this.state.students
      // }));
    }
  });
  module.exports = CourseStudents;
