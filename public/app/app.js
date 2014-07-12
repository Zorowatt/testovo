var app = angular.module('app',['ngResource','ngRoute']).value('toastr', toastr);

app.config(function($locationProvider, $routeProvider) {
   // $locationProvider.html5Mode(true);

    var routeRoleChecks = {
        admin: {
            auth: function(auth){
                return auth.isAuthorisedForRole('admin');
            }
        }
    };

    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/home',
            controller: 'MainCtrl'
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/users-list',
            controller: 'UserListCtrl',
            resolve: routeRoleChecks.admin
        })
});

app.run(function($rootScope, $location){
    $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
        if (rejection === 'non - authorized'){
            $location.path('/');
        }
    })
});