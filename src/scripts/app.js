// Declare app level module which depends on filters, and services
var dealapp = angular.module('dealapp', ['dealapp.controllers','dealapp.services','ngRoute']);

dealapp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/createDeal', {
    	templateUrl: 'views/createDeal.html', 
    	controller:"createController",
    	resolve: {
    		deals : function(dealservice){
    			return dealservice;
    		}
    	}
    });
    $routeProvider.when('/listDeal', {
    	templateUrl: 'views/listDeal.html', 
    	controller: 'listController', 
    	resolve: {
    		deals : function(dealservice){
    			return dealservice;
    		}
    	}
    });
    $routeProvider.otherwise({redirectTo: '/listDeal'});
  }]);