require! {
  'react': React
  'react/lib/update': updates

  './Form/Input/Name.ls'

  '../utils.ls'
  'moment'

  'react-pikaday': Pikaday
}

Dom = React.DOM
{div, button, h4, label, form, input, a, i} = Dom


path-to-obj = (path, value) ->
  o = {}
  path-reduce path, o, (obj, part, i, xs) ->
    if i is xs.length - 1
      obj[part] = value
      return obj
    else
      return obj[part] = {}
  return o

path-reduce = (path, obj, fn) -> path.split('.').reduce(fn, obj)


# value-from-path('a.b', {a: {b: 'foo'}}) => 'foo'
value-from-path = (path, obj) ->
  path-reduce path, obj, (obj, part) -> obj[part]

FormActions = React.create-class do
  render: ->
    div class-name:"actions",
      a class-name: "ui labeled icon button" on-click: @props.on-cancel,
        i class-name: "cancel icon"
        "Cancel"
      a class-name: "ui labeled icon primary button" on-click: @props.on-submit,
        i class-name: "save icon"
        "Save"

Input = React.create-class do
  prop-types:
    type: React.PropTypes.string.isRequired

  get-default-props: ->
    label: ""
    type: "text"
    placeholder: ""

  render: ->
    placeholder = @props.placeholder || @props.label
    div class-name: "field",
      label null, @props.label if @props.label
      @transfer-props-to do
        input do
          ref: "input"
          placeholder: placeholder
          type: @props.type
          on-change: @props.on-change
          value: @props.value
          on-blur: @props.on-blur


PikadayInput = React.create-class do
  get-default-props: ->
    label: ""
    placeholder: ""
    #display-format: "L"
    #value-format: "L"

  get-initial-state: ->
    value: null

  handle-change: ->
    @set-state value: it
    @props.on-change @state.value

  render: ->
    placeholder = @props.placeholder || @props.label
    div class-name: "field",
      label null, @props.label if @props.label
      @transfer-props-to do
        Pikaday do
          placeholder: placeholder
          value: @state.value
          on-change: @handle-change

form-mixin = (state-key) ->
  # get the on-change and value props
  # call in context of a component
  get-initial-state: -> {"#state-key": {}}

  get-props = (path) ->
    value: value-from-path("#state-key.#path", this.state)
    on-change: (event) ~>

      /*console.log event
      value = switch event?.target
        # input like
        | that.value? => that.value
        # plain value, allowed for greater compatibility
        | otherwise => event*/
      /*console.log event.target.value*/
      /*value = event?.target?.value*/
      
      value = event.target.value

      data = updates @state[state-key], path-to-obj("#path", {$set: value})
      @set-state {"#state-key": data}


  make-updatable = (component, path, extra-props = {type: "text"}) -->
    props = get-props.call(this, path) <<< extra-props
    component props

  date-for: make-updatable PikadayInput
  input-for: make-updatable Input
  updatable-for: make-updatable
  actions: FormActions

module.exports = form-mixin
