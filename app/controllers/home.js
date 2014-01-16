window.HomeController = (function(steroids) {

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


	return {

		// Index action
		index: function ($scope, beyondCalorieService) {	
		
			// Hide the navigation bar
			steroids.view.navigationBar.hide();	

			// Disable the rubbar-band effect
			document.addEventListener("touchmove", function(e) {
				e.preventDefault();
			});

			$scope.start = function() {
				steroids.layers.push({
					view: new steroids.views.WebView("/views/food/index.html"),
					navigationBar: false
				});	
			};

		}		

	};


})(steroids);
