import React, {Component} from 'react';
import {Navigation} from 'react-router';
import api from '../api/api';

export default class Logout extends Component {
  componentDidMount(){
    api.session.del();
  }
  render() {
    return (
      <div>
        <div className='main'>
          <div className='ui grid'>
            <div className='column'>
              <div className='ui segment'>
                <h2 className='ui center aligned header'>
                  Logging Out...
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
