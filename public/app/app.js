var app = angular.module('app',['ngResource','ngRoute']).value('toastr', toastr);

app.config(function($locationProvider, $routeProvider) {
   // $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/home',
            controller: 'MainCtrl'
        })
});