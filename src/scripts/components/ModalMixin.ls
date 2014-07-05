require! {
  React

  Link: './HighlightedLink.ls'
  '../utils.ls'

  Bootstrap: 'react-bootstrap'
}

{Alerts} = Bootstrap

module.exports = ->
  /*storeNames = Array::slice.call(arguments_)*/
  getInitialState: ->
    isSaving: false
    error: null

  /*componentWillMount: ->
    flux = @props.flux or @context.flux
    utils.forEach storeNames, ((store) ->
      flux.store(store).on "success", @modalSaveSuccess
      flux.store(store).on "error", @modalSaveFail
      return
    ).bind()
    return*/

  modalSaving: ->
    @setState isSaving: true
    return

  modalSaveSuccess: ->
    console.log "success"
    @props.onRequestHide()
    return

  modalSaveFail: (error) ->
    console.log "fail", error.errors
    if @state.isSaving
      @setState isSaving: false error: error.errors

    return

  /*componentWillUnmount: ->
    flux = @props.flux or @context.flux
    utils.forEach storeNames, ((store) ->
      flux.store(store).removeListener "error", @modalSaveFail
      flux.store(store).removeListener "sucess", @modalSaveSuccess
      return
    ).bind()
    return*/

  errorAlerts: ->
    if @state.error
      return (Alert(
        bsStyle: "danger"
      , @state.error))
    return
