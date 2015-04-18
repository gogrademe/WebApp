import React from 'react';
import {Router, Navigation}  from 'react-router';
import api from '../api/api';
import Header from '../components/Header';

export default React.createClass({
  mixins: [Navigation],
  componentDidMount(){
    api.session.del();
    return this.replaceWith("/login");
  },
  render() {
    return (
      <div>
        <Header title="Logging Out..."/>
        <div className="main">
          <div className="ui grid">
            <div className="column">
              <div className="ui segment">
                <h2 className="ui center aligned header">
                  Logging Out...
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
