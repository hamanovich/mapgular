mapgular.directive("gmap",  function () {
	return {
		restrict: "E",
		template: "<div></div>",
		replace: true,
		link: function (scope, elements, attrs) {
			console.log(elements)
		}
	};
});