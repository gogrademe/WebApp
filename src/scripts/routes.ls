require! {
  Router: "react-router"

  App: "./app.ls"

  SignedIn: "./components/SignedIn.ls"
  # Single pages
  LoginModule: "./modules/LoginModule.ls"
  DashboardModule: "./modules/DashboardModule.ls"
  NotFoundModule: "./modules/NotFoundModule.ls"
  RootRedirect: "./modules/RootRedirect.ls"

  # Mountable
  Classes: "./modules/Classes/index.ls"
  People: "./modules/People/index.ls"
  School: "./modules/SchoolSettings.ls"
}

Route = Router.Route


module.exports =
  Route handler: App,
    #Route path: "" handler: RootRedirect
    Route path: "login" name: "login" handler: LoginModule
    Route handler: SignedIn,
      Route name:"school.settings"  path: "school/settings" handler: School.Settings
      Route name:"people" handler: People.List
      Route name:"people.detail" path:"people/:resourceId" handler: People.Detail
      Route name: "class" path: "class" handler: Classes.List
      Route path: "class/:resourceId" handler: Classes.View
      Route path: "class/:termId/:resourceId" handler: Classes.View,
        Route name: "class.detail" title: "Grades" path: "class/:termId/:resourceId" handler: Classes.Detail
        Route name: "class.students" title: "Students" path: "class/:termId/:resourceId/students" handler: Classes.Students
        Route name: "class.assignments" title: "Assignments" path: "class/:termId/:resourceId/assignments" handler: Classes.Assignments
        Route name: "class.settings" title: "Settings" path: "class/:termId/:resourceId/settings" handler: Classes.Settings
      Route name:"dashboard" title: "Dashboard" handler: DashboardModule
      Route name:"" path:"*" handler: NotFoundModule
