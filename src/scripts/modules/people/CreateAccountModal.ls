require! {
  'react': React

  '../../components/SemanticModal.ls': {Modal}

  "../../api/api.ls"

  "../../components/FormMixin.ls"

}

Dom = React.DOM
{div, button, h4, label, form} = Dom

CreateAccountModal = React.create-class do
  displayName: "CreateAccountModal"
  mixins: [FormMixin 'account']

  prop-types:
    person-id: React.PropTypes.string.is-required

  get-initial-state: ->
    account:
      personId: @props.person-id
      email: ''
      password: ''

  handle-submit: (e) ->
    e.prevent-default!
    api.user.create @state.account
      .then ~>
        console.log it

  render: ->
    @transfer-props-to do
      Modal title:"Create User Account",
        div class-name: "content",
          form class-name: "ui form" on-submit: @handle-submit,
            @input-for 'email' label: 'Email' type: "text"
            @input-for 'password' label: 'Password' type: "password"
        div className: "actions",
          button class-name:"ui primary button" type: "submit",
            "Save"

module.exports = CreateAccountModal
