React = require('React')

Dom = React.DOM
{div, i, input} = Dom

Dropdown = React.create-class do
  get-initial-state: ->
    selected:
      text: "Select One..."
      value: ""
    mouse-enter: false
    visible: false
    class-names: []

  events: ->
    mouse:
      enter: ~>
        @~set-state mouse-enter: true
      leave: ~>
        @~set-state mouse-enter: false
    drop:
      click: ~>
        @~toggle-dropdown!
    item:
      click: ~>
        @~set-state do
          selected:
            text: it.text
            value: it.value || it.text

  component-will-mount: ->
    document.add-event-listener 'click' @~handle-doc-click

  component-will-unmount: ->
    document.remove-event-listener 'click' @~handle-doc-click

  toggle-dropdown: ->
    @set-state visible: !@state.visible

  get-class: ->
    if @state.visible then 'visible' else ''

  get-menu-class: ->
    if @state.visible then 'visible' else ''

  handle-doc-click: ->
    if @state.visible and not @state.mouse-enter then @toggle-dropdown!

  render: ->
    @transfer-props-to do
      div do
        class-name: "ui selection dropdown #{@get-class!}"
        on-click: @events!.drop.click,
        on-mouse-enter: @events!.mouse.enter,
        on-mouse-leave: @events!.mouse.leave,

        input type: "hidden" value: @state.selected.value
        div class-name: "text", @state.selected.text
        i class-name: "dropdown icon"
        div class-name: "menu #{@get-menu-class!}",
          @props.options.map (i, k) ~>
            div key: k, class-name: "item" on-click: @events!item.click.bind(@, i), i.text

module.exports = Dropdown
