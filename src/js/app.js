var GoGrade = angular.module('app', ['ui.router', 'ui.bootstrap', 'angular-data.DS','LocalStorageModule']);

GoGrade.config(['$stateProvider', '$urlRouterProvider', 'DSProvider', 'localStorageServiceProvider',
 function ($stateProvider, $urlRouterProvider, DSProvider, localStorageServiceProvider) {

    DSProvider.defaults.baseUrl = 'http://localhost:3000';
    localStorageServiceProvider.setPrefix('goGradeWeb');
   
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
   
   var resolveLoggedInUser = ['$rootScope', 'UserService', function($rootScope, UserService) {
     
   }]
  }]);

GoGrade.run(['$rootScope', '$state',
  function ($rootScope, $state) {
    $rootScope.$state = $state;
}]);