mapgular.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/offices/:officeId', {
			templateUrl: 'tpl/office.html',
			controller: 'officeCtrl'
		}).
		otherwise({
			redirectTo: 'index.html'
		});
}]);