require! {
  React

  pattern: 'url-pattern'
  'react-nested-router/modules/stores/ActiveStore'
  'react-nested-router/modules/helpers/withoutProperties'
  'react-nested-router/modules/helpers/transitionTo'
  'react-nested-router/modules/helpers/makeHref'

  '../utils.ls'
}

Dom = React.DOM
{li, a} = Dom

isModifiedEvent = (event) ->
  !!(event.metaKey or event.ctrlKey or event.shiftKey)

RESERVED_PROPS =
  to: true
  className: true
  activeClassName: true
  query: true
  children: true

Link = React.create-class do
  displayName: "Link"
  statics:
    getUnreservedProps: (props) ->
      withoutProperties props, RESERVED_PROPS

  propTypes:
    to: React.PropTypes.string.isRequired
    activeClassName: React.PropTypes.string.isRequired
    query: React.PropTypes.object

  getDefaultProps: ->
    activeClassName: "active"

  getInitialState: ->
    isActive: false

  getParams: ->
    Link.getUnreservedProps @props

  getHref: ->
    makeHref @props.to, @getParams(), @props.query

  getClassName: ->
    className = @props.className or ""
    return className + " " + @props.activeClassName  if @state.isActive
    className

  componentWillMount: !->
    ActiveStore.addChangeListener @handleActiveChange

  componentDidMount: !->
    @updateActive()

  componentWillUnmount: !->
    ActiveStore.removeChangeListener @handleActiveChange

  componentWillReceiveProps: (props) ->
    params = Link.getUnreservedProps(props)
    @setState isActive: ActiveStore.isActive(props.to, params, props.query)
    return

  handleActiveChange: !->
    @updateActive()  if @isMounted()

  updateActive: !->
    @setState isActive: ActiveStore.isActive(@props.to, @getParams(), @props.query)

  handleClick: (event) !->
    return  if isModifiedEvent(event)
    event.prevent-default!
    transitionTo @props.to, @getParams(), @props.query

  render: ->
    props =
      href: @getHref()
      className: @getClassName()
      onClick: @handleClick

    li className: @getClassName(),
      a props, @props.children

module.exports = Link
