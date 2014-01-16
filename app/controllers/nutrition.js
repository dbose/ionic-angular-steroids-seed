window.NutritionController = (function(steroids) {

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

			init();
			function init() {
				//steroids.view.navigationBar.hide();

			    var data1 = [], data2 = [], data3 = [];
			    var nutrientsMap = [
			                          "Sodium", "Choles.", "Potassium", 
			                          "Vitamin A", "Vit-C", "Iron", "Vit-D", 
			                          "Vit-B6", "Vit-B12", "Magnesium", "Fiber",
			                          "Fat", "Carbs", "Protein"
			                        ],
			        nutrient_count  = -1, 
			        open_brace      = "(",
			        close_brace     = ")",
			        percent         = "%";

			    $scope.defaultTickFormatter = function (val) {
			    	return nutrientsMap[val] + " ";
			    }           

			    $scope.defaultPieLabelFormatter = function (total, value) {
			    	nutrient_count++;
			        return nutrientsMap[nutrient_count];
			    };               

			    for (i = 0; i < 14; i++) {
					data1.push([Math.random(), i]);
			        data2.push([Math.random(), i]);          
			    }

			    $scope.data = [
			                      {data: data1, label: 'Protein'}, 
			                      {data: data2, label: 'Carbs'} 
							];
			    $scope.bar_ticks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 13];                   

			    $scope.pie = [
			                      {data: [[0,Math.random()]]},
			                      {data: [[0,Math.random()]]},
			                      {data: [[0,Math.random()]]},
			                      {data: [[0,Math.random()]]},
			                      {data: [[0,Math.random()]]},
			                      {data: [[0,Math.random()]]},
			                      {data: [[0,Math.random()]]},
			                      {data: [[0,Math.random()]]},
			                      {data: [[0,Math.random()]]},
			                      {data: [[0,Math.random()]]},
			                      {data: [[0,Math.random()]]},
			                      {data: [[0,Math.random()]]},
			                      {data: [[0,Math.random()]]},
			                      {data: [[0,Math.random()]]}
			                ];   
			     

			      console.log('NutritionCtrl init');
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
