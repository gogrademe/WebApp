
require! {
  React
  RRouter

  # Single pages
  DashboardModule: "./modules/DashboardModule.ls"
  LoginModule: "./modules/LoginModule.ls"

  # Mountable
  ClassesModule: "./modules/Classes/index.ls"
  PeopleModule: "./modules/People/index.ls"
  NotFoundModule: "./modules/NotFoundModule.ls"
}



Routes = RRouter.Routes
Route = RRouter.Route




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
