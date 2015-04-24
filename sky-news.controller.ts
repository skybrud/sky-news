/* global angular */
(function () {
	'use strict';

	/**
	 * Controller: newsCtrl
	 * DEPENDS ON skyListCtrl
	 *
	 * This controller gets news from api, and exposes
	 * a showMore()-method
	 *
	**/

	angular.module('skyNews').controller('SkyNewsCtrl', SkyNewsCtrl);

	SkyNewsCtrl.$inject = ['$scope', '$controller', '$timeout'];

	function SkyNewsCtrl($scope, $controller, $timeout) {

		var _this=this,
			wait={};

		// make this controller extend the genericListCtrl for basic list-methods
		angular.extend(this,$controller('SkyListCtrl',{$scope:$scope}));

		// change default configuration
		$scope.prefs.limit = 2;
		$scope.prefs.api = '/umbraco/api/newsapi/search';

		// Define the $scope.query defaults
		$scope.query = {
			category:'',
			keywords:''
		};

		// Function to call from the view
		_this.showMore = function() {
			$scope.getNext().then(function(res) {
				// add the data to the results.data-array
				_this.results.data.push.apply(_this.results.data,res.data.data);
			}, function() {
				// fail silently
			});
		};

		$scope.$watch('query', function(){
			$timeout.cancel(wait);
			wait = $timeout(function() {

				_this.loading = true;

				$scope.getResults().then(function(res) {
					_this.results = res.data;
					_this.loading = false;

				}, function(res) {
					// fail silently
					_this.loading = false;
				});

			},300);

		}, true);

	}


})();
