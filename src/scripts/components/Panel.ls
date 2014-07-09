require! {
  React
}

Dom = React.DOM
{div, h3, h1} = Dom

PanelBody = React.create-class do
  displayName: "PanelBody"
  render: ->
    div null,
      @props.children

Panel = React.create-class do
  displayName: "Panel"
  render: ->
    @transferPropsTo div null,
      div className: "column",
        h1 className: "ui header",
          @props.title
        if @props.hasBody then PanelBody null, @props.children else @props.children

module.exports = Panel
