'use strict';
GoGrade.service('UserService', ['$state', '$rootScope', '$q', function($state, $rootScope, $q){
  return {
    login: function() {
      var deffered = $q.defer();
      
      setTimeout(function(){return deffered.resolve();}, 1000);
      
      return deffered.promise;
    },
    logout: function() {
      $rootScope.loggedInUser = null;
      $rootScope.loggedIn = false;
      $state.go('auth.login');
    }
  }
}]);