{div, div, div}= require 'react'







RRouter = require("rrouter")
Routes = RRouter.Routes
Route = RRouter.Route
Users = React.createClass(
  displayName: "Users"
  render: ->
    div null, "Users"
)
User = React.createClass(
  displayName: "User"
  render: ->
    div null, "User Page for ", @props.username
)
UserEdit = React.createClass(
  displayName: "UserEdit"
  render: ->
    div null, "User Edit"
)
module.exports = (Routes(
  name: "users"
  view: Users
, Route(
  name: "user"
  path: ":username"
  view: User
, Route(
  name: "edit"
  view: UserEdit
))))