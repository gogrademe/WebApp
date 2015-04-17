

var React = require('react');
var Header = require('../components/PageHeader');
var SemanticModal = require('../components/SemanticModal');

var DashboardModule = React.createClass({
  renderItem: function(arg$){
    var header, time, description, author;
    header = arg$.header, time = arg$.time, description = arg$.description, author = arg$.author;

    return (
      <div className="item">
        <div className="content">
          <div className="header">
            {header}
          </div>
          <div className="meta">
            <span className="author">
              {author},
            </span>
            <span className="time">
              {time}
            </span>
          </div>
          <div className="description">
            {description}
          </div>
        </div>
      </div>
    );
  },
  render: function(){
    return (
      <div>
        <Header primary='Dashboard'/>
        <div className="main container">
          <div className="ui segment">
            <h3 className="ui dividing header">
              Announcements
            </h3>
            <div className="ui items">
              {this.renderItem({
                header: "New Version!",
                time: "Yesterday",
                description: "Major Changes: theme",
                author: "Matt Aitchison"
              })}
              {this.renderItem({
                header: "Grade Grid View",
                time: "Yesterday",
                description: "Grade inputs have been removed to prevent accidental changes.",
                author: "Matt Aitchison"
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
});
module.exports = DashboardModule;
