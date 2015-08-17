import React from 'react';
import {Grid} from '../../components/NewTable';
// import ActionRenderer from '../../components/ActionRenderer';
// import {Autocomplete, Option} from '../../components/autocomplete';
import {DropdownList} from 'react-widgets';

import api from '../../api/api';

let StudentActions = React.createClass({
    unEnroll: function(e){
      e.preventDefault();
      api.enrollment.del(this.props.row.id);
    },
    render(){
      return (
        <button className="btn btn-danger" onClick={this.unEnroll}>Un-Enroll</button>
      );
    }
  });

const cols = [
    {
      key: 'person.firstName',
      display: 'First Name'
    }, {
      key: 'person.middleName',
      display: 'Middle Name'
    }, {
      key: 'person.lastName',
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
        courseID: this.props.courseID,
        termID: this.props.termID
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
        personID: Number(this.state.selected.id),
        courseID: Number(this.props.courseID),
        termID: Number(this.props.termID)
      });
    },
    render(){
      return (
        <div>
          <div className="input-group">
            <DropdownList
              valueField='id'
              textField={item => item.firstName + ' ' + item.lastName}
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
      //     label: p.firstName + " " + p.lastName
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
