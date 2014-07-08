require! {
  React

  Link: './HighlightedLink.ls'
  '../utils.ls'

  Bootstrap: 'react-bootstrap'
}

{Alerts} = Bootstrap

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
      Alert bsStyle: "danger",
        @state.error
