require! {
  React

  pattern: 'url-pattern'

  '../utils.ls'
}

Dom = React.DOM
{li, a} = Dom

HighlightedLink = React.create-class do
  displayName: "HighlightedLink"
  getDefaultProps: ->
    activeClassName: "active"

  onClick: (e) ->
    e.prevent-pefault!
    @navigate @href!

  isActive: ->
    pat = pattern.newPattern(@href! + "*")
    !!pat.match(@getRouting().path)

  render: ->
    className = undefined
    className = @props.activeClassName  if @props.activeClassName and @isActive!
    li className: className,
      a {href: @href onClick: @onClick},
        @props.children

module.exports = HighlightedLink
