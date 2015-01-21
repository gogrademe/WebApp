var React = require('react');
var cx = require('react/lib/cx');

var Formsy = require('formsy-react');

var {Autocomplete, Option} = require('../components/autocomplete.ls');

var mui = require('material-ui');

var DropDownMenu = mui.DropDownMenu;

var menuItems = [
   { payload: '1', text: 'Never' },
   { payload: '2', text: 'Every Night' },
   { payload: '3', text: 'Weeknights' },
   { payload: '4', text: 'Weekends' },
   { payload: '5', text: 'Weekly' },
];

var ProfileTypes = React.createClass({
  mixins: [Formsy.Mixin],
  getInitialState: function() {
    return {
      types: [
        "Student",
        "Teacher",
        "Parent",
        "Other",
        "Admin"
      ]
    };
  },

  changeValue: function (event) {
    this.setValue([event.target.value]);
  },
  // render:function() {
  //   return (
  //     <Autocomplete placeholder="Type" dropdown={true} onChange={this.changeValue} {...this.props}>
  //       {this.state.types.map(function(item,rId) {
  //         return <Option key={rId} value={item} label={item} />
  //       })}
  //     </Autocomplete>
  //   );
  // },
  render:function() {
    return (
      <DropDownMenu menuItems={menuItems} />
    );
  }

});

module.exports = {
  ProfileTypes: ProfileTypes
};
