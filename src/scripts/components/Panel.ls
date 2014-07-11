require! {
  React
}

Dom = React.DOM
{div, h4, h1} = Dom

PanelBody = React.create-class do
  displayName: "PanelBody"
  render: ->
    div class-name: "ui segment attached",
      @props.children

Panel = React.create-class do
  displayName: "Panel"
  render: ->
    @transferPropsTo do
      div null,
        h4 className: "ui top header attached",
          @props.title
        if @props.hasBody then PanelBody null, @props.children else @props.children

module.exports = Panel
