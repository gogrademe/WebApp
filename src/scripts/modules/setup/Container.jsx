var React = require('react');
var Header = require('../../components/PageHeader');
var Link = require('react-router').Link;

var Container = React.createClass({
  render() {
    return (
      <div>
        <Header primary="App Setup" />
        <div className="main container">
          <div className="ui stackable grid">
            <div className="right floated three wide column">
              <div className="ui fluid vertical menu sunken">
                <Link className="item" to="setup.schoolYear">
                  School Years
                </Link>
                <Link className="item" to="setup.terms">
                  Terms
                </Link>
                <Link className="item" to="setup.assignment-types">
                  Assignment Types
                </Link>
              </div>
            </div>
            <div className="thirteen wide column">
              {this.props.activeRouteHandler()}
            </div>
          </div>
        </div>
      </div>
    )
  }
});
module.exports = {
  Container: Container,
  AssignmentTypes: require('./AssignmentTypes'),
  Terms: require('./Terms'),
  SchoolYear: require('./SchoolYear')
};
