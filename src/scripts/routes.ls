
require! {
  React
  Router: "react-nested-router"

  App: "./app.ls"

  #SignedOut: "./components/SignedOut.ls"
  SignedIn: "./components/SignedIn.ls"
  # Single pages
  DashboardModule: "./modules/DashboardModule.ls"
  LoginModule: "./modules/LoginModule.ls"
  NotFoundModule: "./modules/NotFoundModule.ls"

  # Mountable
  Classes: "./modules/Classes/index.ls"
  People: "./modules/People/index.ls"
  #NotFoundModule: "./modules/NotFoundModule.ls"
}

Route = Router.Route


module.exports =
  Route handler: App,
    Route do
      path: "login"
      name: "login"
      handler: LoginModule
    Route handler: SignedIn,
      Route name:"people" handler: People.List
      Route name:"people.detail" path:"people/:resourceId" handler: People.Detail
      Route name: "class" path: "class" handler: Classes.List
      Route path: "class/:resourceId" handler: Classes.Split,
        Route name: "class.detail" path: "class/:resourceId" handler: Classes.Detail
        Route name: "class.students" path: "class/:resourceId/students" handler: Classes.Students
        Route name: "class.assignments" path: "class/:resourceId/assignments" handler: Classes.Assignments
        Route name: "class.settings" path: "class/:resourceId/settings" handler: Classes.Settings
      Route name:"dashboard" handler: DashboardModule
      Route name:"" path:"*" handler: NotFoundModule
