(function () {
    "use strict";

    angular.module('OnePushApp.portfolios', [
        "OnePushApp.portfolios.controllers",
        "OnePushApp.portfolios.services",
    ])
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider.when('/Portfolios', {
            controller: 'PortfoliosController',
            controllerAs: 'portfoliosVM',
            templateUrl: 'ng_app/components/portfolios/portfolios.html',
            //resolve: {}
        });
    }

})();