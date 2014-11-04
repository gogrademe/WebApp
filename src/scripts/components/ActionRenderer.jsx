var React, Router, Dom, div, i, Link, ActionRenderer;
var React = require('react');
var {Router, Link} = require('react-router');

var ActionRenderer = React.createClass({
  propTypes: {
    linkTo: React.PropTypes.string
  }
  render: function(){
    var lnk = this.props.column.linkTo;
    var rowId = this.props.row.id
    var (
      lnk = this.props.column.linkTo;
      rowId = this.props.row.id;
    )
    return (
      <div className="3 fluid ui icon buttons small">
        <Link to={lnk + ".detail"} params={resourceId: rowId}>
          <i />
        </Link>

    )
    return div({
      className: "3 fluid ui icon buttons small"
    }, Link({
      to: lnk + ".detail",
      params: {
        resourceId: this.props.row.id
      },
      className: "ui button"
    }, i({
      className: "icon info"
    })), Link({
      to: lnk + ".detail",
      params: {
        resourceId: this.props.row.id
      },
      className: "ui button"
    }, i({
      className: "icon edit"
    })), Link({
      to: lnk + ".detail",
      params: {
        resourceId: this.props.row.id
      },
      className: "ui button"
    }, i({
      className: "icon trash"
    })));
  }
});
module.exports = ActionRenderer;
//   render: ->
//     lnk = @props.column.link-to
//     div class-name: "3 fluid ui icon buttons small",
//       Link to: "#lnk.detail", params:{resourceId: @props.row.id}, class-name: "ui button",
//         i class-name:"icon info"
//       Link to: "#lnk.detail", params:{resourceId: @props.row.id}, class-name: "ui button",
//         i class-name:"icon edit"
//       Link to: "#lnk.detail", params:{resourceId: @props.row.id}, class-name: "ui button",
//         i class-name:"icon trash"
// module.exports = ActionRenderer
