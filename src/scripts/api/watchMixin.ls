
##{@type}.delete.success

WatchMixin = ->
  storeNames = Array::slice.call(arguments_)
  componentWillMount: ->
    flux = @props.flux or @context.flux
    _each storeNames, ((store) ->
      flux.store(store).on "change", @_setStateFromFlux
      return
    ), this
    return

  componentWillUnmount: !->
    flux = @props.flux or @context.flux
    _each storeNames, ((store) ->
      flux.store(store).removeListener "change", @_setStateFromFlux
      return
    ), this

  _setStateFromFlux: ->
    @setState @getStateFromFlux()
    return

  getInitialState: ->
    @getStateFromFlux()

WatchMixin.componentWillMount = ->
  throw new Error("WatchMixin is a function that takes one or more " + "store names as parameters and returns the mixin, e.g.: " + "mixins[WatchMixin(\"Store1\", \"Store2\")]")return

module.exports = WatchMixin
