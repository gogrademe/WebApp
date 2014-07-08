require! {
  React
}

Dom = React.DOM
{div, h3} = Dom

Split = React.create-class do
  displayName: "Split"
  mixins: [RoutingContextMixin]

  render: ->
    detailView = @props.detail
    div className: "two-col"
    Nav currentClass: @props.currentClass className: "sidebar-nav",
      detailView test: "someTestProp"
