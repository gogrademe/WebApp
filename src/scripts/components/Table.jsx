/** @jsx React.DOM */
var React = require('react');
var BTable = require('react-bootstrap').Table;

var RRouter = require('rrouter');
var Link = RRouter.Link;
var RoutingContextMixin = RRouter.RoutingContextMixin;

// Table with random data. Will change this to take in props to define data soon.
var Table = React.createClass({
  mixins: [RoutingContextMixin],
  propTypes: {
    linkTo: React.PropTypes.string.isRequired
  },
  render: function() {
    return this.transferPropsTo(
      <BTable responsive hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td><Link to="detail/home" currentClass="Mark-Otto">Mark</Link></td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Larry the Bird</td>
            <td>Thornton</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </BTable>
    );
  }
});

module.exports = Table;
