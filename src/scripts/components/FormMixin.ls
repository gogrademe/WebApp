require! {
  React: 'react'
  updates: 'react/lib/update'

  './Form/Input/Name.ls'
}


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



form-mixin = (state-key) ->
  # get the on-change and value props
  # call in context of a component
  get-initial-state: -> {"#state-key": {}}

  get-props = (path) ->
    value: value-from-path("#state-key.#path", this.state)
    on-change: (event) ~>

      /*value = switch event?.target
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

  input-for: make-updatable React.DOM.input

  updatable-for: make-updatable

module.exports = form-mixin
