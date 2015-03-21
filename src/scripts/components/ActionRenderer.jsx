

var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
  propTypes: {
    linkTo: React.PropTypes.string
  },
  render() {
    var lnk = this.props.column.linkTo;
    var rowId = this.props.row.id;

    var prms = {
      resourceId: rowId
    };

    return (
      <div className="3 fluid ui icon buttons small">
        <Link to={lnk + ".detail"} params={prms} className="ui button">
          <i className="icon info" />
        </Link>
        <Link to={lnk + ".detail"} params={prms} className="ui button">
          <i className="icon edit" />
        </Link>
        <Link to={lnk + ".detail"} params={prms} className="ui button">
          <i className="icon trash" />
        </Link>
      </div>
    );
  }
});
