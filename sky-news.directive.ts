(function() {
	'use strict';

	angular.module('skyNews').directive('skyNews',skyNewsDirective);

	skyNewsDirective.$inject = ['$rootScope', 'skyList', 'skyQueryString'];

	function skyNewsDirective($rootScope, skyList, skyQueryString) {
		 return {
			restrict:'E',
			templateUrl:'/sky-news/sky-news.template.html',
			scope:{},
			controller:controller,
			controllerAs:'skyNewsCtrl'
		};

		function controller() {
			let configuration = {
				api: '/umbraco/api/newsapi/search',
				limit:5
			};

			skyList.createInstance('news',configuration).then((list) => {
				this.query = list.query;
				this.data = list.results;
				this.showMore = list.nextPage;

				// Merge query from location.search
				angular.merge(this.query, skyQueryString.getAll());

				// Get results on query change
				$rootScope.$watchCollection(()=> this.query, () => {
					list.getResults();
				});
			});
		}
	}

})();
