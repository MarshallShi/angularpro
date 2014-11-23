angular.module('dealapp.services',[])
.factory('dealservice',function($http){
	return {
		loadAll: function(){
			var url = '/deal/getDealByCustomerId';
			if (ENV.mock === true) {
				url = '/mockserver' +  '/deal/getDealByCustomerId' + '.json';
			}
			return $http.get(url);
		},

		saveDeal: function(deal){
			var url = '/deal/saveDeal';
			if (ENV.mock === true) {
				url = '/mockserver' +  '/deal/saveDeal' + '.json';
				return $http.get(url, deal);
			}
			return $http.post(url, deal);
		}
	};
});