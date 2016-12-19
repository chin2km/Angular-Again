(function () {
    "use strict";
    angular.module('OnePushApp.portfolios.controllers', [])
            .controller('PortfoliosController', PortfoliosController);

    PortfoliosController.$inject = ['$rootScope', '$scope', '$route', '$location', '$timeout', '$interval', 'AppService', 'PortfoliosService', 'appConstants'];

    function PortfoliosController($rootScope, $scope, $route, $location, $timeout, $interval, AppService, PortfoliosService, appConstants) {
        var _this = this;
        _this.LayoutClass = 'grid';
        _this.newPortfolio = {
            title: '',
            url: '',
            tag: ''
        }
        _this.query = "";

        window.scrollTo(0, 0);
        _this.AppService = AppService;
        _this.fetchPortfolios = fetchPortfolios;
        _this.pushPortfolio = pushPortfolio;
        _this.openPushPopUp = openPushPopUp;
        _this.setLayout = setLayout;
        _this.setLike = setLike;
        _this.getLikes = getLikes;

        AppService.LoadTimer(1500);


        function fetchPortfolios() {
            var promiseObj = PortfoliosService.fetchPortfolios();
            promiseObj.then(function success(data) {
                
                _this.portfolios = data.portfolios;

                var dataForAutocomplete = {}
                _this.portfolios.map(function (d) {
                    dataForAutocomplete[d.title] = "http://placehold.it/250x250";
                    dataForAutocomplete[d.url_address] = "http://placehold.it/250x250";
                    dataForAutocomplete[d.tag] = "http://placehold.it/250x250";
                });
                $('input.autocomplete').autocomplete({
                    data: dataForAutocomplete
                });
            },
            function error() {
                Materialize.toast("Couldn't load portfolios!", 4000, "red")
            });
        }
        
        function pushPortfolio() {

            if (_this.newPortfolio.title == "") {
                Materialize.toast("Enter a valid Titke for the Portfolio", 3000, "red");
                return;
            }
            else if (_this.newPortfolio.url == "") {
                Materialize.toast("Enter a Valid URL", 3000, "red");
                return;
            }
            else if (_this.newPortfolio.tag == "") {
                Materialize.toast("Enter a tag", 3000, "red");
                return;
            }
            
            var promiseObj = PortfoliosService.pushPortfolio(_this.newPortfolio);
            promiseObj.then(function success(data) {
                $('#onepush-modal').closeModal();
                Materialize.toast("Successfully executed!" + JSON.stringify(data), 4000, "cyan");
                _this.fetchPortfolios();
            },
            function error(data) {
                Materialize.toast(JSON.stringify(data), 10000, "red")
            });
        }

        function openPushPopUp() {
            _this.newPortfolio = {
                title: '',
                url: '',
                tag:''
            }
            $('#onepush-modal').openModal();
        }

        function setLayout(layout) {
            _this.LayoutClass = layout;
        }

        function setLike(portfolio) {
            
            portfolio.likes = 0;
            portfolio.likes = localStorage.getItem(portfolio.url_address);
            if (portfolio.likes == null) {
                portfolio.likes = 0;
            }
            portfolio.likes = parseInt(portfolio.likes) + 1;
            localStorage.setItem(portfolio.url_address, portfolio.likes);
        }
        function getLikes(portfolio) {
            
            portfolio.likes = 0;
            portfolio.likes = localStorage.getItem(portfolio.url_address);
            if (portfolio.likes == null) {
                portfolio.likes = 0;
            }
            return portfolio.likes;

        }

        fetchPortfolios();

    }

})();