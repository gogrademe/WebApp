require! {
  'react': React
  'react/lib/update': updates

  './Form/Input/Name.ls'

  'react-pikaday': Pikaday
}

Dom = React.DOM
{div, button, h4, label, form, input} = Dom


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

  render: ->
    placeholder = @props.placeholder || @props.label
    div class-name: "field",
      label null, @props.label if @props.label
      @transfer-props-to do
        Pikaday do
          placeholder: placeholder

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

      value = event.target.value

      data = updates @state[state-key], path-to-obj("#path", {$set: value})
      @set-state {"#state-key": data}


  make-updatable = (component, path, extra-props = {type: "text"}) -->
    props = get-props.call(this, path) <<< extra-props
    component props

  input-for: make-updatable Input
  date-for: make-updatable PikadayInput

  updatable-for: make-updatable

module.exports = form-mixin
