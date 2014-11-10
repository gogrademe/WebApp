require! {
  'react': React

  './NewTable.ls'
  './SemanticModal.ls'
  './PageHeader'

  "../api/api.ls"


  "./FormMixin"
}
Dom = React.DOM
{div, i, strong, a, form} = Dom

{Grid} = NewTable

Modal = React.create-class do
  mixins: [FormMixin 'data']
  get-initial-state: ->
    data: {}

  handle-submit: ->
    console.log @state.data
    api[@props.resource].create @state.data
      .then ~>
        @props.on-request-hide!
      .error ~>
        @set-state errors: it.body

  render-inputs: ->
    @props.form-fields.map (item, key) ~>
      switch item.type
      | 'default' => @input-row "#{item.key}", label: item.label
      | 'number' => @num-input-for "#{item.key}", label: item.label, key: key
      | otherwise => @input-for "#{item.key}", label: item.label, key: key


  render: ->
    @transfer-props-to do
      SemanticModal.SemanticModal title: @props.title, animation: true,
        div class-name: "content",
          form class-name: "ui form",
            @render-inputs!
            @actions on-submit: @handle-submit, on-cancel: @props.on-request-hide

Module = React.create-class do
  displayName: "Module"
  prop-types:
    title: React.PropTypes.string
    resource: React.PropTypes.string.is-required
    columns: React.PropTypes.array.is-required
    fetch-data: React.PropTypes.func.is-required
    form-fields: React.PropTypes.array.is-required

  get-initial-state: ->
    data: []

  get-default-props: ->
    columns: []

  component-will-mount: ->
    @fetch-data!

  component-did-mount: ->
    api.type.events.add-listener "change", @fetch-data

  component-will-unmount: ->
    api.type.events.remove-listener "change", @fetch-data

  fetch-data: ->
    @props.fetch-data!
      .then ~>
        @set-state data: it

  render: ->
    div null,
      div class-name: "main container",
        div class-name: "ui top attached right aligned segment",
          SemanticModal.ModalTrigger modal: Modal(title: "Create #{@props.title}", resource: @props.resource, form-fields: @props.form-fields),
            a class-name: "ui primary tiny button", "New"
        Grid class-name: "bottom attached" columns: @props.columns, data: @state.data

module.exports = Module
