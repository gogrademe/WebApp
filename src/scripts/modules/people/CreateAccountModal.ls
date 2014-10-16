require! {
  'react': React

  '../../components/SemanticModal.ls'

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
        @props.on-request-hide!

  render: ->
    @transfer-props-to do
      SemanticModal.SemanticModal title:"Create User Account",
        div class-name: "content",
          form class-name: "ui form" on-submit: @handle-submit,
            @input-for 'email' label: 'Email' type: "email"
            @input-for 'password' label: 'Password' type: "password"
        @actions on-submit: @handle-submit, on-cancel: @props.on-request-hide

module.exports = CreateAccountModal
