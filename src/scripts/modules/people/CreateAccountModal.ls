require! {
  React: 'react'

  Modal: '../../components/SemanticModal.ls'.SemanticModal

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
            div class-name: "field",
              label null,
                "Email"
              @input-for 'email' placeholder: 'Email' type: "text"
            div class-name: "field",
              label null,
                "Password"
              @input-for 'password' placeholder: 'Password' type: "password"
            div className: "field",
              button class-name:"ui button" type: "submit",
                "Save"

module.exports = CreateAccountModal
