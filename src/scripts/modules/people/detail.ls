{}= require 'react'
 


Panel = require("../../components/Panel.jsx")
PersonDetail = React.createClass(
  displayName: "PersonDetail"
  render: ->
    Panel
      hasBody: true
      title: "Home"
      className: "content-area"
    , "Detail page!"
)
module.exports = PersonDetail