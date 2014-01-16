window.NavigationController = (function(steroids) {

	// Private functions
	var navigateTo = function(template) {
		steroids.layers.push(new steroids.views.WebView("/views/" + template));	
	};

	var title = function(text) {
		steroids.view.navigationBar.show(text);
	};

	var param = function(name) {
		return steroids.view.params[name];
	};

	var back = function() {
		steroids.layers.pop();	
	};

	return {

		// Index action
		main: function ($scope, beyondCalorieService) {	

			$scope.loadMenu = function() {
				navigateTo("nutrition/index.html");  	
			};

			$scope.back = function() {
				back();
			};			

			// document.addEventListener("touchmove", function(e) {
			// 	e.preventDefault();
			// });

			// $scope.findTable = function() {
			// 	navigateTo("restaurant-picker.html?patronNumber=" + 
			// 				$scope.patronNumber + "&playlist_id=" + $scope.playlist);
			// };

		}		

	};


})(steroids);
