GoGrade.controller('LoginController', ['$state', '$scope', 'UserService',
  function ($state, $scope, UserService) {
    'use strict';
    $scope.loggingIn = false;
    $scope.login = function () {
      $scope.loggingIn = true;
      UserService.login($scope.username, $scope.password).then(function() {
        $state.go('app.home');
      });
    }
}]);