require! {
  React
  RRouter

  Pattern: 'url-pattern'

  '../utils.ls'

}


Dom = React.DOM
{li, a} = Dom

{LinkMixin, Link} = RRouter

HighlightedLink = React.createClass(
  displayName: "HighlightedLink"
  mixins: [LinkMixin]
  getDefaultProps: ->
    activeClassName: "active"

  onClick: (e) ->
    e.preventDefault!
    @navigate @href!
    return

  isActive: ->
    pat = pattern.newPattern(@href! + "*")
    !!pat.match(@getRouting().path)

  render: ->
    className = undefined
    className = @props.activeClassName  if @props.activeClassName and @isActive!
    li className: className
    a(
      href: @href!
      onClick: @onClick
    , @props.children)
)
module.exports = HighlightedLink
