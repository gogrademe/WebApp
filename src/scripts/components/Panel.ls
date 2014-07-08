require! {
  React
}

Dom = React.DOM
{div, h3} = Dom

PanelBody = React.create-class do
  displayName: "PanelBody"
  render: ->
    div className: "panel-body",
      @props.children

Panel = React.create-class do
  displayName: "Panel"
  render: ->
    @transferPropsTo div null,
      div className: "panel panel-default",
        div className: "panel-heading",
          h3 className: "panel-title",
            @props.title
        if @props.hasBody then PanelBody null, @props.children else @props.children

module.exports = Panel
