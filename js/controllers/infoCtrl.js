mapgular.controller("infoCtrl", ["$scope", "$http", "mapSettings", function ($scope, $http, mapSettings) {
	$http.get(mapSettings.apiUrl).
		then(function(response) {
			$scope.offices = response.data.items;
		}, function(response) {
			console.log('ERROR - ' + response);
		}
	);
}]);