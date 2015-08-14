mapgular.directive("gooMap", function ($http, mapSettings, $routeParams) {
	return {
		restrict: "E",
		template: "<div></div>",
		replace: true,
		link: function (scope, elements, attrs) {
			var map;
			var infowindow = null;
			var gmarkers = [];

			$http.get(mapSettings.apiUrl).
				then(function(response) {
					var offices = response.data.items;
					var myLatLng = {
						lat: parseFloat(attrs.center.split(',')[0]),
						lng: parseFloat(attrs.center.split(',')[1])
					};
					var options = {
						zoom: parseInt(attrs.zoom),
						center: myLatLng
					};
					var activeMap = offices.map(function(o){return o.id;});
					var activeIndex = activeMap.indexOf($routeParams.officeId);
					var setMarkers = function (map, markers) {
						for (var i = 0; i < markers.length; i++) {
							var geoSites = markers[i].geo;
							var titleSites = markers[i].title;
							var bodySites = markers[i].body;
							var idSites = markers[i].id;
							var siteLatLng = new google.maps.LatLng(geoSites.split(',')[0].substring(1), geoSites.split(',')[1].substring(0, geoSites.split(',')[1].length-1));
							var marker = new google.maps.Marker({
								position: siteLatLng,
								map: map,
								id: idSites,
								title: titleSites,
								html: bodySites
							});

							gmarkers.push(marker);

							google.maps.event.addListener(marker, "click", function () {
								infowindow.setContent(this.html);
								infowindow.open(map, this);
								window.location.hash = '#/offices/' + this.id;
							});
						}
					};
					var centerMarker = function (marker) {
						if (marker && marker >= 0) {
							google.maps.event.trigger(gmarkers[marker], "click");
						}
					};

					map = new google.maps.Map(document.getElementById(attrs.id), options);

					infowindow = new google.maps.InfoWindow({
						content: "Loading..."
					});

					setMarkers(map, offices);
					centerMarker(activeIndex);

					angular.element('.nav-tabs')[0].onclick = function (e) {
						if (e.target.nodeName.toLowerCase() === 'a') {
							function indexInParent(node) {
								var children = node.parentNode.childNodes;
								var num = 0;
								for (var i=0; i<children.length; i++) {
									if (children[i]==node) return num;
									if (children[i].nodeType==1) num++;
								}
								return -1;
							}

							google.maps.event.trigger(gmarkers[indexInParent(e.target.parentNode)], "click");
						}
					};

				},
			function(response) {});
		}
	};
});