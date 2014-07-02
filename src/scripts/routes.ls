{}= require 'react'






RRouter = require("rrouter")
Routes = RRouter.Routes
Route = RRouter.Route

# Single pages
DashboardModule = require("./modules/DashboardModule")
LoginModule = require("./modules/LoginModule")

# Mountable
ClassesModule = require("./modules/Classes")
PeopleModule = require("./modules/People")
NotFoundModule = require("./modules/NotFoundModule")
module.exports = (Routes(null, Route(
  name: "dashboard"
  path: "/dashboard"
  view: DashboardModule
), Route(
  name: "login"
  path: "/login"
  view: LoginModule
), Route(
  path: "/classes"
, ClassesModule(null)), Route(
  path: "/people"
, PeopleModule(null)), Route(
  name: "notfound"
  path: "*"
  view: NotFoundModule
)))