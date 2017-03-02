import React from 'react';
import Header from '../components/PageHeader';

var DashboardModule = React.createClass({
  renderItem({header, time, description, author}){
    return (
      <div className="item">
        <div className="content">
          <h3 className="header">
            {header}
          </h3>
          <div className="meta">
            <span className="author">
              {author + ','}
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
  render(){
    return (
      <div>
        <Header primary="Dashboard"/>
        <div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Announcements</h3>
            </div>
            <div className="panel-body">
              {this.renderItem({
                header: 'New Version!',
                time: 'Yesterday',
                description: 'Major Changes: theme',
                author: 'Matt Aitchison'
              })}
              {this.renderItem({
                header: 'Grade Grid View',
                time: 'Yesterday',
                description: 'Grade inputs have been removed to prevent accidental changes.',
                author: 'Matt Aitchison'
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default DashboardModule
