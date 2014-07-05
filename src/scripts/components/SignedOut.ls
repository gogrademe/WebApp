require! {
  React
}

Dom = React.DOM
{div, h2} = Dom

SignedOut = React.create-class do
  render: ->
    div null,
      h2 null,
        @props.activeRoute

module.exports = SignedOut
