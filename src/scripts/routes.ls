require! {
  Router: "react-router"

  App: "./app.ls"

  SignedIn: "./components/SignedIn.ls"
  # Single pages
  LoginModule: "./modules/LoginModule.ls"
  LogoutModule: "./modules/Logout.ls"
  DashboardModule: "./modules/DashboardModule.ls"
  NotFoundModule: "./modules/NotFoundModule.ls"

  # Mountable
  Classes: "./modules/classes/index.ls"
  Setup: "./modules/setup/container.ls"
  People: "./modules/people/index.ls"
  School: "./modules/SchoolSettings.ls"
}

{Route,Routes,DefaultRoute, NotFoundRoute, Redirect} = Router


module.exports =
  Routes {},
    Route handler: App,
      Route path: "login" name: "login" handler: LoginModule
      Route handler: SignedIn,
        Route path: "logout" name: "logout" handler: LogoutModule
        Route name:"school.settings"  path: "school/settings" handler: School.Settings
        Route name:"people" handler: People.List
        Route name:"people.detail" path:"people/:resourceId" handler: People.Detail
        Route name: "assignments.grades" title: "Assignment Grades" path: "assignments/:assignmentId" handler: Classes.AssignmentGrades
        Route name: "class" path: "class" handler: Classes.List
        Route path: "class/:termId/:resourceId" handler: Classes.View,
          Route name: "class.detail" title: "Grades" path: "home" handler: Classes.Detail
          Route name: "class.students" title: "Students" path: "students" handler: Classes.Students
          Route name: "class.assignments" title: "Assignments" path: "assignments" handler: Classes.Assignments
          Route name: "class.settings" title: "Settings" path: "settings" handler: Classes.Settings
        Route name: "setup" handler: Setup.Container,
          Route name: "setup.assignment-types", path: "assignment-types" handler: Setup.AssignmentTypes
        Route name:"dashboard" path: "dashboard" title: "Dashboard" handler: DashboardModule
        Redirect path: "/" to: "dashboard"
      NotFoundRoute handler: NotFoundModule
