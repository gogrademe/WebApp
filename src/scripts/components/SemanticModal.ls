require! {
  'react': React
  'react/lib/cloneWithProps'
}

Dom = React.DOM
{div, i, a, span} = Dom

{PropTypes} = React

SemanticModal = React.create-class do
  displayName: "SemanticModal"
  prop-types:
    title: PropTypes.node
    backdrop: PropTypes.bool
    close-button: PropTypes.bool
    on-request-hide: PropTypes.func.isRequired

  getDefaultProps: ->
    backdrop: true
    close-button: true

  render: ->
    @transfer-props-to do
      div class-name: "ui dimmer page visible active",
        div class-name: "ui modal scrolling transition visible active",
          @render-close-button!
          @render-header!
          @props.children

  render-close-button: ->
    if @props.close-button
      i class-name: "close icon" on-click: @props.on-request-hide

  render-header: ->
    if @props.title
      div class-name: "header",
        @props.title

OverlayMixin =
  getDefaultProps: ->
      container:
        # Provide `getDOMNode` fn mocking a React component API. The `document.body`
        # reference needs to be contained within this function so that it is not accessed
        # in environments where it would not be defined, e.g. nodejs. Equally this is needed
        # before the body is defined where `document.body === null`, this ensures
        # `document.body` is only accessed after componentDidMount.
        getDOMNode: ->
          document.body

  componentWillUnmount: ->
    @_unrenderOverlay!
    if @_overlayTarget then
      @getContainerDOMNode().removeChild @_overlayTarget
      @_overlayTarget = null

  componentDidUpdate: ->
    @_renderOverlay!

  componentDidMount: ->
    @_renderOverlay!

  _mountOverlayTarget: ->
    @_overlayTarget = document.create-element 'div'
    @getContainerDOMNode().appendChild @_overlayTarget

  _renderOverlay: ->
    if (!@_overlayTarget)
      @_mountOverlayTarget!

    # Save reference to help testing
    @_overlayInstance = React.render(@renderOverlay!, @_overlayTarget)

  _unrenderOverlay: ->
    React.unmountComponentAtNode(@_overlayTarget)
    @_overlayInstance = null

  getOverlayDOMNode: ->
    unless @isMounted!
      throw new Error('getOverlayDOMNode(): A component must be mounted to have a DOM node.')

    @_overlayInstance.getDOMNode!


  getContainerDOMNode: ->
    if @props.container.getDOMNode then
      @props.container.getDOMNode!
    else
      @props.container



ModalTrigger = React.create-class do
  displayName: "ModalTrigger"
  mixins: [OverlayMixin],

  propTypes:
    modal: PropTypes.node.isRequired

  getInitialState: ->
    is-overlay-shown: false

  show: ->
    @setState is-overlay-shown: true

  hide: ->
    @setState is-overlay-shown: false

  toggle: ->
    @setState is-overlay-shown: !@state.is-overlay-shown

  renderOverlay: ->
    if !@state.is-overlay-shown
      span {}
    else
      clone-with-props @props.modal, {on-request-hide: @hide}

  render: ->
    child = React.Children.only(@props.children)
    clone-with-props child, {onClick: @toggle}


module.exports =
  SemanticModal: SemanticModal
  ModalTrigger: ModalTrigger
  OverlayMixin: OverlayMixin
