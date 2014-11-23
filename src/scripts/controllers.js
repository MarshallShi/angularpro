angular.module('dealapp.controllers',[])

.controller('listController', function($scope, $http, deals) {

	$scope.$on('$viewContentLoaded', function() {
		var loaderP = deals.loadAll();
		loaderP.success(function(data, status, headers, config){
			$scope.deals = data;
		});
		loaderP.error(function(data, status, headers, config){
			throw new Error('Ooops, an error occured in the server......');
		});
    });
})

.controller('createController',   function($scope, $location, deals) {
	
	$scope.deal = {
		id : '',
		title : '',
		price : '',
		content : '',
		customerId : 1
	}

	$scope.save = function(){
		var saveP = deals.saveDeal($scope.deal);
		saveP.success(function(data, status, headers, config){
			$location.path("/listDeal");
		});
		saveP.error(function(data, status, headers, config){
			throw new Error('Ooops, an error occured in the server......');
		});
	};
}); 