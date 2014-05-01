//      .state('app.classes', {
//        url: '/classes',
//        abstract: true,
//        template: '<ui-view/>'
//      })
//      .state('app.classes.list', {
//        url: '',
//        templateUrl: 'partials/classes/list.html'
//      })
//      .state('app.classes.detail', {
//        url: '/:id',
//        abstract: true,
//        templateUrl: 'modules/classes/partials/container.html'
//      })
//      .state('app.classes.detail.home', {
//        url: '',
//        template: '<div>home</div>'
//      })
//      .state('app.classes.detail.people', {
//        url: '/people',
//        templateUrl: 'modules/classes/partials/people.html'
//      })
//          .state('app.classes.detail.gradebook', {
//        url: '/people',
//        templateUrl: 'modules/classes/partials/gradebook.html'
//      });

GoGrade.config(function ($stateProvider) {
  $stateProvider
    .state('app.classes', {
      url: '/classes',
      abstract: true,
      template: '<ui-view/>'
    })
    .state('app.classes.list', {
      url: '',
      templateUrl: 'partials/classes/list.html'
    })
    .state('app.classes.detail', {
      url: '/:id',
      abstract: true,
      templateUrl: 'modules/classes/partials/container.html'
    })
    .state('app.classes.detail.home', {
      url: '',
      templateUrl: 'modules/classes/partials/home.html'
    })
    .state('app.classes.detail.people', {
      url: '/people',
      templateUrl: 'modules/classes/partials/people.html'
    })
    .state('app.classes.detail.people.add', {
      url: "/add",
      onEnter: function($stateParams, $state, $modal) {
        $modal.open({
          templateUrl: 'modules/classes/partials/addPeople.html'
        })
      }
    })
    .state('app.classes.detail.gradebook', {
      url: '/gradebook',
      templateUrl: 'modules/classes/partials/gradebook.html'
    })
      .state('app.classes.detail.settings', {
      url: '/settings',
      templateUrl: 'modules/classes/partials/settings.html'
    });
});