require! {
  React
}


Panel = require("../../components/Panel.ls")
ClassDetail = React.createClass(
  displayName: "ClassDetail"
  render: ->
    Panel hasBody: true title: "Home" className: "content-area",
      "Detail page!"
)
module.exports = ClassDetail
