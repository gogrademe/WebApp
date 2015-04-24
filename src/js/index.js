require("babel/polyfill");
require('../less/main.less');

import React from 'react';
import Router from 'react-router';

import AppRoutes from './routes';

import FormsyValidators from './utils/validators';
FormsyValidators();

window.React = React;

Router.run(AppRoutes, (Handler) => {
  React.render(<Handler/>, document.getElementById("app"));
});
