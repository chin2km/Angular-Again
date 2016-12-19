

(function () {
    'use strict';
    var OnePushApp = angular.module("OnePushApp", [
                    'ngRoute',
                    'OnePushApp.portfolios'
    ])
                

    OnePushApp.config(['$routeProvider', '$compileProvider', '$locationProvider',
                      function ($routeProvider, $compileProvider, $locationProvider) {
                          $routeProvider
                            .otherwise({
                                redirectTo: '/Portfolios'
                            });
                      }]);

    OnePushApp.run(function ($rootScope,$window) {
        console.log("App started successfully!");
    });

})();

