
require! {
  React
  Router: "react-nested-router"

  App: "./app.ls"

  SignedOut: "./components/SignedOut.ls"
  # Single pages
  DashboardModule: "./modules/DashboardModule.ls"
  LoginModule: "./modules/LoginModule.ls"

  # Mountable
  Classes: "./modules/Classes/index.ls"
  People: "./modules/People/index.ls"
  #NotFoundModule: "./modules/NotFoundModule.ls"
}

Route = Router.Route


module.exports =
  Route handler: App,
    Route handler: SignedOut,
      Route do
        path: "login"
        name: "login"
        handler: LoginModule
    Route name:"people" handler: People.List
    Route name:"people.detail" path:"people/:resourceId" handler: People.Detail
    Route name: "class" handler: Classes.List
    Route handler: Classes.Split,
      Route name: "class.detail" path: "class/:resourceId" handler: Classes.Detail
      Route name: "assignments" path: "class/:resourceId/assignments" handler: Classes.Assignments
      Route name: "settings" path: "class/:resourceId/settings" handler: Classes.Settings
    Route name:"dashboard" handler: DashboardModule



/*Route do
  name: "dashboard"
  path: "/dashboard"
  handler: DashboardModule
Route do
  name: "login"
  path: "/login"
  handler: LoginModule
Route do
  path: "/classes"
  handler: ClassesModule
Route do
  path: "/people"
  handler: PeopleModule
Route do
  name: "notfound"
  path: "*"
  handler: NotFoundModule*/
