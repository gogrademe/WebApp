require! {
  'react': React
  './routes.ls': AppRoutes
}

window.React = React

React.render do
  AppRoutes, document.getElementById("app")
