mapgular.controller("officeCtrl", ["$scope", "$http", "$location", "$routeParams", "mapSettings", function ($scope, $http, $location, $routeParams, mapSettings) {

	var officeUrl = mapSettings.apiUrl + '/' + $routeParams.officeId;

	$http.get(officeUrl).
		then(function(responce) {
			$scope.singleOffice = responce.data.item;

			$('.nav-tabs a[href="#/offices/'+ $routeParams.officeId +'"]').parent().addClass('active').siblings().removeClass('active');
		}, function(response) {
			console.log('ERROR - ' + response);
		});

}]);