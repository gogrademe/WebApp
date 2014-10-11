require! {
  'react': React

  'react-router': {Link}
  '../utils.ls'
}

Dom = React.DOM
{div} = Dom
module.exports = ->

  getInitialState: ->
    isSaving: false
    error: null

  modalSaving: !->
    @setState isSaving: true

  modalSaveSuccess: !->
    @props.onRequestHide()

  modalSaveFail: (error) !->
    if @state.isSaving
      @setState isSaving: false error: error.errors

  errorAlerts: ->
    if @state.error
      div bsStyle: "danger",
        @state.error
