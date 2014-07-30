require! {
  React: 'react'
  AppRoutes: "./routes.ls"
}

window.React = React

React.render-component do
  AppRoutes, document.getElementById("app")
