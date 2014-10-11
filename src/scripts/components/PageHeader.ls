require! {
  'react': React
}

Dom = React.DOM
{div, h3, span} = Dom

PageHeader = React.create-class do
  displayName: "PageHeader"

  render: ->
    div class-name: "header segment",
      div class-name: "container",
        h3 class-name: "ui header",
          span null,
            @props.primary
          span class-name: "sub header",
            @props.secondary
        div class-name: "right actions",
          @props.right


module.exports = PageHeader
