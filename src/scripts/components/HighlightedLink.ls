{li, a}= require 'react'



RRouter = require("rrouter")
LinkMixin = RRouter.LinkMixin
Link = RRouter.Link
utils = require("../utils.ls")
pattern = require("url-pattern")
HighlightedLink = React.createClass(
  displayName: "HighlightedLink"
  mixins: [LinkMixin]
  getDefaultProps: ->
    activeClassName: "active"

  onClick: (e) ->
    e.preventDefault()
    @navigate @href()
    return

  isActive: ->
    pat = pattern.newPattern(@href() + "*")
    !!pat.match(@getRouting().path)

  render: ->
    className = undefined
    className = @props.activeClassName  if @props.activeClassName and @isActive()
    li className: className
    a(
      href: @href()
      onClick: @onClick
    , @props.children)
)
module.exports = HighlightedLink
