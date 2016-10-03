(function() {
	'use strict';

	angular.module('skyNews').directive('skyNews',skyNewsDirective);

	skyNewsDirective.$inject = ['$rootScope', 'skyList', 'skyQueryString'];

	function skyNewsDirective($rootScope, skyList, skyQueryString) {
		let directive = {
			restrict:'E',
			templateUrl:'/sky-news/sky-news.template.html',
			scope:{},
			controller:controller,
			controllerAs:'skyNewsCtrl'
		};

		controller.$inject = ['$scope'];

		function controller($scope) {
			let configuration = {
				api: '/umbraco/api/newsapi/search',
				limit:5
			};

			this.query = {
				// Optional: Define default properties here
			};

			skyList.createInstance('news',configuration).then((list) => {
				this.query = angular.merge(list.query, this.query);
				this.data = list.results;
				this.showMore = list.nextPage;

				// Merge query from location.search
				angular.merge(this.query, skyQueryString.getAll());

				// Get results on query change
				$rootScope.$watchCollection(()=> this.query, () => {
					list.getResults();
				});
			});

			$scope.$on('$destroy', function() {
				skyList.killInstance('news');
			});
		}

		return directive;
	}

})();
