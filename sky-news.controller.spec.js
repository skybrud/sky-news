(function() {
	'use strict';
	describe('Controller: SkyNewsCtrl', function () {

		// load the controller's module
		beforeEach(module('skyNews'));

		// Define variables
		var SkyNewsCtrl,
			$scope,
			$timeout,
			$q;


		// Initialize the controller and a mock scope
		beforeEach(inject(function ($controller, $rootScope, _$timeout_, _$q_) {
			$scope = $rootScope.$new();
			$timeout = _$timeout_;
			$q = _$q_;
			SkyNewsCtrl = $controller('SkyNewsCtrl', {
				$scope: $scope
			});
		}));


		// Start testing...
		it('should have access to getNext() on extended sky-list-ctrl', function () {
			expect($scope.getNext).toBeDefined();
		});
		it('should have access to getPrev() on extended sky-list-ctrl', function () {
			expect($scope.getPrev).toBeDefined();
		});
		it('should have access to getResults() on extended sky-list-ctrl', function () {
			expect($scope.getResults).toBeDefined();
		});
		it('should have access to showMore() on self', function() {
			expect(SkyNewsCtrl.showMore).toBeDefined();
		});

		it('should execute $scope.getNext() when executing _this.showMore()', function() {
			var defer = $q.defer();
			var spy = spyOn($scope,'getNext').and.returnValue(defer.promise);

			SkyNewsCtrl.showMore();
			expect(spy).toHaveBeenCalled();
		});

		describe('Watching $scope.query', function() {

			var defer,spy;

			beforeEach(function() {
				defer = $q.defer();
				spy = spyOn($scope,'getResults').and.returnValue(defer.promise);

			});

			it('should execute $scope.getResults() when initiating', function() {
				$scope.$apply();
				$timeout.flush();
				expect(spy).toHaveBeenCalled();
			});

			it('should execute $scope.getResults() when $scope.query is changed (with debounce)', function() {

				// trigger the watcher
				$scope.query.keywords='some search';
				$scope.$apply();

				expect(spy).not.toHaveBeenCalled();

				// Flush timeout, since watch uses a debounce $timeout
				$timeout.flush();

				expect(spy).toHaveBeenCalled();
			});

			it('should set "loading"-state when getting results',function() {

				//trigger the watcher
				$scope.query.keywords='some search';
				$scope.$apply();

				//should be false (or undefined)
				expect(SkyNewsCtrl.loading).not.toBe(true);

				//flush the $timeout (debounce)
				$timeout.flush();

				//should be true
				expect(SkyNewsCtrl.loading).toBe(true);

				defer.resolve([]);
				$scope.$apply();

				//should be false again
				expect(SkyNewsCtrl.loading).toBe(false);
			});

			it('should set "loading"-state when failing',function() {

				//trigger the watcher
				$scope.query.keywords='some search';
				$scope.$apply();

				//should be false (or undefined)
				expect(SkyNewsCtrl.loading).not.toBe(true);

				//flush the $timeout (debounce)
				$timeout.flush();

				//should be true
				expect(SkyNewsCtrl.loading).toBe(true);

				defer.reject([]);
				$scope.$apply();

				//should be false again
				expect(SkyNewsCtrl.loading).toBe(false);
			});

		});

	});
})();
