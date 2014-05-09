/** @jsx React.DOM */
var React = require('react');
var Panel = require('../../components/base/Panel.jsx');
var Grid = require('../../components/Grid/Grid');

var data = [{
              id: 1,
              firstName: 'Mark',
              lastName: 'Otto',
              userName: 'mdo',
              role: 'Teacher'
            },{
              id: 2,
              firstName: 'Mark',
              lastName: 'Otto',
              userName: 'mdo',
              role: 'Teacher'
            },{
              id: 3,
              firstName: 'Mark',
              lastName: 'Otto',
              userName: 'mdo',
              role: 'Teacher'
            },{
              id: 4,
              firstName: 'Mark',
              lastName: 'Otto',
              userName: 'mdo',
              role: 'Teacher'
            },
            {
              id: 1,
              firstName: 'Mark',
              lastName: 'Otto',
              userName: 'mdo',
              role: 'Teacher'
            },{
              id: 2,
              firstName: 'Mark',
              lastName: 'Otto',
              userName: 'mdo',
              role: 'Teacher'
            },{
              id: 3,
              firstName: 'Mark',
              lastName: 'Otto',
              userName: 'mdo',
              role: 'Teacher'
            },{
              id: 4,
              firstName: 'Mark',
              lastName: 'Otto',
              userName: 'mdo',
              role: 'Teacher'
            },
            {
              id: 1,
              firstName: 'Mark',
              lastName: 'Otto',
              userName: 'mdo',
              role: 'Teacher'
            },{
              id: 2,
              firstName: 'Mark',
              lastName: 'Otto',
              userName: 'mdo',
              role: 'Teacher'
            },{
              id: 3,
              firstName: 'Mark',
              lastName: 'Otto',
              userName: 'mdo',
              role: 'Teacher'
            },{
              id: 4,
              firstName: 'Mark',
              lastName: 'Otto',
              userName: 'mdo',
              role: 'Teacher'
            },
            {
              id: 1,
              firstName: 'Mark',
              lastName: 'Otto',
              userName: 'mdo',
              role: 'Teacher'
            },{
              id: 2,
              firstName: 'Mark',
              lastName: 'Otto',
              userName: 'mdo',
              role: 'Teacher'
            },{
              id: 3,
              firstName: 'Mark',
              lastName: 'Otto',
              userName: 'mdo',
              role: 'Teacher'
            },{
              id: 4,
              firstName: 'Mark',
              lastName: 'Otto',
              userName: 'mdo',
              role: 'Teacher'
            }];
            var columns = [{
                title: 'Id'
            }, {title: 'First Name'}, {title: 'Last Name'}, {title: 'User Name'}]
    var ClassStudents = React.createClass({
        render: function() {
            return (
                <Panel title="Teachers" className="content-area">
        <Grid
            showFooter={true}
            showToolbar={true}
            name="grid"
            data={data}
            columns={columns}
        />
        </Panel>
        )
    }
    });

module.exports = ClassStudents;