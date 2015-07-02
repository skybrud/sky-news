(function() {
	'use strict';
	
	angular.module('skyNews').directive('skyNews',skyNewsDirective);	
	
	skyNewsDirective.$inject = ['skyList'];
	
	function skyNewsDirective(skyList:sky.ISkyListFactory) {
		var directive = {
			restrict:'E',
			templateUrl:'/sky-news/sky-news.template.html',
			scope:{},
			controller:controller,
			controllerAs:'skyNewsCtrl'
		};
		
		controller.$inject = ['$scope'];
		function controller($scope) {
			var _this = this;
			
			_this.query = {
				keywords:'',
				category:''	
			};
			
			skyList.createInstance('news',{ api: '/umbraco/api/newsapi/search', limit:5 }).then(function(newsList) {
				_this.data = newsList.results;
				_this.showMore = newsList.getNext;
				
				$scope.$watch(()=>_this.query, function() {
					newsList.getResults(_this.query);
				},true);
				
				
			});

		}
		
		return directive;
	}
	
})();