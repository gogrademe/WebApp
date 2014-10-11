require! {
  'react': React
  "../../components/Header.ls": Header
  "react-router": {Link}
  "../../components/ModalMixin.ls": ModalMixin

  "../../components/FormMixin.ls"

  '../../components/SemanticModal.ls': {Modal}

}

Dom = React.DOM
{div, button, form} = Dom

CreateClassModal = React.create-class do
  mixins: [FormMixin 'class']
  displayName: "CreateClassModal"

  saveChanges: !->
    @props.flux.actions.addClass!

  get-initial-state: ->
    class: {}
  render: ->
    @transferPropsTo do
      Modal title: "Create Class" animation: true,
        div class-name: "content",
          form class-name: "ui form" on-submit: @handle-submit,
            @input-for 'name' label: 'Name' type: "text"
            @input-for 'term' label: 'Terms' type: "text"
            @input-for 'gradeLevel' label: 'Grade Level' type: "text"
        div className: "actions",
          button class-name:"ui primary button" type: "submit",
            "Save"

module.exports = CreateClassModal
