var app = angular.module('app',['ngResource','ngRoute']);

app.config(function($locationProvider, $routeProvider) {
   // $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/home',
            controller: 'MainCtrl'
        })
});