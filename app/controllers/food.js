window.FoodController = (function(steroids) {

	// Private functions
	var navigateTo = function(template) {
		steroids.layers.push(new steroids.views.WebView("/views/" + template));	
	};

	var navigateToView = function(view) {
		steroids.layers.push(view);		
	};	

	var getView = function(template) {
		new steroids.views.WebView("/views/" + template)
	};

	var title = function(text) {
		steroids.view.navigationBar.show(text);
	};

	var param = function(name) {
		return steroids.view.params[name];
	};

	var emptyBackButton = function() {		
		// var emptyButton = new steroids.buttons.NavigationBarButton()
		// emptyButton.title = ""

		// steroids.view.navigationBar.setButtons({
		// 	left: [emptyButton],
		//   	overrideBackButton: true
		// });
		  
	}

	/*
		Setup navigation bar buttons
	 */
	var setupNavigationBar = function(text, ref, left_or_right) {
        left_or_right = left_or_right || "right";

		var button = new steroids.buttons.NavigationBarButton();

		if (text.match(/\S+\.png/)) {
			button.imagePath = text;
		}
		else {
			button.title = text;	
		}
		
		button.onTap = function() {
			navigateTo(ref);    
		};

        placement_options = (left_or_right == "left") ? 
        						{
        							left: [button], 
        							overrideBackButton: true
        						} : 
        						{
        							right: [button]
        						};

		steroids.view.navigationBar.setButtons(placement_options);
	};


	return {

		// Index action
		index: function ($scope, beyondCalorieService) {	

			$scope.search_type = "recipe"; 
  			$scope.search_text = null;

  			init();

			$scope.search = function() {
			  	console.log("MainCtrl::search");  	
			  	if ($scope.search_text) {
			  		beyondCalorieService.food_search($scope.search_text, 
													$scope.search_type).then(function(data) {

														$scope.foods = data;
														console.log(data);

													}, function(error) {
														$scope.foods = [];
													});    	  		
			  	}  	
			};

			$scope.setSearchType = function(search_type) {
			  	$scope.search_type = search_type;
			  	$scope.search();	
			};

			function init() {
				console.log('MainCtrl init....');

				//steroids.view.navigationBar.hide();
				title("Beyond Calories");
				setupNavigationBar("/images/icon-menu.png", "nutrition/index.html", "left");
			  	
			    //$scope.foods = beyondCalorieService.get_last_search();	
			    $scope.foods = beyondCalorieService.get_factory_foods();		    
			}; 			

			document.addEventListener("touchmove", function(e) {
				e.preventDefault();
			});

			// $scope.findTable = function() {
			// 	navigateTo("restaurant-picker.html?patronNumber=" + 
			// 				$scope.patronNumber + "&playlist_id=" + $scope.playlist);
			// };

		},

		pick: function ($scope, $http) {
			$scope.restaurants = [];
			title("Select Restaurant");

			$http.get("/data/restaurants" + param('playlist_id') + ".json").success(function(data) {
				$scope.restaurants = data;
			});
			$scope.choose = function(id) {
				navigateTo("confirm.html?id=" + id + "&patronNumber=" + param('patronNumber') + 
							"&playlist_id=" + param('playlist_id'));			
			};

		}

	};


})(steroids);