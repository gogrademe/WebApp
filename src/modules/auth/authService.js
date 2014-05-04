'use strict';
GoGrade.service('UserService', ['$state', '$rootScope', '$q', '$http', '$window','localStorageService',
  function ($state, $rootScope, $q, $http, $window, localStorageService) {
    return {
      login: function (username, password) {
        //      var deffered = $q.defer();
        return $http({
          method: 'POST',
          url: 'http://localhost:3000/authenticate',
          data: $.param({
            username: username,
            password: password
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          } // set the headers so angular passing info as form data (not request payload)
        }).success(function (data) {
          $rootScope.loggedIn = true;
          $window.sessionStorage.token = data.token;
          var user = angular.fromJson($window.atob(data.token.split('.')[1]));
          console.log(user);
          
          localStorageService.add('token', data.token);
          
          localStorageService.add('userProfile', user)
//          $window.localStorage.username = user.Username;
//          $window.sessionStorage.email = user.Email;
//          $window.sessionStorage.userId = user.Id;
        }).error(function () {
          // Erase the token if the user fails to login
          localStorageService.remove('token');
          localStorageService.remove('token');
        });

      },
      logout: function () {
  
        
        $rootScope.loggedInUser = null;
        $rootScope.loggedIn = false;
        $state.go('auth.login');
      },
      isLoggedIn()
    }
}]);