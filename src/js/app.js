var GoGrade = angular.module('app', ['ui.router', 'ui.bootstrap']);

GoGrade.config(['$stateProvider', '$urlRouterProvider',
 function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/app');
    //
    // Now set up the states
    $stateProvider
      .state('app', {
        views: {
          'header': {
            templateUrl: 'partials/header/nav.html'
          },
          'content': {
            template: '<ui-view/>'
          }
        },
        abstract: true,
        url: '/app'
      })
      .state('app.home', {
        url: '',
        templateUrl: 'partials/home/index.html'
      })
      .state('app.classes', {
        url: '/classes',
        templateUrl: 'modules/classes/partials/container.html'
      });
    $stateProvider
      .state('auth', {
        abstract: true,
        views: {
          'header': {
            templateUrl: 'partials/header/header.html'
          },
          'content': {
            template: '<ui-view/>'
          }
        },
      })
      .state('auth.login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'partials/auth/login.html'
      });
  }]);