require! {
  React
}
Panel = require("../../components/Panel.ls")
PersonDetail = React.createClass(
  displayName: "PersonDetail"
  render: ->
    Panel hasBody: true title: "Home" className: "content-area",
      "Detail page!"
)
module.exports = PersonDetail
