GoGrade.controller('NavController',['$scope', '$state', function($scope, $state){
  $scope.logout = function() {
    $state.go('auth.login');
  }
}]);