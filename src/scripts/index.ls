require! {
  'react': React
  './routes.ls': AppRoutes
}

window.React = React

React.render-component do
  AppRoutes, document.getElementById("app")
