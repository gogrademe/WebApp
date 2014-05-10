GoGrade.config(function ($stateProvider) {
  $stateProvider.state('app.teachers', {
    url: '/teachers',
    templateUrl: 'modules/teachers/partials/list.html'
  });
})