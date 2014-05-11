GoGrade.controller('LoginController', ['$state', '$scope', 'UserService',
  function ($state, $scope, UserService) {
    'use strict';
    $scope.loggingIn = false;
    $scope.hideAlert = function() {
      $scope.loginFailed = false;
    }
    $scope.login = function () {
      $scope.loggingIn = true;
      console.log($scope.username, $scope.password)
      UserService.login($scope.username, $scope.password)
        .then(function () {
          $state.go('app.home');
        },function () {
          $scope.loggingIn = false;
          $scope.loginFailed = true;
          $scope.password = "";
        });
    }
}]);