import React from 'react';
import {Grid} from '../../components/NewTable';
// import ActionRenderer from '../../components/ActionRenderer';
// import {Autocomplete, Option} from '../../components/autocomplete';
import {DropdownList} from 'react-widgets';

import api from '../../api/api';

let StudentActions = React.createClass({
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

let ClassStudents = React.createClass({
    getInitialState(){
      return {
        students: []
      };
    },
    getEnrollments(){
      api.enrollment.find({
        course_id: this.props.course_id,
        term_id: this.props.term_id
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
      api.enrollment.create({
        person_id: Number(this.state.selected.person_id),
        course_id: Number(this.props.course_id),
        term_id: Number(this.props.term_id)
      });
    },
    render(){
      return (
        <div>
          <div className="input-group">
            <DropdownList
              valueField='person_id'
              textField={item => item.first_name + ' ' + item.last_name}
              onChange={val => this.setState({selected: val})}
              data={this.state.people}
              placeholder="Student"
              filter='contains' />
            <div className="input-group-btn">
              <button className="btn btn-primary" onClick={this.enrollStudent}>
                Enroll
              </button>
            </div>
          </div>
          <Grid columns={cols} data={this.state.students} />
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
  module.exports = ClassStudents;
