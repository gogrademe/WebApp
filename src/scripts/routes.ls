require! {
  "react-router": Router

  "./app.ls": App

  "./components/SignedIn.ls": SignedIn
  # Single pages
  "./modules/LoginModule.ls": LoginModule
  "./modules/Logout.ls": LogoutModule
  "./modules/DashboardModule.ls": DashboardModule
  "./modules/NotFoundModule.ls": NotFoundModule

  # Mountable
  "./modules/classes/index.ls": Classes
  "./modules/setup/container.ls": Setup
  "./modules/people/index.ls": People
  "./modules/SchoolSettings.ls": School
}

{Route,Routes,DefaultRoute, NotFoundRoute, Redirect} = Router


module.exports =
  Routes {},
    Route handler: App,
      Route path: "login" name: "login" handler: LoginModule
      Route handler: SignedIn,
        Route path: "logout" name: "logout" handler: LogoutModule
        Route name:"school.settings" path: "school/settings" handler: School.Settings
        Route name:"people" handler: People.List
        Route name:"people.detail" path:"people/:resourceId" handler: People.Detail
        Route name: "assignments.grades" title: "Assignment Grades" path: "assignments/:assignmentId" handler: Classes.AssignmentGrades
        Route name: "class" path: "class" handler: Classes.List
        Route path: "class/:termId/:resourceId" handler: Classes.View,
          Route name: "class.overview" title: "Overview" path: "home" handler: Classes.Overview
          Route name: "class.grades" title: "Grades" path: "grades" handler: Classes.Grades
          Route name: "class.students" title: "Students" path: "students" handler: Classes.Students
          Route name: "class.assignments" title: "Assignments" path: "assignments" handler: Classes.Assignments
          Route name: "class.settings" title: "Settings" path: "settings" handler: Classes.Settings
        Route name: "setup" handler: Setup.Container,
          Route name: "setup.assignment-types", path: "assignment-types" handler: Setup.AssignmentTypes
        Route name:"dashboard" path: "dashboard" title: "Dashboard" handler: DashboardModule
        Redirect path: "/" to: "dashboard"
      NotFoundRoute handler: NotFoundModule
